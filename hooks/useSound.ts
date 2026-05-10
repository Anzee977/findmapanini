import { Audio } from 'expo-av';
import { useCallback } from 'react';

let beepSound: Audio.Sound | null = null;
let stickSound: Audio.Sound | null = null;

async function loadSounds() {
  try {
    if (!beepSound) {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/beep.mp3'),
        { shouldPlay: false },
      );
      beepSound = sound;
    }
    if (!stickSound) {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/stick.mp3'),
        { shouldPlay: false },
      );
      stickSound = sound;
    }
  } catch {
    // sounds are optional
  }
}

loadSounds();

export function useSound() {
  const playBeep = useCallback(async () => {
    try {
      await beepSound?.replayAsync();
    } catch {}
  }, []);

  const playStick = useCallback(async () => {
    try {
      await stickSound?.replayAsync();
    } catch {}
  }, []);

  return { playBeep, playStick };
}
