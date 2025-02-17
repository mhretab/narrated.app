import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { z, ZodError } from 'zod';

expand(config());

const envSchema = z.object({
  DB_HOST: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_NAME: z.string().min(1),
  DB_PORT: z.coerce.number().min(1),
  DATABASE_URL: z.string().min(1),
  BETTER_AUTH_SECRET: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;
let env: Env = {} as Env;

try {
  env = envSchema.parse(process.env);
} catch (e) {
  console.log('Environment validation error!');
  if (e instanceof ZodError) {
    console.error('Error:', e.flatten().fieldErrors);
  }
  process.exit(1);
}

export default env;
