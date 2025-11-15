import { useState, useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Stack,
} from '@mui/material';
import type { CreateUserDto } from '../user.types';

interface UserFormProps {
  /** Callback when creating a new user */
  onCreateUser: (userData: CreateUserDto) => Promise<void>;
  /** Callback when updating an existing user */
  onUpdateUser: (id: number, userData: CreateUserDto) => Promise<void>;
  /** Callback when canceling edit mode */
  onCancel: () => void;
  /** ID of user being edited, null if creating new user */
  editingId: number | null;
  /** Initial form data for editing */
  initialData?: { name: string; email: string };
  /** Loading state */
  loading: boolean;
}

/**
 * Form component for creating and editing users
 * Handles form state and validation
 */
export function UserForm({
  onCreateUser,
  onUpdateUser,
  onCancel,
  editingId,
  initialData,
  loading,
}: UserFormProps) {
  const [formData, setFormData] = useState(
    initialData || { name: '', email: '' }
  );

  const handleSubmit = useCallback(async () => {
    if (!formData.name || !formData.email) return;

    if (editingId) {
      await onUpdateUser(editingId, formData);
    } else {
      await onCreateUser(formData);
    }
    setFormData({ name: '', email: '' });
  }, [formData, editingId, onCreateUser, onUpdateUser]);

  const handleCancel = useCallback(() => {
    setFormData({ name: '', email: '' });
    onCancel();
  }, [onCancel]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" className="mb-4">
          {editingId ? 'Edit User' : 'Create User'}
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            fullWidth
            disabled={loading}
          />
          <TextField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            fullWidth
            disabled={loading}
          />
          <Box className="flex gap-2">
            {editingId ? (
              <>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading || !formData.name || !formData.email}
                >
                  Update
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading || !formData.name || !formData.email}
              >
                Create
              </Button>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
