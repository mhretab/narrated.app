import { betterFetch } from '@better-fetch/fetch';
import { NextResponse, type NextRequest } from 'next/server';
import type { Session } from '@/server/auth';
import clientEnv from '@/lib/client-env';

const authRoutes = ['/sign-in', '/sign-up'];

export default async function authMiddleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const isAuthRoute = authRoutes.includes(pathName);

  const { data: session } = await betterFetch<Session>('/api/auth/get-session', {
    baseURL: clientEnv.NEXT_PUBLIC_BETTER_AUTH_URL,
    headers: {
      //get the cookie from the request
      cookie: request.headers.get('cookie') || '',
    },
  });

  if (!session && !isAuthRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
