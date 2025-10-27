---
applyTo: '**.test.tsx'
---

# as sample as possible

# declared variables outside the test blocks

# Focus on User Interactions

Test what users see and do, not how the code works internally

# Use toBeVisible() for User-Facing Content

Always use toBeVisible() instead of toBeInTheDocument()

# Component Notation

use <ComponentName /> notation in test descriptions to clearly indicate we're testing a React component

# Mock Everything Approach

Mock all dependencies to isolate the component under test

# Test Descriptions

use the it() function for defining tests and always start test descriptions with a verb to create clear, narrative-driven test names

# mocking Context Hooks

```
// Mock context hooks by mocking their return values
vi.mock('@hooks/useUserContext', () => ({
useUserContext: vi.fn(),
}));

// In your test
const mockUseUserContext = vi.mocked(useUserContext);
mockUseUserContext.mockReturnValue({
user: generateUser(),
updateUser: vi.fn(),
deleteUser: vi.fn(),
});
```

# mocking Router Hooks

```
// Mock TanStack Router hooks
vi.mock('@tanstack/react-router', () => ({
useParams: vi.fn(),
useNavigate: vi.fn(),
useSearch: vi.fn(),
}));

// In your test
const mockUseParams = vi.mocked(useParams);
const mockUseNavigate = vi.mocked(useNavigate);
const mockNavigate = vi.fn();

mockUseParams.mockReturnValue({ userId: '123' });
mockUseNavigate.mockReturnValue(mockNavigate);
```

# Mocking TanStack Query

```
// Mock the useQuery hook
vi.mock('@tanstack/react-query', () => ({
useQuery: vi.fn(),
useMutation: vi.fn(),
useQueryClient: vi.fn(),
}));

// In your test
const mockUseQuery = vi.mocked(useQuery);
```

# Mock successful query

```
mockUseQuery.mockReturnValue({
data: generateUser(),
isLoading: false,
error: null,
refetch: vi.fn(),
});
```

# Mock loading state

```
mockUseQuery.mockReturnValue({
data: null,
isLoading: true,
error: null,
refetch: vi.fn(),
});
```

# Mock error state

```
mockUseQuery.mockReturnValue({
data: null,
isLoading: false,
error: new Error('Failed to fetch user'),
refetch: vi.fn(),
});
```

# Mocking Router Provider

```
// Create a test wrapper with router provider
import { createMemoryHistory } from '@tanstack/react-router';
import { RouterProvider } from '@tanstack/react-router';

const createTestRouter = (initialEntries = ['/']) => {
return createMemoryHistory({
initialEntries,
});
};

const renderWithRouter = (component: React.ReactElement, initialRoute = '/') => {
const history = createTestRouter([initialRoute]);

return render(
<RouterProvider router={router} history={history}>
{component}
</RouterProvider>,
);
};

// Use in tests
it('navigates to user details when user is clicked', async () => {
const user = userEvent.setup();
renderWithRouter(<UserList users={mockUsers} />, '/users');

await user.click(screen.getByText(mockUsers[0].name));

});
```
