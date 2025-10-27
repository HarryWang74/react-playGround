Document all components and interfaces\*\*

```tsx
/**
 * Displays user information in a card format with edit and delete actions.
 *
 * @param user - The user object containing user details
 * @param onEdit - Callback function called when edit button is clicked
 * @param onDelete - Callback function called when delete button is clicked
 * @param className - Additional CSS classes to apply to the card
 */
export function UserCard({ user, onEdit, onDelete, className }: UserCardProps) {
  // Component implementation
}

/**
 * Props for the UserCard component
 */
export interface UserCardProps {
  /** User object containing user details */
  user: User
  /** Callback function called when edit button is clicked */
  onEdit?: (user: User) => void
  /** Callback function called when delete button is clicked */
  onDelete?: (user: User) => void
  /** Additional CSS classes to apply to the card */
  className?: string
}
```
