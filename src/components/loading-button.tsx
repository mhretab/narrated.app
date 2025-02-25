import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
export default function LoadingButton({
	pending,
	children,
	onClick,
}: {
	pending: boolean;
	children: React.ReactNode;
	onClick?: () => void;
}) {
	return (
		<Button
			onClick={onClick}
			className="w-full"
			type="submit"
			disabled={pending}
		>
			{pending ? (
				<div className="flex items-center justify-center">
					<LoaderCircle className="animate-spin" />
				</div>
			) : (
				children
			)}
		</Button>
	);
}
