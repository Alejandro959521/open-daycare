"use client";

import { useState } from "react";
import { kids as initialKids, kids as globalKids } from "@/app/data/kids";
import KidCard from "@/components/kid-card";
import Sidebar from "@/components/sidebar";
import AddKidModal from "@/components/add-kid-modal";

export default function KidsPage() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [kidsList, setKidsList] = useState(initialKids);

  function refreshKidsList() {
    setKidsList([...globalKids]);
  }

  const filtered = kidsList.filter((kid) =>
    kid.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-cream lg:flex-row">
      <Sidebar active="ninos" />
      <main className="min-w-0 flex-1 overflow-y-auto lg:h-screen">
        <div className="mx-auto w-full max-w-[880px] px-10 pb-20 pt-[34px]">
          <div className="mb-[22px] flex items-end justify-between gap-4">
            <div>
              <div className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-coral-200">
                GESTIÓN
              </div>
              <h1 className="font-display text-[30px] font-semibold text-ink">
                Niños
              </h1>
            </div>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="flex cursor-pointer items-center gap-2 rounded-[14px] bg-[linear-gradient(180deg,#F4977E,#EE8164)] px-[18px] py-[11px] text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,.7)] transition-all hover:brightness-110 hover:shadow-[0_10px_22px_-8px_rgba(238,129,100,.8)]"
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
              Agregar niño
            </button>
          </div>

          <div className="mb-[22px] flex items-center gap-[11px] rounded-[14px] border border-line-200 bg-surface p-3.5 px-4">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#B0A290"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              placeholder="Buscar niño…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border-none bg-transparent text-[15px] text-ink outline-none placeholder:text-muted-200"
            />
          </div>

          <div className="mb-[14px] flex items-center gap-3">
            <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-muted-300">
              SALA SOLES
            </span>
            <span className="text-[13px] text-muted-100">
              {filtered.length} niño{filtered.length !== 1 ? "s" : ""}
            </span>
            <span className="h-px flex-1 bg-line-300" />
          </div>

          <div className="grid grid-cols-2 gap-[14px]">
            {filtered.map((kid) => (
              <KidCard key={kid.id} kid={kid} />
            ))}
          </div>
        </div>
      </main>
      {showModal && <AddKidModal onClose={() => setShowModal(false)} onKidAdded={refreshKidsList} />}
    </div>
  );
}
