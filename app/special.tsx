import { SPECIAL_SECTIONS, TOTAL_SPECIAL_STICKERS } from '@/constants/data';
import { Colors } from '@/constants/colors';
import { Fonts, FontSizes } from '@/constants/fonts';
import { useCollection } from '@/hooks/useCollection';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const SECTION_ICONS: Record<string, string> = {
  FWC: '🏆',
  CCUS: '🥤',
  CCLAM: '🥤',
  CCSRB: '🥤',
  CCESP: '🥤',
  EXTRA: '✨',
};

export default function SpecialScreen() {
  const router = useRouter();
  const collection = useCollection();

  const totalOwned = SPECIAL_SECTIONS.reduce((sum, s) => {
    return sum + collection.getTeamProgress(s.code, s.stickers.length).owned;
  }, 0);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>SECTIONS SPÉCIALES</Text>
        <Text style={styles.sub}>
          {totalOwned}/{TOTAL_SPECIAL_STICKERS} stickers · Tous foil
        </Text>
      </View>

      <FlatList
        data={SPECIAL_SECTIONS}
        keyExtractor={s => s.code}
        contentContainerStyle={styles.list}
        renderItem={({ item: section }) => {
          const progress = collection.getTeamProgress(section.code, section.stickers.length);
          const pct = progress.total > 0 ? progress.owned / progress.total : 0;
          return (
            <Pressable
              onPress={() => router.push(`/special/${section.code}`)}
              style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            >
              <View style={styles.cardLeft}>
                <Text style={styles.cardIcon}>{SECTION_ICONS[section.code] ?? '⭐'}</Text>
                <View style={styles.cardText}>
                  <Text style={styles.cardCode}>{section.code}</Text>
                  <Text style={styles.cardName} numberOfLines={1}>{section.name}</Text>
                </View>
              </View>
              <View style={styles.cardRight}>
                <Text style={styles.cardProgress}>
                  {progress.owned}/{progress.total}
                </Text>
                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${Math.round(pct * 100)}%` as `${number}%`,
                        backgroundColor: pct === 1 ? Colors.turf : Colors.gold },
                    ]}
                  />
                </View>
              </View>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.dark },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,215,0,0.2)',
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: FontSizes['2xl'],
    color: Colors.gold,
    letterSpacing: 1,
  },
  sub: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.sm,
    color: Colors.gray400,
    marginTop: 2,
  },
  list: { padding: 16, gap: 12 },
  card: {
    backgroundColor: 'rgba(255,215,0,0.08)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.25)',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardPressed: { opacity: 0.75, transform: [{ scale: 0.98 }] },
  cardLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  cardIcon: { fontSize: 32 },
  cardText: { flex: 1 },
  cardCode: {
    fontFamily: Fonts.mono,
    fontSize: FontSizes.xs,
    color: Colors.gold,
    fontWeight: '700',
    letterSpacing: 1,
  },
  cardName: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.base,
    color: '#FFFFFF',
    fontWeight: '600',
    marginTop: 2,
  },
  cardRight: { alignItems: 'flex-end', gap: 6, minWidth: 64 },
  cardProgress: {
    fontFamily: Fonts.mono,
    fontSize: FontSizes.sm,
    color: Colors.gold,
    fontWeight: '700',
  },
  progressTrack: {
    width: 64,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 2 },
});
