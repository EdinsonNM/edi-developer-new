import { CHAT_LIMITS } from "@/lib/site-config";
import type { ChatRequestBody } from "@/lib/chat-types";

export type ChatValidationError = {
  status: 400;
  message: string;
};

export function validateChatRequest(
  body: ChatRequestBody
): ChatValidationError | null {
  const { userInput, messagesForApi } = body;

  if (!userInput || typeof userInput !== "string") {
    return { status: 400, message: "userInput es requerido y debe ser un string" };
  }

  const trimmed = userInput.trim();
  if (!trimmed) {
    return { status: 400, message: "userInput no puede estar vacío" };
  }

  if (trimmed.length > CHAT_LIMITS.maxUserInputChars) {
    return {
      status: 400,
      message: `El mensaje supera el límite de ${CHAT_LIMITS.maxUserInputChars} caracteres`,
    };
  }

  if (!Array.isArray(messagesForApi)) {
    return { status: 400, message: "messagesForApi debe ser un array" };
  }

  if (messagesForApi.length > CHAT_LIMITS.maxHistoryTurns) {
    return {
      status: 400,
      message: `El historial supera el límite de ${CHAT_LIMITS.maxHistoryTurns} mensajes`,
    };
  }

  for (const msg of messagesForApi) {
    if (msg?.role !== "user" && msg?.role !== "model") {
      return { status: 400, message: "Rol de historial no válido" };
    }
    const text = msg.parts?.map((p) => p.text).join("") ?? "";
    if (text.length > CHAT_LIMITS.maxTurnChars) {
      return {
        status: 400,
        message: `Un mensaje del historial supera ${CHAT_LIMITS.maxTurnChars} caracteres`,
      };
    }
  }

  return null;
}
