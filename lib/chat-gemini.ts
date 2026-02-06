import { systemPrompt } from "@/presentation/utils/hooks/system-prompt";

export type GeminiContent = {
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

function sanitizeGeminiResponse(
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

export type ChatWithGeminiResult = {
  assistant: AssistantMessageStructure;
  rawModelResponse: string;
};

export async function chatWithGemini(
  userInput: string,
  messagesForApi: GeminiContent[],
  language: "es" | "en"
): Promise<ChatWithGeminiResult> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY no está configurada en el servidor.");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const currentTurnUserContent: GeminiContent = {
    role: "user",
    parts: [{ text: userInput }],
  };
  const historyForApi = [...messagesForApi, currentTurnUserContent];

  const requestBody = {
    systemInstruction: {
      parts: [{ text: generateDynamicPrompt(language) }],
    },
    contents: historyForApi,
    generationConfig: {
      responseMimeType: "application/json",
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Error de la API: ${response.status} ${response.statusText} - ${errorBody}`
    );
  }

  const data = (await response.json()) as {
    candidates?: Array<{
      content?: { parts?: Array<{ text?: string }> };
    }>;
  };

  const rawJsonText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawJsonText) {
    throw new Error(
      "La API de Gemini no devolvió contenido de texto válido en la estructura esperada."
    );
  }

  let parsedAssistantJson: unknown;
  try {
    parsedAssistantJson = JSON.parse(rawJsonText);
  } catch (e) {
    throw new Error(
      "La respuesta de Gemini no fue un JSON válido: " + (e as Error).message
    );
  }

  const assistant = sanitizeGeminiResponse(parsedAssistantJson, language);
  return { assistant, rawModelResponse: rawJsonText };
}
