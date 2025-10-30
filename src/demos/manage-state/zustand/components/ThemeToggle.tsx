import { useThemeStore } from '../store/useThemeStore';

/**
 * ThemeToggle component using Zustand best practices.
 *
 * ZUSTAND PATTERN:
 * - Import the store hook directly
 * - Use selectors to pick only the state you need
 * - No Provider needed!
 *
 * This is the idiomatic way to use Zustand - simple and straightforward.
 */
export function ThemeToggle() {
  // Zustand allows destructuring or separate selectors
  // Option 1: Destructure (simple, re-renders on any store change)
  const { theme, toggleTheme } = useThemeStore();

  // Option 2: Separate selectors (optimized, re-renders only when specific values change)
  // const theme = useThemeStore((state) => state.theme);
  // const toggleTheme = useThemeStore((state) => state.toggleTheme);

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
