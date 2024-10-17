import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// TabBarIcon Komponente für Icons
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: useClientOnlyValue(false, true),
            }}>
            <Tabs.Screen
                name="index" // Home Tab
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="map" // Map Tab
                options={{
                    title: 'Map',
                    tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile" // Profile Tab
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
                }}
            />
            <Tabs.Screen
                name="about" // About Tab
                options={{
                    title: 'About',
                    tabBarIcon: ({ color }) => <TabBarIcon name="info-circle" color={color} />,
                }}
            />
        </Tabs>
    );
}
