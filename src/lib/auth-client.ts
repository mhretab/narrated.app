import { createAuthClient } from 'better-auth/react';
import clientEnv from '@/lib/client-env';

import { organizationClient, adminClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: clientEnv.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [adminClient(), organizationClient()],
});

export const { signIn, signOut, signUp, useSession } = authClient;
