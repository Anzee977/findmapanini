import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { useCallback, useEffect, useRef, useState } from 'react';

const KEYS = {
  collection: 'fmp:collection',
  dupes: 'fmp:dupes',
  wishlist: 'fmp:wishlist',
} as const;

type Collection = Record<string, number[]>;   // { FRA: [1,3,5] }
type Dupes = Record<string, number>;           // { 'FRA-17': 2 }
type Wishlist = string[];                      // ['FRA-10']

interface CollectionState {
  collection: Collection;
  dupes: Dupes;
  wishlist: Wishlist;
  loaded: boolean;
}

export interface UseCollectionReturn {
  loaded: boolean;
  isOwned: (code: string, n: number) => boolean;
  toggleOwned: (code: string, n: number) => Promise<void>;
  getDupeCount: (code: string, n: number) => number;
  addDupe: (code: string, n: number) => Promise<void>;
  removeDupe: (code: string, n: number) => Promise<void>;
  isWished: (code: string, n: number) => boolean;
  toggleWish: (code: string, n: number) => Promise<void>;
  getTeamProgress: (code: string, total?: number) => { owned: number; total: number; pct: number };
  getTotalProgress: (totalStickers?: number) => { owned: number; total: number; pct: number };
  getOwnedNumbers: (code: string) => number[];
  getDupeKeys: () => string[];
  getWishlist: () => string[];
  getRecentlyAdded: (limit?: number) => Array<{ code: string; n: number; ts: number }>;
}

const cardKey = (code: string, n: number) => `${code}-${n}`;

export function useCollection(): UseCollectionReturn {
  const [state, setState] = useState<CollectionState>({
    collection: {},
    dupes: {},
    wishlist: [],
    loaded: false,
  });

  // Recent additions log (in-memory only, session)
  const recentRef = useRef<Array<{ code: string; n: number; ts: number }>>([]);

  useEffect(() => {
    (async () => {
      try {
        const many = await AsyncStorage.getMany([
          KEYS.collection,
          KEYS.dupes,
          KEYS.wishlist,
        ]);
        setState({
          collection: many[KEYS.collection] ? JSON.parse(many[KEYS.collection]!) : {},
          dupes: many[KEYS.dupes] ? JSON.parse(many[KEYS.dupes]!) : {},
          wishlist: many[KEYS.wishlist] ? JSON.parse(many[KEYS.wishlist]!) : [],
          loaded: true,
        });
      } catch {
        setState(s => ({ ...s, loaded: true }));
      }
    })();
  }, []);

  const persist = useCallback(async (next: Partial<CollectionState>) => {
    const entries: Record<string, string> = {};
    if (next.collection !== undefined) entries[KEYS.collection] = JSON.stringify(next.collection);
    if (next.dupes !== undefined) entries[KEYS.dupes] = JSON.stringify(next.dupes);
    if (next.wishlist !== undefined) entries[KEYS.wishlist] = JSON.stringify(next.wishlist);
    if (Object.keys(entries).length) await AsyncStorage.setMany(entries);
  }, []);

  const isOwned = useCallback(
    (code: string, n: number) => state.collection[code]?.includes(n) ?? false,
    [state.collection],
  );

  const toggleOwned = useCallback(
    async (code: string, n: number) => {
      setState(prev => {
        const owned = prev.collection[code] ?? [];
        const alreadyOwned = owned.includes(n);
        const next = alreadyOwned ? owned.filter(x => x !== n) : [...owned, n].sort((a, b) => a - b);
        const nextCollection = { ...prev.collection, [code]: next };

        if (!alreadyOwned) {
          recentRef.current = [{ code, n, ts: Date.now() }, ...recentRef.current].slice(0, 50);
        }

        persist({ collection: nextCollection });
        return { ...prev, collection: nextCollection };
      });
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    },
    [persist],
  );

  const getDupeCount = useCallback(
    (code: string, n: number) => state.dupes[cardKey(code, n)] ?? 0,
    [state.dupes],
  );

  const addDupe = useCallback(
    async (code: string, n: number) => {
      setState(prev => {
        const k = cardKey(code, n);
        const nextDupes = { ...prev.dupes, [k]: (prev.dupes[k] ?? 0) + 1 };
        persist({ dupes: nextDupes });
        return { ...prev, dupes: nextDupes };
      });
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    },
    [persist],
  );

  const removeDupe = useCallback(
    async (code: string, n: number) => {
      setState(prev => {
        const k = cardKey(code, n);
        const current = prev.dupes[k] ?? 0;
        const nextDupes = { ...prev.dupes };
        if (current <= 1) delete nextDupes[k];
        else nextDupes[k] = current - 1;
        persist({ dupes: nextDupes });
        return { ...prev, dupes: nextDupes };
      });
    },
    [persist],
  );

  const isWished = useCallback(
    (code: string, n: number) => state.wishlist.includes(cardKey(code, n)),
    [state.wishlist],
  );

  const toggleWish = useCallback(
    async (code: string, n: number) => {
      setState(prev => {
        const k = cardKey(code, n);
        const nextWishlist = prev.wishlist.includes(k)
          ? prev.wishlist.filter(x => x !== k)
          : [...prev.wishlist, k];
        persist({ wishlist: nextWishlist });
        return { ...prev, wishlist: nextWishlist };
      });
      await Haptics.selectionAsync();
    },
    [persist],
  );

  const getTeamProgress = useCallback(
    (code: string, total = 20) => {
      const owned = state.collection[code]?.length ?? 0;
      return { owned, total, pct: total > 0 ? owned / total : 0 };
    },
    [state.collection],
  );

  const getTotalProgress = useCallback(
    (totalStickers = 960 /* override via TOTAL_STICKERS */) => {
      const owned = Object.values(state.collection).reduce((sum, arr) => sum + arr.length, 0);
      return { owned, total: totalStickers, pct: totalStickers > 0 ? owned / totalStickers : 0 };
    },
    [state.collection],
  );

  const getOwnedNumbers = useCallback(
    (code: string) => state.collection[code] ?? [],
    [state.collection],
  );

  const getDupeKeys = useCallback(() => Object.keys(state.dupes), [state.dupes]);

  const getWishlist = useCallback(() => state.wishlist, [state.wishlist]);

  const getRecentlyAdded = useCallback(
    (limit = 10) => recentRef.current.slice(0, limit),
    [],
  );

  return {
    loaded: state.loaded,
    isOwned,
    toggleOwned,
    getDupeCount,
    addDupe,
    removeDupe,
    isWished,
    toggleWish,
    getTeamProgress,
    getTotalProgress,
    getOwnedNumbers,
    getDupeKeys,
    getWishlist,
    getRecentlyAdded,
  };
}
