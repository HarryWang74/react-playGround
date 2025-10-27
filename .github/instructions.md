# Copilot Action Prompts

## Test Generation

---

mode: 'ask'
description: 'Generate unit tests following project standards'
applyTo: '\*_/_.{ts,tsx}'

---

## Fix broken test

---

mode: 'edit'
description: 'Fix all the broken tests following testing guidance. Run the whole test suite first with npx nx run-many -t test and then fix one by one verifying them with npx vitest run path/to/{componentFilename}.test.{ts,tsx}'
applyTo: '\*_/_.test.{ts,tsx}'

---

Generate unit tests following our testing standards in `/docs/how-to-unit-testing.md`:

### Requirements:

- Use `<ComponentName />` notation in describe blocks
- Start test descriptions with verbs (renders, calls, displays, throws)
- Test component contract, not implementation details
- Mock all child components and external dependencies using simple mocks: `vi.fn(() => <div data-testid="mocked-component" />)`
- Use `toBeVisible()` instead of `toBeInTheDocument()` for user-facing content
- Use MockAPI generators for test data when available
- Co-locate test files with components being tested

### Test Structure:

```tsx
describe('<ComponentName />', () => {
  describe('Initial Render', () => {
    // Test default rendering
  })

  describe('User Interactions', () => {
    // Test user interactions with userEvent
  })

  describe('Loading States', () => {
    // Test loading states
  })

  describe('Error States', () => {
    // Test error handling
  })
})
```

Focus on fewer tests that cover more functionality rather than many tests for high coverage.

## Code Review

---

mode: 'ask'
description: 'Perform code review following project standards'

---

Review the selected code against our standards in `/docs/standards-and-conventions.md`:

### Architecture Review:

-  Component is in correct layer (Pages -> Views -> Domain -> UI Library)
-  Fractal pattern used appropriately (only in Domain/UI Library)
-  Layer responsibilities respected (routing in Pages, composition in Views, business logic in Domain)
-  No cross-imports between component private structures

### File Organization Review:

-  Naming conventions: PascalCase for components, camelCase for hooks/utils
-  Fractal structure: private components stay within parent folder
-  Import strategy: absolute for shared, relative for private
-  Tests co-located with components

### Code Quality Review:

-  Uses UI library components, doesn't recreate existing patterns
-  Proper TypeScript types, avoids `any`
-  Semantic HTML for accessibility
-  Theme-based colors, no hardcoded values
-  Function declarations with named exports
-  Props destructured with rest handling
-  Constants outside components
-  useCallback/useMemo for stable references

## Component Creation

---

mode: 'edit'
description: 'Create React component following project standards'
applyTo: '\*_/_.{ts,tsx}'

---

Create a React component following our standards in `/docs/standards-and-conventions.md`:

### Component Structure:

- Use function declaration with named export
- Destructure props with proper rest handling
- Move constants outside component
- Use useCallback/useMemo for stable references
- Use semantic HTML elements
- All user-facing strings must use i18n translation keys
- Add JSDoc documentation
