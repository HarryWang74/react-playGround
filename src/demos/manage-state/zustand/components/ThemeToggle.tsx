import { useThemeStore } from '../store/useThemeStore';

/**
 * ThemeToggle component using Zustand store.
 *
 * ZUSTAND SIMPLE PATTERN:
 * - No Provider needed!
 * - Use selector functions to pick specific state
 * - Global store automatically shared across components
 * - Only re-renders when selected state changes
 *
 * This is the recommended Zustand pattern for most use cases.
 */
export function ThemeToggle() {
  // Select only the state you need - prevents unnecessary re-renders
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
