import { Colors } from '@/constants/colors';
import { Fonts, FontSizes } from '@/constants/fonts';
import { LANGUAGES, useI18n } from '@/constants/i18n';
import React, { useState } from 'react';
import { Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export function LanguageSelector() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find(l => l.code === lang);

  return (
    <>
      <Pressable onPress={() => setOpen(true)} style={styles.trigger}>
        <Text style={styles.flag}>{current?.flag ?? '🌐'}</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <SafeAreaView>
            <Pressable style={styles.sheet} onPress={e => e.stopPropagation()}>
              <Text style={styles.title}>{t('langTitle')}</Text>
              {LANGUAGES.map(l => (
                <Pressable
                  key={l.code}
                  onPress={() => { setLang(l.code); setOpen(false); }}
                  style={[styles.row, l.code === lang && styles.rowActive]}
                >
                  <Text style={styles.rowFlag}>{l.flag}</Text>
                  <Text style={[styles.rowName, l.code === lang && styles.rowNameActive]}>
                    {l.name}
                  </Text>
                  {l.code === lang && <Text style={styles.check}>✓</Text>}
                </Pressable>
              ))}
            </Pressable>
          </SafeAreaView>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center', justifyContent: 'center',
  },
  flag: { fontSize: 18 },
  backdrop: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.dark,
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
    paddingTop: 20, paddingBottom: 32, paddingHorizontal: 20, gap: 4,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    fontFamily: Fonts.display, fontSize: FontSizes.xl,
    color: '#FFFFFF', letterSpacing: 1, marginBottom: 12,
  },
  row: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, paddingHorizontal: 12,
    borderRadius: 12, gap: 14,
  },
  rowActive: { backgroundColor: 'rgba(255,215,0,0.1)' },
  rowFlag: { fontSize: 24 },
  rowName: {
    flex: 1, fontFamily: Fonts.body, fontSize: FontSizes.base,
    color: 'rgba(255,255,255,0.7)', fontWeight: '500',
  },
  rowNameActive: { color: Colors.gold, fontWeight: '700' },
  check: { color: Colors.gold, fontSize: 18, fontWeight: '700' },
});
