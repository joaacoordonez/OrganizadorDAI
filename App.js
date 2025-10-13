import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { TaskProvider } from './src/context/TaskContext';
import MisListasScreen from './src/screens/MisListasScreen';
import CategoryTasksScreen from './src/screens/CategoryTasksScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import ClipboardScreen from './src/screens/ClipboardScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MisListasStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#FF5722' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen name="MisListas" component={MisListasScreen} options={{ title: 'Mis Listas' }} />
    <Stack.Screen name="CategoryTasks" component={CategoryTasksScreen} options={{ title: 'Tareas' }} />
    <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Agregar Tarea' }} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
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
            component={MisListasStack}
            options={{ title: 'Mis Listas' }}
          />
          <Tab.Screen
            name="Calendario"
            component={CalendarScreen}
            options={{ title: 'Calendario' }}
          />
          <Tab.Screen
            name="Notificaciones"
            component={NotificationsScreen}
            options={{ title: 'Notificaciones' }}
          />
          <Tab.Screen
            name="Portapapeles"
            component={ClipboardScreen}
            options={{ title: 'Portapapeles' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}
