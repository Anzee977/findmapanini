import { FlagBar } from '@/components/FlagBar';
import { ALL_TEAMS, TOTAL_STICKERS, TOTAL_SPECIAL_STICKERS } from '@/constants/data';
import { Colors } from '@/constants/colors';
import { Fonts, FontSizes } from '@/constants/fonts';
import { useCollection } from '@/hooks/useCollection';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const CONFEDERATIONS = ['Tous', 'UEFA', 'CONMEBOL', 'CAF', 'AFC', 'CONCACAF', 'OFC'];

interface TeamCardProps {
  team: (typeof ALL_TEAMS)[0];
  owned: number;
  total: number;
  onPress: () => void;
}

function TeamCard({ team, owned, total, onPress }: TeamCardProps) {
  const pct = total > 0 ? owned / total : 0;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, { opacity: pressed ? 0.85 : 1 }]}
    >
      <FlagBar colors={team.colors} height={4} />
      <View style={styles.cardBody}>
        <Text style={styles.flag}>{team.flag}</Text>
        <Text style={styles.teamName}>{team.name}</Text>
        <Text style={styles.teamCode}>{team.code}</Text>

        {/* Progress bar */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${Math.round(pct * 100)}%`, backgroundColor: pct === 1 ? Colors.turf : Colors.red }]} />
        </View>
        <Text style={styles.progressLabel}>{owned}/{total}</Text>
      </View>
    </Pressable>
  );
}

export default function TeamsScreen() {
  const router = useRouter();
  const collection = useCollection();
  const [search, setSearch] = useState('');
  const [confed, setConfed] = useState('Tous');

  const filtered = useMemo(() => {
    let teams = ALL_TEAMS;
    if (search) {
      const q = search.toLowerCase();
      teams = teams.filter(
        t => t.name.toLowerCase().includes(q) || t.code.toLowerCase().includes(q),
      );
    }
    return teams;
  }, [search, confed]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>ALBUM CDM 2026</Text>
        <Text style={styles.sub}>{ALL_TEAMS.length} équipes · {TOTAL_STICKERS} stickers</Text>
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <TextInput
          style={styles.search}
          value={search}
          onChangeText={setSearch}
          placeholder="Rechercher une équipe..."
          placeholderTextColor={Colors.gray400}
        />
      </View>

      {/* Grid */}
      <FlatList
        data={filtered}
        keyExtractor={t => t.code}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={
          <Pressable
            onPress={() => router.push('/special')}
            style={({ pressed }) => [styles.specialBanner, pressed && { opacity: 0.75 }]}
          >
            <Text style={styles.specialIcon}>⭐</Text>
            <View style={styles.specialText}>
              <Text style={styles.specialTitle}>Sections Spéciales</Text>
              <Text style={styles.specialSub}>{TOTAL_SPECIAL_STICKERS} stickers foil · FWC, Coca-Cola, Extra</Text>
            </View>
            <Text style={styles.specialChevron}>›</Text>
          </Pressable>
        }
        renderItem={({ item }) => {
          const progress = collection.getTeamProgress(item.code, item.players.length);
          return (
            <TeamCard
              team={item}
              owned={progress.owned}
              total={progress.total}
              onPress={() => router.push(`/album/${item.code}`)}
            />
          );
        }}
      />
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
    paddingVertical: 16,
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: FontSizes['2xl'],
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  sub: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.xs,
    color: Colors.gold,
    marginTop: 2,
  },
  searchRow: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Colors.cream,
  },
  search: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontFamily: Fonts.body,
    fontSize: FontSizes.base,
    color: Colors.black,
    borderWidth: 1,
    borderColor: Colors.gray200,
  },
  list: {
    padding: 8,
    paddingBottom: 32,
  },
  row: {
    justifyContent: 'space-between',
  },
  specialBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark,
    borderRadius: 14,
    marginBottom: 12,
    marginHorizontal: 2,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.3)',
  },
  specialIcon: { fontSize: 28 },
  specialText: { flex: 1 },
  specialTitle: {
    fontFamily: Fonts.display,
    fontSize: FontSizes.lg,
    color: Colors.gold,
    letterSpacing: 0.5,
  },
  specialSub: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.xs,
    color: Colors.gray400,
    marginTop: 2,
  },
  specialChevron: {
    fontFamily: Fonts.display,
    fontSize: 24,
    color: Colors.gold,
  },
  card: {
    width: '48%',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  cardBody: {
    padding: 12,
  },
  flag: {
    fontSize: 32,
    marginBottom: 6,
  },
  teamName: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.sm,
    color: Colors.black,
    fontWeight: '700',
    marginBottom: 2,
  },
  teamCode: {
    fontFamily: Fonts.mono,
    fontSize: FontSizes.xs,
    color: Colors.gray400,
    marginBottom: 8,
  },
  progressTrack: {
    height: 4,
    backgroundColor: Colors.gray200,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    borderRadius: 2,
  },
  progressLabel: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    color: Colors.gray400,
    marginTop: 4,
    textAlign: 'right',
  },
});
