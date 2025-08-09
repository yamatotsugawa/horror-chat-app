// src/components/Chat.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import type { HorrorId } from "@/data/horrorCharacters";

type Msg = { role: "user" | "assistant"; content: string };

export default function Chat({ characterId }: { characterId: HorrorId }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isComposing, setIsComposing] = useState(false); // ← IME中かどうか
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user", content: text } as Msg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ characterId, messages: next }),
      });

      const ct = res.headers.get("content-type") || "";
      if (!ct.includes("application/json")) {
        const text = await res.text();
        throw new Error(
          `HTTP ${res.status} ${res.statusText} / 非JSON応答: ${text.slice(0, 200)}...`
        );
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);

      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply || "…" },
      ]);
    } catch (err: unknown) {
  const message = err instanceof Error ? err.message : String(err);
  setMessages((m) => [
    ...m,
    { role: "assistant", content: `（エラー）${message}` },
  ]);
} finally {
  setLoading(false);
}
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // 変換中はEnterを無視（送信しない）
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="chat-wrap">
      {/* 入力欄（上） */}
      <div className="input-row" style={{ marginBottom: 8 }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          rows={3}
          placeholder="相談内容を入力（IME変換を確定 → Enterで送信 / Shift+Enterで改行）"
          aria-label="相談内容"
        />
        <button onClick={send} disabled={loading || !input.trim()}>
          送信
        </button>
      </div>

      {/* 回答欄（下） */}
      <div className="chat-window" aria-live="polite">
        {messages.length === 0 && (
          <div className="empty-hint">
            ここに会話が表示されます。<br />
            変換中のEnterでは送信されません。確定後にEnterでも送信できます。
          </div>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`bubble ${m.role === "user" ? "me" : "bot"}`}
          >
            {m.content}
          </div>
        ))}
        {loading && <div className="bubble bot">……考え中</div>}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
