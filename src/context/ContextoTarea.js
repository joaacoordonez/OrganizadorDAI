import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tareas, setTareas] = useState([]); 
  const [categorias, setCategorias] = useState(['Examenes', 'Compras', 'ToDo']); 

 
  // Cargar datos guardados al iniciar
  useEffect(() => {
    cargarTareas();
    cargarCategorias();
  }, []);

  // cargar lo que agregue
  const cargarTareas = async () => {
    try {
      const tareasGuardadas = await AsyncStorage.getItem('tasks');
      if (tareasGuardadas) setTareas(JSON.parse(tareasGuardadas));
    } catch (error) {
      console.error('Error al cargar las tareas:', error);
    }
  };

  const cargarCategorias = async () => {
    try {
      const categoriasGuardadas = await AsyncStorage.getItem('categories');
      if (categoriasGuardadas) setCategorias(JSON.parse(categoriasGuardadas));
    } catch (error) {
      console.error('Error al cargar las categorías:', error);
    }
  };

  // --- para guardar
  const guardarTareas = async (nuevasTareas) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(nuevasTareas));
      setTareas(nuevasTareas);
    } catch (error) {
      console.error('Error al guardar las tareas:', error);
    }
  };

  const guardarCategorias = async (nuevasCategorias) => {
    try {
      await AsyncStorage.setItem('categories', JSON.stringify(nuevasCategorias));
      setCategorias(nuevasCategorias);
    } catch (error) {
      console.error('Error al guardar las categorías:', error);
    }
  };

  // funciones de tareas
  const agregarTarea = (texto, fecha, categoria) => {
    const nuevaTarea = {
      id: Date.now().toString(),
      text: texto,
      date: fecha,
      category: categoria,
    };

    const nuevasTareas = [...tareas, nuevaTarea];
    guardarTareas(nuevasTareas);
  };

  const eliminarTarea = (id) => {
    const nuevasTareas = tareas.filter((tarea) => tarea.id !== id);
    guardarTareas(nuevasTareas);
  };

  // funciones de categorias
  const agregarCategoria = (nuevaCategoria) => {
    if (!categorias.includes(nuevaCategoria)) {
      const nuevasCategorias = [...categorias, nuevaCategoria];
      guardarCategorias(nuevasCategorias);
    }
  };

  const eliminarCategoria = (categoriaAEliminar) => {
    // Eliminar la categoría
    const nuevasCategorias = categorias.filter((cat) => cat !== categoriaAEliminar);
    guardarCategorias(nuevasCategorias);

    // Eliminar también las tareas de esa categoría
    const nuevasTareas = tareas.filter((tarea) => tarea.category !== categoriaAEliminar);
    guardarTareas(nuevasTareas);
  };

  // funciones para consultar
  const obtenerTareasPorCategoria = (categoria) =>
    tareas.filter((tarea) => tarea.category === categoria);

  const obtenerTareasPorFecha = (fecha) =>
    tareas.filter((tarea) => tarea.date === fecha);

  const obtenerFechasMarcadas = () => {
    const marcadas = {};

    tareas.forEach((tarea) => {
      if (tarea.date) {
        marcadas[tarea.date] = { marked: true, selectedColor: '#00adf5' };
      }
    });

    return marcadas;
  };

  // los datos y funciones
  return (
    <TaskContext.Provider
      value={{
        tareas,
        categorias,
        agregarTarea,
        eliminarTarea,
        agregarCategoria,
        eliminarCategoria,
        obtenerTareasPorCategoria,
        obtenerTareasPorFecha,
        obtenerFechasMarcadas,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
