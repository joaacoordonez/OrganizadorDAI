import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
import { useTasks } from '../context/ContextoTarea';

const AgregarTareaScreen = ({ navigation, route }) => {
  const { category: categoriaInicial } = route.params || {};

  const [texto, setTexto] = useState(''); // Texto de la tarea
  const [categoria, setCategoria] = useState(categoriaInicial || 'Examenes'); // Categoría actual
  const [fecha, setFecha] = useState(''); // Fecha seleccionada
  const [calendarioVisible, setCalendarioVisible] = useState(false); // Control del modal del calendario

  const { agregarTarea } = useTasks();

  // Valida y agrega una nueva tarea
  const manejarAgregarTarea = () => {
    if (!texto.trim()) {
      Alert.alert('Error', 'Por favor ingrese el texto de la tarea.');
      return;
    }

    agregarTarea(texto, fecha, categoria);
    Alert.alert('Tarea agregada', 'La tarea ha sido agregada exitosamente.');
    navigation.goBack();
  };

  // Maneja la selección de una fecha del calendario
  const onDayPress = (day) => {
    setFecha(day.dateString);
    setCalendarioVisible(false);
  };

  // la parte de agregar tarea
  return (
    <LinearGradient colors={['#FFF3E0', '#FFEB3B']} style={styles.container}>
      <Text style={styles.title}>Agregar Nueva Tarea</Text>

      {/* Campo de texto para escribir la tarea que quiero */}
      <TextInput
        style={styles.input}
        placeholder="Texto de la tarea"
        value={texto}
        onChangeText={setTexto}
        placeholderTextColor="#666"
      />

      {/* Mostrar la categoria que elegi */}
      <Text style={styles.label}>Categoría: {categoria}</Text>

      {/* Selección de fecha */}
      <Text style={styles.label}>Fecha:</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setCalendarioVisible(true)}
      >
        <Text style={styles.dateButtonText}>
          {fecha ? fecha : 'Seleccionar fecha'}
        </Text>
      </TouchableOpacity>

      {/* Botón para agregar tarea */}
      <TouchableOpacity style={styles.addButton} onPress={manejarAgregarTarea}>
        <LinearGradient
          colors={['#FF5722', '#E64A19']}
          style={styles.addButtonGradient}
        >
          <Text style={styles.addButtonText}>Agregar Tarea</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Modal para el calendario para cuando quiero agregar una tarea */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={calendarioVisible}
        onRequestClose={() => setCalendarioVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccionar Fecha</Text>

            <Calendar
              onDayPress={onDayPress}
              markedDates={
                fecha
                  ? { [fecha]: { selected: true, selectedColor: '#FF5722' } }
                  : {}
              }
              theme={{
                selectedDayBackgroundColor: '#FF5722',
                todayTextColor: '#FF5722',
                arrowColor: '#FF5722',
              }}
            />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setCalendarioVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#E65100',
    textAlign: 'center',
  },

  input: {
    borderColor: '#FF9800',
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    height: 50,
    backgroundColor: '#fff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#E65100',
    fontWeight: 'bold',
  },

  dateButton: {
    backgroundColor: '#fff',
    borderColor: '#FF9800',
    borderWidth: 2,
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  dateButtonText: {
    fontSize: 16,
    color: '#E65100',
  },

  addButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },

  addButtonGradient: {
    padding: 15,
    alignItems: 'center',
  },

  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },

  closeButton: {
    backgroundColor: '#FF5722',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },

  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AgregarTareaScreen;
