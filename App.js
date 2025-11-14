import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';
import { TaskProvider } from './src/context/ContextoTarea';

export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </TaskProvider>
  );
}
