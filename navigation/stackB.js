import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarioScreen from '../src/screens/CalendarioScreen';

const Stack = createNativeStackNavigator();

export default function StackB() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#FF5722' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Calendario" component={CalendarioScreen} options={{ title: 'Calendario' }} />
    </Stack.Navigator>
  );
}
