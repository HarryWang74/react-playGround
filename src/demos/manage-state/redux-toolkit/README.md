# Redux Toolkit Patterns

This demo shows **two approaches** for Redux Toolkit state management:

## 1. Context-Pattern Approach (Current: `demo.tsx`)

**Purpose**: API consistency with customHook, reducer, and zustand demos

```tsx
// Custom hook abstracts Redux details
const { theme, toggleTheme, setTheme } = useTheme();
```

**Pros:**

- ✅ Consistent API across all demos
- ✅ Hides Redux implementation from components
- ✅ Easy to switch state management approaches

**Cons:**

- ❌ Not standard Redux pattern
- ❌ Extra abstraction layer
- ❌ Loses Redux DevTools clarity

## 2. Idiomatic Redux Approach (See: `demo-idiomatic.tsx`)

**Purpose**: Standard Redux Toolkit best practices

```tsx
// Direct use of typed Redux hooks
const theme = useAppSelector((state) => state.theme.theme);
const dispatch = useAppDispatch();
dispatch(toggleTheme());
```

**Pros:**

- ✅ Standard Redux Toolkit pattern
- ✅ Clear action dispatching in Redux DevTools
- ✅ Better TypeScript autocomplete
- ✅ Less abstraction = easier debugging

**Cons:**

- ❌ More Redux-specific code in components
- ❌ Different API from other state management approaches

## Redux Toolkit Best Practices

### 1. Provider Placement

❌ **Don't** wrap each feature with Provider:

```tsx
function MyFeature() {
  return (
    <Provider store={store}>
      {' '}
      {/* DON'T DO THIS */}
      <FeatureComponent />
    </Provider>
  );
}
```

✅ **Do** wrap your entire app once:

```tsx
// main.tsx or App.tsx
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

### 2. Use Typed Hooks

Redux Toolkit recommends creating typed versions of hooks:

```tsx
// hooks/reduxHooks.tsx
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

Then use them everywhere instead of plain `useDispatch`/`useSelector`:

```tsx
// In components
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';

const theme = useAppSelector((state) => state.theme.theme);
const dispatch = useAppDispatch();
```

### 3. When to Abstract with Custom Hooks

**Good reasons to create useTheme():**

- You want consistent API across different state solutions
- The logic combines multiple selectors/dispatches
- You're sharing the hook across many components
- You want to hide Redux details from a component library

**Skip the abstraction when:**

- You have a pure Redux Toolkit app (no migration concerns)
- You want maximum Redux DevTools visibility
- You're only selecting one piece of state

## File Structure Comparison

### Context-Pattern Approach

```
redux-toolkit/
├── context/
│   ├── ThemeContext.tsx      # Types only
│   ├── themeSlice.tsx         # Redux slice
│   ├── store.tsx              # Redux store
│   └── ThemeProvider.tsx      # Wrapper (unnecessary)
├── hooks/
│   └── useTheme.tsx           # Custom abstraction
└── components/
    └── ThemeToggle.tsx        # Uses useTheme()
```

### Idiomatic Redux Approach

```
redux-toolkit/
├── store/
│   ├── store.tsx              # Redux store
│   └── slices/
│       └── themeSlice.tsx     # Redux slice with types
├── hooks/
│   └── reduxHooks.tsx         # Typed useAppDispatch/useAppSelector
└── components/
    └── ThemeToggle.tsx        # Uses reduxHooks directly
```

## Recommendation

**For this playground/demo project**: Keep the context-pattern approach for educational comparison.

**For a real Redux Toolkit app**: Use the idiomatic approach with typed hooks and Provider at the app root.

## Resources

- [Redux Toolkit TypeScript Quick Start](https://redux-toolkit.js.org/tutorials/typescript)
- [Redux Style Guide](https://redux.js.org/style-guide/)
- [RTK Query for API calls](https://redux-toolkit.js.org/rtk-query/overview)
