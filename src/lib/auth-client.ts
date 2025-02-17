import { createAuthClient } from 'better-auth/react';
import clientEnv from '@/lib/client-env';

export const { signIn, signUp, signOut, useSession } = createAuthClient({
  baseURL: clientEnv.NEXT_PUBLIC_BETTER_AUTH_URL,
});
