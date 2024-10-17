import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Text, View } from '@/components/Themed';

import packageJson from '../../package.json';

export default function About() {
    const [profileImageUri, setProfileImageUri] = useState<string | null>(null);

    useEffect(() => {
        setProfileImageUri('https://placekitten.com/200/200');
    }, []);

    return (
        <View style={styles.container}>
            {profileImageUri && (
                <Image
                    source={{ uri: profileImageUri }}
                    style={styles.profileImage}
                />
            )}
            <Text style={styles.title}>About This App</Text>
            <Text style={styles.text}>Version: {packageJson.version}</Text>
            <Text style={styles.text}>Developer: Niclas Böck</Text>
            <Text style={styles.text}>
                This app is designed to help you find Wiener Linien stations in Vienna.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 5,
    },
});
