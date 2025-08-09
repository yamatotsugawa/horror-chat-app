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
        <div className="name">{c.name}</div>
        <div className="tagline">{c.tagline}</div>
      </div>
    </button>
  );
}
