import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Clipboard from 'expo-clipboard';

const PortapapelesScreen = () => {
  const [text, setText] = useState('');

  // Función para copiar el texto al portapapeles
  const copiarAlPortapapeles = async () => {
    if (!text.trim()) { // ver si esta vacio
      Alert.alert('Error', 'Por favor ingrese texto para copiar.');
      return;
    }
    await Clipboard.setStringAsync(text); // Copiar el texto al portapapeles
    Alert.alert('Copiado', 'Texto copiado al portapapeles.'); 
  };
  const pegarDesdePortapapeles = async () => {
    const contenidoPortapapeles = await Clipboard.getStringAsync(); // Obtener texto desde el portapapeles
    const textoAnterior = text; 
    setText(textoAnterior + contenidoPortapapeles); // Agregar el texto del portapapeles al campo de texto
    Alert.alert('Pegado', 'Texto pegado desde el portapapeles.'); 
  };

  return (
    <LinearGradient colors={['#FFF8E1', '#FFECB3']} style={styles.container}>
      <Text style={styles.title}>Portapapeles</Text>
      <Text style={styles.subtitle}>Notas rápidas y útiles</Text>
      <TextInput
        style={styles.input}
        placeholder="Escriba notas rápidas aquí"
        value={text}
        onChangeText={setText} 
        multiline 
        numberOfLines={6} 
        placeholderTextColor="#666" 
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.copyButton} onPress={copiarAlPortapapeles}>
          <LinearGradient colors={['#FF9800', '#F57C00']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Copiar</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.pasteButton} onPress={pegarDesdePortapapeles}>
          <LinearGradient colors={['#2196F3', '#1976D2']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Pegar</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8, textAlign: 'center', color: '#E65100' },
  subtitle: { fontSize: 16, marginBottom: 20, textAlign: 'center', color: '#F57C00' },
  input: {
    borderColor: '#FF9800',
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 20,
    height: 150,
    backgroundColor: '#fff',
    fontSize: 16,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around' },
  copyButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  pasteButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  buttonGradient: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default PortapapelesScreen;
