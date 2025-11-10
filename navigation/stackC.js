import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationsScreen from '../src/screens/NotificationesScreen';
import PortapapelesScreen from '../src/screens/PortapapelesScreen';

const Stack = createNativeStackNavigator();

export default function StackC() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#FF5722' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Notificaciones" component={NotificationsScreen} options={{ title: 'Notificaciones' }} />
      <Stack.Screen name="Portapapeles" component={PortapapelesScreen} options={{ title: 'Portapapeles' }} />
    </Stack.Navigator>
  );
}
