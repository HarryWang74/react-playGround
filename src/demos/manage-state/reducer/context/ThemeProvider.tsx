import { useReducer, useCallback, useMemo, type ReactNode } from 'react';
import {
  ThemeContext,
  type Theme,
  type ThemeContextValue,
} from './ThemeContext';
import { themeReducer, createInitialThemeState } from './themeReducer';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
}: ThemeProviderProps) {
  // Use reducer with separate reducer function
  const [state, dispatch] = useReducer(
    themeReducer,
    createInitialThemeState(defaultTheme)
  );

  // Action creators wrapped in useCallback for stable references
  const setTheme = useCallback((newTheme: Theme) => {
    dispatch({ type: 'SET_THEME', payload: newTheme });
  }, []);

  const toggleTheme = useCallback(() => {
    dispatch({ type: 'TOGGLE_THEME' });
  }, []);

  // BEST PRACTICE: Memoize context value to prevent unnecessary re-renders
  // Without useMemo, a new object is created on every render, causing all
  // consumers to re-render even if the actual values haven't changed
  const value: ThemeContextValue = useMemo(
    () => ({
      theme: state.theme,
      toggleTheme,
      setTheme,
    }),
    [state.theme, toggleTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
