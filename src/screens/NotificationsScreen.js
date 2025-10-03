import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationsScreen = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [message, setMessage] = useState('');
  const [seconds, setSeconds] = useState('5');

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    const subscription = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    return () => subscription.remove();
  }, []);

  const scheduleNotification = async () => {
    if (!message.trim()) {
      Alert.alert('Error', 'Por favor ingrese un mensaje para la notificación.');
      return;
    }
    const secondsNum = parseInt(seconds);
    if (isNaN(secondsNum) || secondsNum <= 0) {
      Alert.alert('Error', 'Por favor ingrese un número válido de segundos.');
      return;
    }
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Recordatorio",
        body: message,
      },
      trigger: { seconds: secondsNum },
    });
    Alert.alert('Notificación programada', `Se enviará en ${secondsNum} segundos.`);
    setMessage('');
    setSeconds('5');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificaciones Push</Text>
      <Text>Token: {expoPushToken}</Text>
      <TextInput
        style={styles.input}
        placeholder="Mensaje de notificación"
        value={message}
        onChangeText={setMessage}
      />
      <TextInput
        style={styles.input}
        placeholder="Segundos para enviar"
        value={seconds}
        onChangeText={(text) => setSeconds(text.replace(/[^0-9]/g, ''))}
        keyboardType="numeric"
      />
      <Button title="Programar Notificación" onPress={scheduleNotification} />
      {notification ? (
        <View style={styles.notification}>
          <Text>Última notificación recibida:</Text>
          <Text>{notification.request.content.title}</Text>
          <Text>{notification.request.content.body}</Text>
        </View>
      ) : null}
    </View>
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
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, textAlign: 'center', color: '#333' },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 12,
    height: 40,
    backgroundColor: '#fff',
  },
  notification: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default NotificationsScreen;
