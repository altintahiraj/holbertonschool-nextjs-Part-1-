"use server";

import { execute, query } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const TopicSchema = z.object({
  name: z.string().min(1, "Topic name is required").max(100),
});

const QuestionSchema = z.object({
  topicId: z.string().min(1),
  text: z.string().min(1, "Question text is required").max(500),
});

export async function createTopic(formData: FormData) {
  const parsed = TopicSchema.safeParse({ name: formData.get("name") });
  if (!parsed.success) throw new Error("Invalid topic data");

  const id = crypto.randomUUID();
  await execute("INSERT INTO topics (id, name) VALUES (?, ?)", [
    id,
    parsed.data.name,
  ]);

  revalidatePath("/ui");
  redirect("/ui");
}

export async function createQuestion(formData: FormData) {
  const parsed = QuestionSchema.safeParse({
    topicId: formData.get("topicId"),
    text: formData.get("text"),
  });
  if (!parsed.success) throw new Error("Invalid question data");

  const id = crypto.randomUUID();
  await execute(
    "INSERT INTO questions (id, topic_id, text, votes) VALUES (?, ?, ?, 0)",
    [id, parsed.data.topicId, parsed.data.text]
  );

  revalidatePath(`/ui/topics/${parsed.data.topicId}`);
}

export async function voteQuestion(formData: FormData) {
  const questionId = formData.get("questionId") as string;
  if (!questionId) throw new Error("Question ID required");

  // Get topic_id before updating so we can revalidate the right path
  type Row = { topic_id: string };
  const rows = await query<Row>(
    "SELECT topic_id FROM questions WHERE id = ?",
    [questionId]
  );
  const topicId = rows[0]?.topic_id;

  await execute("UPDATE questions SET votes = votes + 1 WHERE id = ?", [
    questionId,
  ]);

  if (topicId) revalidatePath(`/ui/topics/${topicId}`);
}

export async function registerUser(formData: FormData) {
  const parsed = z
    .object({
      name: z.string().min(1),
      email: z.string().email(),
      password: z.string().min(8),
    })
    .safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

  if (!parsed.success) {
    return { error: "Invalid data. Password must be at least 8 characters." };
  }

  const { name, email, password } = parsed.data;

  // Check if email exists
  type UserRow = { id: string };
  const existing = await query<UserRow>(
    "SELECT id FROM users WHERE email = ?",
    [email]
  );
  if (existing.length > 0) {
    return { error: "An account with this email already exists." };
  }

  const bcryptjs = await import("bcryptjs");
  const hashed = await bcryptjs.hash(password, 12);
  const id = crypto.randomUUID();

  await execute(
    "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
    [id, name, email, hashed]
  );

  return { success: true };
}

