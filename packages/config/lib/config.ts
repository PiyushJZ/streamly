import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  MONOREPO_ROOT: z.string(),
  TZ: z.string().default('UTC'),
  NODE_ENV: z.enum(['dev', 'prod', 'test', 'localtest', 'staging']),
  APP_NAME: z.string().default('Streamly'),
  NATS_URL: z.string().url().startsWith('nats://'),
  REDIS_HOST: z.string().url(),
  REDIS_PORT: z.string().refine(val => !isNaN(Number(val)), {
    message: 'REDIS_PORT should be a valid number',
  }),
  DB_URL: z.string().url(),
  DB_HOST: z.string().url(),
  DB_PORT: z
    .string()
    .transform(Number)
    .default('8080')
    .refine(val => !isNaN(val), {
      message: 'DB_PORT should be a valid number',
    }),
  DB_USER: z.string().min(1, 'DB_USER cannot be empty'),
  DB_PASS: z.string().min(1, 'DB_PASS cannot be empty'),
  DB_NAME: z.string().min(1, 'DB_NAME cannot be empty'),
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
