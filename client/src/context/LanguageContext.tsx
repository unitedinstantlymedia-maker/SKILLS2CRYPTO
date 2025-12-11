import React, { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES, Language } from '@/data/languages';

type LanguageContextType = {
  currentLanguage: Language;
  setLanguage: (code: string) => void;
  t: (key: string, defaultText?: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple dictionary for demo purposes
// In a real app, this would be loaded from JSON files
const TRANSLATIONS: Record<string, Record<string, string>> = {
  'es': {
    'Select Game': 'Seleccionar Juego',
    'Lobby': 'Vestíbulo',
    'Find Match': 'Buscar Partido',
    'Wager Amount': 'Cantidad de Apuesta',
    'Select Asset': 'Seleccionar Activo',
    'Balance': 'Saldo',
    'Pot Size': 'Tamaño del Bote',
    'Fee': 'Tarifa',
    'Potential Win': 'Ganancia Potencial',
    'History': 'Historial',
    'Profile': 'Perfil',
    'Home': 'Inicio',
    'Wallet': 'Billetera',
    'Play': 'Jugar',
    'Cancel Search': 'Cancelar Búsqueda',
    'Searching for opponent...': 'Buscando oponente...',
  },
  'zh': {
    'Select Game': '选择游戏',
    'Lobby': '大厅',
    'Find Match': '寻找比赛',
    'Wager Amount': '下注金额',
    'Select Asset': '选择资产',
    'Balance': '余额',
    'Pot Size': '奖池大小',
    'Fee': '费用',
    'Potential Win': '潜在赢利',
    'History': '历史',
    'Profile': '个人资料',
    'Home': '主页',
    'Wallet': '钱包',
    'Play': '玩',
    'Cancel Search': '取消搜索',
    'Searching for opponent...': '正在寻找对手...',
  },
  'fr': {
    'Select Game': 'Choisir un jeu',
    'Lobby': 'Salon',
    'Find Match': 'Trouver un match',
    'Wager Amount': 'Montant de la mise',
    'Select Asset': 'Choisir un actif',
    'Balance': 'Solde',
    'Pot Size': 'Taille du pot',
    'Fee': 'Frais',
    'Potential Win': 'Gain potentiel',
    'History': 'Historique',
    'Profile': 'Profil',
    'Home': 'Accueil',
    'Wallet': 'Portefeuille',
    'Play': 'Jouer',
    'Cancel Search': 'Annuler la recherche',
    'Searching for opponent...': 'Recherche d\'adversaire...',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [languageCode, setLanguageCode] = useState('en');

  // Load from local storage on mount
  useEffect(() => {
    const stored = localStorage.getItem('skillblitz_language');
    if (stored && LANGUAGES.find(l => l.code === stored)) {
      setLanguageCode(stored);
    }
  }, []);

  const setLanguage = (code: string) => {
    setLanguageCode(code);
    localStorage.setItem('skillblitz_language', code);
  };

  const currentLanguage = LANGUAGES.find(l => l.code === languageCode) || LANGUAGES[0];

  const t = (key: string, defaultText?: string) => {
    if (languageCode === 'en') return defaultText || key;
    
    const dict = TRANSLATIONS[languageCode];
    if (!dict) return defaultText || key;
    
    return dict[key] || defaultText || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
