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
        borderColor: selected ? "#e63946" : "#505565", // ここ少し明るく
      }}
    >
      <div className="avatar">
        <Image
          src={c.avatar}
          alt={c.name}
          fill
          sizes="96px"
          style={{ objectFit: "cover", borderRadius: 12 }}
        />
      </div>
      <div className="meta">
        {/* 名前は真っ白 */}
        <div className="name" style={{ color: "rgba(255,255,255,0.85)" }}>
          {c.name}
        </div>
        {/* 説明は少し薄い白 */}
        <div className="tagline" style={{ color: "rgba(255,255,255,0.85)" }}>
          {c.tagline}
        </div>
      </div>
    </button>
  );
}
