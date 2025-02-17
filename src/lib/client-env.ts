// create a client env with zod validation
import { z, ZodError } from 'zod';

const clientEnvSchema = z.object({
  NEXT_PUBLIC_BETTER_AUTH_URL: z.string().min(1),
});

const clientEnv = {
  NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
};

try {
  clientEnvSchema.parse(clientEnv);
} catch (e) {
  console.log('Environment validation error!');
  if (e instanceof ZodError) {
    console.error('Error:', e.flatten().fieldErrors);
  }
  process.exit(1);
}

export type ClientEnv = z.infer<typeof clientEnvSchema>;
export default clientEnv;
