import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/fonts';
import { I18nProvider, useI18n } from '@/constants/i18n';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { t } = useI18n();
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.dark },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontFamily: Fonts.display, fontSize: 22 },
        contentStyle: { backgroundColor: Colors.cream },
        animation: Platform.OS === 'ios' ? 'default' : 'fade_from_bottom',
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="album/[code]" options={{ title: t('tabAlbum'), headerBackTitle: '' }} />
      <Stack.Screen name="card/[code]/[n]" options={{ title: '', headerTransparent: true, headerBackTitle: '' }} />
      <Stack.Screen
        name="scan-result"
        options={{ title: t('resultTitle'), presentation: 'modal', headerStyle: { backgroundColor: Colors.dark } }}
      />
      <Stack.Screen
        name="premium"
        options={{ title: 'FMP Premium', presentation: 'modal', headerStyle: { backgroundColor: Colors.dark } }}
      />
      <Stack.Screen name="special" options={{ title: t('specialTitle'), headerBackTitle: '' }} />
      <Stack.Screen name="special/[code]" options={{ title: '', headerBackTitle: '' }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    [Fonts.display]: require('../assets/fonts/BebasNeue-Regular.ttf'),
    [Fonts.body]: require('../assets/fonts/SpaceGrotesk-Variable.ttf'),
    [Fonts.mono]: require('../assets/fonts/JetBrainsMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <I18nProvider>
      <StatusBar style="light" />
      <RootLayoutNav />
    </I18nProvider>
  );
}
