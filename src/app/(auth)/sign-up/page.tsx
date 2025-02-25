'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
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
import { signUpSchema } from '@/server/db/schema/auth';
import { signUp } from '@/lib/auth-client';

type Status =
  | { status: 'pending' }
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; error: string };
export default function SignUp() {
  const [formStatus, setFormStatus] = useState<Status>({ status: 'idle' });

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    const { name, email, password } = values;
    await signUp.email(
      { name, email, password },
      {
        onRequest: () => {
          setFormStatus({ status: 'pending' });
        },
        onSuccess: () => {
          setFormStatus({ status: 'success' });
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
          <CardTitle className="text-3xl font-bold text-center text-gray-800">
            Create Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          {formStatus.status === 'success' ? (
            <div className="text-center text-green-500">
              Account created successfully. Please check your email to verify your account.
            </div>
          ) : (
            <>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {['name', 'email', 'password'].map((field) => (
                    <FormField
                      control={form.control}
                      key={field}
                      name={field as keyof z.infer<typeof signUpSchema>}
                      render={({ field: fieldProps }) => (
                        <FormItem>
                          <FormLabel>{field.charAt(0).toUpperCase() + field.slice(1)}</FormLabel>
                          <FormControl>
                            <Input
                              type={field === 'name' ? 'text' : field}
                              placeholder={`Enter your ${field}`}
                              {...fieldProps}
                              autoComplete="off"
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
                  <LoadingButton pending={formStatus.status === 'pending'}>Sign up</LoadingButton>
                </form>
              </Form>
              <div className="mt-4 text-center text-sm">
                <Link href="/sign-in" className="text-primary hover:underline">
                  Already have an account? Sign in
                </Link>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
