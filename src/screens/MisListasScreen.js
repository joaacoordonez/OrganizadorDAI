import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useTasks } from '../context/TaskContext';

const MisListasScreen = ({ navigation }) => {
  const { categories, getTasksByCategory } = useTasks();

  const renderCategory = ({ item }) => {
    const tasks = getTasksByCategory(item);
    return (
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() => navigation.navigate('CategoryTasks', { category: item })}
      >
        <Text style={styles.categoryTitle}>{item}</Text>
        <Text style={styles.taskCount}>{tasks.length} tareas</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Listas</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={renderCategory}
        ListEmptyComponent={<Text>No hay categorías</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  categoryItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryTitle: { fontSize: 18, fontWeight: 'bold', color: '#00adf5' },
  taskCount: { fontSize: 14, color: '#666', marginTop: 4 },
});

export default MisListasScreen;
