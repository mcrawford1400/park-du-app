import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootNavProp, RootRouteProp } from '@/navigation/types';

const C = {
  crimson: '#8B1A2D',
  gold: '#F0B323',
  white: '#FFFFFF',
  offWhite: '#F7F7F7',
  lightGray: '#EFEFEF',
  text: '#1A1A1A',
  textLight: '#666666',
  open: '#34C759',
  openBg: '#E6F9EC',
};

type Props = {
  navigation: RootNavProp<'Confirmation'>;
  route: RootRouteProp<'Confirmation'>;
};

export default function ConfirmationScreen({ navigation, route }: Props) {
  const { spot } = route.params;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.offWhite} />
      <View style={styles.container}>

        {/* Success Icon */}
        <View style={styles.iconCircle}>
          <Text style={styles.checkmark}>✓</Text>
        </View>

        <Text style={styles.title}>Parking Spot{'\n'}Saved Successfully</Text>
        <Text style={styles.subtitle}>
          Spot {spot.number} in {spot.lot} has been reserved for you.
        </Text>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Spot</Text>
            <Text style={styles.summaryValue}>{spot.number} — {spot.lot}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Rate</Text>
            <Text style={styles.summaryValue}>$5.00 / day</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Status</Text>
            <Text style={[styles.summaryValue, { color: C.open }]}>Confirmed ✓</Text>
          </View>
        </View>

        {/* Actions */}
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('Saved')}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryBtnText}>View My Reservations</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.85}
        >
          <Text style={styles.secondaryBtnText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.offWhite },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 16,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: C.open,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  checkmark: { fontSize: 44, color: C.white, fontWeight: '700', lineHeight: 52 },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: C.text,
    textAlign: 'center',
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 15,
    color: C.textLight,
    textAlign: 'center',
    lineHeight: 22,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: C.white,
    borderRadius: 16,
    padding: 16,
    gap: 10,
    marginTop: 8,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryLabel: { fontSize: 14, color: C.textLight },
  summaryValue: { fontSize: 14, fontWeight: '700', color: C.text },
  primaryBtn: {
    width: '100%',
    backgroundColor: C.crimson,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryBtnText: { fontSize: 16, fontWeight: '700', color: C.white },
  secondaryBtn: {
    width: '100%',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryBtnText: { fontSize: 15, fontWeight: '600', color: C.crimson },
});
