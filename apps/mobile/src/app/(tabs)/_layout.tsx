import { FontAwesome6 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { Colors, FontFamily } from '@/theme/tokens';

// Structure de navigation principale (v1) : Carte / Créer / Messages / Profil.
// L'onglet « Fil » (swipe events + sessions) est prévu en Phase 2.
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: Colors.surfaceCard, borderTopColor: Colors.border, borderTopWidth: 0.5 },
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: { fontSize: 11, fontFamily: FontFamily.medium },
      }}
    >
      <Tabs.Screen
        name="map"
        options={{ title: 'Carte', tabBarIcon: ({ color, size }) => <FontAwesome6 name="map" size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="create"
        options={{ title: 'Créer', tabBarIcon: ({ color, size }) => <FontAwesome6 name="plus" size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="messages"
        options={{ title: 'Messages', tabBarIcon: ({ color, size }) => <FontAwesome6 name="message" size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profil', tabBarIcon: ({ color, size }) => <FontAwesome6 name="user" size={size} color={color} /> }}
      />
    </Tabs>
  );
}
