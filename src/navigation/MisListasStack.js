import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MisListasScreen from '../screens/MisListasScreen';
import CategoriaTareasScreen from '../screens/CategoriaTareasScreen';
import AgregarTareaScreen from '../screens/AgregarTareaScreen';
import ListaDeTareas from '../screens/ListaDeTareas';

const Stack = createNativeStackNavigator();

export default function MisListasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MisListas" component={MisListasScreen} />
      <Stack.Screen name="CategoriaTareas" component={CategoriaTareasScreen} />
      <Stack.Screen name="AgregarTarea" component={AgregarTareaScreen} />
      <Stack.Screen name="ListaDeTareas" component={ListaDeTareas} />
    </Stack.Navigator>
  );
}
