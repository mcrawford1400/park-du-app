import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootNavProp } from '@/navigation/types';

const C = {
  crimson: '#8B1A2D',
  white: '#FFFFFF',
  offWhite: '#F7F7F7',
  lightGray: '#EFEFEF',
  mediumGray: '#C8C8C8',
  text: '#1A1A1A',
  textLight: '#666666',
};

type Props = { navigation: RootNavProp<'Filter'> };

function Chip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function FilterScreen({ navigation }: Props) {
  const [size, setSize] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [time, setTime] = useState<string | null>(null);

  function toggleArr(arr: string[], val: string, set: (a: string[]) => void) {
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={C.crimson} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filter Spots</Text>
        <TouchableOpacity onPress={() => { setSize([]); setStatus([]); setTime(null); }}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Vehicle Size</Text>
          <View style={styles.chips}>
            {['Compact', 'Standard', 'Large'].map(s => (
              <Chip key={s} label={s} selected={size.includes(s)} onPress={() => toggleArr(size, s, setSize)} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Availability</Text>
          <View style={styles.chips}>
            {['Available', 'Taken'].map(s => (
              <Chip key={s} label={s} selected={status.includes(s)} onPress={() => toggleArr(status, s, setStatus)} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Time Limit</Text>
          <View style={styles.chips}>
            {['2 hr', '4 hr', 'All day'].map(t => (
              <Chip key={t} label={t} selected={time === t} onPress={() => setTime(time === t ? null : t)} />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.applyBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <Text style={styles.applyBtnText}>Apply Filters</Text>
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
  resetText: { fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: '600', width: 48, textAlign: 'right' },
  body: { flex: 1, backgroundColor: C.offWhite },
  content: { padding: 16, gap: 20, paddingBottom: 20 },
  section: { gap: 10 },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: C.textLight,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: C.white,
    borderWidth: 1.5,
    borderColor: C.mediumGray,
  },
  chipSelected: { backgroundColor: C.crimson, borderColor: C.crimson },
  chipText: { fontSize: 14, fontWeight: '600', color: C.text },
  chipTextSelected: { color: C.white },
  footer: {
    backgroundColor: C.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: C.lightGray,
  },
  applyBtn: {
    backgroundColor: C.crimson,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  applyBtnText: { fontSize: 16, fontWeight: '700', color: C.white },
});
