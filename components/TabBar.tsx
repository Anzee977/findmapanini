import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/fonts';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const TAB_ICONS: Record<string, string> = {
  index: '⚽',
  teams: '🏆',
  scan: '📷',
  wishlist: '⭐',
};

const TAB_LABELS: Record<string, string> = {
  index: 'Home',
  teams: 'Album',
  scan: 'Scanner',
  wishlist: 'Liste',
};

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.bar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const isScan = route.name === 'scan';

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={[styles.tab, isScan && styles.scanTab]}
          >
            {isScan ? (
              <View style={styles.scanButton}>
                <Text style={styles.scanIcon}>📷</Text>
              </View>
            ) : (
              <>
                <Text style={[styles.icon, isFocused && styles.iconActive]}>
                  {TAB_ICONS[route.name] ?? '•'}
                </Text>
                <Text style={[styles.label, isFocused && styles.labelActive]}>
                  {options.title ?? TAB_LABELS[route.name] ?? route.name}
                </Text>
                {isFocused && <View style={styles.dot} />}
              </>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
    paddingBottom: 24,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 12,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
    position: 'relative',
    paddingTop: 4,
  },
  scanTab: {
    justifyContent: 'center',
  },
  scanButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
    shadowColor: Colors.red,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 8,
  },
  scanIcon: {
    fontSize: 22,
  },
  icon: {
    fontSize: 20,
    opacity: 0.4,
  },
  iconActive: {
    opacity: 1,
  },
  label: {
    fontFamily: Fonts.body,
    fontSize: 10,
    color: Colors.gray400,
    fontWeight: '500',
  },
  labelActive: {
    color: Colors.red,
    fontWeight: '700',
  },
  dot: {
    position: 'absolute',
    bottom: -2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.red,
  },
});
