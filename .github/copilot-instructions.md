# GitHub Copilot Instructions

## Project Architecture

**Tech Stack**: React 19 + TypeScript, Vite 7, MUI + Tailwind CSS 4, Vitest + React Testing Library, Storybook 9

**Component Structure**: All components live in `src/library/<component>/` with co-located tests and stories:

```
src/library/button/
  Button.tsx          # Component implementation
  Button.test.tsx     # Unit tests
  Button.stories.tsx  # Storybook stories
```

**Key Dependencies**:

- React Router 7, TanStack Query 5, React Hook Form 7
- Zod 4 for validation, Axios for HTTP
- Testing: Vitest 4 with jsdom, @testing-library/react 16

## Critical Pre-Commit Workflow

**Husky enforces quality gates** - commits FAIL if any check fails:

1. `npm test` - all tests must pass
2. `npm run lint:fix` - auto-fixes code, **fails if it modifies staged files** (you must stage the fixes)
3. `npm run type-check` - TypeScript errors block commits

**If lint --fix modifies your staged files**: Stage the changes and commit again. The hook detects this via `.husky/pre-commit.cjs` which tracks file diffs before/after linting.

**Manual validation**: `npm test && npm run lint:fix && npm run type-check`

## File Naming Conventions

- **Components**: `PascalCase.tsx` - name MUST match the exported component (e.g., `UserCard.tsx` exports `UserCard`)
- **Tests**: `ComponentName.test.tsx` (co-located with component)
- **Stories**: `ComponentName.stories.tsx` (co-located with component)
- **Hooks**: `useHookName.tsx` (filename matches hook name)
- **Types/Constants**: `ComponentName.types.ts`, `ComponentName.constants.ts`

## React Component Patterns

**Always use function declarations with named exports**:

```tsx
export function Button({ label, ...props }: ButtonProps) {
  return <MuiButton {...props}>{label}</MuiButton>;
}
```

**No index.ts files for re-exports** - import directly from component files:

```tsx
// ❌ Avoid - don't create index.ts barrel files
export { Button } from './Button';
export { Card } from './Card';

// ✅ Correct - import directly from the component file
import { Button } from '@/library/button/Button';
import { Card } from '@/library/card/Card';
```

**Exception**: Only use `index.ts` if absolutely necessary for complex module organization (e.g., state management stores with multiple files).

**Stable references for props passed to children**:

```tsx
export function ParentComponent({ onAction }: Props) {
  // ✅ Wrap callbacks in useCallback when passing to children
  const handleClick = useCallback(() => {
    onAction();
  }, [onAction]);

  return <ChildComponent onClick={handleClick} />;
}
```

**Move constants outside components**:

```tsx
// ✅ Outside component for stable reference
const DEFAULT_OPTIONS = ['Option A', 'Option B'];

export function Dropdown() {
  return <Select options={DEFAULT_OPTIONS} />;
}
```

**Keep JSX shallow** - break into subcomponents rather than deeply nested JSX.

## TypeScript Best Practices

**Type everything explicitly** - avoid implicit `any`:

```tsx
// ✅ Every component's props
interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
}

// ✅ Every state variable
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);

// ✅ Every event handler
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {};
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

// ✅ Every API response
interface ApiResponse {
  data: User[];
  status: number;
}

// ✅ Every custom hook - input params and return types
function useUserCrud(): {
  users: User[];
  isProcessing: boolean;
  createUser: (data: CreateUserDto) => Promise<void>;
} {
  // ...
}

// ✅ Every context value
interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// ✅ Every ref
const inputRef = useRef<HTMLInputElement>(null);
const divRef = useRef<HTMLDivElement>(null);

// ✅ Every function parameter
function formatUser(user: User): string {
  return `${user.name} (${user.email})`;
}

// ✅ Every callback prop
interface FormProps {
  onChange: (value: string) => void;
  onSubmit: (data: FormData) => Promise<void>;
}

// ✅ Children when needed
interface LayoutProps {
  children: React.ReactNode;
}
```

## Testing Patterns (Vitest + RTL)

**Focus on user behavior**, not implementation. Always use `toBeVisible()` instead of `toBeInTheDocument()`:

```tsx
it('renders with label text', () => {
  const { getByRole } = render(<Button label="Click me" />);
  expect(getByRole('button', { name: 'Click me' })).toBeVisible();
});
```

**Mock ALL dependencies** - context hooks, router, TanStack Query:

```tsx
// Mock context hooks
vi.mock('@hooks/useUserContext', () => ({
  useUserContext: vi.fn(),
}));

const mockUseUserContext = vi.mocked(useUserContext);
mockUseUserContext.mockReturnValue({
  user: generateUser(),
  updateUser: vi.fn(),
});

// Mock TanStack Router
vi.mock('@tanstack/react-router', () => ({
  useParams: vi.fn(),
  useNavigate: vi.fn(),
}));

// Mock TanStack Query
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}));

mockUseQuery.mockReturnValue({
  data: mockData,
  isLoading: false,
  error: null,
});
```

**Test descriptions**: Use `it()` and start with verbs. Use `<ComponentName />` notation:

```tsx
describe('<Button />', () => {
  it('calls onClick handler when clicked', async () => {
    /* ... */
  });
  it('renders as disabled when disabled prop is true', () => {
    /* ... */
  });
});
```

## Storybook Patterns

**Import from `@storybook/react-vite`** (not `@storybook/react`):

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Library/Button', // Category format
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'], // Enable automatic documentation
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
```

**Include comprehensive variations**: default, all variants, all sizes, all colors, interactive states (disabled, loading), edge cases (long text, icons only).

**Run Storybook**: `npm run storybook` (dev server on port 6006)

## JSDoc Requirements

**Document ALL components and interfaces**:

```tsx
/**
 * Displays user information in a card format with edit and delete actions.
 *
 * @param user - The user object containing user details
 * @param onEdit - Callback function called when edit button is clicked
 * @param onDelete - Callback function called when delete button is clicked
 */
export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  /* ... */
}

/** Props for the UserCard component */
export interface UserCardProps {
  /** User object containing user details */
  user: User;
  /** Callback when edit button is clicked */
  onEdit?: (user: User) => void;
  /** Callback when delete button is clicked */
  onDelete?: (user: User) => void;
}
```

## ESLint Rules to Know

- `react-refresh/only-export-components` - warns if non-component exports in component files
- `@typescript-eslint/no-explicit-any` - warns on `any` types
- `no-console` - warns on console statements
- `prefer-const` - errors if `let` should be `const`

## Reference Documentation

Detailed guidelines in `/docs/`:

- `code-review.md` - React patterns, functional programming principles
- `generate-test.md` - Complete mocking patterns for context, router, queries
- `generate-code.md` - TypeScript and React component guidelines
- `storybook-requirement.md` - Story structure and best practices
- `JSDoc-requirements.md` - Documentation examples
- `file-naming-conventions.md` - All file naming rules

## Quick Commands

```bash
npm run dev              # Vite dev server
npm test                 # Run all tests (Vitest)
npm run lint:fix         # Auto-fix lint issues
npm run type-check       # TypeScript validation
npm run storybook        # Launch Storybook on :6006
npm run build            # Production build
```
