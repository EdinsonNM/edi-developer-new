import { systemPrompt } from "@/presentation/utils/hooks/system-prompt";
import edinsonProfile from "@/presentation/utils/hooks/edinson_profile.json";

/**
 * Prompt para el terminal en streaming: misma persona, pero responde en
 * TEXTO PLANO conversacional (sin JSON ni gráficos), usando el perfil de
 * Edinson como única fuente de verdad.
 */
function buildStreamSystemPrompt(language: "es" | "en"): string {
  const es = language === "es";
  const offTopic = es
    ? "Este chat solo responde preguntas sobre Edinson Nuñez More: su experiencia, habilidades, proyectos o charlas."
    : "This chat only answers questions about Edinson Nuñez More: his experience, skills, projects or talks.";

  return [
    es
      ? "Eres el asistente de Edinson Nuñez More. Respondes ÚNICAMENTE preguntas sobre su carrera profesional, usando su perfil (JSON abajo) como única fuente de verdad."
      : "You are Edinson Nuñez More's assistant. You ONLY answer questions about his professional career, using his profile (JSON below) as the single source of truth.",
    es ? "Reglas:" : "Rules:",
    es
      ? "- Responde SIEMPRE en español, en TEXTO PLANO conversacional y breve (1–3 frases). Nada de JSON, markdown, listas ni gráficos."
      : "- ALWAYS reply in English, in brief conversational PLAIN TEXT (1–3 sentences). No JSON, markdown, lists or charts.",
    `- ${es ? "Si la pregunta no es sobre Edinson, responde:" : "If the question isn't about Edinson, reply:"} "${offTopic}"`,
    "",
    (es ? "Perfil de Edinson (JSON):" : "Edinson's profile (JSON):"),
    JSON.stringify(edinsonProfile),
  ].join("\n");
}

export type ChatContent = {
  role: "user" | "model";
  parts: Array<{ text: string }>;
};

export type AssistantMessageStructure = {
  response: string;
  title: string | null;
  description: string | null;
  highchart: Highcharts.Options | null;
};

const DEFAULT_HIGHCHART: Highcharts.Options = {
  chart: { type: "column", backgroundColor: "transparent", marginTop: 60 },
  title: { text: "" },
  xAxis: { categories: [], labels: { style: { color: "#ccc" } } },
  yAxis: {
    title: { text: "", style: { color: "#ccc" } },
    labels: { style: { color: "#ccc" } },
  },
  legend: { itemStyle: { color: "#ccc" } },
  series: [],
};

function generateDynamicPrompt(language: "es" | "en"): string {
  const languageInstructions = {
    es: {
      responseInstruction:
        'IMPORTANTE: Debes responder SIEMPRE en español. Todos los textos en el campo "response" deben estar en español.',
      offTopicResponse:
        "Hola, este chat está diseñado exclusivamente para responder preguntas sobre Edinson Nuñez More. Puedes preguntarme sobre su experiencia, habilidades, proyectos, charlas o cualquier aspecto profesional relacionado con él.",
    },
    en: {
      responseInstruction:
        'IMPORTANT: You must ALWAYS respond in English. All texts in the "response" field must be in English.',
      offTopicResponse:
        "Hello, this chat is designed exclusively to answer questions about Edinson Nuñez More. You can ask me about his experience, skills, projects, talks, or any professional aspect related to him.",
    },
  };

  const lang = languageInstructions[language];
  const dynamicPrompt = `${lang.responseInstruction}

---

${systemPrompt.replace(
  '"Hola, este chat está diseñado exclusivamente para responder preguntas sobre Edinson Nuñez More. Puedes preguntarme sobre su experiencia, habilidades, proyectos, charlas o cualquier aspecto profesional relacionado con él."',
  `"${lang.offTopicResponse}"`
)}`;

  return dynamicPrompt;
}

function sanitizeResponse(
  parsedJson: unknown,
  language: "es" | "en"
): AssistantMessageStructure {
  const messages = {
    es: {
      errorProcessing:
        "Hubo un problema al procesar la respuesta del asistente.",
      offTopicDefault:
        "Hola, este chat está diseñado exclusivamente para responder preguntas sobre Edinson Nuñez More...",
      noResponse: "Sin respuesta.",
    },
    en: {
      errorProcessing: "There was a problem processing the assistant response.",
      offTopicDefault:
        "Hello, this chat is designed exclusively to answer questions about Edinson Nuñez More...",
      noResponse: "No response.",
    },
  };

  const lang = messages[language];
  const parsed = parsedJson as Record<string, unknown> | null | undefined;

  if (!parsed) {
    return {
      response: lang.errorProcessing,
      title: null,
      description: null,
      highchart: DEFAULT_HIGHCHART,
    };
  }

  if (
    parsed.response &&
    parsed.title === null &&
    parsed.description === null &&
    parsed.highchart === null
  ) {
    return {
      response: (parsed.response as string) ?? lang.offTopicDefault,
      title: null,
      description: null,
      highchart: null,
    };
  }

  return {
    response: (parsed.response as string) ?? lang.noResponse,
    title: (parsed.title as string | null) ?? "",
    description: (parsed.description as string | null) ?? "",
    highchart: (parsed.highchart as Highcharts.Options) ?? DEFAULT_HIGHCHART,
  };
}

export type ChatWithOpenAIResult = {
  assistant: AssistantMessageStructure;
  rawModelResponse: string;
};

export async function chatWithOpenAI(
  userInput: string,
  messagesForApi: ChatContent[],
  language: "es" | "en"
): Promise<ChatWithOpenAIResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY no está configurada en el servidor.");
  }

  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  const url = "https://api.openai.com/v1/chat/completions";

  // Convertir el historial (formato Gemini: role user/model + parts) al
  // formato de OpenAI (role user/assistant + content).
  const historyMessages = messagesForApi.map((m) => ({
    role: m.role === "model" ? ("assistant" as const) : ("user" as const),
    content: m.parts.map((p) => p.text).join(""),
  }));

  const messages = [
    { role: "system" as const, content: generateDynamicPrompt(language) },
    ...historyMessages,
    { role: "user" as const, content: userInput },
  ];

  const requestBody = {
    model,
    messages,
    response_format: { type: "json_object" as const },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Error de la API: ${response.status} ${response.statusText} - ${errorBody}`
    );
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const rawJsonText = data?.choices?.[0]?.message?.content;

  if (!rawJsonText) {
    throw new Error(
      "La API de OpenAI no devolvió contenido de texto válido en la estructura esperada."
    );
  }

  let parsedAssistantJson: unknown;
  try {
    parsedAssistantJson = JSON.parse(rawJsonText);
  } catch (e) {
    throw new Error(
      "La respuesta de OpenAI no fue un JSON válido: " + (e as Error).message
    );
  }

  const assistant = sanitizeResponse(parsedAssistantJson, language);
  return { assistant, rawModelResponse: rawJsonText };
}

/**
 * Versión en streaming: pide la respuesta en TEXTO PLANO (sin JSON) y devuelve
 * un ReadableStream que emite los tokens de texto a medida que llegan.
 */
export async function streamOpenAI(
  userInput: string,
  messagesForApi: ChatContent[],
  language: "es" | "en"
): Promise<ReadableStream<Uint8Array>> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY no está configurada en el servidor.");
  }

  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  const url = "https://api.openai.com/v1/chat/completions";

  const historyMessages = messagesForApi.map((m) => ({
    role: m.role === "model" ? ("assistant" as const) : ("user" as const),
    content: m.parts.map((p) => p.text).join(""),
  }));

  const messages = [
    { role: "system" as const, content: buildStreamSystemPrompt(language) },
    ...historyMessages,
    { role: "user" as const, content: userInput },
  ];

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model, messages, stream: true }),
  });

  if (!response.ok || !response.body) {
    const errorBody = await response.text().catch(() => "");
    throw new Error(
      `Error de la API: ${response.status} ${response.statusText} - ${errorBody}`
    );
  }

  // Transforma el SSE de OpenAI (líneas `data: {...}`) en texto plano (deltas).
  const upstream = response.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      const { done, value } = await upstream.read();
      if (done) {
        controller.close();
        return;
      }
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const data = trimmed.slice(5).trim();
        if (data === "[DONE]") {
          controller.close();
          return;
        }
        try {
          const json = JSON.parse(data) as {
            choices?: Array<{ delta?: { content?: string } }>;
          };
          const delta = json.choices?.[0]?.delta?.content;
          if (delta) controller.enqueue(encoder.encode(delta));
        } catch {
          /* fragmento incompleto: se completará en el siguiente chunk */
        }
      }
    },
    cancel() {
      upstream.cancel().catch(() => {});
    },
  });
}
