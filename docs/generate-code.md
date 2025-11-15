---
applyTo: '**/*.ts,**/*.tsx'
---

# TypeScript Guidelines

- Follow functional programming principles where possible
- Use interfaces for data structures and type definitions
- Prefer immutable data (const, readonly)

# React Guidelines

- Component Declaration Use function declarations with named exports
- Keep stable references using useCallback and useMemo
- Props Handling Use destructuring with proper rest handling
- prop passed to the child remains stable over re-renders
- Use React.FC type for components with children
- Keep components small and focused
- Use semantic elements for accessibility

# JSDoc Requirements

- Document all components and interfaces

# When writing React with TypeScript, type:

✅ Every component's props - interface Props { ... }
✅ Every state variable - useState<Type>()
✅ Every event handler - (e: React.MouseEvent) => {}
✅ Every API response - interface ApiResponse { ... }
✅ Every custom hook - Input params and return types
✅ Every context value - interface ContextValue { ... }
✅ Every ref - useRef<HTMLDivElement>(null)
✅ Every function parameter - (user: User) => {}
✅ Every callback prop - onChange: (value: string) => void
✅ Children when needed - children: React.ReactNode
