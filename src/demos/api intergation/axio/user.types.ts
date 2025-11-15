/**
 * User entity representing a user in the system
 */
export interface User {
  /** Unique identifier for the user */
  id: number;
  /** User's full name */
  name: string;
  /** User's email address */
  email: string;
}

/**
 * Data required to create a new user
 */
export interface CreateUserDto {
  /** User's full name */
  name: string;
  /** User's email address */
  email: string;
}

/**
 * Data required to update an existing user
 */
export interface UpdateUserDto {
  /** User's full name */
  name?: string;
  /** User's email address */
  email?: string;
}
