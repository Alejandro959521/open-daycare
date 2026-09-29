import Link from "next/link";
import type { Kid } from "@/app/data/kids";

interface KidCardProps {
  kid: Kid;
}

export default function KidCard({ kid }: KidCardProps) {
  const padreCount = kid.padres.length;
  const hasAllergy = kid.alergias.length > 0;
  const hasParents = padreCount > 0;
  const parentText =
    padreCount === 0
      ? "sin padres vinculados"
      : padreCount === 1
        ? "1 padre vinculado"
        : `${padreCount} padres vinculados`;

  let rightElement: React.ReactNode = null;
  if (hasAllergy) {
    rightElement = (
      <span className="rounded-full bg-[#FBD8CC] px-2.5 py-1 text-[11px] font-extrabold text-[#D9684A]">
        {kid.alergias[0].split(" ").pop()?.toUpperCase()}
      </span>
    );
  } else if (!hasParents) {
    rightElement = (
      <span className="rounded-full bg-[#F9D2DE] px-2.5 py-1 text-[11px] font-extrabold text-[#C56486]">
        VINCULAR
      </span>
    );
  } else {
    rightElement = (
      <svg
        className="flex-none"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#CBB89F"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    );
  }

  return (
    <Link
      href={`/kids/${kid.id}`}
      className="flex items-center gap-[14px] min-w-0 rounded-[18px] border border-line-200 bg-surface p-4 shadow-[0_4px_14px_-12px_rgba(120,90,60,.5)] transition-[.15s] hover:border-peach-100 hover:-translate-y-0.5"
    >
      <div
        className="flex h-[48px] w-[48px] flex-none items-center justify-center rounded-full font-display text-[19px] font-semibold"
        style={{
          backgroundColor: kid.colorAvatar.bg,
          color: kid.colorAvatar.textColor,
        }}
      >
        {kid.inicial}
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-display text-[16px] font-semibold text-ink truncate">
          {kid.nombre}
        </div>
        <div className="text-[13px] text-muted-100">
          {kid.edad} años · {parentText}
        </div>
      </div>
      <div className="flex-none">{rightElement}</div>
    </Link>
  );
}
