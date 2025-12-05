export const OPENAI_API_KEY =
  process.env.OPENAI_API_KEY || process.env.OPENAI_KEY;
export const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5-mini";

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export async function createChatCompletion(messages: ChatMessage[]) {
  if (!OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY environment variable");
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI API error ${res.status}: ${text}`);
  }

  const json = await res.json();
  return json;
}
