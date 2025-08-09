import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { HORROR_CHARACTERS } from "@/data/horrorCharacters";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type Body = {
  characterId: string;
  messages: { role: "user" | "assistant"; content: string }[];
};

export async function GET() {
  return NextResponse.json({
    ok: true,
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    key: process.env.OPENAI_API_KEY ? "set" : "missing",
  });
}

export async function POST(req: NextRequest) {
  try {
    const { characterId, messages } = (await req.json()) as Body;

    const character = HORROR_CHARACTERS.find((c) => c.id === characterId);
    if (!character) return NextResponse.json({ error: "Unknown character" }, { status: 400 });

    // ジェイソンは沈黙
    if (character.id === "jason") return NextResponse.json({ reply: "…" });

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OPENAI_API_KEY is not set" }, { status: 500 });
    }

    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
    const systemPrompt =
      character.styleSystemPrompt + "\n\n出力は日本語。最大でも300字程度。助言は現実的かつ安全。";

    const last = (messages || []).slice(-8);
    const userContent =
      last
        .map((m) => (m.role === "user" ? `ユーザー: ${m.content}` : `アシスタント: ${m.content}`))
        .join("\n") || "相談内容を入力してください。";

    // Responses API（SDK v5）
    const r = await openai.responses.create({
      model,
      input: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
    });

    const reply = r.output_text?.trim() || "…";
    return NextResponse.json({ reply });
  // 末尾あたり
} catch (err: unknown) {
  const message = err instanceof Error ? err.message : String(err);
  console.error("API /chat error:", message, err);
  return NextResponse.json({ error: message }, { status: 500 });
}

}
