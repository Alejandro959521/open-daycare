"use client";

import { useState, useMemo } from "react";
import type { Parent, Invitation } from "@/app/data/kids";
import { getInvitationsByChild } from "@/app/data/invitations";
import LinkParentModal from "./link-parent-modal";

interface LinkedParentsProps {
  padres: Parent[];
  childId: string;
  childName: string;
}

const PARENT_AVATAR_COLORS = [
  { bg: "#C9B6E8", textColor: "#fff" },
  { bg: "#A9C7E8", textColor: "#fff" },
  { bg: "#B9DEC4", textColor: "#fff" },
  { bg: "#F4B8CC", textColor: "#fff" },
];

const INVITATION_STATUS_BADGE: Record<
  Invitation["status"],
  { bg: string; textColor: string; text: string }
> = {
  pendiente: { bg: "#F7E7A6", textColor: "#9A7B1E", text: "PENDIENTE" },
  aceptada: { bg: "#CFEBD8", textColor: "#3E9B6C", text: "ACEPTADA" },
  expirada: { bg: "#F0D6D6", textColor: "#A94442", text: "EXPIRADA" },
};

export default function LinkedParents({
  padres,
  childId,
  childName,
}: LinkedParentsProps) {
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const invitations = useMemo(
    () => getInvitationsByChild(childId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childId, refreshKey],
  );

  return (
    <>
      <div className="rounded-[16px] border border-line-200 bg-surface p-4 px-[18px]">
        <div className="mb-[14px] text-[12.5px] font-extrabold tracking-[0.8px] text-muted-300">
          PADRES VINCULADOS
        </div>
        <div className="flex flex-col gap-[14px]">
          {padres.map((padre, index) => {
            const color =
              PARENT_AVATAR_COLORS[index % PARENT_AVATAR_COLORS.length];
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
                    {padre.rol} ·{" "}
                    {padre.estado === "activa"
                      ? "activa"
                      : "invitación enviada"}
                  </div>
                </div>
                <span
                  className="flex-none rounded-full px-[9px] py-1 text-[10.5px] font-extrabold"
                  style={{
                    backgroundColor: badgeColor.bg,
                    color: badgeColor.textColor,
                  }}
                >
                  {badgeColor.text}
                </span>
              </div>
            );
          })}

          {invitations.map((inv) => {
            const invColor =
              PARENT_AVATAR_COLORS[
                (padres.length + invitations.indexOf(inv)) %
                  PARENT_AVATAR_COLORS.length
              ];
            const inicial = inv.parentName.charAt(0).toUpperCase();
            const badge = INVITATION_STATUS_BADGE[inv.status];

            return (
              <div key={inv.id} className="flex items-center gap-3">
                <div
                  className="flex h-[40px] w-[40px] flex-none items-center justify-center rounded-full border-[1.5px] border-dashed border-muted-200 font-display text-[16px] font-semibold text-muted-200"
                  style={{ backgroundColor: invColor.bg + "40" }}
                >
                  {inicial}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[14.5px] font-extrabold text-ink">
                    {inv.parentName}
                  </div>
                  <div className="text-[12.5px] text-muted-100">
                    {inv.rol} · {inv.email}
                  </div>
                </div>
                <span
                  className="flex-none rounded-full px-[9px] py-1 text-[10.5px] font-extrabold"
                  style={{
                    backgroundColor: badge.bg,
                    color: badge.textColor,
                  }}
                >
                  {badge.text}
                </span>
              </div>
            );
          })}

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="flex cursor-pointer items-center gap-3 pt-2"
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
          </button>
        </div>
      </div>

      {showModal && (
        <LinkParentModal
          childId={childId}
          childName={childName}
          padres={padres}
          onClose={() => {
            setShowModal(false);
            setRefreshKey((k) => k + 1);
          }}
        />
      )}
    </>
  );
}
