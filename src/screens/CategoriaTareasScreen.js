import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTasks } from '../context/ContextoTarea';

const CategoriaTareasScreen = ({ route, navigation }) => {

  const { category } = route.params;

  const { obtenerTareasPorCategoria, eliminarTarea } = useTasks();

  // lista de tatreas segun su categoria
  const tareas = obtenerTareasPorCategoria(category);

  // confirmar eliminacion de la tarea
  const confirmarEliminar = (id) => {
    Alert.alert(
      'Eliminar tarea',
      '¿Está seguro que desea eliminar esta tarea?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => eliminarTarea(id) },
      ]
    );
  };

  // renderizar las tareas
  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <LinearGradient
        colors={['#FFF9C4', '#FFF59D']}
        style={styles.taskGradient}
      >
        {/* Contenido de la tarea */}
        <View style={styles.taskContent}>
          <Text style={styles.taskText}>{item.text}</Text>
          <Text style={styles.taskDate}>{item.date || 'Sin fecha'}</Text>
        </View>

        {/* Botón para eliminar la tarea */}
        <TouchableOpacity
          onPress={() => confirmarEliminar(item.id)}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>X</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );

  return (
    <LinearGradient colors={['#FFF3E0', '#FFEB3B']} style={styles.container}>
      
      {/* Boton para agregar tarea */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AgregarTarea', { category })}
      >
        <LinearGradient
          colors={['#4CAF50', '#45a049']}
          style={styles.addButtonGradient}
        >
          <Text style={styles.addButtonText}>+ Agregar Tarea</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Titulo de la categoria */}
      <Text style={styles.title}>{category}</Text>

      {/* Lista de tareas */}
      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No hay tareas en esta categoría
          </Text>
        }
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  //Botón para agregar tarea
  addButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  addButtonGradient: {
    padding: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Título principal
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#E65100',
    textAlign: 'center',
  },

  //Estilos de las tareas
  taskItem: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  taskGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  taskContent: { flex: 1 },
  taskText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  taskDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  // Botón de eliminar
  deleteButton: {
    backgroundColor: '#F44336',
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  //Texto cuando no hay tareas 
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    fontSize: 16,
  },
});

export default CategoriaTareasScreen;
