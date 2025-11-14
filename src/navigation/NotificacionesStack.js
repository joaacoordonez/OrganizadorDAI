import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificacionesScreen from '../screens/NotificationesScreen';

const Stack = createNativeStackNavigator();

export default function NotificacionesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Notificaciones" component={NotificacionesScreen} />
    </Stack.Navigator>
  );
}