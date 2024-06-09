import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Text, View, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const TabLayout = () => {
  const { colors } = useTheme();

  const tabIcons = {
    Inicio: {
      focused: 'home',
      unfocused: 'home-outline',
    },
    Notas: {
      focused: 'document',
      unfocused: 'document-outline',
    },
    Crear: {
      focused: 'add-circle',
      unfocused: 'add-circle-outline',
    },
  };

  const renderTabBarIcon = (name, focused, color) => {
    const { focused: focusedIcon, unfocused: unfocusedIcon } = tabIcons[name];
    const iconName = focused ? focusedIcon : unfocusedIcon;
    return <Ionicons name={iconName} size={24} color={color} />;
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.text,
        labelStyle: styles.labelStyle,
        style: styles.tabBarStyle,
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={InicioScreen}
        options={{
          tabBarIcon: ({ focused, color }) => renderTabBarIcon('Inicio', focused, color),
        }}
      />
      <Tab.Screen
        name="Notas"
        component={NotasScreen}
        options={{
          tabBarIcon: ({ focused, color }) => renderTabBarIcon('Notas', focused, color),
        }}
      />
      <Tab.Screen
        name="Crear"
        component={CrearScreen}
        options={{
          tabBarIcon: ({ focused, color }) => renderTabBarIcon('Crear', focused, color),
        }}
      />
    </Tab.Navigator>
  );
};

const InicioScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenText}>Inicio Screen</Text>
    </View>
  );
};

const NotasScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenText}>Notas Screen</Text>
    </View>
  );
};

const CrearScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenText}>Crear Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
    paddingTop: 5,
  },
  labelStyle: {
    fontSize: 12,
    marginBottom: 3,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  screenText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default TabLayout;

