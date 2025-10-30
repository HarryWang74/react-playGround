# React Context Best Practices

## Summary of Your Examples

### ✅ What's Good

1. **Custom hook for context access** - `useTheme()` with error checking ✓
2. **TypeScript types** - Proper interfaces and type safety ✓
3. **Separate files** - Clean separation of concerns ✓
4. **useCallback for functions** - Stable references ✓

### ⚠️ What Was Improved

1. **Added `useMemo` for context value** - Prevents unnecessary re-renders
2. **Better comments** - Explains why optimizations matter

### 💡 Advanced Pattern (Optional)

For **large apps** with many consumers, consider **splitting context**:

## Pattern 1: Current (Single Context) ✅

**Good for:** Small to medium apps, simple state

```tsx
// Single context with state + actions
const value = useMemo(
  () => ({ theme, toggleTheme, setTheme }),
  [theme, toggleTheme, setTheme]
);
```

**Behavior:** All consumers re-render when theme changes, even if they only use actions.

## Pattern 2: Split Context (Advanced) 🚀

**Good for:** Large apps, performance-critical scenarios

```tsx
// contexts/ThemeContext.tsx
export const ThemeStateContext = createContext<Theme | undefined>(undefined);
export const ThemeActionsContext = createContext<ThemeActions | undefined>(
  undefined
);

// Provider
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const actions = useMemo(
    () => ({
      toggleTheme: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
      setTheme,
    }),
    [] // Actions never change!
  );

  return (
    <ThemeStateContext.Provider value={theme}>
      <ThemeActionsContext.Provider value={actions}>
        {children}
      </ThemeActionsContext.Provider>
    </ThemeStateContext.Provider>
  );
}

// Hooks
export function useThemeState() {
  const context = useContext(ThemeStateContext);
  if (context === undefined) throw new Error('...');
  return context;
}

export function useThemeActions() {
  const context = useContext(ThemeActionsContext);
  if (context === undefined) throw new Error('...');
  return context;
}

// Usage
function DisplayTheme() {
  const theme = useThemeState(); // Only re-renders when theme changes
  return <div>{theme}</div>;
}

function ThemeButton() {
  const { toggleTheme } = useThemeActions(); // NEVER re-renders!
  return <button onClick={toggleTheme}>Toggle</button>;
}
```

**Benefits:**

- Components using only actions never re-render when state changes
- Better performance in large component trees
- More granular optimization

## When to Use Each Approach

### Use Single Context (Your Current Pattern) When:

- ✅ App is small to medium size
- ✅ State changes infrequently
- ✅ Most components need both state and actions
- ✅ Simplicity is more important than micro-optimizations

### Use Split Context When:

- 🚀 Large app with many context consumers
- 🚀 State changes frequently
- 🚀 Many components only need actions (buttons, forms)
- 🚀 Performance profiling shows context re-renders as bottleneck

## Other React Context Best Practices

### 1. Co-locate Context with Features

```
features/
  theme/
    context/
      ThemeContext.tsx
      ThemeProvider.tsx
      useTheme.tsx
```

### 2. Lazy Initialize State

```tsx
// For expensive computations
const [state, setState] = useState(() => {
  return expensiveInitialization();
});
```

### 3. Use Reducer for Complex State

```tsx
// When you have multiple related state updates
const [state, dispatch] = useReducer(reducer, initialState);
```

### 4. Display Name for DevTools

```tsx
ThemeContext.displayName = 'ThemeContext';
```

### 5. Default Value with Partial Implementation

```tsx
// Instead of undefined, provide a safe default
export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {
    console.warn('toggleTheme called outside provider');
  },
  setTheme: () => {
    console.warn('setTheme called outside provider');
  },
});
```

## Your Examples: Final Verdict ✅

**customHook example**: Perfect for learning Context + useState pattern
**reducer example**: Perfect for learning Context + useReducer pattern

Both now follow React best practices with `useMemo` optimization!

## Resources

- [React Context Docs](https://react.dev/learn/passing-data-deeply-with-context)
- [Context Performance](https://react.dev/reference/react/useContext#optimizing-re-renders-when-passing-objects-and-functions)
- [When to use Context](https://react.dev/learn/scaling-up-with-reducer-and-context)
