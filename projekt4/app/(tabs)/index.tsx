import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, Modal, TextInput } from 'react-native';
import { Text, View } from '@/components/Themed';
import EditScreenInfo from '@/components/EditScreenInfo';
import Papa from 'papaparse';
import { Station } from '../types'; // Importiere den Station Typ

export default function TabOneScreen() {
  const [stations, setStations] = useState<Station[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newStationName, setNewStationName] = useState('');
  const [newStationLat, setNewStationLat] = useState('');
  const [newStationLon, setNewStationLon] = useState('');

  // Funktion zum Abrufen der Stationen
  const fetchStations = async () => {
    try {
      const response = await fetch('https://data.wien.gv.at/csv/wienerlinien-ogd-haltestellen.csv');
      const text = await response.text();
      const parsedData = Papa.parse(text, {
        header: true,
        delimiter: ';',
        skipEmptyLines: true,
      });

      const stationData: Station[] = parsedData.data.map((item: any) => ({
        haltestellen_id: item.HALTESTELLEN_ID, // konvertiere die ID in eine Zahl
        typ: item.TYP,
        diva: item.DIVA,
        name: item.NAME,
        gemeinde: item.GEMEINDE,
        gemeinde_id: item.GEMEINDE_ID,
        wgs84_lat: item.WGS84_LAT,
        wgs84_lon: item.WGS84_LON,
        stand: ''
      }));

      setStations(stationData);
    } catch (error) {
      console.error('Fehler beim Abrufen der Stationen:', error);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  // Funktion zum Hinzufügen einer neuen Station
  const addStation = () => {
    const newStation: Station = {
      haltestellen_id: Date.now().toString(), // oder eine andere Logik für die ID
      typ: 'custom',
      diva: '0', // Beispielwert, kann geändert werden
      name: newStationName,
      gemeinde: 'Wien', // Beispielwert, kann geändert werden
      gemeinde_id: '90001', // Beispielwert, kann geändert werden
      wgs84_lat: parseFloat(newStationLat),
      wgs84_lon: parseFloat(newStationLon),
      stand: ''
    };

    setStations([...stations, newStation]); // füge die neue Station hinzu
    setModalVisible(false); // schließe das Modal
    // Setze die Eingabefelder zurück
    setNewStationName('');
    setNewStationLat('');
    setNewStationLon('');
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Wiener Linien Stationen</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        {/* Liste der Stationen */}
        {stations.map((station) => (
            <View key={station.haltestellen_id}>
              <Text>{station.name}</Text>
            </View>
        ))}

        {/* Button zum Öffnen des Modals */}
        <Button title="Add Station" onPress={() => setModalVisible(true)} />

        {/* Modal zum Hinzufügen einer neuen Station */}
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <TextInput
                placeholder="Station Name"
                value={newStationName}
                onChangeText={setNewStationName}
                style={styles.input}
            />
            <TextInput
                placeholder="Latitude"
                value={newStationLat}
                onChangeText={setNewStationLat}
                style={styles.input}
                keyboardType="numeric"
            />
            <TextInput
                placeholder="Longitude"
                value={newStationLon}
                onChangeText={setNewStationLon}
                style={styles.input}
                keyboardType="numeric"
            />
            <Button title="Add" onPress={addStation} />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>

        <EditScreenInfo path="app/(tabs)/index.tsx" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});
