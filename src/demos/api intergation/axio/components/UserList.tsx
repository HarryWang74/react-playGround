import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import type { User } from '../user.types';

interface UserListProps {
  /** Array of users to display */
  users: User[];
  /** Loading state */
  loading: boolean;
  /** Callback to fetch users from API */
  onFetchUsers: () => Promise<void>;
  /** Callback when edit button is clicked */
  onEditUser: (user: User) => void;
  /** Callback when delete button is clicked */
  onDeleteUser: (id: number) => Promise<void>;
}

/**
 * Component for displaying list of users
 * Shows user information with edit and delete actions
 */
export function UserList({
  users,
  loading,
  onFetchUsers,
  onEditUser,
  onDeleteUser,
}: UserListProps) {
  return (
    <Card>
      <CardContent>
        <Box className="flex justify-between items-center mb-4">
          <Typography variant="h6">Users</Typography>
          <Button variant="outlined" onClick={onFetchUsers} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Load Users'}
          </Button>
        </Box>

        {users.length === 0 ? (
          <Typography color="text.secondary">
            No users loaded. Click "Load Users" to fetch data.
          </Typography>
        ) : (
          <List>
            {users.map((user) => (
              <ListItem
                key={user.id}
                secondaryAction={
                  <Box className="flex gap-2">
                    <Button
                      size="small"
                      onClick={() => onEditUser(user)}
                      disabled={loading}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => onDeleteUser(user.id)}
                      disabled={loading}
                    >
                      Delete
                    </Button>
                  </Box>
                }
                className="border-b"
              >
                <ListItemText
                  primary={user.name}
                  secondary={user.email}
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
}
