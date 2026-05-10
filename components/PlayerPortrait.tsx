import { Colors, PositionColor } from '@/constants/colors';
import { Fonts } from '@/constants/fonts';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface Props {
  code: string;
  n: number;
  name: string;
  pos: string;
  size?: number;
  owned?: boolean;
}

export function PlayerPortrait({ code, n, name, pos, size = 80, owned = true }: Props) {
  const [imgErr, setImgErr] = useState(false);
  const posColor = PositionColor[pos] ?? Colors.gray400;
  const initials = name
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const uri = `images/${code}/${n}.jpg`;

  if (!imgErr) {
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <Image
          source={{ uri }}
          style={[styles.img, { width: size, height: size, opacity: owned ? 1 : 0.35 }]}
          onError={() => setImgErr(true)}
        />
        {!owned && <View style={[styles.overlay, { borderRadius: size / 2 }]} />}
      </View>
    );
  }

  // Fallback: styled initials
  return (
    <View
      style={[
        styles.container,
        styles.fallback,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: posColor },
      ]}
    >
      <Text style={[styles.initials, { fontSize: size * 0.3 }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  img: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontFamily: Fonts.display,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
});
