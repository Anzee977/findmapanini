import { Colors } from '@/constants/colors';
import { Fonts, FontSizes } from '@/constants/fonts';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface Props {
  pct: number;        // 0-1
  owned: number;
  total: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}

export function ProgressDial({
  pct,
  owned,
  total,
  size = 140,
  strokeWidth = 10,
  color = Colors.red,
  label,
}: Props) {
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - Math.min(pct, 1));
  const cx = size / 2;
  const cy = size / 2;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        {/* Track */}
        <Circle
          cx={cx}
          cy={cy}
          r={r}
          stroke={Colors.gray200}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress arc */}
        <Circle
          cx={cx}
          cy={cy}
          r={r}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${cx}, ${cy}`}
        />
      </Svg>

      {/* Center text */}
      <View style={styles.center}>
        <Text style={[styles.pctText, { fontSize: size * 0.18 }]}>
          {Math.round(pct * 100)}%
        </Text>
        <Text style={styles.fraction}>
          {owned}/{total}
        </Text>
        {label && <Text style={styles.label}>{label}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
  },
  pctText: {
    fontFamily: Fonts.display,
    color: Colors.black,
    letterSpacing: 1,
  },
  fraction: {
    fontFamily: Fonts.mono,
    fontSize: FontSizes.xs,
    color: Colors.gray600,
    marginTop: 2,
  },
  label: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.xs,
    color: Colors.gray400,
    marginTop: 2,
  },
});
