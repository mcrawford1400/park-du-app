import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootNavProp } from '@/navigation/types';
import { MOCK_SAVED } from '@/data/mockData';

const C = {
  crimson: '#8B1A2D',
  white: '#FFFFFF',
  offWhite: '#F7F7F7',
  lightGray: '#EFEFEF',
  text: '#1A1A1A',
  textLight: '#666666',
  open: '#34C759',
  openBg: '#E6F9EC',
  gold: '#F0B323',
  goldBg: '#FFF8E1',
};

type Props = { navigation: RootNavProp<'Saved'> };

export default function SavedScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={C.crimson} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Spots</Text>
        <View style={{ width: 36 }} />
      </View>

      <FlatList
        data={MOCK_SAVED}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        style={styles.body}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyText}>No saved reservations yet</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              <View style={styles.spotBadge}>
                <Text style={styles.spotBadgeText}>{item.spotNumber}</Text>
              </View>
            </View>
            <View style={styles.cardMid}>
              <Text style={styles.cardLot}>{item.lot}</Text>
              <Text style={styles.cardDate}>{item.date}</Text>
              <Text style={styles.cardTime}>{item.time}</Text>
            </View>
            <View style={styles.cardRight}>
              <View style={[styles.paidBadge, { backgroundColor: item.paid ? C.openBg : C.goldBg }]}>
                <Text style={[styles.paidText, { color: item.paid ? C.open : C.gold }]}>
                  {item.paid ? 'Paid' : 'Pending'}
                </Text>
              </View>
              <Text style={styles.cardPrice}>${item.total}.00</Text>
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
  card: {
    backgroundColor: C.white,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  cardLeft: {},
  spotBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: C.crimson,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spotBadgeText: { fontSize: 15, fontWeight: '800', color: C.white },
  cardMid: { flex: 1, gap: 3 },
  cardLot: { fontSize: 15, fontWeight: '700', color: C.text },
  cardDate: { fontSize: 13, color: C.textLight },
  cardTime: { fontSize: 12, color: C.textLight },
  cardRight: { alignItems: 'flex-end', gap: 6 },
  paidBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  paidText: { fontSize: 12, fontWeight: '700' },
  cardPrice: { fontSize: 15, fontWeight: '700', color: C.text },
  empty: { alignItems: 'center', paddingTop: 80, gap: 12 },
  emptyIcon: { fontSize: 48 },
  emptyText: { fontSize: 16, color: C.textLight },
});
