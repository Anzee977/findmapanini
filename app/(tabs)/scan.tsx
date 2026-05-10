import { FmpButton } from '@/components/FmpButton';
import { Colors } from '@/constants/colors';
import { Fonts, FontSizes } from '@/constants/fonts';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type ScanMode = 'camera' | 'photo' | 'number' | 'player';

const MODES: { key: ScanMode; label: string; icon: string }[] = [
  { key: 'camera', label: 'Caméra', icon: '📷' },
  { key: 'photo', label: 'Photo', icon: '🖼️' },
  { key: 'number', label: 'N°', icon: '🔢' },
  { key: 'player', label: 'Joueur', icon: '⚽' },
];

export default function ScanScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [mode, setMode] = useState<ScanMode>('camera');
  const [teamCode, setTeamCode] = useState('');
  const [cardNum, setCardNum] = useState('');
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  // Animate scan line
  React.useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(scanLineAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const navigateToResult = () => {
    const code = teamCode.toUpperCase() || 'FRA';
    const n = parseInt(cardNum, 10) || 1;
    router.push({ pathname: '/scan-result', params: { code, n: String(n) } });
  };

  // Camera mode
  if (mode === 'camera') {
    if (!permission) return <View style={styles.safe} />;
    if (!permission.granted) {
      return (
        <SafeAreaView style={styles.safe}>
          <View style={styles.permWrap}>
            <Text style={styles.permText}>📷</Text>
            <Text style={styles.permTitle}>Accès caméra requis</Text>
            <Text style={styles.permSub}>
              FindMyPanini a besoin de la caméra pour scanner vos stickers.
            </Text>
            <FmpButton label="Autoriser" onPress={requestPermission} />
          </View>
        </SafeAreaView>
      );
    }

    const scanLineY = scanLineAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 200],
    });

    return (
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing="back">
          {/* Dim overlay */}
          <View style={styles.dimTop} />
          <View style={styles.dimRow}>
            <View style={styles.dimSide} />
            {/* Viewfinder */}
            <View style={styles.viewfinder}>
              {/* Brackets */}
              <View style={[styles.bracket, styles.bracketTL]} />
              <View style={[styles.bracket, styles.bracketTR]} />
              <View style={[styles.bracket, styles.bracketBL]} />
              <View style={[styles.bracket, styles.bracketBR]} />
              {/* Scan line */}
              <Animated.View
                style={[styles.scanLine, { transform: [{ translateY: scanLineY }] }]}
              />
            </View>
            <View style={styles.dimSide} />
          </View>
          <View style={styles.dimBottom}>
            <Text style={styles.hint}>Pointez la caméra vers le sticker</Text>
            {/* Mode pills */}
            <View style={styles.pills}>
              {MODES.map(m => (
                <Pressable
                  key={m.key}
                  onPress={() => setMode(m.key)}
                  style={[styles.pill, m.key === mode && styles.pillActive]}
                >
                  <Text style={[styles.pillText, m.key === mode && styles.pillTextActive]}>
                    {m.icon} {m.label}
                  </Text>
                </Pressable>
              ))}
            </View>
            {/* Shutter */}
            <Pressable onPress={navigateToResult} style={styles.shutter}>
              <View style={styles.shutterInner} />
            </Pressable>
          </View>
        </CameraView>
      </View>
    );
  }

  // Manual entry mode (number or player)
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.manualWrap}>
        <Text style={styles.manualTitle}>Saisie manuelle</Text>

        {/* Mode selector */}
        <View style={styles.pills}>
          {MODES.map(m => (
            <Pressable
              key={m.key}
              onPress={() => setMode(m.key)}
              style={[styles.pill, m.key === mode && styles.pillActive]}
            >
              <Text style={[styles.pillText, m.key === mode && styles.pillTextActive]}>
                {m.icon} {m.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>CODE ÉQUIPE</Text>
          <TextInput
            style={styles.input}
            value={teamCode}
            onChangeText={setTeamCode}
            placeholder="ex: FRA"
            autoCapitalize="characters"
            maxLength={3}
            placeholderTextColor={Colors.gray400}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>NUMÉRO DE STICKER</Text>
          <TextInput
            style={styles.input}
            value={cardNum}
            onChangeText={setCardNum}
            placeholder="1 – 20"
            keyboardType="number-pad"
            maxLength={2}
            placeholderTextColor={Colors.gray400}
          />
        </View>

        <FmpButton
          label="Identifier le sticker"
          icon="🔍"
          fullWidth
          onPress={navigateToResult}
          disabled={!teamCode || !cardNum}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  dimTop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  dimRow: {
    flexDirection: 'row',
    height: 240,
  },
  dimSide: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  viewfinder: {
    width: 220,
    height: 240,
    position: 'relative',
    overflow: 'hidden',
  },
  bracket: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: Colors.gold,
    borderWidth: 3,
  },
  bracketTL: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  bracketTR: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  bracketBL: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  bracketBR: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: Colors.gold,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  dimBottom: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    alignItems: 'center',
    paddingTop: 16,
  },
  hint: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.sm,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 12,
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  pillActive: {
    backgroundColor: Colors.red,
    borderColor: Colors.red,
  },
  pillText: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.xs,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  pillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  shutter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  shutterInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
  },
  permWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 16,
  },
  permText: {
    fontSize: 48,
  },
  permTitle: {
    fontFamily: Fonts.display,
    fontSize: FontSizes['2xl'],
    color: '#FFFFFF',
    textAlign: 'center',
  },
  permSub: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.base,
    color: Colors.gray400,
    textAlign: 'center',
    lineHeight: 22,
  },
  manualWrap: {
    flex: 1,
    padding: 24,
    gap: 20,
  },
  manualTitle: {
    fontFamily: Fonts.display,
    fontSize: FontSizes['2xl'],
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    fontFamily: Fonts.mono,
    fontSize: FontSizes.xs,
    color: Colors.gray400,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: Fonts.body,
    fontSize: FontSizes.lg,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
});
