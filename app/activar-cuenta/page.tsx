export default function ActivarCuentaPage() {
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
      </div>
    </div>
  );
}
