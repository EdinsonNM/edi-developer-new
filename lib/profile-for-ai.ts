import edinsonProfile from "@/presentation/utils/hooks/edinson_profile.json";

/** Campos que no deben enviarse al modelo ni quedar en prompts. */
const OMIT_FROM_AI = new Set([
  "email",
  "birthplace",
  "visa_usa",
  "countries_visited",
]);

/** Perfil profesional sin PII para prompts del chat. */
export function profileForAI(): Record<string, unknown> {
  const safe: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(edinsonProfile)) {
    if (!OMIT_FROM_AI.has(key)) safe[key] = value;
  }
  return safe;
}
