import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const categories = ['Examenes', 'Compras', 'ToDo'];

  useEffect(() => {
    loadTasks();
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

  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
      setTasks(newTasks);
    } catch (error) {
      console.error('Error saving tasks:', error);
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
      getTasksByCategory,
      getTasksByDate,
      getMarkedDates,
    }}>
      {children}
    </TaskContext.Provider>
  );
};
