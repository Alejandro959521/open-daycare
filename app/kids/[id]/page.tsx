import Link from "next/link";
import { notFound } from "next/navigation";
import { getKidById } from "@/app/data/kids";
import Sidebar from "@/components/sidebar";
import AllergiesCard from "@/components/allergies-card";
import ProfileInfo from "@/components/profile-info";
import DaySummaryButton from "@/components/day-summary-button";
import LinkedParents from "@/components/linked-parents";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function KidProfilePage({ params }: PageProps) {
  const { id } = await params;
  const kid = getKidById(id);

  if (!kid) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-cream lg:flex-row">
      <Sidebar active="ninos" />
      <main className="min-w-0 flex-1 overflow-y-auto lg:h-screen">
        <div className="mx-auto w-full max-w-[820px] px-10 pb-20 pt-[34px]">
          <Link
            href="/kids"
            className="mb-5 flex items-center gap-[7px] text-[14px] font-bold text-muted-200"
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
              <path d="m15 18-6-6 6-6" />
            </svg>
            Volver a Kids
          </Link>

          <div className="flex flex-wrap gap-[26px]">
            <div className="flex min-w-[300px] flex-1 flex-col gap-[18px]">
              <div className="flex items-center gap-[18px]">
                <div
                  className="flex h-[84px] w-[84px] flex-none items-center justify-center rounded-full font-display text-[34px] font-semibold"
                  style={{
                    backgroundColor: kid.colorAvatar.bg,
                    color: kid.colorAvatar.textColor,
                  }}
                >
                  {kid.inicial}
                </div>
                <div className="flex-1">
                  <h1 className="font-display text-[28px] font-semibold text-ink">
                    {kid.nombre}
                  </h1>
                  <p className="mt-[3px] text-[15px] text-muted-200">
                    {kid.edad} años · Sala {kid.sala}
                  </p>
                </div>
                <a
                  href="/add-kid"
                  className="rounded-[12px] border-[1.5px] border-line-200 bg-surface px-4 py-[9px] text-[14px] font-bold text-muted-400"
                >
                  Editar
                </a>
              </div>

              {kid.alergias.length > 0 && (
                <AllergiesCard alergias={kid.alergias} />
              )}

              <ProfileInfo
                fechaNacimiento={kid.fechaNacimiento}
                sala={kid.sala}
                ingreso={kid.ingreso}
              />
            </div>

            <div className="flex w-[300px] flex-none flex-col gap-[14px]">
              <DaySummaryButton />
              <LinkedParents
                padres={kid.padres}
                childId={kid.id}
                childName={kid.nombre}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
