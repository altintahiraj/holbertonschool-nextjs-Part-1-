import { NextResponse } from "next/server";
import { execute, query } from "@/lib/db";
import bcryptjs from "bcryptjs";

export async function GET() {
  try {
    // ── 1. Create tables ────────────────────────────────────────────────────

    await execute(`
      CREATE TABLE IF NOT EXISTS users (
        id         VARCHAR(36)  NOT NULL PRIMARY KEY,
        name       VARCHAR(255) NOT NULL,
        email      VARCHAR(255) NOT NULL UNIQUE,
        password   VARCHAR(255) NOT NULL,
        created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await execute(`
      CREATE TABLE IF NOT EXISTS topics (
        id         VARCHAR(36)  NOT NULL PRIMARY KEY,
        name       VARCHAR(255) NOT NULL,
        created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await execute(`
      CREATE TABLE IF NOT EXISTS questions (
        id         VARCHAR(36)  NOT NULL PRIMARY KEY,
        topic_id   VARCHAR(36)  NOT NULL,
        text       TEXT         NOT NULL,
        votes      INT          NOT NULL DEFAULT 0,
        created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE
      )
    `);

    // ── 2. Seed user ────────────────────────────────────────────────────────
    const hashedPassword = await bcryptjs.hash("123456", 12);
    const userId = crypto.randomUUID();

    type UserRow = { id: string };
    const existingUser = await query<UserRow>(
      "SELECT id FROM users WHERE email = ?",
      ["user@atlasmail.com"]
    );

    if (existingUser.length === 0) {
      await execute(
        "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
        [userId, "Atlas User", "user@atlasmail.com", hashedPassword]
      );
    } else {
      await execute("UPDATE users SET password = ? WHERE email = ?", [
        hashedPassword,
        "user@atlasmail.com",
      ]);
    }

    // ── 3. Clear and re-seed topics & questions ─────────────────────────────
    await execute("DELETE FROM questions");
    await execute("DELETE FROM topics");

    const topics: { id: string; name: string }[] = [
      { id: crypto.randomUUID(), name: "JavaScript" },
      { id: crypto.randomUUID(), name: "Python" },
      { id: crypto.randomUUID(), name: "Next.js" },
    ];

    for (const topic of topics) {
      await execute("INSERT INTO topics (id, name) VALUES (?, ?)", [
        topic.id,
        topic.name,
      ]);
    }

    const seedQuestions = [
      // JavaScript
      {
        topicId: topics[0].id,
        text: "What is the difference between let and const?",
        votes: 5,
      },
      {
        topicId: topics[0].id,
        text: "How does async/await work in JavaScript?",
        votes: 3,
      },
      {
        topicId: topics[0].id,
        text: "What are arrow functions and how are they different from regular functions?",
        votes: 2,
      },
      // Python
      {
        topicId: topics[1].id,
        text: "What is a Python decorator?",
        votes: 4,
      },
      {
        topicId: topics[1].id,
        text: "How do list comprehensions work?",
        votes: 6,
      },
      // Next.js
      {
        topicId: topics[2].id,
        text: "What is the difference between App Router and Pages Router?",
        votes: 7,
      },
      {
        topicId: topics[2].id,
        text: "How do React Server Components work?",
        votes: 4,
      },
      {
        topicId: topics[2].id,
        text: "What are Server Actions and when should I use them?",
        votes: 5,
      },
    ];

    for (const q of seedQuestions) {
      await execute(
        "INSERT INTO questions (id, topic_id, text, votes) VALUES (?, ?, ?, ?)",
        [crypto.randomUUID(), q.topicId, q.text, q.votes]
      );
    }

    return NextResponse.json({
      message: "✅ Database seeded successfully!",
      data: {
        user: "user@atlasmail.com / 123456",
        topics: topics.map((t) => t.name),
        questions: seedQuestions.length,
      },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed database", details: String(error) },
      { status: 500 }
    );
  }
}
