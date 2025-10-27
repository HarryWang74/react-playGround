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
