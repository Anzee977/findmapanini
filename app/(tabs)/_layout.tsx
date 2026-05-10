import { TabBar } from '@/components/TabBar';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={props => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="teams" options={{ title: 'Album' }} />
      <Tabs.Screen name="scan" options={{ title: 'Scanner' }} />
      <Tabs.Screen name="wishlist" options={{ title: 'Liste' }} />
    </Tabs>
  );
}
