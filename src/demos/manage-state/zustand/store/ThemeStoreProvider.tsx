import { useState, type ReactNode } from 'react';
import type { StoreApi } from 'zustand';
import {
  ThemeStoreContext,
  createThemeStore,
  type Theme,
  type ThemeStore,
} from './ThemeStoreContext';

/** Props for ThemeStoreProvider component */
interface ThemeStoreProviderProps {
  /** Child components that will access this theme store */
  children: ReactNode;
  /** Initial theme value for this store instance */
  initialTheme?: Theme;
}

/**
 * Provider component that creates an isolated theme store instance.
 * Each Provider creates a separate store with independent state.
 *
 * @param children - Child components that will access this theme store
 * @param initialTheme - Initial theme value for this store instance (defaults to 'light')
 *
 * @example
 * ```tsx
 * <ThemeStoreProvider initialTheme="light">
 *   <App />
 * </ThemeStoreProvider>
 * ```
 */
export function ThemeStoreProvider({
  children,
  initialTheme = 'light',
}: ThemeStoreProviderProps) {
  const [store] = useState<StoreApi<ThemeStore>>(() =>
    createThemeStore(initialTheme)
  );

  return (
    <ThemeStoreContext.Provider value={store}>
      {children}
    </ThemeStoreContext.Provider>
  );
}
