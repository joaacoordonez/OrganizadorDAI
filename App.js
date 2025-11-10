import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { TaskProvider } from './src/context/ContextoTarea';
import TabNavigator from './navigation/tab';

export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <TabNavigator />
      </NavigationContainer>
    </TaskProvider>
  );
}
