"use client";

import { useState, type FormEvent, type KeyboardEvent } from "react";
import { addKid, calcularEdad, getAvatarColors, type Kid } from "@/app/data/kids";

const SALAS = ["Soles", "Lunas", "Estrellas"];

interface AddKidModalProps {
  onClose: () => void;
}

export default function AddKidModal({ onClose }: AddKidModalProps) {
  const [nombre, setNombre] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [sala, setSala] = useState("");
  const [alergias, setAlergias] = useState<string[]>([]);
  const [alergiaInput, setAlergiaInput] = useState("");
  const [notasMedicas, setNotasMedicas] = useState("");

  const isValid = nombre.trim() !== "" && fechaNacimiento.trim() !== "" && sala !== "";

  function handleAddAlergia(e: KeyboardEvent<HTMLInputElement>) {
    const value = alergiaInput.trim();
    if ((e.key === "Enter" || e.key === ",") && value !== "") {
      e.preventDefault();
      if (!alergias.includes(value)) {
        setAlergias([...alergias, value]);
      }
      setAlergiaInput("");
    }
  }

  function handleRemoveAlergia(index: number) {
    setAlergias(alergias.filter((_, i) => i !== index));
  }

  function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    const newKid: Kid = {
      id: String(Date.now()),
      nombre: nombre.trim(),
      inicial: nombre.trim().charAt(0).toUpperCase(),
      edad: calcularEdad(fechaNacimiento),
      sala,
      fechaNacimiento,
      ingreso: new Date().toLocaleDateString("es-AR", { month: "short", year: "numeric" }),
      alergias,
      padres: [],
      colorAvatar: getAvatarColors(nombre),
      notasMedicas: notasMedicas.trim() || undefined,
    };

    addKid(newKid);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-6">
      <div className="w-full max-w-[520px] rounded-[24px] border border-[#ECE0D0] bg-[#FBF4EC] shadow-[0_20px_50px_-24px_rgba(63,54,46,0.35)]">
        <div className="flex items-center justify-between border-b border-[#ECE0D0] px-[26px] py-5">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-[15px] font-bold text-[#94887B] transition-colors hover:text-ink"
          >
            Cancelar
          </button>
          <span className="font-display text-[18px] font-semibold text-ink">
            Agregar niño
          </span>
          <button
            type="button"
            onClick={handleSave}
            disabled={!isValid}
            className="cursor-pointer text-[15px] font-extrabold text-coral-300 transition-colors hover:text-coral-300/70 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Guardar
          </button>
        </div>

        <form onSubmit={handleSave} className="px-[26px] py-6">
          <label className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
            NOMBRE COMPLETO
          </label>
          <input
            placeholder="Ej. Martina López"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mb-[18px] w-full rounded-[14px] border border-[1.5px] border-[#EADFD0] bg-white px-4 py-[13px] text-[15px] text-ink placeholder:text-[#B6A99B]"
          />

          <div className="mb-[18px] flex gap-[14px]">
            <div className="flex-1">
              <label className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
                FECHA DE NACIMIENTO
              </label>
              <input
                placeholder="dd/mm/aaaa"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                className="w-full rounded-[14px] border border-[1.5px] border-[#EADFD0] bg-white px-4 py-[13px] text-[15px] text-ink placeholder:text-[#B6A99B]"
              />
            </div>
            <div className="flex-1">
              <label className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
                SALA
              </label>
              <div className="relative">
                <select
                  value={sala}
                  onChange={(e) => setSala(e.target.value)}
                  className="w-full appearance-none rounded-[14px] border border-[1.5px] border-[#EADFD0] bg-white px-4 py-[13px] pr-10 text-[15px] font-bold text-ink"
                >
                  <option value="" disabled>
                    Seleccionar
                  </option>
                  {SALAS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#B0A290"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          <label className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
            ALERGIAS (ETIQUETAS)
          </label>
          <div className="mb-[18px] flex min-h-[48px] flex-wrap items-center gap-2 rounded-[14px] border border-[1.5px] border-[#EADFD0] bg-white px-4 py-3">
            {alergias.map((alergia, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 rounded-full bg-coral-100 px-3 py-1 text-[13px] font-bold text-coral-300"
              >
                {alergia}
                <button
                  type="button"
                  onClick={() => handleRemoveAlergia(i)}
                  className="ml-0.5 text-coral-300 hover:text-coral-300/70"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              placeholder={alergias.length === 0 ? "Ej. Maní, Lactosa" : ""}
              value={alergiaInput}
              onChange={(e) => setAlergiaInput(e.target.value)}
              onKeyDown={handleAddAlergia}
              className="min-w-[120px] flex-1 border-none bg-transparent text-[15px] text-ink outline-none placeholder:text-[#B6A99B]"
            />
          </div>

          <label className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
            NOTAS MÉDICAS
          </label>
          <textarea
            placeholder="Indicaciones, medicación, contactos…"
            value={notasMedicas}
            onChange={(e) => setNotasMedicas(e.target.value)}
            className="min-h-[90px] w-full resize-y rounded-[14px] border border-[1.5px] border-[#EADFD0] bg-white px-4 py-[13px] text-[15px] leading-relaxed text-ink placeholder:text-[#B6A99B]"
          />
        </form>
      </div>
    </div>
  );
}
