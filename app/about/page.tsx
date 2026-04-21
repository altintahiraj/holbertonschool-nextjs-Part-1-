import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-white">
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <Link href="/" className="text-primary hover:underline mb-8 inline-block text-sm font-medium">
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-black mb-6">About Us</h1>
        <p className="text-lg text-muted-foreground mb-4">
          This is a full stack questions and answers application built with
          Next.js 15 and MySQL. Users can create topics, ask questions, and
          vote on the most helpful content.
        </p>
        <p className="text-lg text-muted-foreground mb-4">
          Built as part of the Holberton School curriculum to demonstrate
          full-stack development skills using modern React and Next.js
          technologies with a MySQL database.
        </p>
        <p className="text-lg text-muted-foreground">
          The app uses Next.js App Router, Server Components, Server Actions,
          and NextAuth v5 for authentication.
        </p>
      </div>
    </div>
  );
}
