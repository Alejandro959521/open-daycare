# SPEC 05 — Vincular padre

> **Estado:** Draft
> **Depende de:** SPEC 02, SPEC 04
> **Fecha:** 2026-10-02
> **Objetivo:** Implementar un modal de "Vincular padre" que se abre desde el perfil del niño, genera un código de invitación alfanumérico, simula el envío por email y muestra el historial de invitaciones en el perfil, siguiendo el mockup `references/pantallas/vincular-padre.dc.html`.

## Alcance

**In:**

- Modal overlay que se abre al hacer click en "Vincular otro padre" desde el perfil del niño (`/kids/[id]`).
- Header del modal con título "Vincular padre" y subtítulo "a [nombre del niño]" (nombre real proveniente del `Kid`).
- Banner informativo azul: "Le enviaremos un correo con un código para que active su cuenta. Solo verá el feed de [nombre]."
- Campos del formulario:
  - Nombre del padre/madre (obligatorio, mínimo 2 caracteres).
  - Email (obligatorio, formato válido, chequeo de duplicados contra padres existentes e invitaciones pendientes).
  - Parentesco (obligatorio): chips "Mamá", "Papá", "Tutor/a" — uno seleccionado a la vez.
- Caja de código de invitación: código alfanumérico de 5 caracteres (ej. "7K4P9"), fondo amarillo punteado, texto "Vence en 7 días".
- Botón para copiar el código al portapapeles.
- Botón principal "Enviar invitación" con gradiente coral.
- Estado post-envío: mensaje de éxito "Invitación enviada a [email]" + navegación automática al perfil del niño tras 2 segundos.
- Historial de invitaciones en el perfil del niño, debajo de los padres vinculados, con estados: `pendiente`, `aceptada`, `expirada`.
- Persistencia en localStorage bajo la clave `opendaycare:invitations`.
- Cierre del modal solo con botón X (esquina superior derecha). No cierra con click fuera ni Escape.
- Estilos del mockup (Fredoka/Nunito, paleta cálida, bordes redondeados).

**Out of scope (para specs futuros):**

- Envío real de correos (Resend/SendGrid).
- Flujo de aceptación del padre (crear cuenta, vincular al niño).
- Cancelación/revocación de invitaciones por el emisor.
- Notificaciones push o recordatorios.
- Página independiente `/link-parent`.

## Modelo de datos

Extender `app/data/kids.ts`:

```ts
export type InvitationStatus = "pendiente" | "aceptada" | "expirada";

export interface Invitation {
  id: string;
  childId: string;
  parentName: string;
  email: string;
  rol: string; // "Mamá" | "Papá" | "Tutor/a"
  code: string; // 5 chars alfanumérico
  status: InvitationStatus;
  createdAt: string; // ISO date
  expiresAt: string; // ISO date (7 días después de createdAt)
}

// Agregar campo opcional a Parent existente
export interface Parent {
  id: string;
  nombre: string;
  rol: string;
  estado: ParentStatus;
  email?: string; // NUEVO: opcional para compatibilidad
}
```

Crear `app/data/invitations.ts` con helpers:

```ts
export function getInvitations(): Invitation[];
export function getInvitationsByChild(childId: string): Invitation[];
export function addInvitation(invitation: Invitation): void;
export function updateInvitationStatus(id: string, status: InvitationStatus): void;
export function generateInvitationCode(): string; // 5 chars alfanumérico, ej: "7K4P9"
```

Clave localStorage: `opendaycare:invitations` → `Invitation[]`.

## Plan de implementación

1. Extender `app/data/kids.ts`: agregar tipo `Invitation`, `InvitationStatus` y campo `email?: string` a `Parent`. Manual: `npx tsc --noEmit` sin errores.
2. Crear `app/data/invitations.ts` con las funciones helper para localStorage. Manual: verificar que `getInvitations()` devuelve array vacío inicialmente.
3. Crear `components/link-parent-modal.tsx` como client component: props `childId`, `childName`, `onClose`. Estado interno: `parentName`, `email`, `rol`, `generatedCode`, `status: "form" | "success"`. Manual: comparar con el mockup.
4. Implementar validaciones en el modal: nombre obligatorio (mín 2 chars), email formato válido, chequeo de duplicados (mensaje: "Ya existe una invitación pendiente para este email"), parentesco obligatorio. Botón "Enviar invitación" deshabilitado si hay errores. Manual: intentar enviar con datos inválidos muestra errores.
5. Implementar generación de código: al enviar, generar código de 5 chars, verificar que no exista ya en localStorage, guardar invitación, mostrar estado de éxito. Manual: ver código "7K4P9" (o similar) en la caja amarilla.
6. Implementar botón de copiar código al portapapeles con feedback visual ("¡Copiado!"). Manual: clic copia el código.
7. Implementar auto-cierre: tras 2 segundos en estado de éxito, navegar al perfil del niño. Manual: esperar 2s y verificar redirección.
8. Integrar modal con `/kids/[id]`: agregar estado `showLinkParentModal`, cambiar enlace "Vincular otro padre" en `LinkedParents` para que abra el modal. Manual: clic abre el modal.
9. Modificar `components/linked-parents.tsx`: recibir prop `invitations: Invitation[]`, mostrar invitaciones debajo de padres vinculados con badge de estado. Manual: ver invitación pendiente en la lista.
10. Actualizar `app/kids/[id]/page.tsx`: cargar invitaciones con `getInvitationsByChild(childId)` y pasar a `LinkedParents`. Manual: las invitaciones aparecen en el perfil.
11. Verificación visual final lado a lado con el mockup. Manual: `npm run lint` y `npm run build` sin errores.

## Criterios de aceptación

- [ ] El modal se abre al hacer click en "Vincular otro padre" desde el perfil del niño.
- [ ] El modal muestra el nombre real del niño en el header (ej: "a Mateo Fernández").
- [ ] Banner informativo azul visible con mensaje sobre el correo y el feed del niño.
- [ ] Campo nombre obligatorio, muestra error si está vacío o tiene menos de 2 caracteres.
- [ ] Campo email valida formato y muestra error si es inválido.
- [ ] El sistema rechaza emails ya vinculados o con invitación pendiente (mensaje: "Ya existe una invitación pendiente para este email").
- [ ] Parentesco obligatorio: uno de los chips (Mamá/Papá/Tutor/a) debe estar seleccionado.
- [ ] Al enviar, se genera un código alfanumérico de 5 caracteres único.
- [ ] El código se muestra en caja destacada con fondo amarillo punteado (`#FBF1D6`, borde `#E6D08A`).
- [ ] Texto "Vence en 7 días" visible debajo del código.
- [ ] Botón para copiar el código al portapapeles con feedback visual.
- [ ] Después de enviar, se muestra mensaje de éxito "Invitación enviada a [email]".
- [ ] Tras 2 segundos, se navega automáticamente al perfil del niño.
- [ ] El modal solo se cierra con el botón X (no con click fuera ni Escape).
- [ ] La lista de padres vinculados muestra las invitaciones debajo de los padres activos.
- [ ] Las invitaciones muestran: nombre, email, parentesco y badge de estado (`pendiente`/`aceptada`/`expirada`).
- [ ] Los datos se persisten en localStorage bajo la clave `opendaycare:invitations`.
- [ ] El modal sigue el sistema de diseño (Fredoka/Nunito, paleta cálida, bordes redondeados).
- [ ] `npm run lint` y `npm run build` pasan sin errores.

## Decisiones

- **Sí:** modal overlay sobre el perfil del niño — el usuario lo confirmó; no es una página independiente.
- **Sí:** nombre del niño proveniente de los datos reales del `Kid` — el usuario lo confirmó.
- **Sí:** validaciones de formulario (nombre obligatorio, email válido + duplicados, parentesco obligatorio) — el usuario lo confirmó.
- **Sí:** historial de invitaciones en el perfil del niño con estados `pendiente`/`aceptada`/`expirada` — el usuario lo confirmó.
- **Sí:** botón para copiar código al portapapeles — el usuario lo confirmó; UX barato.
- **Sí:** código alfanumérico de 5 caracteres — consistente con el mockup ("7K4P9").
- **Sí:** envío simulado (sin correo real) — el usuario lo confirmó; merece spec separado.
- **Sí:** cierre del modal solo con botón X — el usuario lo confirmó; evita pérdida accidental de datos.
- **Sí:** persistencia en localStorage — consistente con specs anteriores.
- **No:** envío real de correos — requiere integración con servicio externo, merece spec separado.
- **No:** flujo de aceptación del padre — spec separado.
- **No:** cancelación/revocación de invitaciones — agrega complejidad sin valor inmediato.
- **No:** notificaciones push — fuera de scope, requiere backend.
- **No:** cierre con click fuera o Escape — el usuario lo descartó.

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| Colisiones de código (5 chars = 60M combinaciones) | Verificar que el código no exista ya en localStorage antes de guardarlo |
| Persistencia en localStorage se pierde al limpiar datos | Documentado como MVP; migración a backend en specs futuros |
| Compatibilidad con `Parent` existentes (sin `email`) | Campo `email` opcional en el tipo |
| Estados `aceptada`/`expirada` sin diseño en mockup | Usar mismos estilos que padres activos/pendientes con badges diferenciados |

## Lo que **no** está en este spec

- Envío real de correos.
- Flujo de aceptación del padre (crear cuenta, vincular al niño).
- Cancelación/revocación de invitaciones.
- Notificaciones push o recordatorios.
- Página independiente `/link-parent`.

Cada una de esas, si llega, va en su propio spec.
