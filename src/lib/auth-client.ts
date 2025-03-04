import { createAuthClient } from 'better-auth/react';
import clientEnv from '@/lib/client-env';

export const authClient = createAuthClient({
  baseURL: clientEnv.NEXT_PUBLIC_BETTER_AUTH_URL,
});

export const { signIn, signOut, signUp, useSession } = authClient;
