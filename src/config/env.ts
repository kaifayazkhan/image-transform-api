import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  BETTER_STACK_SOURCE_TOKEN: z.string().min(1),
  BETTER_STACK_ENDPOINT: z.url(),
  DATABASE_URL: z.string().min(1),
  ACCESS_TOKEN_SECRET: z.string().min(72),
  REFRESH_TOKEN_SECRET: z.string().min(72),
});

export const env = envSchema.parse(process.env);
