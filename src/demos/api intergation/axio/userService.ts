import axios from 'axios';
import type { User, CreateUserDto, UpdateUserDto } from './user.types';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

/**
 * Service for managing user CRUD operations
 */
export const userService = {
  /**
   * Fetches all users from the API
   * @returns Promise resolving to array of users
   */
  getAll: async (): Promise<User[]> => {
    const response = await axios.get<User[]>(API_URL);
    return response.data;
  },

  /**
   * Fetches a single user by ID
   * @param id - The user ID to fetch
   * @returns Promise resolving to the user
   */
  getById: async (id: number): Promise<User> => {
    const response = await axios.get<User>(`${API_URL}/${id}`);
    return response.data;
  },

  /**
   * Creates a new user
   * @param data - The user data to create
   * @returns Promise resolving to the created user
   */
  create: async (data: CreateUserDto): Promise<User> => {
    const response = await axios.post<User>(API_URL, data);
    return response.data;
  },

  /**
   * Updates an existing user
   * @param id - The user ID to update
   * @param data - The updated user data
   * @returns Promise resolving to the updated user
   */
  update: async (id: number, data: UpdateUserDto): Promise<User> => {
    const response = await axios.put<User>(`${API_URL}/${id}`, data);
    return response.data;
  },

  /**
   * Deletes a user
   * @param id - The user ID to delete
   * @returns Promise resolving when delete is complete
   */
  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
};
