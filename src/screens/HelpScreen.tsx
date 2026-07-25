import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootNavProp } from '@/navigation/types';

const C = {
  crimson: '#8B1A2D',
  white: '#FFFFFF',
  offWhite: '#F7F7F7',
  lightGray: '#EFEFEF',
  text: '#1A1A1A',
  textLight: '#666666',
};

const FAQ = [
  { q: 'How do I reserve a spot?', a: 'Tap "Parking Map" on the Home screen, select a lot, tap a green (available) spot, then tap "Reserve This Spot" and complete checkout.' },
  { q: 'Can I cancel my reservation?', a: 'Yes — go to Saved Spots, find your reservation, and tap "Cancel." Cancellations must be made 30 minutes before start time for a full refund.' },
  { q: 'What does the time limit mean?', a: 'The time limit is the maximum consecutive hours you can park in that spot. All-day spots have no time restriction.' },
  { q: 'Are weekends free?', a: 'All DU campus lots are free Saturday and Sunday. No permit or payment required.' },
  { q: 'What if a spot is taken when I arrive?', a: 'Contact Parking Services immediately at (303) 871-2643. Spot availability reflects real-time data but may have delays.' },
];

type Props = { navigation: RootNavProp<'Help'> };

export default function HelpScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={C.crimson} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help &amp; Contact</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.content}>

        {/* Contact */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Contact Parking Services</Text>
          <TouchableOpacity style={styles.contactRow} onPress={() => Linking.openURL('tel:3038712643')}>
            <Text style={styles.contactIcon}>📞</Text>
            <Text style={styles.contactLabel}>(303) 871-2643</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.contactRow} onPress={() => Linking.openURL('mailto:parking@du.edu')}>
            <Text style={styles.contactIcon}>✉️</Text>
            <Text style={styles.contactLabel}>parking@du.edu</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <View style={styles.contactRow}>
            <Text style={styles.contactIcon}>🏢</Text>
            <Text style={styles.contactLabel}>Mon–Fri  8:00 AM – 5:00 PM</Text>
          </View>
        </View>

        {/* FAQ */}
        <Text style={styles.sectionLabel}>Frequently Asked Questions</Text>
        {FAQ.map((item, i) => (
          <View key={i} style={styles.faqCard}>
            <Text style={styles.faqQ}>{item.q}</Text>
            <Text style={styles.faqA}>{item.a}</Text>
          </View>
        ))}
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
    marginTop: 8,
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
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: C.textLight,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    padding: 14,
    paddingBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  contactIcon: { fontSize: 18 },
  contactLabel: { fontSize: 15, color: C.text, fontWeight: '500' },
  divider: { height: 1, backgroundColor: C.lightGray, marginHorizontal: 14 },
  faqCard: {
    backgroundColor: C.white,
    borderRadius: 14,
    padding: 14,
    gap: 6,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 1,
  },
  faqQ: { fontSize: 14, fontWeight: '700', color: C.text },
  faqA: { fontSize: 13, color: C.textLight, lineHeight: 19 },
});
