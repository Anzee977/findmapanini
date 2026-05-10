import { Colors } from '@/constants/colors';
import { Fonts, FontSizes } from '@/constants/fonts';
import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface Props {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: string;
  style?: ViewStyle;
}

const variantStyles = {
  primary: {
    bg: Colors.red,
    text: '#FFFFFF',
    border: Colors.red,
  },
  secondary: {
    bg: Colors.gold,
    text: Colors.black,
    border: Colors.gold,
  },
  ghost: {
    bg: 'transparent',
    text: Colors.red,
    border: Colors.red,
  },
  danger: {
    bg: 'transparent',
    text: '#FF4757',
    border: '#FF4757',
  },
};

export function FmpButton({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  icon,
  style,
}: Props) {
  const v = variantStyles[variant];
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        {
          backgroundColor: v.bg,
          borderColor: v.border,
          opacity: disabled ? 0.45 : pressed ? 0.82 : 1,
          transform: [{ scale: pressed ? 0.97 : 1 }],
        },
        fullWidth && styles.full,
        style,
      ]}
    >
      <Text style={[styles.label, { color: v.text }]}>
        {icon ? `${icon}  ${label}` : label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  full: {
    width: '100%',
  },
  label: {
    fontFamily: Fonts.display,
    fontSize: FontSizes.md,
    letterSpacing: 1.2,
  },
});
