import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { toggleTheme } from '../store/slices/themeSlice';

/**
 * ThemeToggle component using Redux Toolkit best practices.
 *
 * Uses typed Redux hooks directly:
 * - useAppSelector: for reading state with TypeScript autocomplete
 * - useAppDispatch: for dispatching actions with TypeScript autocomplete
 *
 * This is the recommended Redux Toolkit pattern - no custom abstractions needed.
 */
export function ThemeToggle() {
  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      onClick={handleToggle}
      className={`theme-toggle theme-toggle--${theme}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {/* current is light, display as dark so click change to dark */}
      {theme === 'light' ? '🌙' : '☀️'}
      <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
    </button>
  );
}
