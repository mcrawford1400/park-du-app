import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootNavProp } from '@/navigation/types';

const C = {
  crimson: '#8B1A2D',
  white: '#FFFFFF',
  offWhite: '#F7F7F7',
  lightGray: '#EFEFEF',
  text: '#1A1A1A',
  textLight: '#666666',
  gold: '#F0B323',
  goldBg: '#FFF8E1',
};

const EVENTS = [
  { id: '1', title: 'Commencement Ceremony', date: 'Sat Jul 26', time: '9:00 AM – 2:00 PM', lot: 'Lot B Reserved', impact: 'high' },
  { id: '2', title: 'Football Game — DU vs. CSU', date: 'Sat Aug 2', time: '12:00 PM – 6:00 PM', lot: 'Lot A & C Full', impact: 'high' },
  { id: '3', title: 'Farmers Market', date: 'Sun Jul 27', time: '8:00 AM – 1:00 PM', lot: 'Lot C Reduced', impact: 'medium' },
  { id: '4', title: 'Career Fair', date: 'Thu Jul 31', time: '10:00 AM – 4:00 PM', lot: 'Lot A Busy', impact: 'medium' },
];

type Props = { navigation: RootNavProp<'Events'> };

export default function EventsScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={C.crimson} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Campus Events</Text>
        <View style={{ width: 36 }} />
      </View>

      <FlatList
        data={EVENTS}
        keyExtractor={item => item.id}
        style={styles.body}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Text style={styles.note}>
            Events may affect parking availability. Plan ahead.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={[styles.impactBar, { backgroundColor: item.impact === 'high' ? C.crimson : C.gold }]} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDate}>📅 {item.date}  ·  🕐 {item.time}</Text>
              <View style={styles.lotTag}>
                <Text style={styles.lotTagText}>🅿 {item.lot}</Text>
              </View>
            </View>
          </View>
        )}
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
  body: { flex: 1, backgroundColor: C.offWhite },
  list: { padding: 16, gap: 10, paddingBottom: 40 },
  note: { fontSize: 13, color: C.textLight, textAlign: 'center', marginBottom: 6, lineHeight: 18 },
  card: {
    backgroundColor: C.white,
    borderRadius: 14,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  impactBar: { width: 5 },
  cardContent: { flex: 1, padding: 14, gap: 6 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: C.text },
  cardDate: { fontSize: 13, color: C.textLight },
  lotTag: {
    alignSelf: 'flex-start',
    backgroundColor: C.goldBg,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  lotTagText: { fontSize: 12, color: '#856404', fontWeight: '600' },
});
