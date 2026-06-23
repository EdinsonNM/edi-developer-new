import { CHAT_LIMITS } from "@/lib/site-config";

type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

/** Limpia entradas expiradas de forma oportunista. */
function prune(now: number) {
  if (store.size < 500) return;
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}

export function checkRateLimit(key: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  prune(now);

  const entry = store.get(key);
  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + CHAT_LIMITS.windowMs });
    return { allowed: true, retryAfterSec: 0 };
  }

  if (entry.count >= CHAT_LIMITS.maxRequestsPerWindow) {
    const retryAfterSec = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfterSec };
  }

  entry.count += 1;
  return { allowed: true, retryAfterSec: 0 };
}
