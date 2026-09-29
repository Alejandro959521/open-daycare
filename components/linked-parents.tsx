import type { Parent } from "@/app/data/kids";

interface LinkedParentsProps {
  padres: Parent[];
}

const PARENT_AVATAR_COLORS = [
  { bg: "#C9B6E8", textColor: "#fff" },
  { bg: "#A9C7E8", textColor: "#fff" },
  { bg: "#B9DEC4", textColor: "#fff" },
  { bg: "#F4B8CC", textColor: "#fff" },
];

export default function LinkedParents({ padres }: LinkedParentsProps) {
  return (
    <div className="rounded-[16px] border border-line-200 bg-surface p-4 px-[18px]">
      <div className="mb-[14px] text-[12.5px] font-extrabold tracking-[0.8px] text-muted-300">
        PADRES VINCULADOS
      </div>
      <div className="flex flex-col gap-[14px]">
        {padres.map((padre, index) => {
          const color = PARENT_AVATAR_COLORS[index % PARENT_AVATAR_COLORS.length];
          const inicial = padre.nombre.charAt(0).toUpperCase();
          const badgeColor =
            padre.estado === "activa"
              ? { bg: "#CFEBD8", textColor: "#3E9B6C", text: "ACTIVA" }
              : { bg: "#F7E7A6", textColor: "#9A7B1E", text: "PENDIENTE" };

          return (
            <div key={padre.id} className="flex items-center gap-3">
              <div
                className="flex h-[40px] w-[40px] flex-none items-center justify-center rounded-full font-display text-[16px] font-semibold"
                style={{ backgroundColor: color.bg, color: color.textColor }}
              >
                {inicial}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[14.5px] font-extrabold text-ink">
                  {padre.nombre}
                </div>
                <div className="text-[12.5px] text-muted-100">
                  {padre.rol} · {padre.estado === "activa" ? "activa" : "invitación enviada"}
                </div>
              </div>
              <span
                className="flex-none rounded-full px-[9px] py-1 text-[10.5px] font-extrabold"
                style={{ backgroundColor: badgeColor.bg, color: badgeColor.textColor }}
              >
                {badgeColor.text}
              </span>
            </div>
          );
        })}
        <a
          href="/link-parent"
          className="flex items-center gap-3 pt-2"
        >
          <span className="flex h-[40px] w-[40px] flex-none items-center justify-center rounded-full border-[1.5px] border-dashed border-muted-200 text-muted-200">
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
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
          <span className="text-[14.5px] font-extrabold text-coral-300">
            Vincular otro padre
          </span>
        </a>
      </div>
    </div>
  );
}
