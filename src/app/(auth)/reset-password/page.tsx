"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { resetPasswordSchema } from "@/server/db/schema/auth";
import LoadingButton from "@/components/loading-button";
import { authClient } from "@/lib/auth-client";

function ResetPasswordContent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const error = searchParams.get("error");
	const [isPending, setIsPending] = useState(false);

	const form = useForm<z.infer<typeof resetPasswordSchema>>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
		setIsPending(true);
		const { error } = await authClient.resetPassword({
			newPassword: data.password,
		token: searchParams.get("token") || "",
		});
		if (error) {
			toast.error("Error", {
				description: error.message,
			});
		} else {
			toast.success("Success",
			{description: "Password reset successful. Login to continue.",
			});
			router.push("/sign-in");
		}
		setIsPending(false);
	};

	if (error === "invalid_token") {
		return (
			<div className="grow flex items-center justify-center p-4">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle className="text-3xl font-bold text-center text-gray-800">
							Invalid Reset Link
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<p className="text-center text-gray-600">
								This password reset link is invalid or has expired.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="grow flex items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-3xl font-bold text-center text-gray-800">
						Reset Password
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>New Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="Enter your new password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="Confirm your new password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<LoadingButton pending={isPending}>Reset Password</LoadingButton>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}

export default function ResetPassword() {
	return (
		<Suspense>
			<ResetPasswordContent />
		</Suspense>
	);
}
