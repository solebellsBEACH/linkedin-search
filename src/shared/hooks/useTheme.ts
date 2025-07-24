import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Verifica preferência do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Verifica configuração salva ou usa preferência do sistema
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : prefersDark;
  });

  useEffect(() => {
    // Salva a preferência no localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    
    // Atualiza a meta tag theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', isDarkMode ? '#1a1a1a' : '#f3f2ef');
    }
  }, [isDarkMode]);

  // Listener para mudanças na preferência do sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Só atualiza se não houver preferência salva
      if (!localStorage.getItem('darkMode')) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => setIsDarkMode((prev: boolean) => !prev);

  return {
    isDarkMode,
    toggleTheme,
  };
};
