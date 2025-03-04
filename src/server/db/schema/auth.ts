import { object, string } from 'zod';

const getPasswordSchema = (type: 'password' | 'confirmPassword') =>
  string({ required_error: `Please enter your ${type}` })
    .min(8, `${type} must be at least 8 characters long`)
    .max(32, `${type} must not exceed 32 characters`)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
      'Include at least one uppercase letter, one lowercase letter, a number, and a special character'
    );

const getEmailSchema = () =>
  string({ required_error: 'Email address is mandatory' })
    .trim()
    .min(1, 'Email address cannot be empty')
    .email('Enter a valid email address')
    .toLowerCase();

const getNameSchema = () =>
  string({ required_error: 'Name is mandatory' })
    .trim()
    .min(1, 'Name cannot be empty')
    .max(50, 'Name should not exceed 50 characters');

export const signUpSchema = object({
  name: getNameSchema(),
  email: getEmailSchema(),
  password: getPasswordSchema('password'),
});

export const signInSchema = object({
  email: getEmailSchema(),
  password: getPasswordSchema('password'),
});

export const forgotPasswordSchema = object({
  email: getEmailSchema(),
});

export const resetPasswordSchema = object({
  password: getPasswordSchema('password'),
  confirmPassword: getPasswordSchema('confirmPassword'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});
