import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
import { useTasks } from '../context/ContextoTarea';


LocaleConfig.locales['es'] = {
  monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
  dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
  dayNamesShort: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
  today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';

const CalendarioScreen = () => {
  const { obtenerFechasMarcadas, obtenerTareasPorFecha } = useTasks();
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const fechasMarcadas = obtenerFechasMarcadas();

  const onDayPress = (day) => {
    const fecha = day.dateString;
    setFechaSeleccionada(fecha);
  };

  const tareasParaFechaSeleccionada = fechaSeleccionada ? obtenerTareasPorFecha(fechaSeleccionada) : [];

  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <LinearGradient
        colors={['#E8F5E8', '#C8E6C9']}
        style={styles.taskGradient}
      >
        <Text style={styles.taskText}>{item.text}</Text>
        <Text style={styles.taskCategory}>{item.category}</Text>
      </LinearGradient>
    </View>
  );

  return (
    <LinearGradient colors={['#F3E5F5', '#E1BEE7']} style={styles.container}>
      <Text style={styles.title}>Calendario de Tareas</Text>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          ...fechasMarcadas,
          ...(fechaSeleccionada && { [fechaSeleccionada]: { ...fechasMarcadas[fechaSeleccionada], selected: true, selectedColor: '#9C27B0' } })
        }}
        theme={{
          selectedDayBackgroundColor: '#9C27B0',
          todayTextColor: '#9C27B0',
          arrowColor: '#9C27B0',
          calendarBackground: '#fff',
          textSectionTitleColor: '#9C27B0',
          textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayTextColor: '#fff',
          todayTextColor: '#9C27B0',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#9C27B0',
          selectedDotColor: '#fff',
          arrowColor: '#9C27B0',
          disabledArrowColor: '#d9e1e8',
          monthTextColor: '#9C27B0',
          indicatorColor: '#9C27B0',
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14
        }}
      />
      {fechaSeleccionada && (
        <View style={styles.tasksContainer}>
          <Text style={styles.selectedDateTitle}>Tareas para {fechaSeleccionada}:</Text>
          <FlatList
            data={tareasParaFechaSeleccionada}
            keyExtractor={(item) => item.id}
            renderItem={renderTask}
            ListEmptyComponent={<Text style={styles.emptyText}>No hay tareas para esta fecha</Text>}
          />
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center', color: '#7B1FA2' },
  tasksContainer: { flex: 1, marginTop: 16 },
  selectedDateTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: '#7B1FA2', textAlign: 'center' },
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
    padding: 16,
    alignItems: 'center',
  },
  taskText: { fontSize: 18, color: '#333', fontWeight: 'bold', marginBottom: 4 },
  taskCategory: { fontSize: 14, color: '#666' },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#666', fontSize: 16 },
});

export default CalendarioScreen;
