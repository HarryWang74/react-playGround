import { useState, useCallback, useMemo, type ReactNode } from 'react';
import {
  ThemeContext,
  type Theme,
  type ThemeContextValue,
} from './ThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
}: ThemeProviderProps) {
  // manages state
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  // Wrap callbacks in useCallback for stable references
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  // BEST PRACTICE: Memoize context value to prevent unnecessary re-renders
  // Without useMemo, a new object is created on every render, causing all
  // consumers to re-render even if the actual values haven't changed
  const value: ThemeContextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
      setTheme,
    }),
    [theme, toggleTheme, setTheme]
  );

  return (
    // When create a context using createContext, React gives you two things:
    // ThemeContext: the context object itself
    // ThemeContext.Provider is a React component that wraps part of your component tree and injects a value into the context. Any child component inside this tree can then consume that value using useContext(ThemeContext) — or your custom hook like useTheme().
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
