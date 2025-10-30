import { useContext } from 'react';
import { useStore } from 'zustand';
import { ThemeStoreContext, type ThemeStore } from './ThemeStoreContext';

/**
 * Hook to access theme store within a ThemeStoreProvider.
 * Must be used inside a ThemeStoreProvider component.
 *
 * @param selector - Function to select specific state from the store
 * @returns Selected state value
 * @throws Error if used outside ThemeStoreProvider
 *
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const theme = useThemeStore((state) => state.theme);
 *   const toggleTheme = useThemeStore((state) => state.toggleTheme);
 *
 *   return <button onClick={toggleTheme}>{theme}</button>;
 * }
 * ```
 */
export function useThemeStore<T>(selector: (state: ThemeStore) => T): T {
  const store = useContext(ThemeStoreContext);

  if (!store) {
    throw new Error('useThemeStore must be used within ThemeStoreProvider');
  }

  return useStore(store, selector);
}
