import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootNavProp } from '@/navigation/types';
import { ALL_SPOTS } from '@/data/mockData';

const C = {
  crimson: '#8B1A2D',
  crimsonDark: '#6B1421',
  gold: '#F0B323',
  white: '#FFFFFF',
  offWhite: '#F7F7F7',
  lightGray: '#EFEFEF',
  mediumGray: '#C8C8C8',
  text: '#1A1A1A',
  textLight: '#666666',
  open: '#34C759',
  taken: '#FF3B30',
};

type Props = { navigation: RootNavProp<'Home'> };

export default function HomeScreen({ navigation }: Props) {
  const openCount = ALL_SPOTS.filter(s => s.status === 'open').length;
  const takenCount = ALL_SPOTS.filter(s => s.status === 'taken').length;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={C.crimson} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoP}>P</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.appName}>Find Parking at DU</Text>
          <Text style={styles.subTitle}>University of Denver</Text>
        </View>
        <TouchableOpacity style={styles.helpBtn} onPress={() => navigation.navigate('Help')}>
          <Text style={styles.helpIcon}>?</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent} showsVerticalScrollIndicator={false}>

        {/* Availability Summary */}
        <Text style={styles.sectionLabel}>Live Availability</Text>
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { borderLeftColor: C.open }]}>
            <Text style={[styles.statNum, { color: C.open }]}>{openCount}</Text>
            <Text style={styles.statLabel}>Open Spots</Text>
          </View>
          <View style={[styles.statCard, { borderLeftColor: C.taken }]}>
            <Text style={[styles.statNum, { color: C.taken }]}>{takenCount}</Text>
            <Text style={styles.statLabel}>Taken Spots</Text>
          </View>
          <View style={[styles.statCard, { borderLeftColor: C.gold }]}>
            <Text style={[styles.statNum, { color: C.crimson }]}>$5</Text>
            <Text style={styles.statLabel}>Daily Rate</Text>
          </View>
        </View>

        {/* Nav Buttons */}
        <Text style={styles.sectionLabel}>Quick Access</Text>

        <TouchableOpacity
          style={[styles.navBtn, { backgroundColor: C.crimson }]}
          onPress={() => navigation.navigate('Map')}
          activeOpacity={0.85}
        >
          <Text style={styles.navBtnIcon}>🗺</Text>
          <View style={styles.navBtnText}>
            <Text style={styles.navBtnTitle}>Parking Map</Text>
            <Text style={styles.navBtnDesc}>Find and reserve a spot</Text>
          </View>
          <Text style={styles.navBtnChevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navBtn, { backgroundColor: '#1C3A6E' }]}
          onPress={() => navigation.navigate('Saved')}
          activeOpacity={0.85}
        >
          <Text style={styles.navBtnIcon}>📋</Text>
          <View style={styles.navBtnText}>
            <Text style={styles.navBtnTitle}>Saved Spots</Text>
            <Text style={styles.navBtnDesc}>View your reservations</Text>
          </View>
          <Text style={styles.navBtnChevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navBtn, { backgroundColor: '#2D6A4F' }]}
          onPress={() => navigation.navigate('Alerts')}
          activeOpacity={0.85}
        >
          <Text style={styles.navBtnIcon}>🔔</Text>
          <View style={styles.navBtnText}>
            <Text style={styles.navBtnTitle}>Parking Alerts</Text>
            <Text style={styles.navBtnDesc}>Street cleaning &amp; notices</Text>
          </View>
          <Text style={styles.navBtnChevron}>›</Text>
        </TouchableOpacity>

        {/* Bottom links */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('Help')}>
            <Text style={styles.footerLink}>Help &amp; Contact</Text>
          </TouchableOpacity>
          <Text style={styles.footerDivider}>·</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Events')}>
            <Text style={styles.footerLink}>Campus Events</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: C.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoP: { fontSize: 22, fontWeight: '800', color: C.crimson },
  headerText: { flex: 1 },
  appName: { fontSize: 18, fontWeight: '700', color: C.white },
  subTitle: { fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 1 },
  helpBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpIcon: { fontSize: 16, color: C.white, fontWeight: '700' },

  body: { flex: 1, backgroundColor: C.offWhite },
  bodyContent: { padding: 20, gap: 12, paddingBottom: 40 },

  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: C.textLight,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginTop: 8,
  },

  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: {
    flex: 1,
    backgroundColor: C.white,
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  statNum: { fontSize: 26, fontWeight: '800' },
  statLabel: { fontSize: 11, color: C.textLight, marginTop: 2, fontWeight: '500' },

  navBtn: {
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 3,
  },
  navBtnIcon: { fontSize: 28 },
  navBtnText: { flex: 1 },
  navBtnTitle: { fontSize: 17, fontWeight: '700', color: C.white },
  navBtnDesc: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  navBtnChevron: { fontSize: 24, color: 'rgba(255,255,255,0.6)', fontWeight: '300' },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  footerLink: { fontSize: 13, color: C.crimson, fontWeight: '600' },
  footerDivider: { color: C.mediumGray, fontSize: 16 },
});
