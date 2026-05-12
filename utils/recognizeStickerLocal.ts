import { ALL_TEAMS } from '@/constants/data';
import type { RecognizeResult, RecognizeError } from './recognizeSticker';

type MLKitResult = {
  text: string;
  blocks: { text: string; lines: { text: string }[] }[];
};

export let mlKitAvailable = false;
let _TR: { recognize(uri: string): Promise<MLKitResult> } | null = null;

try {
  // Dynamic require — crashes in Expo Go since native module not linked there
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  _TR = (require('@react-native-ml-kit/text-recognition') as { default: typeof _TR }).default;
  mlKitAvailable = !!_TR;
} catch { /* Expo Go — fall back to Claude API */ }

const TEAM_CODES = new Set(ALL_TEAMS.map(t => t.code));

function findInText(raw: string): RecognizeResult | null {
  const text = raw.toUpperCase().replace(/[\n\r]/g, ' ');

  // Strategy 1: explicit "CODE-N" / "CODE N" / "CODEN" pattern
  const re = /\b([A-Z]{2,4})[\s\-]?(\d{1,2})\b/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const code = m[1];
    const n = parseInt(m[2], 10);
    if (!TEAM_CODES.has(code) || n < 1 || n > 20) continue;
    const team = ALL_TEAMS.find(t => t.code === code)!;
    if (team.players.find(p => p.n === n)) return { code, n };
  }

  // Strategy 2: isolated team code word, then closest number 1–20
  const words = text.split(/\W+/).filter(Boolean);
  for (let i = 0; i < words.length; i++) {
    if (!TEAM_CODES.has(words[i])) continue;
    const code = words[i];
    for (let j = Math.max(0, i - 3); j < Math.min(words.length, i + 4); j++) {
      if (j === i) continue;
      const n = parseInt(words[j], 10);
      if (Number.isNaN(n) || n < 1 || n > 20) continue;
      const team = ALL_TEAMS.find(t => t.code === code)!;
      if (team.players.find(p => p.n === n)) return { code, n };
    }
  }

  return null;
}

export async function recognizeStickerLocal(
  imageUri: string,
): Promise<RecognizeResult | RecognizeError> {
  if (!_TR) {
    return { type: 'no_key', message: 'ML Kit non disponible (build natif requis).' };
  }
  try {
    const result = await _TR.recognize(imageUri);
    const full = findInText(result.text);
    if (full) return full;
    for (const block of result.blocks) {
      const hit = findInText(block.text);
      if (hit) return hit;
    }
    return { type: 'no_sticker', message: 'Sticker non reconnu. Essaie encore ou saisis manuellement.' };
  } catch {
    return { type: 'network', message: 'Erreur ML Kit. Essaie encore.' };
  }
}
