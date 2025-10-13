import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState(['Examenes', 'Compras', 'ToDo']);

  useEffect(() => {
    loadTasks();
    loadCategories();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const loadCategories = async () => {
    try {
      const storedCategories = await AsyncStorage.getItem('categories');
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
      setTasks(newTasks);
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const saveCategories = async (newCategories) => {
    try {
      await AsyncStorage.setItem('categories', JSON.stringify(newCategories));
      setCategories(newCategories);
    } catch (error) {
      console.error('Error saving categories:', error);
    }
  };

  const addTask = (text, date, category) => {
    const newTask = {
      id: Date.now().toString(),
      text,
      date,
      category,
    };
    const newTasks = [...tasks, newTask];
    saveTasks(newTasks);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    saveTasks(newTasks);
  };

  const addCategory = (newCategory) => {
    if (!categories.includes(newCategory)) {
      const newCategories = [...categories, newCategory];
      saveCategories(newCategories);
    }
  };

  const getTasksByCategory = (category) => {
    return tasks.filter(task => task.category === category);
  };

  const getTasksByDate = (date) => {
    return tasks.filter(task => task.date === date);
  };

  const getMarkedDates = () => {
    const marked = {};
    tasks.forEach(task => {
      if (task.date) {
        marked[task.date] = { marked: true, selectedColor: '#00adf5' };
      }
    });
    return marked;
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      categories,
      addTask,
      deleteTask,
      addCategory,
      getTasksByCategory,
      getTasksByDate,
      getMarkedDates,
    }}>
      {children}
    </TaskContext.Provider>
  );
};
