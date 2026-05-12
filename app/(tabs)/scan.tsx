import { FmpButton } from '@/components/FmpButton';
import { ALL_TEAMS } from '@/constants/data';
import { Colors } from '@/constants/colors';
import { Fonts, FontSizes } from '@/constants/fonts';
import { recognizeSticker } from '@/utils/recognizeSticker';
import { recognizeStickerLocal, mlKitAvailable } from '@/utils/recognizeStickerLocal';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
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

// Read API key from Expo env (set EXPO_PUBLIC_ANTHROPIC_KEY in .env)
const API_KEY = process.env.EXPO_PUBLIC_ANTHROPIC_KEY ?? '';

// Flatten all players for search
const ALL_PLAYERS = ALL_TEAMS.flatMap(team =>
  team.players
    .filter(p => p.n !== 1 && p.n !== 13)
    .map(p => ({ ...p, teamCode: team.code, teamName: team.name, teamFlag: team.flag })),
);

export default function ScanScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [mode, setMode] = useState<ScanMode>('camera');
  const [teamCode, setTeamCode] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [playerSearch, setPlayerSearch] = useState('');
  const [recognizing, setRecognizing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cameraRef = useRef<CameraView>(null);
  const scanLineAnim = useRef(new Animated.Value(0)).current;

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

  const handleCapture = async (uri: string, base64?: string) => {
    setRecognizing(true);
    setError(null);
    try {
      // Try ML Kit first — free, offline
      const local = await recognizeStickerLocal(uri);
      if (!('type' in local)) {
        router.push({ pathname: '/scan-result', params: { code: local.code, n: String(local.n) } });
        return;
      }

      // Fallback to Claude Vision API
      if (API_KEY && base64) {
        const cloud = await recognizeSticker(base64, API_KEY);
        if (!('type' in cloud)) {
          router.push({ pathname: '/scan-result', params: { code: cloud.code, n: String(cloud.n) } });
          return;
        }
        setError(cloud.message);
      } else {
        setError(
          local.type === 'no_key'
            ? 'Scan natif non disponible. Ajoutez EXPO_PUBLIC_ANTHROPIC_KEY dans .env pour scanner via API.'
            : local.message,
        );
      }
    } finally {
      setRecognizing(false);
    }
  };

  const handleCameraShutter = async () => {
    if (recognizing || !cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.6, skipProcessing: true });
      if (photo?.uri) handleCapture(photo.uri, photo.base64 ?? undefined);
    } catch {
      setError("Impossible de prendre la photo.");
    }
  };

  const handlePickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      base64: true,
      quality: 0.6,
    });
    if (!result.canceled && result.assets[0]?.uri) {
      handleCapture(result.assets[0].uri, result.assets[0].base64 ?? undefined);
    }
  };

  const handleManualSubmit = () => {
    const code = teamCode.toUpperCase().trim();
    const n = parseInt(cardNum, 10);
    if (!code || !n) return;
    const team = ALL_TEAMS.find(t => t.code === code);
    if (!team) { setError(`Équipe "${code}" introuvable.`); return; }
    const player = team.players.find(p => p.n === n);
    if (!player) { setError(`Sticker n°${n} introuvable pour ${code}.`); return; }
    setError(null);
    router.push({ pathname: '/scan-result', params: { code, n: String(n) } });
  };

  const filteredPlayers = playerSearch.length >= 2
    ? ALL_PLAYERS.filter(p =>
        p.name.toLowerCase().includes(playerSearch.toLowerCase()),
      ).slice(0, 20)
    : [];

  // ── Camera mode ───────────────────────────────────────────────────────────
  if (mode === 'camera') {
    if (!permission) return <View style={styles.safe} />;
    if (!permission.granted) {
      return (
        <SafeAreaView style={styles.safe}>
          <View style={styles.permWrap}>
            <Text style={styles.permEmoji}>📷</Text>
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
        <CameraView ref={cameraRef} style={styles.camera} facing="back">
          <View style={styles.dimTop} />
          <View style={styles.dimRow}>
            <View style={styles.dimSide} />
            <View style={styles.viewfinder}>
              <View style={[styles.bracket, styles.bracketTL]} />
              <View style={[styles.bracket, styles.bracketTR]} />
              <View style={[styles.bracket, styles.bracketBL]} />
              <View style={[styles.bracket, styles.bracketBR]} />
              {!recognizing && (
                <Animated.View style={[styles.scanLine, { transform: [{ translateY: scanLineY }] }]} />
              )}
              {recognizing && (
                <View style={styles.recognizingOverlay}>
                  <ActivityIndicator color={Colors.gold} size="large" />
                  <Text style={styles.recognizingText}>Analyse…</Text>
                </View>
              )}
            </View>
            <View style={styles.dimSide} />
          </View>
          <View style={styles.dimBottom}>
            {error ? (
              <View style={styles.errorBanner}>
                <Text style={styles.errorText}>{error}</Text>
                <Pressable onPress={() => setError(null)}>
                  <Text style={styles.errorDismiss}>✕</Text>
                </Pressable>
              </View>
            ) : (
              <Text style={styles.hint}>
                {mlKitAvailable
                  ? 'Scan gratuit · Hors ligne'
                  : API_KEY
                    ? 'Pointez le sticker dans le cadre · Via API Claude'
                    : '⚠️ Build natif requis ou ajoutez EXPO_PUBLIC_ANTHROPIC_KEY'}
              </Text>
            )}
            <View style={styles.pills}>
              {MODES.map(m => (
                <Pressable
                  key={m.key}
                  onPress={() => { setMode(m.key); setError(null); }}
                  style={[styles.pill, m.key === mode && styles.pillActive]}
                >
                  <Text style={[styles.pillText, m.key === mode && styles.pillTextActive]}>
                    {m.icon} {m.label}
                  </Text>
                </Pressable>
              ))}
            </View>
            <Pressable
              onPress={handleCameraShutter}
              style={[styles.shutter, recognizing && styles.shutterDisabled]}
              disabled={recognizing || (!mlKitAvailable && !API_KEY)}
            >
              {recognizing
                ? <ActivityIndicator color="#FFFFFF" />
                : <View style={styles.shutterInner} />}
            </Pressable>
          </View>
        </CameraView>
      </View>
    );
  }

  // ── Photo library mode ────────────────────────────────────────────────────
  if (mode === 'photo') {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.manualWrap}>
          <Text style={styles.manualTitle}>Depuis la galerie</Text>
          <Text style={styles.manualSub}>
            Choisissez une photo d&apos;un sticker pour l&apos;identifier automatiquement.
          </Text>
          <View style={styles.pills}>
            {MODES.map(m => (
              <Pressable
                key={m.key}
                onPress={() => { setMode(m.key); setError(null); }}
                style={[styles.pill, m.key === mode && styles.pillActive]}
              >
                <Text style={[styles.pillText, m.key === mode && styles.pillTextActive]}>
                  {m.icon} {m.label}
                </Text>
              </Pressable>
            ))}
          </View>
          {error && (
            <View style={styles.errorCard}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          <FmpButton
            label={recognizing ? 'Analyse en cours…' : 'Choisir une photo'}
            icon="🖼️"
            fullWidth
            onPress={handlePickPhoto}
            disabled={recognizing || (!mlKitAvailable && !API_KEY)}
          />
          {!mlKitAvailable && !API_KEY && (
            <Text style={styles.apiHint}>
              {'⚠️ Build natif requis (ML Kit) ou ajoutez EXPO_PUBLIC_ANTHROPIC_KEY dans .env.'}
            </Text>
          )}
          {mlKitAvailable && (
            <Text style={styles.apiHint}>
              {'✓ Scan gratuit via ML Kit · Hors ligne · Sans compte requis'}
            </Text>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── Player search mode ────────────────────────────────────────────────────
  if (mode === 'player') {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.manualWrap}>
          <Text style={styles.manualTitle}>Recherche joueur</Text>
          <View style={styles.pills}>
            {MODES.map(m => (
              <Pressable
                key={m.key}
                onPress={() => { setMode(m.key); setError(null); }}
                style={[styles.pill, m.key === mode && styles.pillActive]}
              >
                <Text style={[styles.pillText, m.key === mode && styles.pillTextActive]}>
                  {m.icon} {m.label}
                </Text>
              </Pressable>
            ))}
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>NOM DU JOUEUR</Text>
            <TextInput
              style={styles.input}
              value={playerSearch}
              onChangeText={setPlayerSearch}
              placeholder="ex: Mbappe, Messi…"
              placeholderTextColor={Colors.gray400}
              autoFocus
            />
          </View>
          <FlatList
            data={filteredPlayers}
            keyExtractor={item => `${item.teamCode}-${item.n}`}
            style={styles.playerList}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <Pressable
                style={styles.playerRow}
                onPress={() => router.push({
                  pathname: '/scan-result',
                  params: { code: item.teamCode, n: String(item.n) },
                })}
              >
                <Text style={styles.playerRowFlag}>{item.teamFlag}</Text>
                <View style={styles.playerRowInfo}>
                  <Text style={styles.playerRowName}>{item.name}</Text>
                  <Text style={styles.playerRowTeam}>
                    {item.teamName} · #{item.n}
                  </Text>
                </View>
                <Text style={styles.playerRowPos}>{item.pos}</Text>
              </Pressable>
            )}
            ListEmptyComponent={
              playerSearch.length >= 2 ? (
                <Text style={styles.emptyText}>Aucun joueur trouvé</Text>
              ) : (
                <Text style={styles.emptyText}>Saisissez au moins 2 caractères</Text>
              )
            }
          />
        </View>
      </SafeAreaView>
    );
  }

  // ── Manual number entry mode ───────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.manualWrap} keyboardShouldPersistTaps="handled">
        <Text style={styles.manualTitle}>Saisie manuelle</Text>
        <View style={styles.pills}>
          {MODES.map(m => (
            <Pressable
              key={m.key}
              onPress={() => { setMode(m.key); setError(null); }}
              style={[styles.pill, m.key === mode && styles.pillActive]}
            >
              <Text style={[styles.pillText, m.key === mode && styles.pillTextActive]}>
                {m.icon} {m.label}
              </Text>
            </Pressable>
          ))}
        </View>
        {error && (
          <View style={styles.errorCard}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>CODE ÉQUIPE</Text>
          <TextInput
            style={styles.input}
            value={teamCode}
            onChangeText={v => { setTeamCode(v); setError(null); }}
            placeholder="ex: FRA"
            autoCapitalize="characters"
            maxLength={4}
            placeholderTextColor={Colors.gray400}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>NUMÉRO DE STICKER</Text>
          <TextInput
            style={styles.input}
            value={cardNum}
            onChangeText={v => { setCardNum(v); setError(null); }}
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
          onPress={handleManualSubmit}
          disabled={!teamCode || !cardNum}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.dark },
  cameraContainer: { flex: 1 },
  camera: { flex: 1 },
  dimTop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.65)' },
  dimRow: { flexDirection: 'row', height: 240 },
  dimSide: { flex: 1, backgroundColor: 'rgba(0,0,0,0.65)' },
  viewfinder: { width: 220, height: 240, position: 'relative', overflow: 'hidden' },
  bracket: { position: 'absolute', width: 24, height: 24, borderColor: Colors.gold, borderWidth: 3 },
  bracketTL: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  bracketTR: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  bracketBL: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  bracketBR: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  scanLine: {
    position: 'absolute', left: 0, right: 0, height: 2,
    backgroundColor: Colors.gold,
    shadowColor: Colors.gold, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1, shadowRadius: 4,
  },
  recognizingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  recognizingText: {
    fontFamily: Fonts.body, fontSize: FontSizes.sm,
    color: Colors.gold, fontWeight: '600',
  },
  dimBottom: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.65)',
    alignItems: 'center', paddingTop: 12, paddingHorizontal: 16,
  },
  hint: {
    fontFamily: Fonts.body, fontSize: FontSizes.sm,
    color: 'rgba(255,255,255,0.6)', marginBottom: 12, textAlign: 'center',
  },
  errorBanner: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(227,30,36,0.9)',
    borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8,
    marginBottom: 12, gap: 8, maxWidth: '90%',
  },
  errorCard: {
    backgroundColor: 'rgba(227,30,36,0.15)',
    borderRadius: 10, padding: 14,
    borderWidth: 1, borderColor: Colors.red,
  },
  errorText: {
    fontFamily: Fonts.body, fontSize: FontSizes.sm,
    color: '#FFFFFF', flex: 1,
  },
  errorDismiss: { color: '#FFFFFF', fontSize: 14, fontWeight: '700', paddingLeft: 4 },
  pills: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 8,
    justifyContent: 'center', marginBottom: 16, paddingHorizontal: 8,
  },
  pill: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
  },
  pillActive: { backgroundColor: Colors.red, borderColor: Colors.red },
  pillText: {
    fontFamily: Fonts.body, fontSize: FontSizes.xs,
    color: 'rgba(255,255,255,0.7)', fontWeight: '500',
  },
  pillTextActive: { color: '#FFFFFF', fontWeight: '700' },
  shutter: {
    width: 72, height: 72, borderRadius: 36,
    borderWidth: 4, borderColor: '#FFFFFF',
    alignItems: 'center', justifyContent: 'center', marginTop: 4,
  },
  shutterDisabled: { borderColor: 'rgba(255,255,255,0.3)', opacity: 0.6 },
  shutterInner: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#FFFFFF' },
  permWrap: {
    flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 16,
  },
  permEmoji: { fontSize: 48 },
  permTitle: {
    fontFamily: Fonts.display, fontSize: FontSizes['2xl'],
    color: '#FFFFFF', textAlign: 'center',
  },
  permSub: {
    fontFamily: Fonts.body, fontSize: FontSizes.base,
    color: Colors.gray400, textAlign: 'center', lineHeight: 22,
  },
  manualWrap: { flexGrow: 1, padding: 24, gap: 20 },
  manualTitle: {
    fontFamily: Fonts.display, fontSize: FontSizes['2xl'],
    color: '#FFFFFF', letterSpacing: 1,
  },
  manualSub: {
    fontFamily: Fonts.body, fontSize: FontSizes.sm,
    color: Colors.gray400, lineHeight: 20, marginTop: -12,
  },
  inputGroup: { gap: 6 },
  inputLabel: {
    fontFamily: Fonts.mono, fontSize: FontSizes.xs,
    color: Colors.gray400, letterSpacing: 1,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 12,
    paddingHorizontal: 16, paddingVertical: 14,
    fontFamily: Fonts.body, fontSize: FontSizes.lg,
    color: '#FFFFFF', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
  },
  apiHint: {
    fontFamily: Fonts.body, fontSize: FontSizes.xs,
    color: Colors.gold, textAlign: 'center', lineHeight: 18,
  },
  playerList: { flex: 1, marginTop: -8 },
  playerRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 12, paddingHorizontal: 4,
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)', gap: 12,
  },
  playerRowFlag: { fontSize: 24 },
  playerRowInfo: { flex: 1 },
  playerRowName: {
    fontFamily: Fonts.body, fontSize: FontSizes.base,
    color: '#FFFFFF', fontWeight: '600',
  },
  playerRowTeam: {
    fontFamily: Fonts.mono, fontSize: FontSizes.xs,
    color: Colors.gray400, marginTop: 2,
  },
  playerRowPos: {
    fontFamily: Fonts.mono, fontSize: FontSizes.xs,
    color: Colors.gold, fontWeight: '700',
  },
  emptyText: {
    fontFamily: Fonts.body, fontSize: FontSizes.sm,
    color: Colors.gray400, textAlign: 'center', marginTop: 24,
  },
});
