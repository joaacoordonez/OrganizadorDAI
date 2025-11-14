import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PortapapelesScreen from '../screens/PortapapelesScreen';

const Stack = createNativeStackNavigator();

export default function PortapapelesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Portapapeles" component={PortapapelesScreen} />
    </Stack.Navigator>
  );
}