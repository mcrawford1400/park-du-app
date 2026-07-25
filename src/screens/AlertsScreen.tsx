import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootNavProp } from '@/navigation/types';
import { MOCK_ALERTS } from '@/data/mockData';

const C = {
  crimson: '#8B1A2D',
  white: '#FFFFFF',
  offWhite: '#F7F7F7',
  text: '#1A1A1A',
  textLight: '#666666',
  open: '#34C759',
  openBg: '#E6F9EC',
  taken: '#FF3B30',
  takenBg: '#FFE8E7',
  gold: '#F0B323',
  goldBg: '#FFF8E1',
};

const TYPE_CONFIG = {
  warning: { bg: C.goldBg, color: C.gold, icon: '⚠️' },
  info:    { bg: '#E8F4FD', color: '#0A7ABF', icon: 'ℹ️' },
  success: { bg: C.openBg, color: C.open, icon: '✅' },
};

type Props = { navigation: RootNavProp<'Alerts'> };

export default function AlertsScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={C.crimson} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Parking Alerts</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AlertSettings')}>
          <Text style={styles.settingsBtn}>⚙</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={MOCK_ALERTS}
        keyExtractor={item => item.id}
        style={styles.body}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const cfg = TYPE_CONFIG[item.type];
          return (
            <View style={[styles.alertCard, { borderLeftColor: cfg.color }]}>
              <Text style={styles.alertIcon}>{cfg.icon}</Text>
              <View style={styles.alertContent}>
                <View style={styles.alertTop}>
                  <Text style={styles.alertTitle}>{item.title}</Text>
                  <Text style={styles.alertDate}>{item.date}</Text>
                </View>
                <Text style={styles.alertMsg}>{item.message}</Text>
              </View>
            </View>
          );
        }}
      />
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
  settingsBtn: { fontSize: 22, color: C.white, width: 36, textAlign: 'center' },
  body: { flex: 1, backgroundColor: C.offWhite },
  list: { padding: 16, gap: 10, paddingBottom: 40 },
  alertCard: {
    backgroundColor: C.white,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  alertIcon: { fontSize: 20, lineHeight: 24 },
  alertContent: { flex: 1, gap: 4 },
  alertTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  alertTitle: { fontSize: 15, fontWeight: '700', color: C.text },
  alertDate: { fontSize: 12, color: C.textLight },
  alertMsg: { fontSize: 13, color: C.textLight, lineHeight: 18 },
});
