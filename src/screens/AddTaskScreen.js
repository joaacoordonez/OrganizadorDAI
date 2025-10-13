import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
import { useTasks } from '../context/TaskContext';

const AddTaskScreen = ({ navigation, route }) => {
  const { category: initialCategory } = route.params || {};
  const [text, setText] = useState('');
  const [category, setCategory] = useState(initialCategory || 'Examenes');
  const [date, setDate] = useState('');
  const [calendarVisible, setCalendarVisible] = useState(false);
  const { addTask } = useTasks();

  const handleAddTask = () => {
    if (!text.trim()) {
      Alert.alert('Error', 'Por favor ingrese el texto de la tarea.');
      return;
    }
    addTask(text, date, category);
    Alert.alert('Tarea agregada', 'La tarea ha sido agregada exitosamente.');
    navigation.goBack();
  };

  const onDayPress = (day) => {
    setDate(day.dateString);
    setCalendarVisible(false);
  };

  return (
    <LinearGradient colors={['#FFF3E0', '#FFEB3B']} style={styles.container}>
      <Text style={styles.title}>Agregar Nueva Tarea</Text>
      <TextInput
        style={styles.input}
        placeholder="Texto de la tarea"
        value={text}
        onChangeText={setText}
        placeholderTextColor="#666"
      />
      <Text style={styles.label}>Categoría: {category}</Text>
      <Text style={styles.label}>Fecha:</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setCalendarVisible(true)}>
        <Text style={styles.dateButtonText}>
          {date ? date : 'Seleccionar fecha'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <LinearGradient colors={['#FF5722', '#E64A19']} style={styles.addButtonGradient}>
          <Text style={styles.addButtonText}>Agregar Tarea</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={calendarVisible}
        onRequestClose={() => setCalendarVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccionar Fecha</Text>
            <Calendar
              onDayPress={onDayPress}
              markedDates={date ? { [date]: { selected: true, selectedColor: '#FF5722' } } : {}}
              theme={{
                selectedDayBackgroundColor: '#FF5722',
                todayTextColor: '#FF5722',
                arrowColor: '#FF5722',
              }}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setCalendarVisible(false)}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#E65100', textAlign: 'center' },
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
  label: { fontSize: 18, marginBottom: 8, color: '#E65100', fontWeight: 'bold' },

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
  dateButtonText: { fontSize: 16, color: '#E65100' },
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
  addButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
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
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#333', textAlign: 'center' },
  closeButton: {
    backgroundColor: '#FF5722',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  closeButtonText: { color: '#fff', fontWeight: 'bold' },
});

export default AddTaskScreen;
