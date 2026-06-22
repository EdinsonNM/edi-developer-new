import { NextResponse } from "next/server";
import { streamOpenAI } from "@/lib/chat-openai";

export const runtime = "nodejs";

export type ChatRequestBody = {
  userInput: string;
  messagesForApi: { role: "user" | "model"; parts: Array<{ text: string }> }[];
  language: "es" | "en";
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequestBody;
    const { userInput, messagesForApi, language } = body;

    if (!userInput || typeof userInput !== "string") {
      return NextResponse.json(
        { error: "userInput es requerido y debe ser un string" },
        { status: 400 }
      );
    }

    const lang = language === "en" ? "en" : "es";
    const stream = await streamOpenAI(
      userInput.trim(),
      Array.isArray(messagesForApi) ? messagesForApi : [],
      lang
    );

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch (err) {
    console.error("[api/chat]", err);
    const message = err instanceof Error ? err.message : "Error en el servidor";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
