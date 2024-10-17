import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Station } from './types';

interface ModalScreenProps {
  visible: boolean;
  onClose: () => void;
  onAddStation: (station: Station) => void;
}

const ModalScreen: React.FC<ModalScreenProps> = ({ visible, onClose, onAddStation }) => {
  const [name, setName] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');

  const handleAdd = () => {
    const newStation: Station = {
      haltestellen_id: Date.now().toString(), // Temporärer ID-Wert
      typ: 'custom', // Typ für benutzerdefinierte Station
      diva: '0', // Beispielwert
      name,
      gemeinde: 'Wien', // Beispielwert
      gemeinde_id: '90001', // Beispielwert
      wgs84_lat: parseFloat(lat),
      wgs84_lon: parseFloat(lon),
      stand: ''
    };
    onAddStation(newStation);
    onClose();
  };

  return (
      <Modal visible={visible} animationType="slide">
        <View style={styles.container}>
          <Text style={styles.title}>Add New Station</Text>
          <TextInput
              placeholder="Station Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
          />
          <TextInput
              placeholder="Latitude"
              value={lat}
              onChangeText={setLat}
              keyboardType="numeric"
              style={styles.input}
          />
          <TextInput
              placeholder="Longitude"
              value={lon}
              onChangeText={setLon}
              keyboardType="numeric"
              style={styles.input}
          />
          <Button title="Add Station" onPress={handleAdd} />
          <Button title="Cancel" onPress={onClose} color="red" />
        </View>
        <StatusBar style="auto" />
      </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default ModalScreen;
