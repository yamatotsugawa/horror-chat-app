"use client";

import Image from "next/image";
import type { HorrorCharacter } from "@/data/horrorCharacters";

export default function CharacterCard({
  c,
  selected,
  onSelect,
}: {
  c: HorrorCharacter;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`card ${selected ? "selected" : ""}`}
      style={{
        borderColor: selected ? "#e63946" : "#505565",
      }}
    >
      <div className="avatar" style={{ position: "relative" }}>
        {c.avatar ? (
          <Image
            src={c.avatar}         // ← avatarがある時だけ描画
            alt={c.name}
            fill
            sizes="96px"
            style={{ objectFit: "cover", borderRadius: 12 }}
          />
        ) : (
          // 画像が無いキャラのフォールバック
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 12,
              background: "#1f2937",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 28,
              color: "#e5e7eb",
            }}
          >
            {c.name.slice(0, 1)}
          </div>
        )}
      </div>

      <div className="meta">
        <div className="name" style={{ color: "rgba(255,255,255,0.85)"  }}>
          {c.name}
        </div>
        <div className="tagline" style={{ color: "rgba(255,255,255,0.85)" }}>
          {c.tagline}
        </div>
      </div>
    </button>
  );
}
