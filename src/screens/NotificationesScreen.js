import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Platform, Alert, ScrollView, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const NotificacionesScreen = () => {
  const [tokenPushExpo, setTokenPushExpo] = useState('');
  const [notificacion, setNotificacion] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [fecha, setFecha] = useState('');
  const [horaSeleccionada, setHoraSeleccionada] = useState('');
  const [minutoSeleccionado, setMinutoSeleccionado] = useState('');
  const hora = horaSeleccionada && minutoSeleccionado ? `${horaSeleccionada}:${minutoSeleccionado}` : '';
  const [recurrencia, setRecurrencia] = useState('none');
  const [calendarioVisible, setCalendarioVisible] = useState(false);
  const [selectorHoraVisible, setSelectorHoraVisible] = useState(false);
  const [selectorRecurrenciaVisible, setSelectorRecurrenciaVisible] = useState(false);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setTokenPushExpo(token));

    const subscription = Notifications.addNotificationReceivedListener(notificacion => {
      setNotificacion(notificacion);
    });

    return () => subscription.remove();
  }, []);

  const programarNotificacion = async () => {
    if (!mensaje.trim()) {
      Alert.alert('Error', 'Por favor ingrese un mensaje para la notificación.');
      return;
    }
    if (!fecha || !hora) {
      Alert.alert('Error', 'Por favor seleccione fecha y hora.');
      return;
    }

    const fechaActivacion = new Date(`${fecha}T${hora}:00`);

    const ahora = new Date();
    if (recurrencia === 'none' && fechaActivacion <= ahora) {
      Alert.alert('Error', 'La fecha y hora deben ser en el futuro.');
      return;
    }

    let activador;
    if (recurrencia === 'daily') {
      const [horas, minutos] = hora.split(':').map(Number);
      activador = {
        hour: horas,
        minute: minutos,
        repeats: true,
      };
    } else if (recurrencia === 'weekly') {
      const [horas, minutos] = hora.split(':').map(Number);
      activador = {
        weekday: fechaActivacion.getDay() + 1, // 1 = es el sabado, 7 = es el domingo
        hour: horas,
        minute: minutos,
        repeats: true,
      };
    } else {
      activador = fechaActivacion;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Recordatorio",
        body: mensaje,
      },
      trigger: activador,
    });

    const textoRecurrencia = recurrencia === 'none' ? '' : ` (${recurrencia})`;
    Alert.alert('Notificación programada', `Se enviará el ${fecha} a las ${hora}${textoRecurrencia}.`);
    setMensaje('');
    setFecha('');
    setHoraSeleccionada('');
    setMinutoSeleccionado('');
    setRecurrencia('none');
  };

  const alPresionarDia = (dia) => {
    setFecha(dia.dateString);
    setCalendarioVisible(false);
  };

  return (
    <LinearGradient colors={['#E1F5FE', '#B3E5FC']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Recordatorios</Text>
        <Text style={styles.subtitle}>Configura notificaciones personalizadas</Text>

        <TextInput
          style={styles.input}
          placeholder="Mensaje del recordatorio"
          value={mensaje}
          onChangeText={setMensaje}
          placeholderTextColor="#666"
        />

        <Text style={styles.label}>Fecha:</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setCalendarioVisible(true)}>
          <Text style={styles.dateButtonText}>
            {fecha ? fecha : 'Seleccionar fecha'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>Hora:</Text>
        <View style={styles.timePickerContainer}>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={horaSeleccionada}
              onValueChange={(itemValue) => setHoraSeleccionada(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Hora" value="" />
              {Array.from({ length: 24 }, (_, h) => {
                const hour = h.toString().padStart(2, '0');
                return <Picker.Item key={hour} label={hour} value={hour} />;
              })}
            </Picker>
          </View>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={minutoSeleccionado}
              onValueChange={(itemValue) => setMinutoSeleccionado(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Min" value="" />
              {Array.from({ length: 60 }, (_, m) => {
                const minute = m.toString().padStart(2, '0');
                return <Picker.Item key={minute} label={minute} value={minute} />;
              })}
            </Picker>
          </View>
        </View>

        <Text style={styles.label}>Repetición:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={recurrencia}
            onValueChange={(itemValue) => setRecurrencia(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Una vez" value="none" />
            <Picker.Item label="Diariamente" value="daily" />
            <Picker.Item label="Semanalmente" value="weekly" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.scheduleButton} onPress={programarNotificacion}>
          <LinearGradient colors={['#2196F3', '#1976D2']} style={styles.scheduleButtonGradient}>
            <Text style={styles.scheduleButtonText}>Programar Recordatorio</Text>
          </LinearGradient>
        </TouchableOpacity>

        {notificacion ? (
          <View style={styles.notification}>
            <Text style={styles.notificationTitle}>Última notificación recibida:</Text>
            <Text style={styles.notificationBody}>{notificacion.request.content.title}</Text>
            <Text style={styles.notificationBody}>{notificacion.request.content.body}</Text>
          </View>
        ) : null}

        <Modal
          animationType="slide"
          transparent={true}
          visible={calendarioVisible}
          onRequestClose={() => setCalendarioVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Seleccionar Fecha</Text>
              <Calendar
                onDayPress={alPresionarDia}
                markedDates={fecha ? { [fecha]: { selected: true, selectedColor: '#2196F3' } } : {}}
                theme={{
                  selectedDayBackgroundColor: '#2196F3',
                  todayTextColor: '#2196F3',
                  arrowColor: '#2196F3',
                }}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setCalendarioVisible(false)}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>


      </ScrollView>
    </LinearGradient>
  );
};

async function registerForPushNotificationsAsync() {
  let token;
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('No se pudo obtener permiso para notificaciones push!');
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { flexGrow: 1, padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8, color: '#0D47A1', textAlign: 'center' },
  subtitle: { fontSize: 16, marginBottom: 20, color: '#1976D2', textAlign: 'center' },
  input: {
    borderColor: '#2196F3',
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    height: 50,
    backgroundColor: '#fff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: { fontSize: 18, marginBottom: 8, color: '#0D47A1', fontWeight: 'bold' },
  dateButton: {
    backgroundColor: '#fff',
    borderColor: '#2196F3',
    borderWidth: 2,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateButtonText: { fontSize: 16, color: '#0D47A1' },

  pickerContainer: {
    borderColor: '#2196F3',
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  picker: { height: 50, width: '100%' },
  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pickerWrapper: {
    flex: 1,
    marginHorizontal: 5,
    borderColor: '#2196F3',
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scheduleButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  scheduleButtonGradient: {
    padding: 15,
    alignItems: 'center',
  },
  scheduleButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  notification: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  notificationTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#0D47A1' },
  notificationBody: { fontSize: 14, color: '#333' },
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
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#333', textAlign: 'center' },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  closeButtonText: { color: '#fff', fontWeight: 'bold' },
  optionButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  optionText: { fontSize: 16, color: '#0D47A1' },
});

export default NotificacionesScreen;
