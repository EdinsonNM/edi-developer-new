import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useI18n } from "@presentation/utils/use-i18n";

// Definición de Roles (sin cambios)
export enum Role {
  USER = "user",
  MODEL = "model", // Cambiado de ASSISTANT a MODEL para coincidir con la API de Gemini
  // SYSTEM no se usa en el array de mensajes de chat, se envía por separado
  SYSTEM = "system",
}

// Tipo para los mensajes en el estado local (para la UI)
type UIMessageType = {
  role: Role.USER | Role.MODEL | Role.SYSTEM; // Solo roles de conversación
  content: string; // Contenido textual para mostrar
  id: string; // Para key en React
  highchart?: Highcharts.Options; // Opcional, si quieres mostrar el gráfico en la UI
  title?: string;
  description?: string;
};

// Tipo para el objeto JSON esperado de la respuesta del asistente (sin cambios)
export type AssistantMessageStructure = {
  response: string;
  title: string | null; // Permitir null como en tu prompt de sistema para off-topic
  description: string | null; // Permitir null
  highchart: Highcharts.Options | null; // Permitir null
};

// Contenido que se envía a la API de Gemini
type GeminiContent = {
  role: Role.USER | Role.MODEL;
  parts: Array<{ text: string }>;
};

// Función para generar mensajes de error amigables y graciosos
function getFriendlyErrorMessage(_error: Error, language: "es" | "en"): string {
  const friendlyMessages = {
    es: [
      "¡Uy! Parece que mi creador tuvo un pequeño desliz con la configuración. 😅 Inténtalo de nuevo en un momento.",
      "Oops! Algo salió mal en mi cerebro digital. Mi programador debe estar tomando café en lugar de arreglar bugs. ☕",
      "¡Ay no! Mi conexión con el universo digital se cortó. Es como cuando se va la luz, pero más tecnológico. ⚡",
      "Parece que hay un pequeño bug causado por mi creador. ¡Prometo que no es mi culpa! 🤖",
      "¡Ups! Mi cerebro artificial necesita un reinicio. Es como cuando tu computadora se pone tonta. 💻",
      "Algo salió mal en mi sistema. Mi programador probablemente está durmiendo la siesta en lugar de trabajar. 😴",
    ],
    en: [
      "Oops! Looks like my creator had a little slip-up with the configuration. 😅 Try again in a moment.",
      "Uh oh! Something went wrong in my digital brain. My programmer must be drinking coffee instead of fixing bugs. ☕",
      "Oh no! My connection to the digital universe got cut off. It's like when the power goes out, but more technological. ⚡",
      "Seems like there's a little bug caused by my creator. I promise it's not my fault! 🤖",
      "Oops! My artificial brain needs a reboot. It's like when your computer gets silly. 💻",
      "Something went wrong in my system. My programmer is probably taking a nap instead of working. 😴",
    ],
  };

  const messages = friendlyMessages[language];
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

export default function useCompletionsGemini() {
  // messagesForApi: Almacena el historial en el formato que Gemini espera para `contents`
  const [messagesForApi, setMessagesForApi] = useState<GeminiContent[]>([]);
  // uiMessages: Almacena los mensajes para mostrar en la UI
  const [uiMessages, setUiMessages] = useState<UIMessageType[]>([]);
  const { language } = useI18n();

  const result = useMutation<AssistantMessageStructure, Error, string>({
    mutationFn: async (
      userInput: string
    ): Promise<AssistantMessageStructure> => {
      // Añadir mensaje del usuario a la UI inmediatamente
      const userUIMessage: UIMessageType = {
        id: `user-${Date.now()}`,
        role: Role.USER,
        content: userInput,
      };
      setUiMessages((prev) => [...prev, userUIMessage]);

      const historyForApi = [...messagesForApi];

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userInput,
          messagesForApi: historyForApi,
          language,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error ?? `Error ${response.status}`);
      }

      const {
        assistant: assistantMessageStructure,
        rawModelResponse: rawJsonText,
      } = data;

      if (!assistantMessageStructure) {
        throw new Error("La API no devolvió la estructura esperada.");
      }

      // Añadir respuesta del asistente a la UI
      const assistantUIMessage: UIMessageType = {
        id: `assistant-${Date.now()}`,
        role: Role.MODEL,
        content: assistantMessageStructure.response,
        highchart: assistantMessageStructure.highchart ?? undefined,
        title: assistantMessageStructure.title ?? undefined,
        description: assistantMessageStructure.description ?? undefined,
      };
      setUiMessages((prev) => [...prev, assistantUIMessage]);

      // Actualizar historial para la siguiente petición (formato que espera Gemini)
      const currentTurnUserContent: GeminiContent = {
        role: Role.USER,
        parts: [{ text: userInput }],
      };
      const nextHistory = [
        ...historyForApi,
        currentTurnUserContent,
        ...(typeof rawJsonText === "string"
          ? [{ role: Role.MODEL as const, parts: [{ text: rawJsonText }] }]
          : []),
      ];
      setMessagesForApi(nextHistory);

      return assistantMessageStructure;
    },
    onError: (error: Error) => {
      console.error("Error en la mutación:", error);
      // Generar mensaje de error amigable y gracioso
      const friendlyMessage = getFriendlyErrorMessage(error, language);
      const errorUIMessage: UIMessageType = {
        id: `error-${Date.now()}`,
        role: Role.MODEL,
        content: friendlyMessage,
      };
      setUiMessages((prev) => [...prev, errorUIMessage]);
    },
  });

  // Devolvemos uiMessages para renderizar en el chat
  return { messages: uiMessages, result };
}
