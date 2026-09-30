"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="min-h-screen grid grid-cols-[1.05fr_1fr] bg-cream">
      <div className="relative overflow-hidden bg-gradient-to-br from-peach-100 via-peach-300 to-peach-400 flex flex-col justify-between p-14 text-white">
        <div className="absolute w-[420px] h-[420px] rounded-full bg-white/12 -top-36 -right-32"></div>
        <div className="absolute w-[300px] h-[300px] rounded-full bg-white/10 -bottom-28 -left-20"></div>
        
        <div className="flex items-center gap-3 relative">
          <div className="w-[46px] h-[46px] rounded-[14px] bg-white/22 flex items-center justify-center">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>
            </svg>
          </div>
          <span className="font-display font-semibold text-xl tracking-wide">OpenDayCare</span>
        </div>
        
        <div className="relative">
          <h1 className="font-display font-semibold text-[42px] leading-tight mb-4">
            El día de cada niño,<br/>compartido con su familia.
          </h1>
          <p className="text-base leading-relaxed max-w-[430px] text-white/92">
            Publicá momentos, gestioná las salas y mantené a las familias cerca, desde un solo lugar.
          </p>
        </div>
        
        <div className="relative text-sm text-white/90">🌿 Guardería Sala Soles</div>
      </div>

      <div className="flex items-center justify-center p-10">
        <div className="w-full max-w-[392px]">
          <h2 className="font-display font-semibold text-3xl mb-1.5 text-ink">Iniciar sesión</h2>
          <p className="mb-7 text-muted-200 text-[15px]">Ingresá para ver el día de hoy.</p>

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
            
            <div className="text-xs font-bold tracking-wider text-muted-200 mb-2">CONTRASEÑA</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full py-3.5 px-4 rounded-[14px] border border-line-200 bg-white text-base text-ink mb-1"
            />
            {errors.password && <p className="text-coral-300 text-xs mb-3">{errors.password}</p>}
            {!errors.password && <div className="mb-2.5"></div>}
            
            <div className="text-right mb-5">
              <span className="text-coral-300 text-[13.5px] font-bold cursor-pointer">¿Olvidaste tu contraseña?</span>
            </div>

            <button type="submit" className="w-full py-3.5 rounded-[15px] bg-gradient-to-b from-peach-200 to-peach-400 text-white font-extrabold text-base shadow-[0_10px_22px_-8px_rgba(238,129,100,0.7)]">
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
