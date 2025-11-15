import { useState, useCallback } from 'react';
import { Box, Typography, Alert, Stack } from '@mui/material';
import { useUserCrud } from './hooks/useUserCrud';
import { UserForm } from './components/UserForm';
import { UserList } from './components/UserList';
import type { User } from './user.types';

/**
 * Demo component showcasing CRUD operations with Axios
 * Displays a list of users with create, update, and delete functionality
 */
function Demo() {
  const {
    users,
    isProcessing,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  } = useUserCrud();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<{
    name: string;
    email: string;
  } | null>(null);

  const handleEditUser = useCallback((user: User) => {
    setEditingId(user.id);
    setEditingData({ name: user.name, email: user.email });
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    setEditingData(null);
  }, []);

  const handleUpdateUser = useCallback(
    async (id: number, userData: { name: string; email: string }) => {
      await updateUser(id, userData);
      handleCancelEdit();
    },
    [updateUser, handleCancelEdit]
  );

  const handleCreateUser = useCallback(
    async (userData: { name: string; email: string }) => {
      await createUser(userData);
    },
    [createUser]
  );

  return (
    <Box className="p-6 max-w-4xl mx-auto">
      <Typography variant="h4" className="mb-6">
        Axios CRUD Demo
      </Typography>

      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      <Stack spacing={3}>
        <UserForm
          onCreateUser={handleCreateUser}
          onUpdateUser={handleUpdateUser}
          onCancel={handleCancelEdit}
          editingId={editingId}
          initialData={editingData || undefined}
          loading={isProcessing}
        />

        <UserList
          users={users}
          loading={isProcessing}
          onFetchUsers={fetchUsers}
          onEditUser={handleEditUser}
          onDeleteUser={deleteUser}
        />
      </Stack>
    </Box>
  );
}

export default Demo;
