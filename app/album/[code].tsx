import { FlagBar } from '@/components/FlagBar';
import { StickerCard } from '@/components/StickerCard';
import { ALL_TEAMS } from '@/constants/data';
import { Colors } from '@/constants/colors';
import { Fonts, FontSizes } from '@/constants/fonts';
import { useCollection } from '@/hooks/useCollection';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
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
import { haptic } from '@/hooks/useHaptics';

type Filter = 'all' | 'missing' | 'dupes' | 'wishlist';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Toutes' },
  { key: 'missing', label: 'Manquantes' },
  { key: 'dupes', label: 'Doublons' },
  { key: 'wishlist', label: 'Wishlist' },
];

export default function AlbumScreen() {
  const { code } = useLocalSearchParams<{ code: string }>();
  const router = useRouter();
  const navigation = useNavigation();
  const collection = useCollection();
  const [filter, setFilter] = useState<Filter>('all');

  const team = useMemo(() => ALL_TEAMS.find(t => t.code === code), [code]);

  useEffect(() => {
    if (team) navigation.setOptions({ title: team.name });
  }, [team]);

  const progress = collection.getTeamProgress(code, team?.players.length ?? 20);

  const filteredPlayers = useMemo(() => {
    if (!team) return [];
    return team.players.filter(p => {
      if (filter === 'all') return true;
      if (filter === 'missing') return !collection.isOwned(code, p.n);
      if (filter === 'dupes') return collection.getDupeCount(code, p.n) > 0;
      if (filter === 'wishlist') return collection.isWished(code, p.n);
      return true;
    });
  }, [team, filter, collection, code]);

  if (!team) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.error}>Équipe introuvable</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getCardState = (n: number) => {
    if (collection.isWished(code, n)) return 'wished' as const;
    if (collection.getDupeCount(code, n) > 0) return 'dupe' as const;
    if (collection.isOwned(code, n)) return 'owned' as const;
    return 'missing' as const;
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Subheader */}
      <View style={styles.subheader}>
        <FlagBar colors={team.colors} height={5} />
        <View style={styles.teamInfo}>
          <Text style={styles.teamFlag}>{team.flag}</Text>
          <View style={styles.teamText}>
            <Text style={styles.teamCode}>{team.code}</Text>
            <Text style={styles.progressText}>{progress.owned}/{progress.total} stickers</Text>
          </View>
          <Text style={styles.pct}>{Math.round(progress.pct * 100)}%</Text>
        </View>

        {/* Progress bar */}
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${Math.round(progress.pct * 100)}%` },
              progress.pct === 1 && { backgroundColor: Colors.turf },
            ]}
          />
        </View>

        {/* Filter chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
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
      </View>

      {/* Grid */}
      <FlatList
        data={filteredPlayers}
        keyExtractor={p => String(p.n)}
        numColumns={3}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <StickerCard
            teamCode={code}
            player={item}
            state={getCardState(item.n)}
            dupeCount={collection.getDupeCount(code, item.n)}
            onPress={() => router.push(`/card/${code}/${item.n}`)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Aucun sticker pour ce filtre</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  subheader: {
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  teamInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
  },
  teamFlag: {
    fontSize: 36,
  },
  teamText: {
    flex: 1,
  },
  teamCode: {
    fontFamily: Fonts.display,
    fontSize: FontSizes['2xl'],
    color: Colors.black,
    letterSpacing: 1,
  },
  progressText: {
    fontFamily: Fonts.mono,
    fontSize: FontSizes.xs,
    color: Colors.gray400,
  },
  pct: {
    fontFamily: Fonts.display,
    fontSize: FontSizes['2xl'],
    color: Colors.red,
  },
  progressTrack: {
    height: 3,
    backgroundColor: Colors.gray200,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 2,
  },
  progressFill: {
    height: 3,
    backgroundColor: Colors.red,
    borderRadius: 2,
  },
  filterRow: {
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Colors.gray100,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: Colors.red,
  },
  chipText: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.sm,
    color: Colors.gray600,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  grid: {
    padding: 4,
    paddingBottom: 32,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    fontFamily: Fonts.body,
    color: Colors.gray600,
    fontSize: FontSizes.base,
  },
  empty: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.base,
    color: Colors.gray400,
  },
});
