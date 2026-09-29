"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";
import { sala, usuario } from "@/app/data/mock";

type NavKey = "feed" | "ninos" | "avisos" | "mi-cuenta";

interface SidebarProps {
  active?: NavKey;
}

interface NavItem {
  key: NavKey;
  label: string;
  href: string;
  icon: ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    key: "feed",
    label: "Feed",
    href: "/",
    icon: (
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
      </svg>
    ),
  },
  {
    key: "ninos",
    label: "Niños",
    href: "/kids",
    icon: (
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="7" r="3" />
        <circle cx="17" cy="9" r="2.4" />
        <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 20a5 5 0 0 1 5.5-4.9" />
      </svg>
    ),
  },
  {
    key: "avisos",
    label: "Avisos",
    href: "/avisos",
    icon: (
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
      </svg>
    ),
  },
  {
    key: "mi-cuenta",
    label: "Mi cuenta",
    href: "/mi-cuenta",
    icon: (
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

interface SidebarContentProps {
  active: NavKey;
  onNavigate: () => void;
}

function SidebarContent({ active, onNavigate }: SidebarContentProps) {
  return (
    <>
      <Link
        href="/"
        onClick={onNavigate}
        className="flex items-center gap-[11px] px-2 pb-[22px] pt-1"
      >
        <div className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[12px] bg-[linear-gradient(155deg,#F8C3A8,#F2937A)]">
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        </div>
        <div>
          <div className="font-display text-[17px] font-semibold leading-none text-ink">OpenDayCare</div>
          <div className="mt-0.5 text-[11.5px] text-muted-100">Sala {sala.nombre}</div>
        </div>
      </Link>
      <Link
        href="/crear-publicacion"
        onClick={onNavigate}
        className="mb-[18px] flex w-full items-center justify-center gap-2 rounded-[14px] bg-[linear-gradient(180deg,#F4977E,#EE8164)] p-3 text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,.75)]"
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        Nueva publicación
      </Link>
      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            onClick={onNavigate}
            className={
              item.key === active
                ? "flex items-center gap-3 rounded-xl bg-[#FBE3D8] px-3 py-[11px] text-[14.5px] font-extrabold text-coral-200"
                : "flex items-center gap-3 rounded-xl px-3 py-[11px] text-[14.5px] font-semibold text-muted-400"
            }
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-2.5 border-t border-line-200 pt-3.5">
        <div className="flex items-center gap-[11px] px-2 py-1.5">
          <div className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-full bg-peach-300 font-display text-[16px] font-semibold text-white">
            {usuario.inicial}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[14px] font-extrabold text-ink">{usuario.nombre}</div>
            <div className="text-[12px] text-muted-100">{usuario.rol}</div>
          </div>
          <Link
            href="/login"
            onClick={onNavigate}
            title="Cerrar sesión"
            className="flex h-8 w-8 flex-none items-center justify-center rounded-[10px] bg-cream text-muted-200"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}

export default function Sidebar({ active = "feed" }: SidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-line-200 bg-surface px-4 py-3 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          aria-expanded={open}
          aria-controls="sidebar-drawer"
          className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[12px] bg-cream text-muted-400"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-[11px]">
          <div className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[12px] bg-[linear-gradient(155deg,#F8C3A8,#F2937A)]">
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          </div>
          <div>
            <div className="font-display text-[17px] font-semibold leading-none text-ink">OpenDayCare</div>
            <div className="mt-0.5 text-[11.5px] text-muted-100">Sala {sala.nombre}</div>
          </div>
        </Link>
      </header>

      <aside className="sticky top-0 hidden h-screen w-[248px] flex-none flex-col border-r border-line-200 bg-surface px-4 py-6 lg:flex">
        <SidebarContent active={active} onNavigate={() => setOpen(false)} />
      </aside>

      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-30 bg-[rgba(63,54,46,.45)] transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        id="sidebar-drawer"
        className={`fixed left-0 top-0 z-40 flex h-screen w-[248px] flex-col border-r border-line-200 bg-surface px-4 py-6 transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent active={active} onNavigate={() => setOpen(false)} />
      </aside>
    </>
  );
}
