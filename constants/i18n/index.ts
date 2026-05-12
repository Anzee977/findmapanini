import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { LangCode, T } from './types';
export type { LangCode };
export { LANGUAGES } from './types';
import en from './en';
import fr from './fr';
import nl from './nl';
import es from './es';
import de from './de';
import it from './it';
import pt from './pt';

const ALL: Record<LangCode, T> = { en, fr, nl, es, de, it, pt };
const SUPPORTED = Object.keys(ALL) as LangCode[];
const STORAGE_KEY = 'fmp:lang';

function detectLang(): LangCode {
  const code = getLocales()[0]?.languageCode ?? 'en';
  return (SUPPORTED.find(l => code.startsWith(l)) ?? 'en') as LangCode;
}

interface I18nCtx {
  t: (key: keyof T) => string;
  lang: LangCode;
  setLang: (l: LangCode) => void;
}

const I18nContext = createContext<I18nCtx>({
  t: k => en[k],
  lang: 'en',
  setLang: () => {},
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>('fr');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(saved => {
      if (saved && SUPPORTED.includes(saved as LangCode)) {
        setLangState(saved as LangCode);
      } else {
        setLangState(detectLang());
      }
    });
  }, []);

  const setLang = useCallback((l: LangCode) => {
    setLangState(l);
    AsyncStorage.setItem(STORAGE_KEY, l);
  }, []);

  const translations = ALL[lang];
  const t = useCallback((key: keyof T) => translations[key] ?? en[key], [translations]);

  return React.createElement(I18nContext.Provider, { value: { t, lang, setLang } }, children);
}

export function useI18n() {
  return useContext(I18nContext);
}
