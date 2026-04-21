import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const topics = await query<{ id: string; name: string }>(
      "SELECT id, name FROM topics ORDER BY name ASC"
    );
    return NextResponse.json(topics);
  } catch (error) {
    console.error("API Error fetchTopics:", error);
    return NextResponse.json({ error: "Failed to fetch topics" }, { status: 500 });
  }
}
