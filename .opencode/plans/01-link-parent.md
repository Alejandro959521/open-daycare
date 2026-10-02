# SPEC 01 — Vincular padre

**State:** Draft  
**Date:** 2 oct 2026  
**Depends on:** —  
**Objective:** Implementar el modal de vinculación de padres/tutores a un niño existente, con generación de código de invitación y historial de invitaciones.

---

## Scope

**In:**
- Modal de vinculación accesible desde el perfil del niño (botón "Vincular otro padre").
- Formulario con: nombre del padre, email, selección de parentesco (Mamá/Papá/Tutor/a).
- Generación de código de invitación alfanumérico de 5 caracteres.
- Validaciones: nombre obligatorio, formato de email válido, chequeo de duplicados (email ya vinculado o con invitación pendiente), parentesco obligatorio.
- Estado post-envío: mensaje de éxito + navegación automática al perfil del niño tras 2 segundos.
- Historial de invitaciones en el perfil del niño con estados: `pendiente`, `aceptada`, `expirada`.
- Botón para copiar el código de invitación al portapapeles.
- Persistencia en localStorage.

**Out:**
- Envío real de correos (simulado).
- Flujo de aceptación del padre (crear cuenta, vincular al niño) — spec separado.
- Cancelación/revocación de invitaciones por el emisor.
- Notificaciones push o recordatorios.

---

## Data model

### Extensión del modelo existente

**`app/data/kids.ts`** — agregar tipo `Invitation`:

```typescript
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
```

**`Parent`** — agregar campo `email?: string` (opcional para compatibilidad con datos existentes).

### Persistencia

- **Clave localStorage:** `opendaycare:invitations` → `Invitation[]`
- **Funciones helper:**
  - `getInvitations(): Invitation[]`
  - `getInvitationsByChild(childId: string): Invitation[]`
  - `addInvitation(invitation: Invitation): void`
  - `updateInvitationStatus(id: string, status: InvitationStatus): void`
  - `generateInvitationCode(): string` (5 chars alfanumérico, ej: "7K4P9")

---

## Implementation plan

1. **Extender modelo de datos.** Agregar tipo `Invitation` y campo `email` a `Parent` en `app/data/kids.ts`. Crear funciones helper para localStorage en `app/data/invitations.ts`.

2. **Crear componente modal.** Nuevo archivo `components/link-parent-modal.tsx` con:
   - Props: `childId: string`, `childName: string`, `onClose: () => void`
   - Estado interno: `parentName`, `email`, `rol`, `generatedCode`, `status: "form" | "success"`
   - Validaciones en tiempo real (nombre no vacío, email formato válido, rol seleccionado).
   - Al enviar: verificar duplicados, generar código, guardar invitación, mostrar estado de éxito.
   - Botón de copiar código al portapapeles.
   - Cierre solo con botón X (esquina superior derecha).

3. **Integrar modal con perfil del niño.** Modificar `app/kids/[id]/page.tsx` para:
   - Agregar estado `showLinkParentModal: boolean`.
   - Cambiar enlace "Vincular otro padre" en `LinkedParents` para que abra el modal en lugar de navegar.
   - Pasar `childId` y `childName` al modal.

4. **Mostrar historial de invitaciones.** Modificar `components/linked-parents.tsx` para:
   - Recibir prop adicional `invitations: Invitation[]`.
   - Mostrar invitaciones debajo de los padres vinculados, con estado (`pendiente`/`aceptada`/`expirada`).
   - Estilo diferenciado para invitaciones (ej: fondo más claro, icono de sobre).

5. **Actualizar página de perfil.** En `app/kids/[id]/page.tsx`:
   - Cargar invitaciones del niño con `getInvitationsByChild(childId)`.
   - Pasar invitaciones a `LinkedParents`.

6. **Estilo y UX.** Asegurar que el modal siga el sistema de diseño:
   - Fondo overlay semitransparente.
   - Tarjeta del modal con bordes redondeados (24px), sombra suave.
   - Colores: fondo `#FBF4EC`, bordes `#ECE0D0`, texto `#3F362E`, acento coral `#F2A78E`.
   - Fuentes: Fredoka para títulos, Nunito para texto.
   - Campos de formulario con bordes redondeados (14px), fondo blanco.
   - Chips de parentesco con estilo pill (border-radius 999px).
   - Caja de código con fondo amarillo punteado (`#FBF1D6`, borde `#E6D08A`).

7. **Pruebas manuales.** Verificar:
   - Abrir modal desde perfil del niño.
   - Completar formulario con datos válidos → ver código generado.
   - Intentar enviar con email duplicado → ver error.
   - Copiar código al portapapeles.
   - Cerrar modal con X → volver al perfil.
   - Ver invitación en historial con estado `pendiente`.

---

## Acceptance criteria

- [ ] El modal se abre al hacer clic en "Vincular otro padre" desde el perfil del niño.
- [ ] El modal muestra el nombre del niño en el header (ej: "a Mateo Fernández").
- [ ] El campo nombre es obligatorio y muestra error si está vacío.
- [ ] El campo email valida formato y muestra error si es inválido.
- [ ] El sistema rechaza emails ya vinculados o con invitación pendiente (mensaje: "Ya existe una invitación pendiente para este email").
- [ ] El parentesco es obligatorio (Mamá/Papá/Tutor/a).
- [ ] Al enviar, se genera un código alfanumérico de 5 caracteres.
- [ ] El código se muestra en una caja destacada con fondo amarillo.
- [ ] Hay un botón para copiar el código al portapapeles.
- [ ] El código vence en 7 días (mostrar "Vence en 7 días").
- [ ] Después de enviar, se muestra mensaje de éxito ("Invitación enviada a [email]").
- [ ] Tras 2 segundos, se navega automáticamente al perfil del niño.
- [ ] El modal solo se cierra con el botón X (no con click fuera ni Escape).
- [ ] La lista de padres vinculados muestra las invitaciones pendientes debajo de los padres activos.
- [ ] Las invitaciones muestran: nombre, email, parentesco, estado (`pendiente`/`aceptada`/`expirada`).
- [ ] Los datos se persisten en localStorage bajo la clave `opendaycare:invitations`.
- [ ] El modal sigue el sistema de diseño (colores, fuentes, bordes redondeados).

---

## Decisions taken and discarded

1. **Envío real de correos.** Descartado: requiere integración con servicio externo (Resend/SendGrid), merece spec separado. Este spec simula el envío mostrando confirmación en pantalla.

2. **Historial de invitaciones en página separada.** Descartado: el usuario confirmó que el historial debe verse en el perfil del niño, no en una página dedicada.

3. **Cierre del modal con click fuera o Escape.** Descartado: el usuario prefiero cierre solo con X para evitar pérdida accidental de datos.

4. **Código numérico de 6 dígitos.** Descartado: el mockup muestra código alfanumérico de 5 caracteres ("7K4P9"), se mantiene consistencia.

5. **Cancelar/revocar invitaciones.** Descartado: agrega complejidad sin valor inmediato en esta iteración.

6. **Notificaciones push.** Descartado: fuera de scope, requiere backend.

---

## Identified risks

1. **Colisiones de código.** Con 5 caracteres alfanuméricos (36^5 = 60M combinaciones), el riesgo de colisión es bajo pero existe. Mitigación: verificar que el código no exista ya en localStorage antes de guardarlo.

2. **Persistencia en localStorage.** Si el usuario limpia datos del navegador, se pierden las invitaciones. Mitigación: documentar que esto es un MVP; migración a backend en specs futuros.

3. **Compatibilidad con datos existentes.** Los `Parent` actuales no tienen campo `email`. Mitigación: hacer `email` opcional en el tipo, migrar datos existentes si es necesario.

4. **Estados de invitación.** El mockup no muestra cómo se ven las invitaciones `aceptada` o `expirada` en el historial. Mitigación: usar los mismos estilos que los padres activos/pendientes, con badges de estado diferenciados.
