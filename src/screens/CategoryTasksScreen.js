import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';
import { useTasks } from '../context/TaskContext';

const CategoryTasksScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const { getTasksByCategory, deleteTask } = useTasks();

  const tasks = getTasksByCategory(category);

  const confirmDelete = (id) => {
    Alert.alert(
      'Eliminar tarea',
      '¿Está seguro que desea eliminar esta tarea?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => deleteTask(id) },
      ]
    );
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <View style={styles.taskContent}>
        <Text style={styles.taskText}>{item.text}</Text>
        <Text style={styles.taskDate}>{item.date || 'Sin fecha'}</Text>
      </View>
      <TouchableOpacity onPress={() => confirmDelete(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Agregar Tarea" onPress={() => navigation.navigate('AddTask', { category })} />
      <Text style={styles.title}>{category}</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay tareas en esta categoría</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12, color: '#333' },
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
  taskContent: { flex: 1 },
  taskText: { fontSize: 16, color: '#333' },
  taskDate: { fontSize: 12, color: '#666', marginTop: 4 },
  deleteButton: { backgroundColor: '#ff4d4d', borderRadius: 4, paddingHorizontal: 8, justifyContent: 'center' },
  deleteButtonText: { color: 'white', fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#999' },
});

export default CategoryTasksScreen;
