import { createContext } from 'react';
import { createStore, type StoreApi } from 'zustand';

export type Theme = 'light' | 'dark';

/**
 * Theme store state and actions
 */
export interface ThemeStore {
  /** Current theme value */
  theme: Theme;
  /** Toggles between light and dark theme */
  toggleTheme: () => void;
  /** Sets theme to specific value */
  setTheme: (theme: Theme) => void;
}

/**
 * Creates a new theme store instance
 *
 * @param initialTheme - Initial theme value for the store
 * @returns A new Zustand store instance
 */
export function createThemeStore(initialTheme: Theme = 'light') {
  return createStore<ThemeStore>((set) => ({
    theme: initialTheme,
    toggleTheme: () =>
      set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light',
      })),
    setTheme: (theme: Theme) => set({ theme }),
  }));
}

/**
 * Context for theme store.
 * Provides access to the Zustand store instance.
 */
export const ThemeStoreContext = createContext<StoreApi<ThemeStore> | null>(
  null
);
