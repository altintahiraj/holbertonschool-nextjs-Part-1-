import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold text-primary"
        >
          <MessageCircle className="h-5 w-5" />
          Q&amp;A App
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/about" className="text-sm text-muted-foreground hover:text-gray-900 px-3">
            About
          </Link>
          <Link href="/sign-in">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link href="/sign-up">
            <Button size="sm">Sign up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
