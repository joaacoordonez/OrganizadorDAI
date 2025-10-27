import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const ListaDeTareas = () => {
  // Estado para almacenar las tareas
  const [tasks, setTasks] = useState([]);

  // Estado para almacenar cual es la tarea
  const [input, setInput] = useState('');

  //agregar tarea
  const addTask = () => {
    // Si el input está vacío, no se agrega la tarea
    if (input.trim() === '') return;

    // agregar tarea al estado
    setTasks(prevTasks => [
      ...prevTasks, 
      { id: Date.now().toString(), text: input } //date now para el id unico
    ]);

    
    setInput('');
  };

  // elimiar tarea
  const deleteTask = (id) => {
    // filtrar y eliminar el id que quiero
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  // Renderiza cada tarea de la lista
  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item.text}</Text>
      <TouchableOpacity 
        onPress={() => deleteTask(item.id)} 
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tareas</Text>
      
     
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Agregar nueva tarea"
          value={input}
          onChangeText={setInput} // Actualiza el estado del input
        />
        <Button title="Agregar" onPress={addTask} /> 
      </View>

      {/* Lista de tareas */}
      <FlatList
        data={tasks} 
        keyExtractor={item => item.id} 
        renderItem={renderItem} 
        ListEmptyComponent={<Text style={styles.emptyText}>No hay tareas aún</Text>} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#f5f5f5' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 12, 
    color: '#333' 
  },
  inputRow: { 
    flexDirection: 'row', 
    marginBottom: 12 
  },
  input: { 
    flex: 1, 
    borderColor: '#ccc', 
    borderWidth: 1, 
    borderRadius: 4, 
    paddingHorizontal: 8, 
    backgroundColor: '#fff' 
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskText: { 
    fontSize: 16, 
    color: '#333' 
  },
  deleteButton: { 
    backgroundColor: '#ff4d4d', 
    borderRadius: 4, 
    paddingHorizontal: 8, 
    justifyContent: 'center' 
  },
  deleteButtonText: { 
    color: 'white', 
    fontWeight: 'bold' 
  },
  emptyText: { 
    textAlign: 'center', 
    marginTop: 20, 
    color: '#999' 
  },
});

export default ListaDeTareas;
