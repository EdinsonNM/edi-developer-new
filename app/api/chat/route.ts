import { NextResponse } from "next/server";
import { chatWithGemini } from "@/lib/chat-gemini";

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
    const { assistant, rawModelResponse } = await chatWithGemini(
      userInput.trim(),
      Array.isArray(messagesForApi) ? messagesForApi : [],
      lang
    );

    return NextResponse.json({ assistant, rawModelResponse });
  } catch (err) {
    console.error("[api/chat]", err);
    const message = err instanceof Error ? err.message : "Error en el servidor";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
