import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootNavProp } from '@/navigation/types';

const C = {
  crimson: '#8B1A2D',
  white: '#FFFFFF',
  offWhite: '#F7F7F7',
  lightGray: '#EFEFEF',
  text: '#1A1A1A',
  textLight: '#666666',
  open: '#34C759',
};

type Props = { navigation: RootNavProp<'AlertSettings'> };

const ALERT_TYPES = [
  { key: 'streetCleaning', label: 'Street Cleaning', desc: 'Reminders before street cleaning hours' },
  { key: 'permitReminders', label: 'Permit Reminders', desc: 'Alerts when permit hours begin' },
  { key: 'eventParking', label: 'Event Parking', desc: 'Lot closures for campus events' },
  { key: 'weekendRules', label: 'Weekend Rules', desc: 'Free parking weekend notifications' },
  { key: 'spotAvailable', label: 'Spot Available', desc: 'Notify when a taken spot opens up' },
  { key: 'reservationReminder', label: 'Reservation Reminders', desc: '30 min before your reservation starts' },
];

export default function AlertSettingsScreen({ navigation }: Props) {
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(ALERT_TYPES.map(a => [a.key, true]))
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={C.crimson} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alert Settings</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.content}>
        <Text style={styles.sectionLabel}>Notification Types</Text>
        <View style={styles.card}>
          {ALERT_TYPES.map((item, idx) => (
            <View key={item.key}>
              {idx > 0 && <View style={styles.divider} />}
              <View style={styles.row}>
                <View style={styles.rowText}>
                  <Text style={styles.rowLabel}>{item.label}</Text>
                  <Text style={styles.rowDesc}>{item.desc}</Text>
                </View>
                <Switch
                  value={toggles[item.key]}
                  onValueChange={val => setToggles(prev => ({ ...prev, [item.key]: val }))}
                  trackColor={{ false: '#DDD', true: C.open }}
                  thumbColor={C.white}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.crimson },
  header: {
    backgroundColor: C.crimson,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 30, color: C.white, fontWeight: '300', lineHeight: 34 },
  headerTitle: { flex: 1, fontSize: 18, fontWeight: '700', color: C.white, textAlign: 'center' },
  body: { flex: 1, backgroundColor: C.offWhite },
  content: { padding: 16, gap: 12, paddingBottom: 40 },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: C.textLight,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: C.white,
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  divider: { height: 1, backgroundColor: C.lightGray, marginHorizontal: 12 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  rowText: { flex: 1, paddingRight: 12 },
  rowLabel: { fontSize: 15, fontWeight: '600', color: C.text },
  rowDesc: { fontSize: 12, color: C.textLight, marginTop: 2 },
});
