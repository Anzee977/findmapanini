import { FmpButton } from '@/components/FmpButton';
import { PlayerPortrait } from '@/components/PlayerPortrait';
import { ALL_TEAMS } from '@/constants/data';
import { Colors, PositionColor } from '@/constants/colors';
import { Fonts, FontSizes } from '@/constants/fonts';
import { useI18n } from '@/constants/i18n';
import { useCollection } from '@/hooks/useCollection';
import { haptic } from '@/hooks/useHaptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function ScanResultScreen() {
  const { code, n: nStr } = useLocalSearchParams<{ code: string; n: string }>();
  const n = parseInt(nStr, 10);
  const router = useRouter();
  const collection = useCollection();
  const { t } = useI18n();
  const [mode, setMode] = useState<'anim' | 'summary'>('summary');

  const team = ALL_TEAMS.find(tm => tm.code === code);
  const player = team?.players.find(p => p.n === n);
  const owned = collection.isOwned(code, n);
  const posColor = player ? (PositionColor[player.pos] ?? Colors.gray400) : Colors.red;

  const handleStick = async () => {
    await collection.toggleOwned(code, n);
    await haptic.scanSuccess();
    router.back();
  };

  if (!team || !player) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.errorIcon}>🔍</Text>
          <Text style={styles.errorTitle}>{t('resultNotFound')}</Text>
          <Text style={styles.errorSub}>Code: {code} #{n}</Text>
          <FmpButton label={t('resultBack')} onPress={() => router.back()} variant="ghost" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.toggleRow}>
        <Pressable onPress={() => setMode('summary')} style={[styles.toggleBtn, mode === 'summary' && styles.toggleActive]}>
          <Text style={[styles.toggleText, mode === 'summary' && styles.toggleTextActive]}>{t('resultSummary')}</Text>
        </Pressable>
        <Pressable onPress={() => setMode('anim')} style={[styles.toggleBtn, mode === 'anim' && styles.toggleActive]}>
          <Text style={[styles.toggleText, mode === 'anim' && styles.toggleTextActive]}>{t('result3d')}</Text>
        </Pressable>
      </View>

      {mode === 'summary' ? (
        <View style={styles.summary}>
          <View style={[styles.resultCard, { borderTopColor: posColor }]}>
            <View style={[styles.resultHeader, { backgroundColor: posColor }]}>
              <Text style={styles.resultPos}>{player.pos}</Text>
              <Text style={styles.resultNum}>#{n}</Text>
            </View>
            <View style={styles.resultBody}>
              <PlayerPortrait code={code} n={n} name={player.name} pos={player.pos} size={100} owned />
              <Text style={styles.resultName}>{player.name}</Text>
              <Text style={styles.resultTeam}>{team.flag} {team.name}</Text>
              {player.alias && <Text style={styles.resultClub}>{player.alias}</Text>}
            </View>
          </View>
          {owned && (
            <View style={styles.alreadyBanner}>
              <Text style={styles.alreadyText}>{t('resultAlready')}</Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.animWrap}>
          <Text style={styles.animPlaceholder}>✨</Text>
          <Text style={styles.animSub}>{t('result3dSub')}</Text>
        </View>
      )}

      <View style={styles.actions}>
        <FmpButton
          label={owned ? t('resultAddDupe') : t('resultStick')}
          icon={owned ? '🔄' : '✓'}
          variant={owned ? 'secondary' : 'primary'}
          fullWidth
          onPress={owned ? () => { collection.addDupe(code, n); haptic.cardStick(); router.back(); } : handleStick}
        />
        <FmpButton label={t('resultNewScan')} variant="ghost" icon="📷" fullWidth onPress={() => router.replace('/(tabs)/scan')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.dark, gap: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 16 },
  errorIcon: { fontSize: 48 },
  errorTitle: { fontFamily: Fonts.display, fontSize: FontSizes['2xl'], color: '#FFFFFF', textAlign: 'center' },
  errorSub: { fontFamily: Fonts.mono, fontSize: FontSizes.sm, color: Colors.gray400 },
  toggleRow: { flexDirection: 'row', margin: 20, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: 4 },
  toggleBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  toggleActive: { backgroundColor: Colors.red },
  toggleText: { fontFamily: Fonts.body, fontSize: FontSizes.sm, color: 'rgba(255,255,255,0.5)', fontWeight: '600' },
  toggleTextActive: { color: '#FFFFFF' },
  summary: { flex: 1, alignItems: 'center', paddingHorizontal: 20, gap: 16 },
  resultCard: { width: 240, backgroundColor: Colors.surface, borderRadius: 16, borderTopWidth: 6, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.4, shadowRadius: 20, elevation: 12 },
  resultHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 10 },
  resultPos: { fontFamily: Fonts.display, fontSize: FontSizes.xl, color: '#FFFFFF', letterSpacing: 2 },
  resultNum: { fontFamily: Fonts.mono, fontSize: FontSizes.base, color: 'rgba(255,255,255,0.7)' },
  resultBody: { alignItems: 'center', padding: 20, gap: 8 },
  resultName: { fontFamily: Fonts.display, fontSize: FontSizes.xl, color: Colors.black, textAlign: 'center', letterSpacing: 1 },
  resultTeam: { fontFamily: Fonts.body, fontSize: FontSizes.sm, color: Colors.gray600, fontWeight: '600' },
  resultClub: { fontFamily: Fonts.body, fontSize: FontSizes.xs, color: Colors.gray400 },
  alreadyBanner: { backgroundColor: 'rgba(255,215,0,0.15)', borderRadius: 10, paddingHorizontal: 16, paddingVertical: 10, borderWidth: 1, borderColor: 'rgba(255,215,0,0.3)', width: '100%' },
  alreadyText: { fontFamily: Fonts.body, fontSize: FontSizes.sm, color: Colors.gold, textAlign: 'center' },
  animWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  animPlaceholder: { fontSize: 48 },
  animSub: { fontFamily: Fonts.body, fontSize: FontSizes.base, color: 'rgba(255,255,255,0.5)' },
  actions: { padding: 20, gap: 10 },
});
