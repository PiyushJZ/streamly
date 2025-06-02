import { z } from 'zod';

export const configuration = () => ({
  MONOREPO_ROOT: process.env.MONOREPO_ROOT,
  TZ: process.env.TZ,
  NODE_ENV: process.env.NODE_ENV || 'dev',
  APP_NAME: process.env.APP_NAME || 'Streamly',
  API_PREFIX: process.env.API_PREFIX || 'api',
  GATEWAY_PORT: process.env.GATEWAY_PORT,
  NATS_URL: process.env.NATS_URL,
  GRPC_GATEWAY_URL: process.env.GRPC_GATEWAY_URL,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
});

const envSchema = z.object({
  MONOREPO_ROOT: z.string(),
  TZ: z.string().default('UTC'),
  NODE_ENV: z.enum(['dev', 'prod', 'test', 'localtest', 'staging']),
  APP_NAME: z.string().default('Streamly'),
  API_PREFIX: z.string().default('api'),
  GATEWAY_PORT: z
    .string()
    .transform(Number)
    .refine((val) => !isNaN(val), {
      message: 'PORT should be a valid number',
    })
    .default('8080'),
  NATS_URL: z.string().url().startsWith('nats://'),
  GRPC_GATEWAY_URL: z.string().url(),
  REDIS_HOST: z.string().url(),
  REDIS_PORT: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'REDIS_PORT should be a valid number',
  }),
});

export type ConfigType = z.infer<typeof envSchema>;

export function validateEnv(config: Record<string, any>) {
  const parsed = envSchema.safeParse(config);
  if (!parsed.success) {
    console.error(
      '❌ Invalid environment variables:',
      parsed.error.flatten().fieldErrors,
    );
    throw new Error('Invalid environment variables');
  }
  return parsed.data;
}
