import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { ParkingSpot } from '@/data/mockData';

export type RootStackParamList = {
  Home: undefined;
  Map: { lotId?: string } | undefined;
  Details: { spot: ParkingSpot };
  Saved: undefined;
  Payment: { spot: ParkingSpot };
  Confirmation: { spot: ParkingSpot };
  Alerts: undefined;
  AlertSettings: undefined;
  Filter: undefined;
  Events: undefined;
  Help: undefined;
};

export type RootNavProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

export type RootRouteProp<T extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, T>;
