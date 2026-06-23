/** Email profesional visible en el sitio (footer / mailto). */
export const CONTACT_EMAIL = "edi.dveloper.dev@gmail.com";

/** Endpoint Formspree para el formulario de contacto. */
export const FORMSPREE_URL = "https://formspree.io/f/mdkbwwro";

/** Límites del chat /api/chat */
export const CHAT_LIMITS = {
  maxUserInputChars: 500,
  maxHistoryTurns: 20,
  maxTurnChars: 2_000,
  windowMs: 60_000,
  maxRequestsPerWindow: 12,
} as const;
