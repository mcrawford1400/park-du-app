import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
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
  taken: '#FF3B30',
  takenBg: '#FFE8E7',
  warningBg: '#FFF3CD',
  warningText: '#856404',
};

const VEHICLE_ICONS: Record<string, string> = {
  compact: '🚗',
  standard: '🚙',
  large: '🚐',
};

type Props = {
  navigation: RootNavProp<'Details'>;
  route: RootRouteProp<'Details'>;
};

function InfoRow({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, accent ? { color: accent } : null]}>{value}</Text>
    </View>
  );
}

export default function DetailsScreen({ navigation, route }: Props) {
  const { spot } = route.params;
  const isOpen = spot.status === 'open';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={C.crimson} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Spot {spot.number}</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent} showsVerticalScrollIndicator={false}>

        {/* Status Hero */}
        <View style={[styles.heroCard, { backgroundColor: isOpen ? C.openBg : C.takenBg }]}>
          <View style={styles.heroTop}>
            <View style={styles.heroSpotInfo}>
              <Text style={styles.heroSpotNum}>{spot.number}</Text>
              <Text style={styles.heroLot}>{spot.lot}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: isOpen ? C.open : C.taken }]}>
              <Text style={styles.statusBadgeText}>{isOpen ? 'AVAILABLE' : 'TAKEN'}</Text>
            </View>
          </View>

          {!isOpen && spot.reservedUntil && (
            <View style={styles.reservedBanner}>
              <Text style={styles.reservedIcon}>🕐</Text>
              <Text style={styles.reservedText}>Reserved until {spot.reservedUntil}</Text>
            </View>
          )}
        </View>

        {/* Details Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Spot Details</Text>
          <InfoRow label="Daily Rate"  value={`$${spot.price}.00 / day`} accent={C.crimson} />
          <View style={styles.divider} />
          <InfoRow label="Distance"    value={spot.distance} />
          <View style={styles.divider} />
          <InfoRow label="Time Limit"  value={spot.timeLimit} />
          <View style={styles.divider} />
          <InfoRow
            label="Vehicle Size"
            value={`${VEHICLE_ICONS[spot.vehicleSize]}  ${spot.vehicleSize.charAt(0).toUpperCase() + spot.vehicleSize.slice(1)}`}
          />
        </View>

        {/* Policies Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Policies</Text>
          <View style={styles.policyItem}>
            <Text style={styles.policyIcon}>📋</Text>
            <Text style={styles.policyText}>Permit required Mon–Fri 7 AM–5 PM</Text>
          </View>
          <View style={styles.policyItem}>
            <Text style={styles.policyIcon}>🆓</Text>
            <Text style={styles.policyText}>Free parking weekends &amp; holidays</Text>
          </View>
          <View style={styles.policyItem}>
            <Text style={styles.policyIcon}>♿</Text>
            <Text style={styles.policyText}>ADA spots available near entrance</Text>
          </View>
        </View>

      </ScrollView>

      {/* Action Button */}
      <View style={styles.actionArea}>
        {isOpen ? (
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: C.crimson }]}
            onPress={() => navigation.navigate('Payment', { spot })}
            activeOpacity={0.85}
          >
            <Text style={styles.actionBtnText}>Reserve This Spot — $5.00</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.takenAction}>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: C.textLight }]}
              activeOpacity={0.85}
            >
              <Text style={styles.actionBtnText}>Join Waitlist</Text>
            </TouchableOpacity>
            <Text style={styles.takenNote}>
              Available after {spot.reservedUntil ?? 'unknown'}
            </Text>
          </View>
        )}
      </View>
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
  bodyContent: { padding: 16, gap: 12, paddingBottom: 20 },

  /* Hero */
  heroCard: {
    borderRadius: 16,
    padding: 20,
    gap: 12,
  },
  heroTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  heroSpotInfo: {},
  heroSpotNum: { fontSize: 42, fontWeight: '900', color: C.text, lineHeight: 46 },
  heroLot: { fontSize: 16, color: C.textLight, fontWeight: '500' },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusBadgeText: { fontSize: 12, fontWeight: '800', color: C.white, letterSpacing: 1 },
  reservedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0,0,0,0.06)',
    borderRadius: 10,
    padding: 10,
  },
  reservedIcon: { fontSize: 16 },
  reservedText: { fontSize: 14, fontWeight: '600', color: C.text },

  /* Cards */
  card: {
    backgroundColor: C.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: C.textLight,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  infoLabel: { fontSize: 15, color: C.textLight, fontWeight: '500' },
  infoValue: { fontSize: 15, color: C.text, fontWeight: '700' },
  divider: { height: 1, backgroundColor: C.lightGray },

  policyItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 8 },
  policyIcon: { fontSize: 16, lineHeight: 22 },
  policyText: { flex: 1, fontSize: 14, color: C.text, lineHeight: 20 },

  /* Action */
  actionArea: {
    backgroundColor: C.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: C.lightGray,
  },
  actionBtn: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  actionBtnText: { fontSize: 16, fontWeight: '700', color: C.white },
  takenAction: { gap: 8 },
  takenNote: { fontSize: 13, color: C.textLight, textAlign: 'center' },
});
