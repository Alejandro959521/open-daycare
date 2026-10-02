import type { Invitation, InvitationStatus } from "./kids";

const STORAGE_KEY = "opendaycare:invitations";

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function getInvitations(): Invitation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Invitation[]) : [];
  } catch {
    return [];
  }
}

export function getInvitationsByChild(childId: string): Invitation[] {
  return getInvitations().filter((inv) => inv.childId === childId);
}

export function addInvitation(invitation: Invitation): void {
  const all = getInvitations();
  all.push(invitation);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function updateInvitationStatus(
  id: string,
  status: InvitationStatus,
): void {
  const all = getInvitations();
  const idx = all.findIndex((inv) => inv.id === id);
  if (idx !== -1) {
    all[idx].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }
}

export function generateInvitationCode(): string {
  const existing = new Set(getInvitations().map((inv) => inv.code));
  let code = "";
  do {
    code = Array.from(
      { length: 5 },
      () => CHARS[Math.floor(Math.random() * CHARS.length)],
    ).join("");
  } while (existing.has(code));
  return code;
}
