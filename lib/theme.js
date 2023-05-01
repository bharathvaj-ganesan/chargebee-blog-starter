import { createContext, useContext, useEffect, useState } from 'react';
import { useMedia } from 'react-use';
import { useConfig } from '@/lib/config';

const ThemeContext = createContext({ dark: true });

export function ThemeProvider({ children }) {
  const { appearance } = useConfig();

  // `defaultState` should normally be a boolean. But it causes initial loading flashes in slow
  // rendering. Setting it to `null` so that we can differentiate the initial loading phase
  const prefersDark = useMedia('(prefers-color-scheme: dark)', null);
  const [dark, setDark] = useState(prefersDark);

  useEffect(() => {
    if (typeof dark === 'boolean') {
      document.documentElement.classList.toggle('dark', dark);
      document.documentElement.classList.remove('color-scheme-unset');
    }
  }, [dark]);

  useEffect(() => {
    // Only decide color scheme after initial loading, i.e. when `dark` is really representing a
    // media query result
    const dark = appearance === 'dark' || prefersDark;
    setDark(dark);
  }, [prefersDark, appearance]);

  function toggle() {
    setDark(!dark);
  }

  return <ThemeContext.Provider value={{ dark, toggle }}>{children}</ThemeContext.Provider>;
}

export default function useTheme() {
  return useContext(ThemeContext);
}
