import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '@/screens/HomeScreen';
import MapScreen from '@/screens/MapScreen';
import DetailsScreen from '@/screens/DetailsScreen';
import SavedScreen from '@/screens/SavedScreen';
import PaymentScreen from '@/screens/PaymentScreen';
import ConfirmationScreen from '@/screens/ConfirmationScreen';
import AlertsScreen from '@/screens/AlertsScreen';
import AlertSettingsScreen from '@/screens/AlertSettingsScreen';
import FilterScreen from '@/screens/FilterScreen';
import EventsScreen from '@/screens/EventsScreen';
import HelpScreen from '@/screens/HelpScreen';

import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        <Stack.Screen name="Home"          component={HomeScreen} />
        <Stack.Screen name="Map"           component={MapScreen} />
        <Stack.Screen name="Details"       component={DetailsScreen} />
        <Stack.Screen name="Saved"         component={SavedScreen} />
        <Stack.Screen name="Payment"       component={PaymentScreen} />
        <Stack.Screen name="Confirmation"  component={ConfirmationScreen} />
        <Stack.Screen name="Alerts"        component={AlertsScreen} />
        <Stack.Screen name="AlertSettings" component={AlertSettingsScreen} />
        <Stack.Screen name="Filter"        component={FilterScreen} />
        <Stack.Screen name="Events"        component={EventsScreen} />
        <Stack.Screen name="Help"          component={HelpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
