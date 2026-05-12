import { ALL_TEAMS } from '@/constants/data';

const API_URL = 'https://api.anthropic.com/v1/messages';

export interface RecognizeResult {
  code: string;
  n: number;
}

export interface RecognizeError {
  type: 'no_key' | 'no_sticker' | 'network' | 'invalid_team';
  message: string;
}

// Reads team code + sticker number from a base64 JPEG image via Claude Haiku vision
export async function recognizeSticker(
  base64: string,
  apiKey: string,
): Promise<RecognizeResult | RecognizeError> {
  if (!apiKey || apiKey.trim() === '') {
    return { type: 'no_key', message: 'Clé API Anthropic manquante.' };
  }

  let responseData: unknown;
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey.trim(),
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 20,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: { type: 'base64', media_type: 'image/jpeg', data: base64 },
              },
              {
                type: 'text',
                text:
                  'This is a Panini FIFA World Cup 2026 sticker. ' +
                  'Find the team code (2-4 uppercase letters like FRA, ARG, USA) and sticker number (1-20). ' +
                  'Reply ONLY in this exact format: CODE-N  (example: FRA-15). ' +
                  'If you cannot read a valid sticker code, reply: UNKNOWN',
              },
            ],
          },
        ],
      }),
    });

    responseData = await res.json();
  } catch {
    return { type: 'network', message: 'Pas de connexion réseau.' };
  }

  const text =
    (responseData as { content?: { text?: string }[] })?.content?.[0]?.text?.trim() ?? '';

  // Parse CODE-N or CODEN
  const match = text.match(/^([A-Z]{2,4})-?(\d{1,2})$/i);
  if (!match) {
    return { type: 'no_sticker', message: 'Sticker non reconnu. Essaie encore ou saisis manuellement.' };
  }

  const code = match[1].toUpperCase();
  const n = parseInt(match[2], 10);

  // Validate against real team data
  const team = ALL_TEAMS.find(t => t.code === code);
  if (!team) {
    return { type: 'invalid_team', message: `Équipe "${code}" introuvable. Code lu : ${text}` };
  }
  const player = team.players.find(p => p.n === n);
  if (!player) {
    return { type: 'invalid_team', message: `Sticker n°${n} introuvable pour ${code}.` };
  }

  return { code, n };
}
