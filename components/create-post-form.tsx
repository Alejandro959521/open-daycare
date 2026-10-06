"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { type CategoriaPost, type Post } from "@/app/data/mock";
import { addUserPost, generatePostId } from "@/app/data/posts";
import { type Kid } from "@/app/data/kids";

interface CreatePostFormProps {
  kids: Kid[];
  salaNombre: string;
}

const TIPOS: { key: CategoriaPost; label: string }[] = [
  { key: "comida", label: "Comida" },
  { key: "siesta", label: "Siesta" },
  { key: "actividad", label: "Actividad" },
  { key: "logro", label: "Logro" },
  { key: "animo", label: "Ánimo" },
  { key: "foto", label: "Foto" },
  { key: "anuncio", label: "Anuncio" },
];

const TIPO_COLORS: Record<CategoriaPost, { bg: string; color: string }> = {
  comida: { bg: "#FBD8CC", color: "#D9684A" },
  siesta: { bg: "#E7DCF6", color: "#7B5FC0" },
  actividad: { bg: "#2E89A6", color: "#fff" },
  logro: { bg: "#CFEBD8", color: "#3E9B6C" },
  animo: { bg: "#F9D2DE", color: "#C56486" },
  foto: { bg: "#FBD8CC", color: "#D9684A" },
  anuncio: { bg: "#CCD8F4", color: "#4E72C8" },
};

export default function CreatePostForm({ kids, salaNombre }: CreatePostFormProps) {
  const router = useRouter();
  const [selectedKids, setSelectedKids] = useState<string[]>([]);
  const [todaLaSala, setTodaLaSala] = useState(false);
  const [tipoSeleccionado, setTipoSeleccionado] = useState<CategoriaPost | null>(null);
  const [descripcion, setDescripcion] = useState("");

  const hasDestinatario = selectedKids.length > 0 || todaLaSala;
  const hasDescripcion = descripcion.trim() !== "";
  const isValid = hasDestinatario && hasDescripcion;

  function toggleKid(id: string) {
    setSelectedKids((prev) =>
      prev.includes(id) ? prev.filter((kidId) => kidId !== id) : [...prev, id],
    );
    if (id && todaLaSala) setTodaLaSala(false);
  }

  function toggleTodaLaSala() {
    setTodaLaSala((prev) => !prev);
    if (!todaLaSala) setSelectedKids([]);
  }

  function handlePublish(e: FormEvent) {
    e.preventDefault();
    if (!isValid || !tipoSeleccionado) return;

    const now = new Date();
    const hora = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    let destinatariosText: string;
    let destinatariosIds: string[] | undefined;

    if (todaLaSala) {
      destinatariosText = "toda la sala";
      destinatariosIds = undefined;
    } else {
      const selectedKidsData = kids.filter((k) => selectedKids.includes(k.id));
      const nombres = selectedKidsData.map((k) => k.nombre.split(" ")[0]);
      destinatariosText =
        nombres.length === 1
          ? `familia de ${nombres[0]}`
          : `familia de ${nombres.join(", ")}`;
      destinatariosIds = selectedKids;
    }

    const post: Post = {
      id: generatePostId(),
      autor: kids.find((k) => selectedKids.includes(k.id))?.nombre.split(" ")[0] ?? salaNombre,
      avatar: { inicial: null, bg: "#CCD8F4", color: "#4E72C8" },
      hora,
      publicadoPorVos: true,
      categoria: tipoSeleccionado,
      destinatarios: destinatariosText,
      destinatariosIds,
      texto: descripcion.trim(),
      corazones: 0,
      comentarios: 0,
      createdAt: now.toISOString(),
    };

    addUserPost(post);
    router.push("/");
  }

  return (
    <div className="flex min-h-screen items-start justify-center bg-cream px-6 py-10">
      <div className="w-full max-w-[580px] overflow-hidden rounded-[24px] border border-line-200 bg-[#FBF4EC] shadow-[0_20px_50px_-24px_rgba(63,54,46,.35)]">
        <div className="flex items-center justify-between border-b border-line-200 px-[26px] py-5">
          <Link href="/" className="text-[15px] font-bold text-[#94887B]">
            Cancelar
          </Link>
          <span className="font-display text-[18px] font-semibold text-ink">Nueva publicación</span>
          <button
            type="submit"
            form="create-post-form"
            disabled={!isValid}
            className="text-[15px] font-extrabold text-coral-100 disabled:opacity-40"
          >
            Publicar
          </button>
        </div>

        <form id="create-post-form" onSubmit={handlePublish} className="px-[26px] py-6">
          <div className="mb-2.5 text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">PARA</div>
          <div className="mb-[22px] flex flex-wrap gap-[9px]">
            {kids.map((kid) => {
              const isSelected = selectedKids.includes(kid.id);
              return (
                <button
                  key={kid.id}
                  type="button"
                  onClick={() => toggleKid(kid.id)}
                  className="flex items-center gap-2 rounded-full border-[1.5px] py-1.5 pr-3.5 pl-1.5 text-[14px] font-bold"
                  style={{
                    borderColor: isSelected ? "#3F362E" : "#ECE0D0",
                    backgroundColor: isSelected ? "#3F362E" : "#FFFDF9",
                    color: isSelected ? "#fff" : "#6E6359",
                  }}
                >
                  <span
                    className="flex h-[26px] w-[26px] items-center justify-center rounded-full font-display text-[13px] font-semibold"
                    style={{
                      backgroundColor: kid.colorAvatar.bg,
                      color: kid.colorAvatar.textColor,
                    }}
                  >
                    {kid.inicial}
                  </span>
                  {kid.nombre.split(" ")[0]}
                </button>
              );
            })}
            <button
              type="button"
              onClick={toggleTodaLaSala}
              className="rounded-full border-[1.5px] px-4 py-1.5 text-[14px] font-bold"
              style={{
                borderColor: todaLaSala ? "#3F362E" : "#ECE0D0",
                backgroundColor: todaLaSala ? "#3F362E" : "#FFFDF9",
                color: todaLaSala ? "#fff" : "#6E6359",
              }}
            >
              Toda la sala
            </button>
          </div>

          <div className="mb-2.5 text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">TIPO</div>
          <div className="mb-[22px] flex flex-wrap gap-[9px]">
            {TIPOS.map((tipo) => {
              const isSelected = tipoSeleccionado === tipo.key;
              const colors = TIPO_COLORS[tipo.key];
              return (
                <button
                  key={tipo.key}
                  type="button"
                  onClick={() => setTipoSeleccionado(isSelected ? null : tipo.key)}
                  className="rounded-full border-none px-4 py-2 text-[13.5px] font-extrabold"
                  style={{
                    backgroundColor: isSelected ? colors.bg : "#F4ECE1",
                    color: isSelected ? colors.color : "#94887B",
                  }}
                >
                  {tipo.label}
                </button>
              );
            })}
          </div>

          <div className="mb-2.5 text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
            DESCRIPCIÓN
          </div>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Contá cómo le fue hoy…"
            className="mb-[22px] min-h-[120px] w-full resize-none rounded-[14px] border-[1.5px] border-line-300 bg-white p-4 text-[15px] leading-[1.5] text-ink placeholder:text-[#B6A99B]"
          />

          <div className="mb-2.5 text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">FOTOS</div>
          <div className="flex gap-3">
            <div className="flex h-[96px] w-[96px] items-center justify-center rounded-[14px] border border-line-200 bg-[#F4ECE1] text-[#CBB89F]">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.6-3.6a2 2 0 0 0-2.8 0L6 21" />
              </svg>
            </div>
            <div className="flex h-[96px] w-[96px] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[14px] border-[1.5px] border-dashed border-[#DBCDBA] bg-[#F4ECE1] text-[#B0A290]">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C5503A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              <span className="text-[12px]">Agregar</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
