import { NextResponse } from "next/server";
import { streamOpenAI } from "@/lib/chat-openai";
import { validateChatRequest } from "@/lib/chat-guards";
import { checkRateLimit } from "@/lib/rate-limit";
import type { ChatRequestBody } from "@/lib/chat-types";

export const runtime = "nodejs";

export type { ChatRequestBody };

function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: Request) {
  // Respaldo si el middleware no aplica (p. ej. en algunos entornos de test).
  const rate = checkRateLimit(clientIp(request));
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Intenta de nuevo en un momento." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSec) } }
    );
  }

  try {
    const body = (await request.json()) as ChatRequestBody;
    const validation = validateChatRequest(body);
    if (validation) {
      return NextResponse.json({ error: validation.message }, { status: validation.status });
    }

    const { userInput, messagesForApi, language } = body;
    const lang = language === "en" ? "en" : "es";

    const stream = await streamOpenAI(
      userInput.trim(),
      messagesForApi,
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
    return NextResponse.json(
      { error: "No se pudo procesar tu mensaje. Intenta de nuevo más tarde." },
      { status: 500 }
    );
  }
}
