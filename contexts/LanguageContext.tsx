'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import ko from '@/locales/ko.json';
import en from '@/locales/en.json';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Locale = 'ko' | 'en';
type Messages = typeof ko;

interface LanguageContextType {
  locale: Locale;
  messages: Messages;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const [locale, setLocale] = useState<Locale>((lang as Locale) || 'ko'); // 기본값 한국어
  // localStorage에서 언어 불러오기
  useEffect(() => {
    if (lang) {
      localStorage.setItem('locale', lang);
      setLocale(lang as Locale);
    } else {
      const saved = localStorage.getItem('locale') as Locale | null;
      if (saved) {
        setLocale(saved);
      }
    }
  }, []);

  // localStorage에 저장
  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  const messages = locale === 'ko' ? ko : en;

  const toggleLanguage = () => {
    setLocale((prev) => (prev === 'ko' ? 'en' : 'ko'));
    if (lang) {
      const currentParams = new URLSearchParams(
        Array.from(searchParams.entries())
      );
      currentParams.set('lang', lang);

      router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, messages, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
