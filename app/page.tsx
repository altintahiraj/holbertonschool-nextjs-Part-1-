import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, TrendingUp, BookOpen } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        {/* Hero */}
        <section className="container mx-auto py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-black mb-6 text-6xl font-bold tracking-tight">
              Ask. Vote. Learn.
            </h1>
            <p className="text-muted-foreground text-xl mb-8">
              Create topics, ask questions, and vote on the best answers — all
              in one place.
            </p>
            <div className="flex flex-col items-center gap-4">
              <Link href="/sign-up">
                <Button size="lg" className="h-12 px-8 text-lg font-medium">
                  Get started for free
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <p className="text-muted-foreground text-sm">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-medium text-primary hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-3">
              <div className="flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">
                  Create Topics
                </h3>
                <p className="text-muted-foreground">
                  Organize your knowledge by creating topics on any subject.
                  Invite others to explore and contribute.
                </p>
              </div>
              <div className="flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">
                  Ask Questions
                </h3>
                <p className="text-muted-foreground">
                  Post questions on any topic and get answers from the
                  community. No question is too simple or too complex.
                </p>
              </div>
              <div className="flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">
                  Vote &amp; Rank
                </h3>
                <p className="text-muted-foreground">
                  Upvote the questions you find most helpful. The best content
                  rises to the top automatically.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
