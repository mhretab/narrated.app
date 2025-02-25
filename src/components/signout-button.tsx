"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import LoadingButton from "@/components/loading-button";
import { useState } from "react";
import { useSonner } from "sonner";

export default function SignoutButton() {
	const router = useRouter();
	const [pending, setPending] = useState(false);
	const { toasts } = useSonner();

	const handleSignOut = async () => {
		try {
			setPending(true);
			await signOut({
				fetchOptions: {
					onSuccess: () => {
						router.push("/sign-in");
						router.refresh();
					},
				},
			});
		} catch (error) {
			console.error("Error signing out:", error);
			toasts.push({
				title: "Error",
				description: `Error signing out, ${error}`,
				type: "error",
				id: "sign-out-error",
			});
		} finally {
			setPending(false);
		}
	};

	return (
		<LoadingButton pending={pending} onClick={handleSignOut}>
			Sign Out
		</LoadingButton>
	);
}
