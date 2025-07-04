import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

export const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'prod', 'test', 'localtest', 'staging']),
  MONOREPO_ROOT: z.string(),
  TZ: z.string().default('UTC'),
  GATEWAY_PORT: z
    .string()
    .transform(Number)
    .refine(val => !isNaN(val), {
      message: 'PORT should be a valid number',
    })
    .default('8080'),
  APP_NAME: z.string().default('Streamly'),
  API_PREFIX: z.string().default('api'),
  APP_DOMAIN: z.string().url().default('http://localhost:8080'),
  COOKIE_SECRET: z.string().min(1, 'COOKIE_SECRET cannot be empty'),
  COOKIE_HTTP_ONLY: z.string().transform(Boolean).default('false'),
  COOKIE_SECURE: z.string().transform(Boolean).default('false'),
  COOKIE_SAME_SITE: z.string().min(1, 'COOKIE_SAME_SITE cannot be empty'),
  COOKIE_MAX_AGE: z
    .string()
    .transform(Number)
    .refine(val => !isNaN(val), {
      message: 'COOKIE_MAX_AGE should be a valid number',
    }),
  JWT_SECRET_ACCESS: z.string().min(1, 'JWT_SECRET_ACCESS cannot be empty'),
  JWT_SECRET_REFRESH: z.string().min(1, 'JWT_SECRET_REFRESH cannot be empty'),
  SESSION_SECRET: z.string().min(1, 'SESSION_SECRET cannot be empty'),
  NATS_URL: z.string().url().startsWith('nats://'),
  GRPC_GATEWAY_URL: z.string().url(),
  REDIS_HOST: z.string().optional(),
  DB_URL_AUTH: z.string().url().optional(),
  THROTTLE_TTL_LONG: z
    .string()
    .transform(Number)
    .default('60000')
    .refine(val => !isNaN(val), {
      message: 'THROTTLE_TTL_LONG should be a valid number',
    }),
  THROTTLE_LIMIT_LONG: z
    .string()
    .transform(Number)
    .default('50')
    .refine(val => !isNaN(val), {
      message: 'THROTTLE_LIMIT_LONG should be a valid number',
    }),
  THROTTLE_TTL_SHORT: z
    .string()
    .transform(Number)
    .default('100')
    .refine(val => !isNaN(val), {
      message: 'THROTTLE_TTL_SHORT should be a valid number',
    }),
  THROTTLE_LIMIT_SHORT: z
    .string()
    .transform(Number)
    .default('3')
    .refine(val => !isNaN(val), {
      message: 'THROTTLE_LIMIT_SHORT should be a valid number',
    }),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error(
    '❌ Invalid environment variables:',
    parsed.error.flatten().fieldErrors,
  );
  throw new Error('Invalid environment variables');
}

export default parsed.data;
