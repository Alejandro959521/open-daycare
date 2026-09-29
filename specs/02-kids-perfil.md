# SPEC 02 — Pantallas Kids y Perfil de Niño

> **Estado:** Aprobado
> **Depende de:** SPEC 01
> **Fecha:** 2026-09-27
> **Objetivo:** Implementar las pantallas `/kids` (lista con buscador) y `/kids/[id]` (perfil) siguiendo los mockups `references/pantallas/ninos.dc.html` y `references/pantallas/perfil-nino.dc.html`.

## Por qué

El spec 01 creó el Feed con sidebar y navegación; los enlaces a `/ninos` hoy devuelven 404. Este spec trae las dos pantallas de gestión de niños del mockup, renombrando las rutas a `/kids`, reutilizando el sidebar, tokens y fuentes del spec 01.

## Alcance

**In:**

- Ruta `/kids` — lista de niños en grid de 2 columnas con buscador que filtra en memoria por nombre.
- Ruta `/kids/[id]` — perfil de un niño con avatar, nombre, edad, sala, alergias, fecha de nacimiento, ingreso, y padres vinculados.
- Datos mock tipados en archivo separado `app/data/kids.ts` con tipos `Kid`, `Parent`, y lista de ~8 niños.
- Sidebar reutilizado de `components/sidebar.tsx` con "Kids" como nav activo (fondo `#FBE3D8`, texto `#D9583C`).
- Badges de alergia en las cards: muestra solo el primer alérgeno del niño.
- Badge "VINCULAR" (rosa) para niños sin padres vinculados — solo visual, enlace al futuro `/link-parent`.
- Chevron `›` gris para niños con padres vinculados y sin alergia destacada.
- Avatar con inicial + color de fondo determinista (basado en nombre): tonos azulados/verdosos para niños, rosados/púrpura para niñas.
- Enlaces a rutas futuras (hoy 404): `/add-kid`, `/link-parent`, `/day-summary`.
- Breadcrumb "Volver a Kids" en el perfil enlazando a `/kids`.
- Botón "Editar" en el perfil que enlaza a `/add-kid`.
- Botón "Resumen del día" en el perfil que enlaza a `/day-summary`.
- Botón "Vincular otro padre" en el perfil enlazando a `/link-parent` (solo visual).

**Out of scope (para specs futuros):**

- Pantalla `/add-kid` (crear/editar niño).
- Pantalla `/link-parent` (vincular padre a un niño).
- Pantalla `/day-summary` (resumen diario de un niño).
- Persistencia de datos (todo en memoria).
- Fecha/hora dinámicas.

## Modelo de datos

Nuevo archivo `app/data/kids.ts`:

```ts
export type ParentStatus = "activa" | "pendiente";

export interface Parent {
  id: string;
  nombre: string;
  rol: string;         // "Mamá" | "Papá"
  estado: ParentStatus;
}

export interface Kid {
  id: string;
  nombre: string;
  inicial: string;            // primera letra del nombre
  edad: number;               // años
  sala: string;               // "Soles"
  fechaNacimiento: string;    // "12 mar 2022"
  ingreso: string;            // "feb 2025"
  alergias: string[];         // ["Alergia al maní", "Evitar frutos secos", "Lleva inhalador"]
  padres: Parent[];
  colorAvatar: { bg: string; textColor: string }; // colores deterministas
}

export const kids: Kid[] = [/* 8 niños del mockup */];

// Generador determinista de colores de avatar basado en el nombre.
// Masculinos: azules/verdes (#A9D9E8/#1F7A93, #B9DEC4/#3E8B62)
// Femeninos: rosas/púrpura (#F4B8CC/#C44A7A, #C9B6E8/#7B5FC0)
export function getAvatarColors(nombre: string): { bg: string; textColor: string };
```

## Plan de implementación

1. Crear `app/data/kids.ts` con los tipos, los 8 niños del mockup, y la función `getAvatarColors`. Manual: `npx tsc --noEmit` sin errores.
2. Crear `components/kid-card.tsx` — card de niño con avatar (inicial + color determinista), nombre, edad, padres vinculados, y badge de alergia o chevron o "VINCULAR". Manual: comparar con el mockup `ninos.dc.html`.
3. Crear `app/kids/page.tsx` — layout con sidebar + buscador que filtra por nombre + grid 2 columnas de `KidCard`. El buscador es client component con `useState`. Manual: tipear "Mateo" filtra a solo Mateo Fernández.
4. Crear `components/profile-info.tsx` — sección de info del perfil (fecha de nacimiento, sala, ingreso como rows con label/value). Manual: verificar formato con el mockup.
5. Crear `components/allergies-card.tsx` — caja de alergias con fondo `#FBDAD6`, icono de advertencia, y texto de notas. Manual: verificar con `perfil-nino.dc.html`.
6. Crear `components/linked-parents.tsx` — sección de padres vinculados con avatar, nombre, rol, badge ACTIVA/PENDIENTE, y enlace "Vincular otro padre". Manual: verificar con el mockup.
7. Crear `components/day-summary-button.tsx` — botón "Resumen del día" con fondo `#3F362E`. Manual: verificar con el mockup.
8. Crear `app/kids/[id]/page.tsx` — ensamblar perfil con todos los componentes: breadcrumb, avatar grande + nombre, alergias, info, resumen del día, padres vinculados. Recibe `params.id` y busca el niño en `kids`. Manual: navegar a `/kids/1` muestra "Mateo Fernández" con sus datos.
9. Actualizar `components/sidebar.tsx` — cambiar el texto del enlace de "Niños" a "Kids" manteniendo el estado activo.
10. Verificación visual final lado a lado con los dos mockups. Manual: `npm run lint` y `npm run build` sin errores.

## Criterios de aceptación

- [x] `/kids` muestra 8 niños en grid 2 columnas con estilo idéntico al mockup.
- [x] El buscador filtra las cards en memoria al tipear (case-insensitive).
- [x] Cards muestran avatar con inicial + color determinista (tonos masculinos/femeninos).
- [x] Badges de alergia muestran solo el primer alérgeno ("MANÍ", "LACTOSA").
- [x] Niño sin padres vinculados muestra badge rosa "VINCULAR".
- [x] Niño con padres y sin alergia destacada muestra chevron `›` gris.
- [x] `/kids/[id]` muestra el perfil completo de un niño con datos del mockup (Mateo Fernández como ejemplo).
- [x] Perfil muestra "Alergias y notas" con fondo `#FBDAD6` e icono de advertencia.
- [x] Perfil muestra filas de info: fecha de nacimiento, sala, ingreso.
- [x] Perfil muestra "Padres vinculados" con badges ACTIVA/PENDIENTE.
- [x] Perfil tiene breadcrumb "Volver a Kids" enlazando a `/kids`.
- [x] Perfil tiene botón "Editar" enlazando a `/add-kid` y "Resumen del día" enlazando a `/day-summary`.
- [x] Sidebar con "Kids" activo (fondo `#FBE3D8`, texto `#D9583C`).
- [x] `npm run lint` y `npm run build` pasan sin errores.

## Decisiones

- **Sí:** datos mock en archivo separado `app/data/kids.ts` — no se mezcla con los posts del spec 01.
- **Sí:** buscador con filtrado en memoria — no hay backend todavía.
- **Sí:** colores de avatar deterministas por nombre — masculino/femenino según convención del mockup.
- **Sí:** badge de alergia muestra solo el primer alérgeno — evita truncar en las cards.
- **Sí:** sidebar reutilizado con texto cambiado de "Niños" a "Kids".
- **No:** implementar `/add-kid`, `/link-parent`, `/day-summary` — solo enlaces, cada uno en su spec futuro.
- **No:** persistencia — todo en memoria, como spec 01.
- **No:** rutas `/ninos` — se renombran a `/kids` en todo el proyecto.

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| Colores deterministas pueden no coincidir con el género percibido | La lista de nombres del mockup ya tiene la asignación correcta; la función se valida contra esos casos |
| `[id]` con ID no válido | Devolver 404 con `notFound()` de Next.js |

## Lo que **no** está en este spec

- Pantallas agregar/editar niño, vincular padre, resumen del día.
- Persistencia de datos de ningún tipo.
- Fechas dinámicas.
