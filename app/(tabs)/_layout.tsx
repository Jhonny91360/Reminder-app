import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Text, View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: "Notas",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "document" : "document-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="addNote"
        options={{
          title: "Crear",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "add-sharp" : "add-sharp"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
