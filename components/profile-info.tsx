interface ProfileInfoProps {
  fechaNacimiento: string;
  sala: string;
  ingreso: string;
}

const ROWS = [
  { key: "fechaNacimiento" as const, label: "Fecha de nacimiento" },
  { key: "sala" as const, label: "Sala" },
  { key: "ingreso" as const, label: "Ingreso" },
];

export default function ProfileInfo({ fechaNacimiento, sala, ingreso }: ProfileInfoProps) {
  const values = { fechaNacimiento, sala, ingreso };

  return (
    <div className="overflow-hidden rounded-[16px] border border-line-200 bg-surface">
      {ROWS.map((row, index) => (
        <div
          key={row.key}
          className={`flex items-center justify-between px-[18px] py-[15px] ${
            index < ROWS.length - 1 ? "border-b border-line-100" : ""
          }`}
        >
          <span className="text-[14.5px] text-muted-200">{row.label}</span>
          <span className="text-[14.5px] font-extrabold text-ink">
            {values[row.key]}
          </span>
        </div>
      ))}
    </div>
  );
}
