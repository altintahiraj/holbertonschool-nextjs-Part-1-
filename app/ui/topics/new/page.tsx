import { createTopic } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

export default function NewTopicPage() {
  return (
    <div className="p-8 max-w-lg">
      <Link
        href="/ui"
        className="text-sm text-muted-foreground hover:text-primary mb-6 inline-block"
      >
        ← Back to Topics
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>Create New Topic</CardTitle>
          <CardDescription>
            Add a topic to start collecting questions from the community.
          </CardDescription>
        </CardHeader>
        <form action={createTopic}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Topic Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="e.g. JavaScript, Python, Machine Learning..."
                className="border-gray-300"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Create Topic
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
