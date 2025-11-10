import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackA from './stackA';
import StackB from './stackB';
import StackC from './stackC';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF5722',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        },
        headerStyle: { backgroundColor: '#FF5722' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Tab.Screen
        name="MisListas"
        component={StackA}
        options={{ title: 'Mis Listas' }}
      />
      <Tab.Screen
        name="Calendario"
        component={StackB}
        options={{ title: 'Calendario' }}
      />
      <Tab.Screen
        name="Notificaciones"
        component={StackC}
        options={{ title: 'Notificaciones' }}
      />
      <Tab.Screen
        name="Portapapeles"
        component={StackC}
        options={{ title: 'Portapapeles' }}
      />
    </Tab.Navigator>
  );
}
