import Link from "next/link";
import { estilosPorCategoria, type CategoriaPost, type Post } from "@/app/data/mock";

const CATEGORY_LABELS: Record<CategoriaPost, string> = {
  logro: "LOGRO",
  actividad: "ACTIVIDAD",
  anuncio: "ANUNCIO",
};

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const estilos = estilosPorCategoria[post.categoria];

  return (
    <article className="rounded-[20px] border border-line-200 bg-surface px-[22px] py-[20px] shadow-[0_4px_16px_-12px_rgba(120,90,60,.5)]">
      <div className="mb-3.5 flex items-center gap-3">
        <div
          className="flex h-11 w-11 flex-none items-center justify-center rounded-full font-display text-[17px] font-semibold"
          style={{ backgroundColor: post.avatar.bg, color: post.avatar.color }}
        >
          {post.avatar.inicial ?? (
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
              <path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6" />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <div className="font-display text-[16.5px] font-semibold text-ink">{post.autor}</div>
          <div className="text-[12.5px] text-muted-100">
            {post.publicadoPorVos ? `${post.hora} · publicado por vos` : post.hora}
          </div>
        </div>
        <div
          className="flex items-center gap-[7px] rounded-full px-3 py-1.5"
          style={{ backgroundColor: estilos.chipBg }}
        >
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: estilos.punto }} />
          <span className="text-[12px] font-extrabold tracking-[0.5px]" style={{ color: estilos.chipColor }}>
            {CATEGORY_LABELS[post.categoria]}
          </span>
        </div>
      </div>
      <div className="mb-2.5 text-[12.5px] text-muted-100">Para: {post.destinatarios}</div>
      <p className="text-[15.5px] leading-[1.55] text-[#4A4038]">{post.texto}</p>
      {post.foto ? (
        <Link
          href="/foto"
          className="mt-3.5 flex h-[200px] flex-col items-center justify-center gap-2 rounded-[16px] border-[1.5px] border-dashed border-[#DBCDBA] bg-[#F4ECE1] text-[#B0A290]"
        >
          <svg
            width="30"
            height="30"
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
          <span className="text-[13.5px]">{post.foto.etiqueta}</span>
        </Link>
      ) : null}
      <div className="mt-4 flex items-center gap-[18px] border-t border-line-100 pt-3.5">
        <span className="flex items-center gap-[7px] text-[14px] font-bold text-coral-100">
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
          {post.corazones}
        </span>
        <Link
          href="/detalle-publicacion"
          className="flex items-center gap-[7px] text-[14px] font-bold text-muted-200"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
          </svg>
          {post.comentarios}
        </Link>
        <span className="flex-1" />
        <Link href="/crear-publicacion" className="text-[14px] font-extrabold text-coral-300">
          Editar
        </Link>
      </div>
    </article>
  );
}
