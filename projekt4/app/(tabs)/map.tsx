import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function Map() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Map Tab :/</Text>
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
});

/*

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { fetchStations } from '../utils';
import { Station } from '../types';

const MapTab = () => {
    const [stations, setStations] = useState<Station[]>([]);
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const stationsData = await fetchStations();
                setStations(stationsData);

                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }

                const userLocation = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: userLocation.coords.latitude,
                    longitude: userLocation.coords.longitude,
                });
            } catch (error) {
                console.error(error);
            }
        };

        loadData();
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location?.latitude || 48.2082,
                    longitude: location?.longitude || 16.3738,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {stations.map((station) => (
                    <Marker
                        key={station.haltestellen_id}
                        coordinate={{
                            latitude: station.wgs84_lat,
                            longitude: station.wgs84_lon,
                        }}
                        title={station.name}
                    />
                ))}
                {location && (
                    <Marker
                        coordinate={location}
                        title="Your Location"
                        pinColor="blue"
                    />
                )}
            </MapView>
            {errorMsg && <Text>{errorMsg}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});

export default MapTab;
*/