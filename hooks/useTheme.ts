
import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem('themeDark') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('themeDark', isDark ? 'true' : 'false');
    } catch {}
  }, [isDark]);

  const toggleTheme = () => setIsDark(d => !d);

  return { isDark, toggleTheme };
};
