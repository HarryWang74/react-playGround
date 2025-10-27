# React + TypeScript + Vite Template

This template provides a complete setup for React component development with:

- **React 19** with TypeScript
- **Vite 7** for fast builds and HMR
- **Storybook 9** for component development and documentation
- **Material-UI (MUI)** for UI components
- **Tailwind CSS 4** for styling
- **Vitest** and React Testing Library for unit testing

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Run Storybook

```bash
npm run storybook
```

Storybook will open at [http://localhost:6006](http://localhost:6006)

### Run Tests

```bash
npm test
```

### Run Linter

```bash
npm run lint        # Check for errors
npm run lint:fix    # Auto-fix errors
```

### Run Type Check

```bash
npm run type-check
```

## Pre-Commit Checks

This project uses **Husky** to automatically run quality checks before each commit. This ensures all code meets quality standards before being committed to the repository.

### What Gets Checked

Every commit automatically runs these checks in order:

1. **🧪 Unit Tests** (`npm test`)

   - Runs all test files (\*.test.tsx)
   - Must pass with 0 failures
   - Ensures your changes don't break existing functionality

2. **🔍 ESLint** (`npm run lint:fix`)

   - Checks code style and best practices
   - Automatically fixes minor issues
   - Fails if fixes create unstaged changes (you must stage them first)
   - Ensures consistent code quality

3. **📘 Type Check** (`npm run type-check`)
   - Validates TypeScript types
   - Checks for type errors across the entire project
   - Ensures type safety

### What Happens on Commit

When you run `git commit`, the pre-commit hook:

1. ✅ Runs all tests - must pass
2. ✅ Runs linter with auto-fix - must not modify staged files
3. ✅ Runs type checking - must pass
4. 🎉 If all checks pass, commit succeeds
5. ❌ If any check fails, commit is blocked

### Example Output

**Successful commit:**

```
🚀 Running pre-commit checks...

🔄 Running tests...
✅ Running tests completed successfully

📋 Found 2 staged files
🔄 Running linter with auto-fix...
✅ Linter completed successfully with no unstaged changes

🔄 Running type checks...
✅ Running type checks completed successfully

🎉 All pre-commit checks passed!
```

**Failed commit (linter modified files):**

```
❌ Lint --fix modified staged files. Please stage the changes and commit again.
Modified staged files:
  - src/library/button/Button.tsx
```

**Fix:** Stage the auto-fixed files and commit again

```bash
git add src/library/button/Button.tsx
git commit -m "your message"
```

**Failed commit (test failure):**

```
❌ Running tests failed
```

**Fix:** Fix the failing tests before committing

```bash
npm test  # Run tests to see failures
# Fix the code
git add .
git commit -m "your message"
```

### Best Practices

1. **Run checks manually before committing** to save time:

   ```bash
   npm test && npm run lint:fix && npm run type-check
   ```

2. **Fix lint issues immediately** - don't ignore them
3. **Write tests for new features** - they'll be checked automatically
4. **Stage linter fixes** if the pre-commit hook auto-fixes your code
5. **Don't skip pre-commit hooks** - they protect code quality

### Bypassing Pre-Commit Checks

⚠️ **Not recommended** - Only use in emergencies:

```bash
git commit --no-verify -m "emergency fix"
```

This skips all quality checks and should be avoided in normal development.

## Storybook Usage

### What is Storybook?

Storybook is a frontend workshop for building UI components in isolation. It allows you to:

- Develop components independently from your main application
- Document component APIs and usage examples
- Test components in different states and variations
- Share components with your team
- Build a component library

### Running Storybook

**Start Development Server:**

```bash
npm run storybook
```

Opens at [http://localhost:6006](http://localhost:6006) with hot reload enabled.

**Build Static Storybook:**

```bash
npm run build-storybook
```

Creates a static build in `storybook-static/` for deployment.

### Creating Stories

Stories are located in `src/library/` alongside your components. Storybook automatically detects files matching the pattern `**/*.stories.@(ts|tsx)`.

#### File Structure

```
src/library/
  button/
    Button.tsx          # Component implementation
    Button.stories.tsx  # Storybook stories
    Button.test.tsx     # Unit tests
```

#### Story Template

```tsx
// ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Library/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Define interactive controls
    propName: {
      control: 'text',
      description: 'Description of the prop',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    propName: 'default value',
  },
};

// Variation stories
export const Variant: Story = {
  args: {
    propName: 'variant value',
  },
};
```

### Story Naming Conventions

- **File naming**: `ComponentName.stories.tsx` (must include `.stories` before the extension)
- **Story titles**: Use category format like `'Library/ComponentName'` or `'Widgets/ComponentName'`
- **Export names**: Use descriptive PascalCase names (e.g., `Primary`, `Secondary`, `Disabled`)

### What to Include in Stories

1. **Default state** - The most common usage
2. **All variants** - Different visual styles (outlined, contained, text, etc.)
3. **All sizes** - Small, medium, large variations
4. **All colors** - Primary, secondary, error, success, etc.
5. **Interactive states** - Hover, focus, disabled, loading
6. **Edge cases** - Long text, no text, icons only
7. **Responsive behavior** - Mobile, tablet, desktop

### Best Practices

1. **Keep stories simple** - Each story should demonstrate one specific use case
2. **Use argTypes** - Define controls for interactive props
3. **Add descriptions** - Document props and usage in argTypes
4. **Enable autodocs** - Add `tags: ['autodocs']` for automatic documentation
5. **Co-locate files** - Keep .tsx, .stories.tsx, and .test.tsx together
6. **Import from framework** - Use `@storybook/react-vite` not `@storybook/react`
7. **Follow existing patterns** - Check `src/library/button/` for reference

### Example: MUI Button Wrapper

See `src/library/button/Button.stories.tsx` for a complete example showing:

- 11 different story variations
- Interactive controls (variant, color, size)
- Comprehensive prop documentation
- All MUI Button features

### Troubleshooting

**Storybook won't start:**

- Check that all dependencies are installed: `npm install`
- Clear caches: `rm -rf node_modules/.cache .storybook-cache`
- Ensure no other process is using port 6006

**Stories not showing up:**

- Verify file name includes `.stories.tsx`
- Check file is in `src/` directory
- Ensure you're exporting a default meta object
- Restart Storybook server

**Import errors:**

- Use `@storybook/react-vite` not `@storybook/react`
- Check that component imports are correct
- Verify TypeScript types are properly exported

## Development Tools

Currently, two official Vite plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
