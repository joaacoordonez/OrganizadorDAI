import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';

const ClipboardScreen = () => {
  const [text, setText] = useState('');

  const copyToClipboard = async () => {
    if (!text.trim()) {
      Alert.alert('Error', 'Por favor ingrese texto para copiar.');
      return;
    }
    await Clipboard.setStringAsync(text);
    Alert.alert('Copiado', 'Texto copiado al portapapeles.');
  };

  const pasteFromClipboard = async () => {
    const clipboardContent = await Clipboard.getStringAsync();
    setText(clipboardContent);
    Alert.alert('Pegado', 'Texto pegado desde el portapapeles.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Portapapeles</Text>
      <TextInput
        style={styles.input}
        placeholder="Escriba notas rápidas aquí"
        value={text}
        onChangeText={setText}
        multiline
        numberOfLines={4}
      />
      <View style={styles.buttonRow}>
        <Button title="Copiar" onPress={copyToClipboard} />
        <Button title="Pegar" onPress={pasteFromClipboard} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, textAlign: 'center', color: '#333' },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 12,
    height: 120,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around' },
});

export default ClipboardScreen;
