import { StickerCard } from '@/components/StickerCard';
import { SPECIAL_SECTIONS } from '@/constants/data';
import { Colors } from '@/constants/colors';
import { Fonts, FontSizes } from '@/constants/fonts';
import { useCollection } from '@/hooks/useCollection';
import { haptic } from '@/hooks/useHaptics';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Filter = 'all' | 'missing' | 'dupes' | 'wishlist';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Toutes' },
  { key: 'missing', label: 'Manquantes' },
  { key: 'dupes', label: 'Doublons' },
  { key: 'wishlist', label: 'Wishlist' },
];

export default function SpecialAlbumScreen() {
  const { code } = useLocalSearchParams<{ code: string }>();
  const navigation = useNavigation();
  const collection = useCollection();
  const [filter, setFilter] = useState<Filter>('all');

  const section = useMemo(() => SPECIAL_SECTIONS.find(s => s.code === code), [code]);

  useEffect(() => {
    if (section) navigation.setOptions({ title: section.name });
  }, [section]);

  const progress = collection.getTeamProgress(code, section?.stickers.length ?? 0);

  const filtered = useMemo(() => {
    if (!section) return [];
    return section.stickers.filter(p => {
      if (filter === 'all') return true;
      if (filter === 'missing') return !collection.isOwned(code, p.n);
      if (filter === 'dupes') return collection.getDupeCount(code, p.n) > 0;
      if (filter === 'wishlist') return collection.isWished(code, p.n);
      return true;
    });
  }, [section, filter, collection, code]);

  if (!section) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.error}>Section introuvable</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getState = (n: number) => {
    if (collection.isWished(code, n)) return 'wished' as const;
    if (collection.getDupeCount(code, n) > 0) return 'dupe' as const;
    if (collection.isOwned(code, n)) return 'owned' as const;
    return 'missing' as const;
  };

  const handlePress = (n: number) => {
    haptic.cardStick();
    collection.toggleOwned(code, n);
  };

  const pct = progress.total > 0 ? progress.owned / progress.total : 0;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.sectionCode}>{code}</Text>
          <Text style={styles.sectionName}>{section.name}</Text>
          <Text style={styles.progressLabel}>
            {progress.owned}/{progress.total} · {Math.round(pct * 100)}%
          </Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.round(pct * 100)}%` as `${number}%` }]} />
          </View>
        </View>
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterBar}
        contentContainerStyle={styles.filterContent}
      >
        {FILTERS.map(f => (
          <Pressable
            key={f.key}
            onPress={() => { haptic.filterChange(); setFilter(f.key); }}
            style={[styles.chip, filter === f.key && styles.chipActive]}
          >
            <Text style={[styles.chipText, filter === f.key && styles.chipTextActive]}>
              {f.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Grid */}
      <FlatList
        data={filtered}
        keyExtractor={p => String(p.n)}
        numColumns={3}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>Aucun sticker dans ce filtre</Text>
          </View>
        }
        renderItem={({ item }) => (
          <StickerCard
            teamCode={code}
            player={item}
            state={getState(item.n)}
            dupeCount={collection.getDupeCount(code, item.n)}
            onPress={() => handlePress(item.n)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.dark },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  error: {
    fontFamily: Fonts.body, fontSize: FontSizes.lg,
    color: Colors.gray400,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: 'rgba(255,215,0,0.06)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,215,0,0.18)',
  },
  headerInfo: { gap: 4 },
  sectionCode: {
    fontFamily: Fonts.mono,
    fontSize: FontSizes.xs,
    color: Colors.gold,
    fontWeight: '700',
    letterSpacing: 2,
  },
  sectionName: {
    fontFamily: Fonts.display,
    fontSize: FontSizes.xl,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  progressLabel: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.sm,
    color: Colors.gray400,
    marginTop: 2,
  },
  progressTrack: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.gold,
    borderRadius: 2,
  },
  filterBar: { flexGrow: 0, marginVertical: 10 },
  filterContent: { paddingHorizontal: 16, gap: 8 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  chipActive: { backgroundColor: Colors.gold, borderColor: Colors.gold },
  chipText: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.sm,
    color: Colors.gray400,
    fontWeight: '500',
  },
  chipTextActive: { color: Colors.dark, fontWeight: '700' },
  grid: { paddingHorizontal: 12, paddingBottom: 24 },
  row: { justifyContent: 'flex-start' },
  emptyWrap: { alignItems: 'center', marginTop: 48 },
  emptyText: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.base,
    color: Colors.gray400,
  },
});
