import { GoogleGenAI } from "@google/genai";
import { buildSystemPrompt } from "@/lib/knowledge";
import { rateLimit } from "@/lib/rateLimit";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  if (!rateLimit(ip, 20, 60_000)) {
    return new Response("Too many requests", { status: 429 });
  }

  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response("Bad request", { status: 400 });
  }

  if (!process.env.GEMINI_API_KEY) {
    return new Response("The assistant is not configured yet.", { status: 500 });
  }

  const contents = messages.slice(-12).map((m: { role?: string; content?: unknown }) => ({
    role: m?.role === "assistant" ? "model" : "user",
    parts: [{ text: String(m?.content ?? "").slice(0, 1000) }],
  }));

  try {
    const stream = await ai.models.generateContentStream({
      model: MODEL,
      contents,
      config: { systemInstruction: buildSystemPrompt(), temperature: 0.3, maxOutputTokens: 500 },
    });

    const encoder = new TextEncoder();
    const body2 = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.text) controller.enqueue(encoder.encode(chunk.text));
          }
        } catch {
          controller.enqueue(
            encoder.encode("\n\nSorry, I could not finish that reply. Please try again.")
          );
        }
        controller.close();
      },
    });

    return new Response(body2, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new Response("Sorry, I could not finish that reply. Please try again.", {
      status: 500,
    });
  }
}
