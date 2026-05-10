import { Colors, PositionColor } from '@/constants/colors';
import { Fonts, FontSizes } from '@/constants/fonts';
import { PlayerPortrait } from '@/components/PlayerPortrait';
import type { Player } from '@/constants/data';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type CardState = 'owned' | 'missing' | 'dupe' | 'wished';

interface Props {
  teamCode: string;
  player: Player;
  state: CardState;
  dupeCount?: number;
  onPress?: () => void;
}

export function StickerCard({ teamCode, player, state, dupeCount = 0, onPress }: Props) {
  const posColor = PositionColor[player.pos] ?? Colors.gray400;
  const isOwned = state === 'owned' || state === 'dupe';
  const isMissing = state === 'missing';
  const isDupe = state === 'dupe';
  const isWished = state === 'wished';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      {/* Position color bar */}
      <View style={[styles.posBar, { backgroundColor: posColor }]} />

      {/* Portrait */}
      <View style={styles.portraitWrap}>
        <PlayerPortrait
          code={teamCode}
          n={player.n}
          name={player.name}
          pos={player.pos}
          size={72}
          owned={isOwned}
        />
        {isMissing && <View style={styles.missingOverlay} />}
        {isWished && (
          <View style={styles.wishBadge}>
            <Text style={styles.wishIcon}>★</Text>
          </View>
        )}
      </View>

      {/* Number + name */}
      <View style={styles.info}>
        <Text style={[styles.number, { color: posColor }]}>#{player.n}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {player.name.split(' ').pop()}
        </Text>
        <Text style={styles.pos}>{player.pos}</Text>
      </View>

      {/* Dupe badge */}
      {isDupe && dupeCount > 0 && (
        <View style={styles.dupeBadge}>
          <Text style={styles.dupeText}>×{dupeCount + 1}</Text>
        </View>
      )}

      {/* Missing ghost pattern */}
      {isMissing && (
        <View style={styles.ghostLines}>
          {[0, 1, 2].map(i => (
            <View key={i} style={styles.ghostLine} />
          ))}
        </View>
      )}
    </Pressable>
  );
}

const CARD_W = 108;
const CARD_H = 148;

const styles = StyleSheet.create({
  card: {
    width: CARD_W,
    height: CARD_H,
    backgroundColor: Colors.surface,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
    margin: 6,
  },
  cardPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.9,
  },
  posBar: {
    height: 4,
    width: '100%',
  },
  portraitWrap: {
    alignItems: 'center',
    marginTop: 8,
    position: 'relative',
  },
  missingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(245,240,232,0.7)',
  },
  wishBadge: {
    position: 'absolute',
    top: 0,
    right: 4,
    backgroundColor: Colors.gold,
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wishIcon: {
    fontSize: 8,
    color: Colors.black,
  },
  info: {
    paddingHorizontal: 6,
    paddingTop: 4,
    flex: 1,
  },
  number: {
    fontFamily: Fonts.mono,
    fontSize: FontSizes.xs,
    fontWeight: '700',
  },
  name: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.xs,
    color: Colors.black,
    fontWeight: '600',
    marginTop: 1,
    lineHeight: 13,
  },
  pos: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    color: Colors.gray400,
    marginTop: 2,
  },
  dupeBadge: {
    position: 'absolute',
    top: 8,
    left: 6,
    backgroundColor: Colors.red,
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  dupeText: {
    fontFamily: Fonts.display,
    fontSize: FontSizes.xs,
    color: '#FFFFFF',
  },
  ghostLines: {
    position: 'absolute',
    bottom: 8,
    left: 6,
    right: 6,
    gap: 3,
  },
  ghostLine: {
    height: 3,
    backgroundColor: Colors.gray200,
    borderRadius: 2,
  },
});
