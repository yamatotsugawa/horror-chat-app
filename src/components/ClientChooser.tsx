"use client";

import { useState } from "react";
import type { HorrorId, HorrorCharacter } from "@/data/horrorCharacters";
import CharacterCard from "@/components/CharacterCard";
import Chat from "@/components/Chat";

export default function ClientChooser({
  characters,
  defaultId,
}: {
  characters: HorrorCharacter[];
  defaultId: HorrorId;
}) {
  // 念のため：characters が来ているか可視化
  // 画面に「キャラ数: 4」などと小さく出ます
  const dbg = `キャラ数: ${characters?.length ?? 0}`;

  const [selectedId, setSelectedId] = useState<HorrorId>(defaultId);
  const selected = characters.find((c) => c.id === selectedId)!;

  return (
    <>
      <div style={{ color: "#9aa0ab", fontSize: 12, marginBottom: 6 }}>{dbg}</div>

      {/* キャラ選択（カードが暗すぎて見えない問題に備え、枠線を強調） */}
      <section className="grid" style={{ marginBottom: 12 }}>
        {characters.map((c) => (
          <CharacterCard
            key={c.id}
            c={c}
            selected={c.id === selectedId}
            onSelect={() => setSelectedId(c.id)}
          />
        ))}
      </section>

      {/* 選択結果と単一の入力欄 */}
      <div className="chat-title" style={{ marginBottom: 8 }}>
        <span className="chip">{selected.name}</span> に相談します。
      </div>
      <section className="chat-section">
        <Chat characterId={selectedId} />
      </section>
    </>
  );
}
