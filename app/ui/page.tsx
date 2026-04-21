import Link from "next/link";
import { fetchTopics } from "@/lib/data";
import { Plus, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function UIHomePage() {
  const topics = await fetchTopics();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black">Topics</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {topics.length} topic{topics.length !== 1 ? "s" : ""} available
          </p>
        </div>
        <Link href="/ui/topics/new">
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            New Topic
          </Button>
        </Link>
      </div>

      {topics.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <MessageCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-gray-500 font-medium mb-1">No topics yet</p>
          <p className="text-sm text-muted-foreground mb-4">
            Create the first topic to get started
          </p>
          <Link href="/ui/topics/new">
            <Button size="sm">Create Topic</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/ui/topics/${topic.id}`}
              className="group block bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:border-primary/40 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MessageCircle className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-base font-semibold text-gray-900 group-hover:text-primary transition-colors truncate">
                    {topic.name}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    View questions →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
