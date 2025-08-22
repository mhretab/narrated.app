"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

interface ImpersonateUserProps {
	userId: string;
}

export default function ImpersonateUser({ userId }: ImpersonateUserProps) {
	const router = useRouter();


	const handleImpersonateUser = async () => {
		try {
			await authClient.admin.impersonateUser({
				userId: userId,
			});
			router.push("/");
			toast( "Impersonated user",{
				description: "You are now impersonating this user",
			});
			router.refresh();
		} catch (error) {
			console.error("Failed to impersonate user:", error);
		}
	};

	return (
		<Button onClick={handleImpersonateUser} variant="outline" size="sm">
			Impersonate
		</Button>
	);
}
