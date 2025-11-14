import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarioScreen from '../screens/CalendarioScreen';

const Stack = createNativeStackNavigator();

export default function CalendarioStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Calendario" component={CalendarioScreen} />
    </Stack.Navigator>
  );
}