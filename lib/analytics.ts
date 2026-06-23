type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

function canTrack(): boolean {
  return (
    typeof window !== "undefined" &&
    Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) &&
    typeof window.gtag === "function"
  );
}

/** Envía un evento personalizado a GA4 (no-op si GA no está configurado). */
export function trackEvent(name: string, params?: GtagParams) {
  if (!canTrack()) return;
  window.gtag!("event", name, params);
}

/** Métricas de uso del terminal "Pregúntale a Edi" (sin contenido de mensajes). */
export const chatAnalytics = {
  messageSent(params: {
    language: string;
    source: "chip" | "input";
    messageLength: number;
    turnIndex: number;
  }) {
    trackEvent("chat_message_sent", {
      language: params.language,
      source: params.source,
      message_length: params.messageLength,
      turn_index: params.turnIndex,
    });
  },

  responseSuccess(params: {
    language: string;
    responseLength: number;
    durationMs: number;
    turnIndex: number;
  }) {
    trackEvent("chat_response_success", {
      language: params.language,
      response_length: params.responseLength,
      duration_ms: params.durationMs,
      turn_index: params.turnIndex,
    });
  },

  responseError(params: {
    language: string;
    errorType: "rate_limit" | "validation" | "server" | "network" | "empty";
    statusCode?: number;
    turnIndex: number;
  }) {
    trackEvent("chat_response_error", {
      language: params.language,
      error_type: params.errorType,
      status_code: params.statusCode,
      turn_index: params.turnIndex,
    });
  },
};

/** Métricas del formulario de contacto (sin nombre, email ni mensaje). */
export const contactAnalytics = {
  submit(params: {
    language: string;
    formVariant: "home_minimal" | "legacy";
    messageLength: number;
  }) {
    trackEvent("contact_form_submit", {
      language: params.language,
      form_variant: params.formVariant,
      message_length: params.messageLength,
    });
  },

  success(params: {
    language: string;
    formVariant: "home_minimal" | "legacy";
    messageLength: number;
    durationMs: number;
  }) {
    trackEvent("contact_form_sent", {
      language: params.language,
      form_variant: params.formVariant,
      message_length: params.messageLength,
      duration_ms: params.durationMs,
    });
  },

  error(params: {
    language: string;
    formVariant: "home_minimal" | "legacy";
    errorType: "server" | "network";
    statusCode?: number;
  }) {
    trackEvent("contact_form_error", {
      language: params.language,
      form_variant: params.formVariant,
      error_type: params.errorType,
      status_code: params.statusCode,
    });
  },
};
