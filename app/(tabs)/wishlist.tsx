import { Colors } from '@/constants/colors';
import { Fonts, FontSizes } from '@/constants/fonts';
import { ALL_TEAMS } from '@/constants/data';
import { useCollection } from '@/hooks/useCollection';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Tab = 'wishlist' | 'dupes';

interface WishItem {
  code: string;
  n: number;
  teamName: string;
  teamFlag: string;
  playerName: string;
}

interface DupeItem {
  code: string;
  n: number;
  count: number;
  teamName: string;
  teamFlag: string;
  playerName: string;
}

export default function WishlistScreen() {
  const router = useRouter();
  const collection = useCollection();
  const [tab, setTab] = useState<Tab>('wishlist');

  const teamMap = useMemo(() => {
    const m: Record<string, (typeof ALL_TEAMS)[0]> = {};
    ALL_TEAMS.forEach(t => (m[t.code] = t));
    return m;
  }, []);

  const wishItems = useMemo<WishItem[]>(() => {
    return collection.getWishlist().map(key => {
      const [code, nStr] = key.split('-');
      const n = parseInt(nStr, 10);
      const team = teamMap[code];
      const player = team?.players.find(p => p.n === n);
      return {
        code,
        n,
        teamName: team?.name ?? code,
        teamFlag: team?.flag ?? '🏳️',
        playerName: player?.name ?? `Sticker #${n}`,
      };
    });
  }, [collection, teamMap]);

  const dupeItems = useMemo<DupeItem[]>(() => {
    return collection.getDupeKeys().map(key => {
      const [code, nStr] = key.split('-');
      const n = parseInt(nStr, 10);
      const team = teamMap[code];
      const player = team?.players.find(p => p.n === n);
      return {
        code,
        n,
        count: collection.getDupeCount(code, n),
        teamName: team?.name ?? code,
        teamFlag: team?.flag ?? '🏳️',
        playerName: player?.name ?? `Sticker #${n}`,
      };
    });
  }, [collection, teamMap]);

  const renderWishItem = ({ item }: { item: WishItem }) => (
    <Pressable
      onPress={() => router.push(`/card/${item.code}/${item.n}`)}
      style={styles.row}
    >
      <Text style={styles.flag}>{item.teamFlag}</Text>
      <View style={styles.rowInfo}>
        <Text style={styles.rowName}>{item.playerName}</Text>
        <Text style={styles.rowSub}>{item.teamName} · #{item.n}</Text>
      </View>
      <Pressable
        onPress={() => collection.toggleWish(item.code, item.n)}
        style={styles.removeBtn}
      >
        <Text style={styles.removeIcon}>✕</Text>
      </Pressable>
    </Pressable>
  );

  const renderDupeItem = ({ item }: { item: DupeItem }) => (
    <Pressable
      onPress={() => router.push(`/card/${item.code}/${item.n}`)}
      style={styles.row}
    >
      <Text style={styles.flag}>{item.teamFlag}</Text>
      <View style={styles.rowInfo}>
        <Text style={styles.rowName}>{item.playerName}</Text>
        <Text style={styles.rowSub}>{item.teamName} · #{item.n}</Text>
      </View>
      <View style={styles.dupeBadge}>
        <Text style={styles.dupeCount}>×{item.count}</Text>
      </View>
    </Pressable>
  );

  const isEmpty = tab === 'wishlist' ? wishItems.length === 0 : dupeItems.length === 0;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>MA LISTE</Text>

        {/* Tabs */}
        <View style={styles.tabs}>
          {(['wishlist', 'dupes'] as Tab[]).map(t => (
            <Pressable
              key={t}
              onPress={() => setTab(t)}
              style={[styles.tabBtn, tab === t && styles.tabBtnActive]}
            >
              <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
                {t === 'wishlist' ? `⭐ Wishlist (${wishItems.length})` : `🔄 Doublons (${dupeItems.length})`}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {isEmpty ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>{tab === 'wishlist' ? '⭐' : '🔄'}</Text>
          <Text style={styles.emptyTitle}>
            {tab === 'wishlist' ? 'Aucun sticker en liste' : 'Aucun doublon'}
          </Text>
          <Text style={styles.emptyText}>
            {tab === 'wishlist'
              ? 'Marque des stickers manquants pour les retrouver facilement.'
              : 'Tes doublons apparaîtront ici pour les échanger.'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={tab === 'wishlist' ? wishItems : dupeItems}
          keyExtractor={item => `${item.code}-${item.n}`}
          contentContainerStyle={styles.list}
          renderItem={tab === 'wishlist' ? renderWishItem : renderDupeItem as any}
          ItemSeparatorComponent={() => <View style={styles.sep} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  header: {
    backgroundColor: Colors.dark,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: FontSizes['2xl'],
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 12,
  },
  tabs: {
    flexDirection: 'row',
    gap: 8,
  },
  tabBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  tabBtnActive: {
    backgroundColor: Colors.red,
  },
  tabText: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.sm,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  list: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    gap: 12,
  },
  flag: {
    fontSize: 28,
  },
  rowInfo: {
    flex: 1,
  },
  rowName: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.base,
    color: Colors.black,
    fontWeight: '700',
  },
  rowSub: {
    fontFamily: Fonts.mono,
    fontSize: FontSizes.xs,
    color: Colors.gray400,
    marginTop: 2,
  },
  removeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.gray200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeIcon: {
    fontSize: 11,
    color: Colors.gray600,
  },
  dupeBadge: {
    backgroundColor: Colors.red,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  dupeCount: {
    fontFamily: Fonts.display,
    fontSize: FontSizes.base,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  sep: {
    height: 8,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    gap: 12,
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyTitle: {
    fontFamily: Fonts.display,
    fontSize: FontSizes.xl,
    color: Colors.black,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  emptyText: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.sm,
    color: Colors.gray600,
    textAlign: 'center',
    lineHeight: 20,
  },
});
