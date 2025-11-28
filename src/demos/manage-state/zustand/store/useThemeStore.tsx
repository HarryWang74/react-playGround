import { create } from 'zustand';

export type Theme = 'light' | 'dark';

/**
 * Theme store state and actions
 */
interface ThemeStore {
  /** Current theme value */
  theme: Theme;
  /** Toggles between light and dark theme */
  toggleTheme: () => void;
  /** Sets theme to specific value */
  setTheme: (theme: Theme) => void;
}

/**
 * Custom hook for theme management using Zustand.
 * This is a simple global store - no Provider needed!
 *
 * ZUSTAND BENEFITS:
 * - No Context Provider required
 * - Simple API - just create and use
 * - Automatic re-renders only for components using changed state
 * - Tiny bundle size (~1KB)
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
export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'light',
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),
  setTheme: (theme: Theme) => set({ theme }),
}));

export type { ThemeStore };
