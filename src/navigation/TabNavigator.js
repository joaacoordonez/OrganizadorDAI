import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MisListasStack from './MisListasStack';
import CalendarioStack from './CalendarioStack';
import NotificacionesStack from './NotificacionesStack';
import PortapapelesStack from './PortapapelesStack';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="MisListasTab" component={MisListasStack} options={{ title: 'Listas' }} />
      <Tab.Screen name="CalendarioTab" component={CalendarioStack} options={{ title: 'Calendario' }} />
      <Tab.Screen name="NotificacionesTab" component={NotificacionesStack} options={{ title: 'Notificaciones' }} />
      <Tab.Screen name="PortapapelesTab" component={PortapapelesStack} options={{ title: 'Portapapeles' }} />
    </Tab.Navigator>
  );
}