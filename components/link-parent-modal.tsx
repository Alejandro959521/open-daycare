"use client";

import { useState, useEffect, useCallback, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Parent, Invitation } from "@/app/data/kids";
import {
  addInvitation,
  generateInvitationCode,
  getInvitations,
} from "@/app/data/invitations";

const ROLES = ["Mamá", "Papá", "Tutor/a"];

interface LinkParentModalProps {
  childId: string;
  childName: string;
  padres: Parent[];
  onClose: () => void;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function LinkParentModal({
  childId,
  childName,
  padres,
  onClose,
}: LinkParentModalProps) {
  const router = useRouter();
  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [status, setStatus] = useState<"form" | "success">("form");
  const [copied, setCopied] = useState(false);
  const [touched, setTouched] = useState({
    parentName: false,
    email: false,
    rol: false,
  });

  const parentEmails = padres
    .map((p) => p.email?.toLowerCase())
    .filter((e): e is string => !!e);
  const pendingEmails = getInvitations()
    .filter((inv) => inv.childId === childId && inv.status === "pendiente")
    .map((inv) => inv.email.toLowerCase());

  const nameError =
    touched.parentName && parentName.trim().length < 2
      ? "El nombre es obligatorio (mínimo 2 caracteres)"
      : "";
  const emailError = touched.email
    ? !email.trim()
      ? "El email es obligatorio"
      : !isValidEmail(email)
        ? "El email no tiene un formato válido"
        : parentEmails.includes(email.toLowerCase())
          ? "Este email ya está vinculado a un padre"
          : pendingEmails.includes(email.toLowerCase())
            ? "Ya existe una invitación pendiente para este email"
            : ""
    : "";
  const rolError =
    touched.rol && !rol ? "Seleccioná un parentesco" : "";

  const isValid =
    parentName.trim().length >= 2 &&
    isValidEmail(email) &&
    !!rol &&
    !parentEmails.includes(email.toLowerCase()) &&
    !pendingEmails.includes(email.toLowerCase());

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({ parentName: true, email: true, rol: true });
    if (!isValid) return;

    const code = generateInvitationCode();
    const now = new Date();
    const expires = new Date(now);
    expires.setDate(expires.getDate() + 7);

    const invitation: Invitation = {
      id: String(Date.now()),
      childId,
      parentName: parentName.trim(),
      email: email.trim().toLowerCase(),
      rol,
      code,
      status: "pendiente",
      createdAt: now.toISOString(),
      expiresAt: expires.toISOString(),
    };

    addInvitation(invitation);
    setGeneratedCode(code);
    setStatus("success");
  };

  const handleCopy = useCallback(async () => {
    if (!generatedCode) return;
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = generatedCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
    }
  }, [generatedCode]);

  useEffect(() => {
    if (copied) {
      const t = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(t);
    }
  }, [copied]);

  useEffect(() => {
    if (status !== "success") return;
    const t = setTimeout(() => {
      router.push(`/kids/${childId}`);
    }, 2000);
    return () => clearTimeout(t);
  }, [status, childId, router]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-6">
      <div className="w-full max-w-[480px] overflow-hidden rounded-[24px] border border-[#ECE0D0] bg-[#FBF4EC] shadow-[0_20px_50px_-24px_rgba(63,54,46,0.35)]">
        <div className="flex items-center justify-between border-b border-[#ECE0D0] px-[26px] py-5">
          <div>
            <div className="font-display text-[18px] font-semibold text-ink">
              Vincular padre
            </div>
            <div className="text-[13px] text-muted-100">a {childName}</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] bg-[#F0E6D8] text-[#94887B] transition-colors hover:bg-[#E7DAC8]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-[26px] py-[22px]">
          {status === "success" ? (
            <div className="flex flex-col items-center gap-5 py-6">
              <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#CFEBD8]">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3E9B6C"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div className="text-center">
                <div className="font-display text-[18px] font-semibold text-ink">
                  Invitación enviada
                </div>
                <div className="mt-1 text-[14px] text-muted-100">
                  Invitación enviada a {email.trim().toLowerCase()}
                </div>
              </div>
              <div className="w-full rounded-[16px] border-[1.5px] border-dashed border-[#E6D08A] bg-[#FBF1D6] p-[18px] text-center">
                <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#A88526]">
                  CÓDIGO DE INVITACIÓN
                </div>
                <div className="mt-2 font-display text-[34px] font-semibold tracking-[7px] text-[#8A7234]">
                  {generatedCode}
                </div>
                <div className="mt-1.5 text-[13px] text-[#A88526]">
                  Vence en 7 días
                </div>
              </div>
              <div className="text-[13px] text-muted-100">
                Redirigiendo al perfil...
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-5 flex gap-[11px] rounded-[14px] bg-[#E3ECFB] px-4 py-[13px]">
                <svg
                  className="mt-[1px] flex-none"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4E72C8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
                <span className="text-[13.5px] leading-[1.45] text-[#3F5694]">
                  Le enviaremos un correo con un código para que active su
                  cuenta. Solo verá el feed de {childName.split(" ")[0]}.
                </span>
              </div>

              <label className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
                NOMBRE DEL PADRE/MADRE
              </label>
              <input
                placeholder="Ej. Diego Fernández"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                onBlur={() =>
                  setTouched((t) => ({ ...t, parentName: true }))
                }
                className={`mb-[18px] w-full rounded-[14px] border border-[1.5px] ${nameError ? "border-red-400" : "border-[#EADFD0]"} bg-white px-4 py-[13px] text-[15px] text-ink placeholder:text-[#B6A99B]`}
              />
              {nameError && (
                <p className="-mt-4 mb-[18px] text-[12px] font-bold text-red-500">
                  {nameError}
                </p>
              )}

              <label className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
                EMAIL
              </label>
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                className={`mb-[18px] w-full rounded-[14px] border border-[1.5px] ${emailError ? "border-red-400" : "border-[#EADFD0]"} bg-white px-4 py-[13px] text-[15px] text-ink placeholder:text-[#B6A99B]`}
              />
              {emailError && (
                <p className="-mt-4 mb-[18px] text-[12px] font-bold text-red-500">
                  {emailError}
                </p>
              )}

              <label className="mb-[10px] block text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
                PARENTESCO
              </label>
              <div className="mb-5 flex gap-[9px]">
                {ROLES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setRol(r);
                      setTouched((t) => ({ ...t, rol: true }));
                    }}
                    className={`flex-1 cursor-pointer rounded-full border-[1.5px] py-[11px] text-[14px] font-extrabold transition-colors ${
                      rol === r
                        ? "border-[#9FB8EC] bg-[#CCD8F4] text-[#4E72C8]"
                        : "border-[#ECE0D0] bg-surface text-muted-400 hover:border-[#D8CBBA]"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              {rolError && (
                <p className="-mt-4 mb-5 text-[12px] font-bold text-red-500">
                  {rolError}
                </p>
              )}

              <button
                type="submit"
                disabled={!isValid}
                className="flex w-full cursor-pointer items-center justify-center gap-[9px] rounded-[14px] bg-gradient-to-b from-peach-200 to-peach-400 py-[14px] text-[15.5px] font-extrabold text-white shadow-[0_10px_22px_-8px_rgba(238,129,100,0.7)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m22 2-7 20-4-9-9-4z" />
                  <path d="M22 2 11 13" />
                </svg>
                Enviar invitación
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
