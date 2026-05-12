import { FmpButton } from '@/components/FmpButton';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ProgressDial } from '@/components/ProgressDial';
import { Colors } from '@/constants/colors';
import { Fonts, FontSizes } from '@/constants/fonts';
import { TOTAL_STICKERS } from '@/constants/data';
import { useI18n } from '@/constants/i18n';
import { useCollection } from '@/hooks/useCollection';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

interface ActionTileProps {
  icon: string; label: string; sub: string; color: string; onPress: () => void;
}

function ActionTile({ icon, label, sub, color, onPress }: ActionTileProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.tile, { borderTopColor: color, opacity: pressed ? 0.8 : 1 }]}
    >
      <Text style={styles.tileIcon}>{icon}</Text>
      <Text style={[styles.tileName, { color }]}>{label}</Text>
      <Text style={styles.tileSub}>{sub}</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const collection = useCollection();
  const { t } = useI18n();
  const progress = collection.getTotalProgress(TOTAL_STICKERS);
  const recent = collection.getRecentlyAdded(8);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.appTitle}>FindMyPanini</Text>
              <Text style={styles.appSub}>{t('homeSubtitle')}</Text>
            </View>
            <View style={styles.heroActions}>
              <LanguageSelector />
              <Pressable onPress={() => router.push('/premium')} style={styles.premiumPill}>
                <Text style={styles.premiumText}>⭐ PRO</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.dialWrap}>
            <ProgressDial
              pct={progress.pct}
              owned={progress.owned}
              total={progress.total}
              size={160}
              label={t('homeStickersLabel')}
            />
          </View>
        </View>

        {/* Action grid */}
        <View style={styles.grid}>
          <ActionTile icon="📷" label={t('homeScan')} sub={t('homeScanSub')} color={Colors.red} onPress={() => router.push('/(tabs)/scan')} />
          <ActionTile icon="📚" label={t('homeAlbum')} sub={t('homeAlbumSub')} color={Colors.sky} onPress={() => router.push('/(tabs)/teams')} />
          <ActionTile icon="⭐" label={t('homeWishlist')} sub={`${collection.getWishlist().length} ${t('homeWishlistSub')}`} color={Colors.gold} onPress={() => router.push('/(tabs)/wishlist')} />
          <ActionTile icon="🔄" label={t('homeDupes')} sub={`${collection.getDupeKeys().length} ${t('homeDupesSub')}`} color={Colors.turf} onPress={() => router.push('/(tabs)/wishlist')} />
        </View>

        {/* Recent additions */}
        {recent.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('homeRecent')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentRow}>
              {recent.map(({ code, n }) => (
                <Pressable
                  key={`${code}-${n}`}
                  onPress={() => router.push(`/card/${code}/${n}`)}
                  style={styles.recentChip}
                >
                  <Text style={styles.recentCode}>{code}</Text>
                  <Text style={styles.recentNum}>#{n}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.ctaRow}>
          <FmpButton label={t('homeScanBtn')} icon="📷" fullWidth onPress={() => router.push('/(tabs)/scan')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.dark },
  scroll: { paddingBottom: 32 },
  hero: { backgroundColor: Colors.dark, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 28 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  heroActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  appTitle: { fontFamily: Fonts.display, fontSize: FontSizes['3xl'], color: '#FFFFFF', letterSpacing: 2 },
  appSub: { fontFamily: Fonts.body, fontSize: FontSizes.sm, color: Colors.gold, marginTop: -4 },
  premiumPill: { backgroundColor: Colors.gold, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6 },
  premiumText: { fontFamily: Fonts.display, fontSize: FontSizes.sm, color: Colors.black, letterSpacing: 0.5 },
  dialWrap: { alignItems: 'center', paddingVertical: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 12, backgroundColor: Colors.cream, borderTopLeftRadius: 20, borderTopRightRadius: 20, gap: 12, justifyContent: 'center' },
  tile: { width: '45%', backgroundColor: Colors.surface, borderRadius: 14, borderTopWidth: 3, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 3 },
  tileIcon: { fontSize: 28, marginBottom: 8 },
  tileName: { fontFamily: Fonts.display, fontSize: FontSizes.lg, letterSpacing: 0.5 },
  tileSub: { fontFamily: Fonts.body, fontSize: FontSizes.xs, color: Colors.gray600, marginTop: 2 },
  section: { paddingHorizontal: 16, paddingTop: 8, backgroundColor: Colors.cream },
  sectionTitle: { fontFamily: Fonts.display, fontSize: FontSizes.sm, color: Colors.gray400, letterSpacing: 2, marginBottom: 10 },
  recentRow: { flexDirection: 'row' },
  recentChip: { backgroundColor: Colors.surface, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, marginRight: 8, alignItems: 'center', borderWidth: 1, borderColor: Colors.gray200 },
  recentCode: { fontFamily: Fonts.display, fontSize: FontSizes.md, color: Colors.red },
  recentNum: { fontFamily: Fonts.mono, fontSize: FontSizes.xs, color: Colors.gray400 },
  ctaRow: { padding: 16, backgroundColor: Colors.cream, marginTop: 4 },
});
