import Link from "next/link";
import { posts, sala, usuario } from "@/app/data/mock";
import PostCard from "@/components/post-card";
import Sidebar from "@/components/sidebar";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-cream lg:flex-row">
      <Sidebar active="feed" />
      <main className="min-w-0 flex-1 overflow-y-auto lg:h-screen">
        <div className="mx-auto w-full max-w-[760px] px-5 pb-20 pt-[34px] lg:px-10">
          <div className="mb-6">
            <div className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-coral-200">
              GUARDERÍA · SALA {sala.nombre.toUpperCase()}
            </div>
            <h1 className="font-display text-[30px] font-semibold text-ink">
              Buenas, {usuario.nombre.split(" ")[0]}
            </h1>
            <p className="mt-[5px] text-[14.5px] text-muted-200">
              {sala.cantidadNinos} niños · {sala.fechaTexto}
            </p>
          </div>

          <Link
            href="/crear-publicacion"
            className="mb-6 flex items-center gap-3.5 rounded-[18px] border border-line-200 bg-surface px-[18px] py-3.5 shadow-[0_4px_14px_-10px_rgba(120,90,60,.4)]"
          >
            <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-peach-300 font-display text-[16px] font-semibold text-white">
              {usuario.inicial}
            </div>
            <span className="flex-1 text-[15px] text-muted-100">Compartí un momento…</span>
            <span className="flex h-[38px] w-[38px] items-center justify-center rounded-[12px] bg-[#FBE3D8] text-coral-100">
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </span>
          </Link>

          <div className="mb-3.5 flex items-center gap-3.5">
            <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-muted-300">PUBLICADO HOY</span>
            <span className="h-px flex-1 bg-line-300" />
          </div>

          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
