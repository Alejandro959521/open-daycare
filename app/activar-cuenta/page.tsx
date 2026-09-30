"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ActivarCuentaPage() {
  const [authorized, setAuthorized] = useState(false);
  const [email, setEmail] = useState("lucia.fernandez@gmail.com");
  const [password, setPassword] = useState("contraseña");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Email inválido";
    }

    if (!password) {
      newErrors.password = "Contraseña requerida";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-10">
      <div className="w-full max-w-[440px]">
        <div className="w-[58px] h-[58px] rounded-[18px] bg-gradient-to-br from-[#F8C3A8] to-peach-300 flex items-center justify-center mb-[22px] shadow-[0_12px_26px_-10px_rgba(238,129,100,0.65)]">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>
          </svg>
        </div>
        <h1 className="font-display font-semibold text-[32px] leading-tight mb-2 text-ink">Bienvenida a OpenDayCare</h1>
        <p className="mb-[26px] text-muted-200 text-[15.5px] leading-relaxed">Te invitaron a seguir el día de tu hijo. Creá tu contraseña para activar la cuenta.</p>

        <div className="flex items-center gap-3.5 bg-white border border-line-200 rounded-2xl p-3.5 mb-[22px]">
          <div className="w-11 h-11 rounded-full bg-[#A9D9E8] text-[#1F7A93] font-display font-semibold text-[19px] flex items-center justify-center">M</div>
          <div>
            <div className="text-[13px] text-muted-200">Te invitaron a seguir a</div>
            <div className="font-display font-semibold text-[17px] text-ink">Mateo · Sala Soles</div>
          </div>
        </div>

        <div className="text-xs font-bold tracking-wider text-muted-200 mb-2">CÓDIGO DE INVITACIÓN</div>
        <input
          type="text"
          defaultValue="7K4P9"
          className="w-full py-3.5 px-4 rounded-[14px] border border-line-200 bg-white text-lg tracking-[3px] font-bold text-ink mb-4 font-display"
        />

        <form onSubmit={handleSubmit}>
          <div className="text-xs font-bold tracking-wider text-muted-200 mb-2">EMAIL</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-3.5 px-4 rounded-[14px] border border-line-200 bg-white text-base text-ink mb-1"
          />
          {errors.email && <p className="text-coral-300 text-xs mb-3">{errors.email}</p>}
          {!errors.email && <div className="mb-4"></div>}

          <div className="text-xs font-bold tracking-wider text-muted-200 mb-2">CREAR CONTRASEÑA</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-3.5 px-4 rounded-[14px] border border-peach-100 bg-white text-base text-ink mb-1"
          />
          {errors.password && <p className="text-coral-300 text-xs mb-3">{errors.password}</p>}
          {!errors.password && <div className="mb-4"></div>}

          <label className="flex items-start gap-3 bg-[#FBF1D6] rounded-[14px] p-3.5 mb-6 cursor-pointer">
            <span className="flex-none w-6 h-6 rounded-lg flex items-center justify-center mt-0.5" style={{ background: authorized ? "#5FB97E" : "#EADFD0" }}>
              {authorized && (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </span>
            <span className="text-sm text-[#8A7234] leading-relaxed">
              Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro de la app.
            </span>
            <input
              type="checkbox"
              checked={authorized}
              onChange={(e) => setAuthorized(e.target.checked)}
              className="sr-only"
            />
          </label>

          <button
            type="submit"
            disabled={!authorized}
            className={`w-full py-3.5 rounded-[15px] bg-gradient-to-b from-peach-200 to-peach-400 text-white font-extrabold text-base shadow-[0_10px_22px_-8px_rgba(238,129,100,0.7)] ${!authorized ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Activar mi cuenta
          </button>
        </form>
      </div>
    </div>
  );
}
