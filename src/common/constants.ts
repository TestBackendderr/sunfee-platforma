export const SLOT_CONSTANTS = {
  MAX_SLOTS: 100,
  MINUTE_TO_MS: 60 * 1000,
};

export const ERROR_MESSAGES = {
  USER_EXIST: 'User already exists!',
  INVALID_CREDENTIALS: 'Invalid credentials!',
  NOT_REFRESH: 'Refresh token is required!',
  WRONG_REFRESH: 'Invalid refresh token!',
  DIFFERENT_REFRESH: 'Refresh tokens are different!',
  NOT_REFRESH_OR_USER: 'User not found or no refresh token stored',
  USER_NOT_FOUND: (id: number) => `User with ID ${id} does not exist.`,
  UNAUTHENTICATED: 'User not authenticated or role missing',
  FORBIDDEN_ROLE: (role: string) => `Access denied for role: ${role}`,
};
