import { TabBar } from '@/components/TabBar';
import { useI18n } from '@/constants/i18n';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabsLayout() {
  const { t } = useI18n();
  return (
    <Tabs
      tabBar={props => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index"    options={{ title: t('tabHome') }} />
      <Tabs.Screen name="teams"    options={{ title: t('tabAlbum') }} />
      <Tabs.Screen name="scan"     options={{ title: t('tabScan') }} />
      <Tabs.Screen name="wishlist" options={{ title: t('tabList') }} />
    </Tabs>
  );
}
