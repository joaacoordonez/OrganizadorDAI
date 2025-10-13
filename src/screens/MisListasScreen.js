import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert, Modal, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTasks } from '../context/TaskContext';

const MisListasScreen = ({ navigation }) => {
  const { categories, getTasksByCategory, addCategory } = useTasks();
  const [modalVisible, setModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const renderCategory = ({ item }) => {
    const tasks = getTasksByCategory(item);
    return (
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() => navigation.navigate('CategoryTasks', { category: item })}
      >
        <LinearGradient
          colors={['#4CAF50', '#45a049']}
          style={styles.categoryGradient}
        >
          <Text style={styles.categoryTitle}>{item}</Text>
          <Text style={styles.taskCount}>{tasks.length} tareas</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      Alert.alert('Error', 'Por favor ingrese el nombre de la categoría.');
      return;
    }
    addCategory(newCategory.trim());
    setNewCategory('');
    setModalVisible(false);
    Alert.alert('Categoría agregada', 'La categoría ha sido agregada exitosamente.');
  };

  return (
    <LinearGradient colors={['#E8F5E8', '#F1F8E9']} style={styles.container}>
      <Text style={styles.title}>Mis Listas</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Agregar Categoría</Text>
      </TouchableOpacity>
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={renderCategory}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay categorías</Text>}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nueva Categoría</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Nombre de la categoría"
              value={newCategory}
              onChangeText={setNewCategory}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={handleAddCategory}>
                <Text style={styles.confirmButtonText}>Agregar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16, color: '#2E7D32', textAlign: 'center' },
  addButton: {
    backgroundColor: '#FF9800',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  categoryItem: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  categoryGradient: {
    padding: 20,
    alignItems: 'center',
  },
  categoryTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  taskCount: { fontSize: 14, color: '#E8F5E8' },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#666', fontSize: 16 },
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
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#333', textAlign: 'center' },
  modalInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: { color: '#333', fontWeight: 'bold' },
  confirmButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  confirmButtonText: { color: '#fff', fontWeight: 'bold' },
});

export default MisListasScreen;
