import { FlagBar } from '@/components/FlagBar';
import { StickerCard } from '@/components/StickerCard';
import { ALL_TEAMS } from '@/constants/data';
import { Colors } from '@/constants/colors';
import { Fonts, FontSizes } from '@/constants/fonts';
import { useI18n } from '@/constants/i18n';
import { useCollection } from '@/hooks/useCollection';
import { haptic } from '@/hooks/useHaptics';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

type Filter = 'all' | 'missing' | 'dupes' | 'wishlist';

export default function AlbumScreen() {
  const { code } = useLocalSearchParams<{ code: string }>();
  const router = useRouter();
  const navigation = useNavigation();
  const collection = useCollection();
  const { t } = useI18n();
  const [filter, setFilter] = useState<Filter>('all');

  const FILTERS: { key: Filter; label: string }[] = [
    { key: 'all', label: t('filterAll') },
    { key: 'missing', label: t('filterMissing') },
    { key: 'dupes', label: t('filterDupes') },
    { key: 'wishlist', label: t('filterWishlist') },
  ];

  const team = useMemo(() => ALL_TEAMS.find(tm => tm.code === code), [code]);

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
        <View style={styles.center}><Text style={styles.error}>{t('commonNotFound')}</Text></View>
      </SafeAreaView>
    );
  }

  const getCardState = (n: number) => {
    if (collection.isWished(code, n)) return 'wished' as const;
    if (collection.getDupeCount(code, n) > 0) return 'dupe' as const;
    if (collection.isOwned(code, n)) return 'owned' as const;
    return 'missing' as const;
  };

  const pct = progress.total > 0 ? progress.owned / progress.total : 0;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.subheader}>
        <FlagBar colors={team.colors} height={5} />
        <View style={styles.teamInfo}>
          <Text style={styles.teamFlag}>{team.flag}</Text>
          <View style={styles.teamText}>
            <Text style={styles.teamCode}>{team.code}</Text>
            <Text style={styles.teamName}>{team.name}</Text>
          </View>
          <View style={styles.progressWrap}>
            <Text style={styles.progressLabel}>{progress.owned}/{progress.total}</Text>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${Math.round(pct * 100)}%` as `${number}%` }]} />
            </View>
          </View>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar} contentContainerStyle={styles.filterContent}>
        {FILTERS.map(f => (
          <Pressable key={f.key} onPress={() => { haptic.filterChange(); setFilter(f.key); }} style={[styles.chip, filter === f.key && styles.chipActive]}>
            <Text style={[styles.chipText, filter === f.key && styles.chipTextActive]}>{f.label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <FlatList
        data={filteredPlayers}
        keyExtractor={p => String(p.n)}
        numColumns={3}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <StickerCard
            teamCode={code} player={item} state={getCardState(item.n)}
            dupeCount={collection.getDupeCount(code, item.n)}
            onPress={() => router.push(`/card/${code}/${item.n}`)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  error: { fontFamily: Fonts.body, fontSize: FontSizes.lg, color: Colors.gray400 },
  subheader: { backgroundColor: Colors.dark },
  teamInfo: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
  teamFlag: { fontSize: 36 },
  teamText: { flex: 1 },
  teamCode: { fontFamily: Fonts.mono, fontSize: FontSizes.xs, color: Colors.gold, fontWeight: '700', letterSpacing: 2 },
  teamName: { fontFamily: Fonts.display, fontSize: FontSizes.xl, color: '#FFFFFF', letterSpacing: 0.5 },
  progressWrap: { alignItems: 'flex-end', gap: 4 },
  progressLabel: { fontFamily: Fonts.mono, fontSize: FontSizes.xs, color: Colors.gold },
  progressTrack: { width: 64, height: 4, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: Colors.gold, borderRadius: 2 },
  filterBar: { flexGrow: 0, backgroundColor: Colors.dark, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  filterContent: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)' },
  chipActive: { backgroundColor: Colors.red, borderColor: Colors.red },
  chipText: { fontFamily: Fonts.body, fontSize: FontSizes.sm, color: Colors.gray400, fontWeight: '500' },
  chipTextActive: { color: '#FFFFFF', fontWeight: '700' },
  grid: { paddingHorizontal: 12, paddingBottom: 24 },
  row: { justifyContent: 'flex-start' },
});
