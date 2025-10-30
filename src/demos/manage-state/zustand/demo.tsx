import { ThemeToggle } from './components/ThemeToggle';

/**
 * Demo component showcasing Zustand best practices.
 *
 * KEY ZUSTAND FEATURES:
 *
 * 1. No Provider Needed! 🎉
 *    Unlike Context API or Redux, Zustand stores work globally without wrapping
 *    your app in a Provider. Just import and use the hook anywhere!
 *
 * 2. Simple API
 *    - create() your store with state and actions
 *    - Use the hook in any component
 *    - Automatic re-renders only for components using changed state
 *
 * 3. Small Bundle Size
 *    Zustand is tiny (~1KB gzipped) compared to Redux Toolkit (~12KB)
 *
 * 4. Selector Optimization
 *    Use selectors to prevent unnecessary re-renders:
 *    const theme = useThemeStore((state) => state.theme);
 *
 * 5. No Boilerplate
 *    No actions, reducers, dispatchers, or providers to set up.
 *    Just create a store and use it!
 *
 * WHEN TO USE ZUSTAND:
 * - Small to medium apps
 * - Simple global state needs
 * - Want minimal boilerplate
 * - Don't need time-travel debugging or Redux ecosystem
 */
function demo() {
  return (
    <div>
      <h1>Zustand State Management</h1>
      <p>Simple, fast, and no Provider needed!</p>
      <ThemeToggle />
    </div>
  );
}

export default demo;
