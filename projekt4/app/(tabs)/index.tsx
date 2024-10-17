// app/tabs/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Papa from 'papaparse';
import { Station } from '../types'; // Achte darauf, den richtigen Pfad zur types.ts Datei anzugeben

export default function HomeTab() {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStations = async () => {
      try {
        const response = await fetch('https://data.wien.gv.at/csv/wienerlinien-ogd-haltestellen.csv');
        const text = await response.text();

        Papa.parse<Station>(text, {
          header: true,
          skipEmptyLines: true,
          delimiter: ';', // CSV verwendet Semikolons als Trennzeichen
          transformHeader: (header) => header.toLowerCase(), // Spaltennamen in Kleinbuchstaben umwandeln
          complete: (results) => {
            const parsedStations: Station[] = results.data.map((item) => ({
              haltestellen_id: item.haltestellen_id, // Eindeutige ID
              typ: item.typ, // Typ der Haltestelle
              diva: item.diva, // DIVA ID
              name: item.name, // Name der Haltestelle
              gemeinde: item.gemeinde, // Gemeinde
              gemeinde_id: item.gemeinde_id, // Gemeinde ID
              wgs84_lat: item.wgs84_lat, // Geografische Breite
              wgs84_lon: item.wgs84_lon, // Geografische Länge
              stand: item.stand, // Stand
            }));
            setStations(parsedStations);
            setLoading(false);
          },
          error: (error: Error) => {
            setError(error.message);
            setLoading(false);
          },
        });
      } catch (err) {
        setError('Fehler beim Laden der Daten.');
        setLoading(false);
      }
    };

    loadStations();
  }, []);

  // Ladeanzeige
  if (loading) {
    return <Text>Lade Stationen...</Text>;
  }

  // Fehlerbehandlung
  if (error) {
    return <Text>{error}</Text>;
  }

  return (
      <FlatList
          data={stations}
          keyExtractor={(item) => item.haltestellen_id} // Verwendung der eindeutigen ID
          renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
          )}
      />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
});
