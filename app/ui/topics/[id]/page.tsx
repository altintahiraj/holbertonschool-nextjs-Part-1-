import { fetchTopicById, fetchQuestionsByTopicId } from "@/lib/data";
import { createQuestion, voteQuestion } from "@/lib/actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThumbsUp, MessageCircle } from "lucide-react";

export default async function TopicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const topic = await fetchTopicById(id);
  if (!topic) notFound();

  const questions = await fetchQuestionsByTopicId(id);

  return (
    <div className="p-8 max-w-3xl">
      <Link
        href="/ui"
        className="text-sm text-muted-foreground hover:text-primary mb-4 inline-block"
      >
        ← Back to Topics
      </Link>

      <h1 className="text-3xl font-bold text-black mb-1">{topic.name}</h1>
      <p className="text-muted-foreground text-sm mb-8">
        {questions.length} question{questions.length !== 1 ? "s" : ""}
      </p>

      {/* Ask a question form */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-8">
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Ask a Question
        </h2>
        <form action={createQuestion} className="flex gap-2">
          <input type="hidden" name="topicId" value={id} />
          <Input
            name="text"
            type="text"
            required
            placeholder="Type your question here..."
            className="flex-1 border-gray-300"
          />
          <Button type="submit" className="shrink-0">
            Ask
          </Button>
        </form>
      </div>

      {/* Questions list */}
      {questions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
          <MessageCircle className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-gray-500 font-medium">No questions yet</p>
          <p className="text-sm text-muted-foreground">Be the first to ask!</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {questions.map((question) => (
            <li
              key={question.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center justify-between gap-4"
            >
              <p className="text-gray-800 flex-1 text-sm leading-relaxed">
                {question.text}
              </p>
              <form action={voteQuestion} className="flex items-center gap-2 shrink-0">
                <input type="hidden" name="questionId" value={question.id} />
                <span className="text-sm font-semibold text-gray-700 min-w-[2rem] text-center">
                  {question.votes}
                </span>
                <Button
                  type="submit"
                  variant="outline"
                  size="icon-sm"
                  title="Vote up"
                  className="border-gray-200"
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                </Button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
