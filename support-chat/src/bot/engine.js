import { INTENTS, FALLBACK_TEXT, ESCALATE_TEXT } from './knowledgeBase';

const FALLBACK_SUGGESTIONS = ['Track my order', 'Refund policy', 'Shipping info', 'Talk to a human'];

export const initialContext = { awaitingOrder: false, fallbackCount: 0 };

// ---------- text helpers ----------
const normalize = (s) =>
  s.toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

function stem(word) {
  let s = word;
  if (s.length > 4) s = s.replace(/(ing|ed|es|s)$/, '');
  if (/([a-z])\1$/.test(s)) s = s.slice(0, -1); // shipp -> ship
  return s;
}

// Edit distance that also counts swapped neighbours ("refudn" -> "refund") as one edit
function distance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1])
        dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + 1);
    }
  return dp[a.length][b.length];
}

// Same stem, or a one-letter typo on longer words ("refnd" is too short, "refudn" is not)
function wordMatches(token, keyword) {
  const a = stem(token);
  const b = stem(keyword);
  if (a === b) return true;
  return a.length >= 5 && b.length >= 5 && distance(a, b) <= 1;
}

// ---------- intent scoring ----------
function findIntent(text) {
  const norm = normalize(text);
  const tokens = norm.split(' ').filter(Boolean);
  let best = null;

  for (const intent of INTENTS) {
    let score = 0;
    for (const p of intent.phrases) if (norm.includes(p)) score += 3;
    for (const k of intent.keywords) if (tokens.some((t) => wordMatches(t, k))) score += 1;
    if (score > 0 && (!best || score > best.score)) best = { intent, score };
  }
  return best; // earlier intents win ties
}

// ---------- order lookup (demo data derived from the number) ----------
function orderStatus(digits) {
  const id = `ORD-${digits}`;
  const states = [
    `Order ${id} is being processed. We are packing it and expect to dispatch it within 24 hours.`,
    `Order ${id} has shipped and is on its way. It should reach you in 3–4 business days.`,
    `Order ${id} is out for delivery and should arrive today. Please keep your phone handy for the courier.`,
    `Order ${id} was delivered. If you cannot find it, check with neighbours or reception and tell me, and I will help.`,
  ];
  return states[Number(digits[digits.length - 1]) % 4] + ' (Demo data: real orders would come from a database.)';
}

// ---------- main entry ----------
export function getReply(text, ctx = initialContext) {
  const found = findIntent(text);
  const numberMatch = text.match(/\d{5,10}/);
  const mentionsOrder = /\b(order|ord|parcel|package|tracking|track)\b|#/i.test(text);

  // 1. Order number supplied (now or when we asked for it)
  if (numberMatch && (ctx.awaitingOrder || mentionsOrder) && (!found || found.intent.id === 'order_status')) {
    return {
      text: orderStatus(numberMatch[0]),
      suggestions: ['Cancel an order', 'Return an item', 'Talk to a human'],
      ctx: { awaitingOrder: false, fallbackCount: 0 },
    };
  }

  // 2. We asked for an order number but did not get one
  if (ctx.awaitingOrder && !found && ctx.fallbackCount < 2) {
    return {
      text: 'I could not find an order number in that. It is 5–10 digits, like 123456 or ORD-123456. You can find it in your confirmation email.',
      suggestions: ['Talk to a human'],
      ctx: { ...ctx, fallbackCount: ctx.fallbackCount + 1 },
    };
  }

  // 3. Matched an intent
  if (found) {
    const { intent } = found;
    return {
      text: intent.reply,
      suggestions: intent.suggestions,
      ctx: { awaitingOrder: intent.action === 'askOrder', fallbackCount: 0 },
    };
  }

  // 4. Nothing matched
  const count = ctx.fallbackCount + 1;
  return {
    text: count >= 2 ? ESCALATE_TEXT : FALLBACK_TEXT,
    suggestions: count >= 2 ? ['Talk to a human'] : FALLBACK_SUGGESTIONS,
    ctx: { awaitingOrder: false, fallbackCount: count },
  };
}
