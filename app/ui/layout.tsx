"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Plus, LogOut, MessageCircle } from "lucide-react";

type Topic = {
  id: string;
  name: string;
};

export default function UILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [topicsLoading, setTopicsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router]);

  useEffect(() => {
    async function loadTopics() {
      try {
        const res = await fetch("/api/topics");
        if (res.ok) {
          const data = await res.json();
          setTopics(data);
        }
      } catch (error) {
        console.error("Failed to load topics:", error);
      } finally {
        setTopicsLoading(false);
      }
    }
    if (session) {
      loadTopics();
    }
  }, [session]);

  if (status === "loading" || (status === "authenticated" && topicsLoading)) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (status !== "authenticated" || !session) {
    return null;
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="p-5 border-b border-gray-200">
          <Link
            href="/ui"
            className="flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
        </div>

        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Topics
            </span>
            <Link
              href="/ui/topics/new"
              className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium"
            >
              <Plus className="h-3 w-3" />
              New
            </Link>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          {topics.length === 0 ? (
            <p className="text-xs text-muted-foreground px-2 py-3">
              No topics yet.{" "}
              <Link href="/ui/topics/new" className="text-primary hover:underline">
                Create one →
              </Link>
            </p>
          ) : (
            <ul className="space-y-0.5">
              {topics.map((topic) => (
                <li key={topic.id}>
                  <Link
                    href={`/ui/topics/${topic.id}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-primary transition-colors"
                  >
                    <MessageCircle className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <span className="truncate">{topic.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <p className="text-xs text-muted-foreground mb-3 truncate">
            {session.user?.name ?? session.user?.email}
          </p>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
