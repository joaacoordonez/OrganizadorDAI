import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MisListasScreen from '../src/screens/MisListasScreen';
import CategoriaTareasScreen from '../src/screens/CategoriaTareasScreen';
import AgregarTareaScreen from '../src/screens/AgregarTareaScreen';

const Stack = createNativeStackNavigator();

export default function StackA() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#FF5722' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="MisListas" component={MisListasScreen} options={{ title: 'Mis Listas' }} />
      <Stack.Screen name="CategoriaTareasScreen" component={CategoriaTareasScreen} options={{ title: 'Tareas' }} />
      <Stack.Screen name="AgregarTarea" component={AgregarTareaScreen} options={{ title: 'Agregar Tarea' }} />
    </Stack.Navigator>
  );
}
