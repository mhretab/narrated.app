'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LoadingButton from '@/components/loading-button';
import { signInSchema } from '@/server/db/schema/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

type Status =
  | { status: 'pending' }
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; error: string };

export default function SignIn() {
  const router = useRouter();
  const [formStatus, setFormStatus] = useState<Status>({ status: 'idle' });

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleCredentialsSignIn = async (values: z.infer<typeof signInSchema>) => {
    const { email, password } = values;
    await signIn.email(
      { email, password },
      {
        onRequest: () => {
          setFormStatus({ status: 'pending' });
        },
        onSuccess: async () => {
          router.push('/');
          router.refresh();
        },
        onError: (ctx: { error: { message: string } }) => {
          console.log('error', ctx);
          setFormStatus({ status: 'error', error: ctx.error.message });
        },
      }
    );
  };
  return (
    <div className="grow flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCredentialsSignIn)} className="space-y-6">
              {['email', 'password'].map((field) => (
                <FormField
                  control={form.control}
                  key={field}
                  name={field as keyof z.infer<typeof signInSchema>}
                  render={({ field: fieldProps }) => (
                    <FormItem>
                      <FormLabel>{field.charAt(0).toUpperCase() + field.slice(1)}</FormLabel>
                      <FormControl>
                        <Input
                          type={field}
                          placeholder={`Enter your ${field}`}
                          {...fieldProps}
                          autoComplete={field === 'password' ? 'current-password' : 'email'}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              {formStatus.status === 'error' ? (
                <div className="text-center text-red-500">{formStatus.error}</div>
              ) : null}
              <LoadingButton pending={formStatus.status === 'pending'}>Sign in</LoadingButton>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            <Link href="/forgot-password" className="text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
