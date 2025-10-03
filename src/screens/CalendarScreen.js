import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useTasks } from '../context/TaskContext';

// Configurar locale en español para el calendario
LocaleConfig.locales['es'] = {
  monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
  dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
  dayNamesShort: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
  today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';

const CalendarScreen = () => {
  const { getMarkedDates, getTasksByDate } = useTasks();
  const [selectedDate, setSelectedDate] = useState(null);
  const markedDates = getMarkedDates();

  const onDayPress = (day) => {
    const date = day.dateString;
    setSelectedDate(date);
  };

  const tasksForSelectedDate = selectedDate ? getTasksByDate(selectedDate) : [];

  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item.text}</Text>
      <Text style={styles.taskCategory}>{item.category}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendario de Exámenes y Entregas</Text>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          ...markedDates,
          ...(selectedDate && { [selectedDate]: { ...markedDates[selectedDate], selected: true, selectedColor: '#ff6b6b' } })
        }}
        theme={{
          selectedDayBackgroundColor: '#00adf5',
          todayTextColor: '#00adf5',
          arrowColor: '#00adf5',
        }}
      />
      {selectedDate && (
        <View style={styles.tasksContainer}>
          <Text style={styles.selectedDateTitle}>Tareas para {selectedDate}:</Text>
          <FlatList
            data={tasksForSelectedDate}
            keyExtractor={(item) => item.id}
            renderItem={renderTask}
            ListEmptyComponent={<Text style={styles.emptyText}>No hay tareas para esta fecha</Text>}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, textAlign: 'center', color: '#333' },
  tasksContainer: { flex: 1, marginTop: 16 },
  selectedDateTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: '#333' },
  taskItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskText: { fontSize: 16, color: '#333' },
  taskCategory: { fontSize: 12, color: '#666', marginTop: 4 },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#999' },
});

export default CalendarScreen;
