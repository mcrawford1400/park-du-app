import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootNavProp } from '@/navigation/types';
import { PARKING_LOTS, type ParkingSpot, type ParkingLot } from '@/data/mockData';

const C = {
  crimson: '#8B1A2D',
  gold: '#F0B323',
  white: '#FFFFFF',
  offWhite: '#F7F7F7',
  lightGray: '#EFEFEF',
  mediumGray: '#C8C8C8',
  text: '#1A1A1A',
  textLight: '#666666',
  open: '#34C759',
  openBg: '#E6F9EC',
  taken: '#FF3B30',
  takenBg: '#FFE8E7',
  asphalt: '#3A3A3C',
  lane: '#555558',
};

type Props = { navigation: RootNavProp<'Map'> };

function SpotTile({ spot, onPress }: { spot: ParkingSpot; onPress: () => void }) {
  const isOpen = spot.status === 'open';
  return (
    <TouchableOpacity
      style={[styles.spotTile, isOpen ? styles.spotOpen : styles.spotTaken]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text style={styles.spotNumber}>{spot.number}</Text>
      <View style={[styles.spotDot, { backgroundColor: isOpen ? C.open : C.taken }]} />
    </TouchableOpacity>
  );
}

function LotMap({ lot, onSpotPress }: { lot: ParkingLot; onSpotPress: (s: ParkingSpot) => void }) {
  const row0 = lot.spots.filter(s => s.row === 0).sort((a, b) => a.col - b.col);
  const row1 = lot.spots.filter(s => s.row === 1).sort((a, b) => a.col - b.col);
  const openCount = lot.spots.filter(s => s.status === 'open').length;

  return (
    <View style={styles.lotContainer}>
      {/* Lot header */}
      <View style={styles.lotHeader}>
        <View>
          <Text style={styles.lotName}>{lot.name}</Text>
          <Text style={styles.lotAddress}>{lot.address}</Text>
        </View>
        <View style={styles.lotBadge}>
          <Text style={styles.lotBadgeText}>{openCount} open</Text>
        </View>
      </View>

      {/* Visual parking lot */}
      <View style={styles.lotMap}>
        {/* Entrance label */}
        <View style={styles.entranceRow}>
          <View style={styles.entranceLine} />
          <Text style={styles.entranceLabel}>ENTRANCE</Text>
          <View style={styles.entranceLine} />
        </View>

        {/* Row 0 — spots face down */}
        <View style={styles.spotRow}>
          {row0.map(spot => (
            <SpotTile key={spot.id} spot={spot} onPress={() => onSpotPress(spot)} />
          ))}
        </View>

        {/* Drive lane */}
        <View style={styles.driveLane}>
          <View style={styles.laneDash} />
          <Text style={styles.laneLabel}>DRIVE LANE</Text>
          <View style={styles.laneDash} />
        </View>

        {/* Row 1 — spots face up */}
        <View style={styles.spotRow}>
          {row1.map(spot => (
            <SpotTile key={spot.id} spot={spot} onPress={() => onSpotPress(spot)} />
          ))}
        </View>
      </View>
    </View>
  );
}

export default function MapScreen({ navigation }: Props) {
  const [activeLotId, setActiveLotId] = useState(PARKING_LOTS[0].id);
  const activeLot = PARKING_LOTS.find(l => l.id === activeLotId) ?? PARKING_LOTS[0];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={C.crimson} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select a Spot</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerActionBtn} onPress={() => navigation.navigate('Filter')}>
            <Text style={styles.headerActionText}>⚙ Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerActionBtn} onPress={() => navigation.navigate('Events')}>
            <Text style={styles.headerActionText}>📅 Events</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lot Selector Tabs */}
      <View style={styles.tabBar}>
        {PARKING_LOTS.map(lot => (
          <TouchableOpacity
            key={lot.id}
            style={[styles.tab, activeLotId === lot.id && styles.tabActive]}
            onPress={() => setActiveLotId(lot.id)}
          >
            <Text style={[styles.tabText, activeLotId === lot.id && styles.tabTextActive]}>
              {lot.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent} showsVerticalScrollIndicator={false}>
        <LotMap
          lot={activeLot}
          onSpotPress={spot => navigation.navigate('Details', { spot })}
        />

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: C.open }]} />
            <Text style={styles.legendLabel}>Available</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: C.taken }]} />
            <Text style={styles.legendLabel}>Taken</Text>
          </View>
          <Text style={styles.legendNote}>Tap a spot for details</Text>
        </View>

        {/* All Lots Summary */}
        <Text style={styles.sectionLabel}>All Lots</Text>
        {PARKING_LOTS.map(lot => {
          const open = lot.spots.filter(s => s.status === 'open').length;
          const total = lot.spots.length;
          return (
            <TouchableOpacity
              key={lot.id}
              style={styles.lotSummaryCard}
              onPress={() => setActiveLotId(lot.id)}
              activeOpacity={0.8}
            >
              <View style={styles.lotSummaryLeft}>
                <Text style={styles.lotSummaryName}>{lot.name}</Text>
                <Text style={styles.lotSummaryAddr} numberOfLines={1}>{lot.address}</Text>
              </View>
              <View style={styles.lotSummaryRight}>
                <Text style={[styles.lotSummaryCount, { color: open > 0 ? C.open : C.taken }]}>
                  {open}/{total}
                </Text>
                <Text style={styles.lotSummaryLabel}>open</Text>
              </View>
            </TouchableOpacity>
          );
        })}
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
    gap: 8,
  },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 30, color: C.white, fontWeight: '300', lineHeight: 34 },
  headerTitle: { flex: 1, fontSize: 18, fontWeight: '700', color: C.white },
  headerActions: { flexDirection: 'row', gap: 8 },
  headerActionBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  headerActionText: { fontSize: 12, color: C.white, fontWeight: '600' },

  tabBar: {
    flexDirection: 'row',
    backgroundColor: C.crimson,
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  tabActive: { backgroundColor: C.gold },
  tabText: { fontSize: 14, fontWeight: '600', color: 'rgba(255,255,255,0.8)' },
  tabTextActive: { color: C.crimson },

  body: { flex: 1, backgroundColor: C.offWhite },
  bodyContent: { padding: 16, gap: 16, paddingBottom: 40 },

  /* Lot map */
  lotContainer: {
    backgroundColor: C.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 3,
  },
  lotHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.lightGray,
  },
  lotName: { fontSize: 16, fontWeight: '700', color: C.text },
  lotAddress: { fontSize: 12, color: C.textLight, marginTop: 2 },
  lotBadge: {
    backgroundColor: C.openBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  lotBadgeText: { fontSize: 12, fontWeight: '700', color: C.open },

  lotMap: {
    backgroundColor: C.asphalt,
    padding: 16,
    gap: 8,
  },
  entranceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  entranceLine: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.25)' },
  entranceLabel: { fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: 1.5, fontWeight: '600' },
  spotRow: { flexDirection: 'row', gap: 8 },
  driveLane: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
  },
  laneDash: { flex: 1, height: 2, borderStyle: 'dashed', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  laneLabel: { fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: 1.5, fontWeight: '600' },

  /* Spot tile */
  spotTile: {
    width: 72,
    height: 52,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderWidth: 2,
  },
  spotOpen: { backgroundColor: C.openBg, borderColor: C.open },
  spotTaken: { backgroundColor: C.takenBg, borderColor: C.taken },
  spotNumber: { fontSize: 13, fontWeight: '800', color: C.text },
  spotDot: { width: 8, height: 8, borderRadius: 4 },

  /* Legend */
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: C.white,
    borderRadius: 12,
    padding: 12,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 12, height: 12, borderRadius: 6 },
  legendLabel: { fontSize: 13, color: C.text, fontWeight: '500' },
  legendNote: { flex: 1, fontSize: 12, color: C.textLight, textAlign: 'right' },

  /* All Lots section */
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: C.textLight,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  lotSummaryCard: {
    backgroundColor: C.white,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  lotSummaryLeft: { flex: 1 },
  lotSummaryName: { fontSize: 15, fontWeight: '700', color: C.text },
  lotSummaryAddr: { fontSize: 12, color: C.textLight, marginTop: 2 },
  lotSummaryRight: { alignItems: 'center' },
  lotSummaryCount: { fontSize: 20, fontWeight: '800' },
  lotSummaryLabel: { fontSize: 11, color: C.textLight, marginTop: -2 },
});
