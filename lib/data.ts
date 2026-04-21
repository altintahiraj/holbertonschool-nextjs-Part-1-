import { query } from "@/lib/db";

export type Topic = {
  id: string;
  name: string;
};

export type Question = {
  id: string;
  topic_id: string;
  text: string;
  votes: number;
};

export async function fetchTopics(): Promise<Topic[]> {
  try {
    return await query<Topic>("SELECT id, name FROM topics ORDER BY name ASC");
  } catch (error) {
    console.error("DB Error fetchTopics:", error);
    return [];
  }
}

export async function fetchTopicById(id: string): Promise<Topic | null> {
  try {
    const rows = await query<Topic>(
      "SELECT id, name FROM topics WHERE id = ?",
      [id]
    );
    return rows[0] ?? null;
  } catch (error) {
    console.error("DB Error fetchTopicById:", error);
    return null;
  }
}

export async function fetchQuestionsByTopicId(
  topicId: string
): Promise<Question[]> {
  try {
    return await query<Question>(
      "SELECT id, topic_id, text, votes FROM questions WHERE topic_id = ? ORDER BY votes DESC, id ASC",
      [topicId]
    );
  } catch (error) {
    console.error("DB Error fetchQuestionsByTopicId:", error);
    return [];
  }
}
