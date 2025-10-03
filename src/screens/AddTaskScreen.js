import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTasks } from '../context/TaskContext';

const AddTaskScreen = ({ navigation, route }) => {
  const { category: initialCategory } = route.params || {};
  const [text, setText] = useState('');
  const [category, setCategory] = useState(initialCategory || 'Examenes');
  const [date, setDate] = useState('');
  const { categories, addTask } = useTasks();

  const handleAddTask = () => {
    if (!text.trim()) {
      Alert.alert('Error', 'Por favor ingrese el texto de la tarea.');
      return;
    }
    addTask(text, date, category);
    Alert.alert('Tarea agregada', 'La tarea ha sido agregada exitosamente.');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Nueva Tarea</Text>
      <TextInput
        style={styles.input}
        placeholder="Texto de la tarea"
        value={text}
        onChangeText={setText}
      />
      <Text style={styles.label}>Categoría:</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.picker}
      >
        {categories.map(cat => (
          <Picker.Item key={cat} label={cat} value={cat} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <Button title="Agregar Tarea" onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 12,
    height: 40,
    backgroundColor: '#fff',
  },
  label: { fontSize: 16, marginBottom: 8, color: '#333' },
  picker: { height: 50, width: '100%', marginBottom: 12 },
});

export default AddTaskScreen;
