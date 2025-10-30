import { useThemeStore } from '../store/useThemeStore';

/**
 * ThemeToggle component using Zustand with Context-based store.
 *
 * ZUSTAND CONTEXT PATTERN:
 * - Must be wrapped in ThemeStoreProvider
 * - Use selector functions to pick specific state
 * - Each Provider creates an isolated store instance
 *
 * This pattern is ideal for multiple independent store instances.
 */
export function ThemeToggle() {
  // Context-based Zustand requires selector functions
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle theme-toggle--${theme}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {/* current is light, display as dark so click change to dark */}
      {theme === 'light' ? '🌙' : '☀️'}
      <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
    </button>
  );
}
