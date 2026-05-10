import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  colors: [string, string, string];
  height?: number;
  horizontal?: boolean;
}

export function FlagBar({ colors, height = 6, horizontal = true }: Props) {
  if (horizontal) {
    return (
      <View style={[styles.row, { height }]}>
        {colors.map((c, i) => (
          <View key={i} style={[styles.stripe, { backgroundColor: c }]} />
        ))}
      </View>
    );
  }

  return (
    <View style={[styles.col, { width: height }]}>
      {colors.map((c, i) => (
        <View key={i} style={[styles.stripeV, { backgroundColor: c }]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '100%',
    overflow: 'hidden',
  },
  stripe: {
    flex: 1,
  },
  col: {
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
  },
  stripeV: {
    flex: 1,
  },
});
