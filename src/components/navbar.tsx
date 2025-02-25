import Link from "next/link";
import AuthButtons from "@/components/auth-buttons";

export default function Navbar() {
  return (
    <nav className="bg-background border-b border-gray-200">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold tracking-tight">Next.js Starter</span>
        </Link>
        <div className="flex items-center space-x-4">
          <AuthButtons />
        </div>
      </div>
    </nav>
  );
}