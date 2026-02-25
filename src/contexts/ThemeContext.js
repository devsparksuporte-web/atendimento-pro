'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const THEMES = {
  pizzaria: { name: 'Pizzaria', icon: '🍕', color: '#dc2626' },
  hamburgueria: { name: 'Hamburgueria', icon: '🍔', color: '#eab308' },
  acaiteria: { name: 'Açaiteria', icon: '🍧', color: '#7c3aed' },
  hostel: { name: 'Hostel', icon: '🛏️', color: '#0ea5e9' },
};

export function ThemeProvider({ children }) {
  const [businessType, setBusinessType] = useState('pizzaria');
  const [appearance, setAppearance] = useState('light');
  // In a real app, this would come from the user's subscription/admin settings
  const [availableThemes, setAvailableThemes] = useState(Object.keys(THEMES));

  useEffect(() => {
    const saved = localStorage.getItem('businessType');
    if (saved && THEMES[saved]) setBusinessType(saved);

    const savedAppearance = localStorage.getItem('appearance');
    if (savedAppearance) setAppearance(savedAppearance);

    const savedAvailable = localStorage.getItem('availableThemes');
    if (savedAvailable) {
      setAvailableThemes(JSON.parse(savedAvailable));
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', businessType);
    localStorage.setItem('businessType', businessType);
  }, [businessType]);

  useEffect(() => {
    document.documentElement.setAttribute('data-appearance', appearance);
    localStorage.setItem('appearance', appearance);
  }, [appearance]);

  const toggleAppearance = () => {
    setAppearance(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Filter THEMES to only include available ones
  const filteredThemes = Object.keys(THEMES)
    .filter(key => availableThemes.includes(key))
    .reduce((obj, key) => {
      obj[key] = THEMES[key];
      return obj;
    }, {});

  return (
    <ThemeContext.Provider value={{
      businessType,
      setBusinessType,
      appearance,
      setAppearance,
      toggleAppearance,
      themes: filteredThemes,
      allThemes: THEMES,
      availableThemes,
      setAvailableThemes,
      currentTheme: THEMES[businessType]
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export { THEMES };
