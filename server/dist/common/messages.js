"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUCCESS_MESSAGES = exports.ERROR_MESSAGES = void 0;
exports.ERROR_MESSAGES = {
    // INVALID_GENDER: 'Gender must be one of [male, female, other]',
    MISSING_FIELD: "Missing required fields",
    VALIDATION_FAILED: "Validation Failed",
    SERVER_ERROR: 'Something went wrong, please try again later.',
    EXISTING_USER: 'User email already exists',
    INVALID_EMAIL: 'Email format is invalid.',
    USER_ALREADY_EXISTS: 'A user with this email already exists.',
    USER_NOT_FOUND: 'User not found.',
    INVALID_AGE: 'Age must be greater than 0.',
    INVALID_PASSWORD: 'Password must meet the required criteria.',
    INVALID_LOCATION_ID: 'Invalid Location ID'
};
exports.SUCCESS_MESSAGES = {
    USER_CREATED: 'New user created successfully',
    USER_LOGIN: 'User loged in successfully',
    LOCATION_ADDED: "New location added successfully",
    COACHING_PLAN_ADDED: "New coaching plan added successfully",
    COACHING_SCHEDULE_ADDED: "New coaching schedule added successfully"
};
