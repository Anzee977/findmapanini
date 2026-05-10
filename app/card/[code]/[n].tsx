import { FmpButton } from '@/components/FmpButton';
import { PlayerPortrait } from '@/components/PlayerPortrait';
import { ALL_TEAMS } from '@/constants/data';
import { Colors, PositionColor } from '@/constants/colors';
import { Fonts, FontSizes } from '@/constants/fonts';
import { useCollection } from '@/hooks/useCollection';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function CardDetailScreen() {
  const { code, n: nStr } = useLocalSearchParams<{ code: string; n: string }>();
  const n = parseInt(nStr, 10);
  const router = useRouter();
  const collection = useCollection();
  const [flipped, setFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;

  const team = ALL_TEAMS.find(t => t.code === code);
  const player = team?.players.find(p => p.n === n);
  const posColor = player ? (PositionColor[player.pos] ?? Colors.gray400) : Colors.gray400;
  const owned = collection.isOwned(code, n);
  const dupeCount = collection.getDupeCount(code, n);
  const wished = collection.isWished(code, n);

  const flip = () => {
    const toValue = flipped ? 0 : 1;
    Animated.spring(flipAnim, { toValue, useNativeDriver: true, tension: 80, friction: 10 }).start();
    setFlipped(!flipped);
  };

  const frontInterpolate = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const backInterpolate = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] });

  if (!team || !player) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.error}>Sticker introuvable</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: Colors.dark }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* 3D Card */}
        <Pressable onPress={flip} style={styles.cardWrap}>
          {/* Front */}
          <Animated.View
            style={[
              styles.card,
              { borderTopColor: posColor },
              { backfaceVisibility: 'hidden', transform: [{ rotateY: frontInterpolate }] },
            ]}
          >
            <View style={[styles.cardHeader, { backgroundColor: posColor }]}>
              <Text style={styles.cardPos}>{player.pos}</Text>
              <Text style={styles.cardNum}>#{n}</Text>
            </View>
            <View style={styles.cardBody}>
              <PlayerPortrait code={code} n={n} name={player.name} pos={player.pos} size={120} owned />
              <Text style={styles.playerName}>{player.name}</Text>
              <Text style={styles.playerTeam}>{team.flag} {team.name}</Text>
              {player.club && <Text style={styles.playerClub}>{player.club}</Text>}
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.flipHint}>Appuyer pour retourner →</Text>
            </View>
          </Animated.View>

          {/* Back */}
          <Animated.View
            style={[
              styles.card,
              styles.cardBack,
              { backfaceVisibility: 'hidden', transform: [{ rotateY: backInterpolate }] },
            ]}
          >
            <View style={styles.holoOverlay} />
            <View style={styles.cardBody}>
              <Text style={styles.cardBackTitle}>PANINI</Text>
              <Text style={styles.cardBackSub}>CDM 2026</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Text style={styles.statVal}>{n}</Text>
                  <Text style={styles.statLbl}>N° STICKER</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statVal}>{team.code}</Text>
                  <Text style={styles.statLbl}>ÉQUIPE</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statVal}>{player.pos}</Text>
                  <Text style={styles.statLbl}>POSTE</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statVal}>{dupeCount}</Text>
                  <Text style={styles.statLbl}>DOUBLONS</Text>
                </View>
              </View>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.flipHint}>← Retourner</Text>
            </View>
          </Animated.View>
        </Pressable>

        {/* Status */}
        <View style={styles.statusRow}>
          <View style={[styles.statusBadge, { backgroundColor: owned ? Colors.turf : Colors.gray200 }]}>
            <Text style={[styles.statusText, { color: owned ? '#FFFFFF' : Colors.gray400 }]}>
              {owned ? '✓ Collé' : '○ Manquant'}
            </Text>
          </View>
          {wished && (
            <View style={[styles.statusBadge, { backgroundColor: Colors.gold }]}>
              <Text style={[styles.statusText, { color: Colors.black }]}>★ Wishlist</Text>
            </View>
          )}
          {dupeCount > 0 && (
            <View style={[styles.statusBadge, { backgroundColor: Colors.red }]}>
              <Text style={[styles.statusText, { color: '#FFFFFF' }]}>×{dupeCount} Doublons</Text>
            </View>
          )}
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <FmpButton
            label={owned ? 'Retirer' : 'Coller !'}
            variant={owned ? 'ghost' : 'primary'}
            icon={owned ? '✕' : '✓'}
            fullWidth
            onPress={() => collection.toggleOwned(code, n)}
          />
          <View style={styles.actionsRow}>
            <FmpButton
              label={wished ? 'Retirer liste' : 'Wishlist'}
              variant="ghost"
              icon="⭐"
              style={styles.halfBtn}
              onPress={() => collection.toggleWish(code, n)}
            />
            {owned && (
              <FmpButton
                label={`+1 Doublon`}
                variant="secondary"
                icon="🔄"
                style={styles.halfBtn}
                onPress={() => collection.addDupe(code, n)}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const CARD_W = 280;
const CARD_H = 380;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scroll: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 40,
    gap: 20,
  },
  cardWrap: {
    width: CARD_W,
    height: CARD_H,
  },
  card: {
    position: 'absolute',
    width: CARD_W,
    height: CARD_H,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderTopWidth: 6,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 12,
  },
  cardBack: {
    backgroundColor: Colors.dark,
    borderTopColor: Colors.gold,
  },
  holoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,215,0,0.04)',
    borderRadius: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  cardPos: {
    fontFamily: Fonts.display,
    fontSize: FontSizes.xl,
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  cardNum: {
    fontFamily: Fonts.mono,
    fontSize: FontSizes.base,
    color: 'rgba(255,255,255,0.7)',
  },
  cardBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 20,
  },
  playerName: {
    fontFamily: Fonts.display,
    fontSize: FontSizes['2xl'],
    color: Colors.black,
    textAlign: 'center',
    letterSpacing: 1,
  },
  playerTeam: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.sm,
    color: Colors.gray600,
    fontWeight: '600',
  },
  playerClub: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.xs,
    color: Colors.gray400,
  },
  cardFooter: {
    alignItems: 'center',
    paddingBottom: 14,
  },
  flipHint: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.xs,
    color: Colors.gray400,
    fontStyle: 'italic',
  },
  cardBackTitle: {
    fontFamily: Fonts.display,
    fontSize: FontSizes['3xl'],
    color: Colors.gold,
    letterSpacing: 4,
  },
  cardBackSub: {
    fontFamily: Fonts.mono,
    fontSize: FontSizes.sm,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
    marginTop: 16,
  },
  statItem: {
    width: 90,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    paddingVertical: 12,
    gap: 4,
  },
  statVal: {
    fontFamily: Fonts.display,
    fontSize: FontSizes.xl,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  statLbl: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 1,
  },
  statusRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  statusBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  actions: {
    width: '100%',
    paddingHorizontal: 20,
    gap: 10,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  halfBtn: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    fontFamily: Fonts.body,
    color: Colors.gray600,
  },
});
