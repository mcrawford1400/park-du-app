import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootNavProp, RootRouteProp } from '@/navigation/types';

const C = {
  crimson: '#8B1A2D',
  white: '#FFFFFF',
  offWhite: '#F7F7F7',
  lightGray: '#EFEFEF',
  mediumGray: '#C8C8C8',
  text: '#1A1A1A',
  textLight: '#666666',
  open: '#34C759',
};

type Props = {
  navigation: RootNavProp<'Payment'>;
  route: RootRouteProp<'Payment'>;
};

export default function PaymentScreen({ navigation, route }: Props) {
  const { spot } = route.params;
  const [card, setCard] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={C.crimson} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
        {/* Order Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Spot {spot.number} — {spot.lot}</Text>
            <Text style={styles.summaryValue}>$5.00</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service Fee</Text>
            <Text style={styles.summaryValue}>$0.00</Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryTotal]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>$5.00</Text>
          </View>
        </View>

        {/* Payment Form */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment Details</Text>
          <Text style={styles.fieldLabel}>Card Number</Text>
          <TextInput
            style={styles.input}
            placeholder="1234 5678 9012 3456"
            keyboardType="numeric"
            value={card}
            onChangeText={setCard}
            maxLength={19}
          />
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.fieldLabel}>Expiry</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                keyboardType="numeric"
                value={expiry}
                onChangeText={setExpiry}
                maxLength={5}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.fieldLabel}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder="•••"
                keyboardType="numeric"
                secureTextEntry
                value={cvv}
                onChangeText={setCvv}
                maxLength={4}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.actionArea}>
        <TouchableOpacity
          style={styles.payBtn}
          onPress={() => navigation.navigate('Confirmation', { spot })}
          activeOpacity={0.85}
        >
          <Text style={styles.payBtnText}>Pay $5.00 &amp; Reserve</Text>
        </TouchableOpacity>
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
  card: {
    backgroundColor: C.white,
    borderRadius: 16,
    padding: 16,
    gap: 10,
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
    marginBottom: 4,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  summaryLabel: { fontSize: 15, color: C.text },
  summaryValue: { fontSize: 15, color: C.text, fontWeight: '600' },
  summaryTotal: { borderTopWidth: 1, borderTopColor: C.lightGray, marginTop: 4, paddingTop: 12 },
  totalLabel: { fontSize: 16, fontWeight: '700', color: C.text },
  totalValue: { fontSize: 18, fontWeight: '800', color: C.crimson },
  fieldLabel: { fontSize: 13, color: C.textLight, fontWeight: '600', marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: C.mediumGray,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    backgroundColor: C.offWhite,
    color: C.text,
  },
  row: { flexDirection: 'row', gap: 12 },
  actionArea: {
    backgroundColor: C.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: C.lightGray,
  },
  payBtn: {
    backgroundColor: C.crimson,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  payBtnText: { fontSize: 16, fontWeight: '700', color: C.white },
});
