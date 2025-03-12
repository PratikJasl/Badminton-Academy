export const ERROR_MESSAGES = {
    // INVALID_GENDER: 'Gender must be one of [male, female, other]',
    MISSING_FIELD: (field: string) => `${field} is required.`,
    VALIDATION_FAILED: "Validation Failed",
    SERVER_ERROR: 'Something went wrong, please try again later.',
    EXISTING_USER: 'User email already exists',
    USER_CREATED: 'User created successfully',
    INVALID_EMAIL: 'Email format is invalid.',
    USER_ALREADY_EXISTS: 'A user with this email already exists.',
    USER_NOT_FOUND: 'User not found.',
    INVALID_AGE: 'Age must be greater than 0.',
    INVALID_PASSWORD: 'Password must meet the required criteria.',
  };