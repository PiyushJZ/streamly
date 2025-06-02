import { z } from 'zod';
import type { TFunction } from 'i18next';

export function ForgotPasswordSchema(t: TFunction<'auth, undefined'>) {
  return z.object({
    email: z.string().email({ message: t('invalidEmail') }),
  });
}

export function LoginSchema(t: TFunction<'auth', undefined>) {
  return z.object({
    email: z.string().email({ message: t('invalidEmail') }),
    password: z.string().min(8, { message: t('passwordTooShort') }),
  });
}

export function SignupSchema(t: TFunction<'auth', undefined>) {
  return z
    .object({
      name: z.string().min(3, { message: t('nameTooShort') }),
      email: z.string().email({ message: t('invalidEmail') }),
      password: z
        .string()
        .min(8, { message: t('passwordCriteriaError') })
        .regex(/[a-z]/, { message: t('passwordCriteriaError') })
        .regex(/[A-Z]/, { message: t('passwordCriteriaError') })
        .regex(/[0-9]/, { message: t('passwordCriteriaError') })
        .regex(/[^a-zA-Z0-9]/, { message: t('passwordCriteriaError') }),
      confirmPassword: z.string(),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: t('passwordsMustMatch'),
      path: ['confirmPassword'],
    });
}
