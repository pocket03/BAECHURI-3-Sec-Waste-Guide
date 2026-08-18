"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Lang } from "@/lib/types";

const STORAGE_KEY = "baechuri-lang";
const DEFAULT_LANG: Lang = "ko";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  ready: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // 최초 렌더는 SSR과 동일하게 기본값으로 그린 뒤, 마운트 후에만 저장된 언어를 반영합니다
    // (하이드레이션 불일치 방지 목적의 의도적인 패턴입니다).
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === "ko" || stored === "en" || stored === "zh" || stored === "vi") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(stored);
    }
    setReady(true);
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, ready }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
