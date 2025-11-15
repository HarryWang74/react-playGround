import { useState, useCallback } from 'react';
import { userService } from '../userService';
import type { User, CreateUserDto, UpdateUserDto } from '../user.types';

/**
 * Custom hook for managing user CRUD operations
 * Handles all user-related API calls and state management
 *
 * @returns Object containing users state, isProcessing state (true during any API operation), error state, and CRUD handlers
 */
export function useUserCrud() {
  const [users, setUsers] = useState<User[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches all users from the API
   */
  const fetchUsers = useCallback(async () => {
    setIsProcessing(true);
    setError(null);
    try {
      const data = await userService.getAll();
      setUsers(data.slice(0, 5)); // Limit to 5 users for demo
    } catch {
      setError('Failed to fetch users');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  /**
   * Creates a new user
   * @param userData - The user data to create
   */
  const createUser = useCallback(async (userData: CreateUserDto) => {
    setIsProcessing(true);
    setError(null);
    try {
      const newUser = await userService.create(userData);
      setUsers((prev) => [...prev, newUser]);
    } catch {
      setError('Failed to create user');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  /**
   * Updates an existing user
   * @param id - The user ID to update
   * @param userData - The updated user data
   */
  const updateUser = useCallback(
    async (id: number, userData: UpdateUserDto) => {
      setIsProcessing(true);
      setError(null);
      try {
        const updatedUser = await userService.update(id, userData);
        setUsers((prev) =>
          prev.map((user) => (user.id === id ? updatedUser : user))
        );
      } catch {
        setError('Failed to update user');
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  /**
   * Deletes a user
   * @param id - The user ID to delete
   */
  const deleteUser = useCallback(async (id: number) => {
    setIsProcessing(true);
    setError(null);
    try {
      await userService.delete(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch {
      setError('Failed to delete user');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    users,
    isProcessing,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };
}
