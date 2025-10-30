import { Provider } from 'react-redux';
import { store } from './store/store';
import { ThemeToggle } from './components/ThemeToggle';

/**
 * Demo component showcasing Redux Toolkit best practices.
 *
 * KEY CONCEPTS:
 *
 * 1. Provider at Root
 *    In production, wrap your entire app once in main.tsx/index.tsx:
 *    <Provider store={store}><App /></Provider>
 *
 *    This demo wraps locally only for demonstration purposes.
 *
 * 2. Typed Hooks
 *    Components use useAppDispatch() and useAppSelector()
 *    for full TypeScript support (see hooks/reduxHooks.tsx)
 *
 * 3. createSlice + configureStore
 *    - createSlice: Combines reducers and action creators
 *    - configureStore: Sets up Redux DevTools, middleware automatically
 *
 * 4. No Custom Abstractions
 *    Components access Redux directly - no useTheme() wrapper needed.
 *    This keeps actions visible in Redux DevTools.
 *
 * REDUX TOOLKIT FEATURES:
 * - Immer integration: write "mutable" code that's actually immutable
 * - Redux DevTools: time-travel debugging out of the box
 * - TypeScript: excellent type inference and autocomplete
 */
function demo() {
  return (
    <Provider store={store}>
      <div>
        <h1>Redux Toolkit State Management</h1>
        <p>Using createSlice, configureStore, and typed hooks</p>
        <ThemeToggle />
      </div>
    </Provider>
  );
}

export default demo;
