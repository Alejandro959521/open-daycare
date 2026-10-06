# SPEC 06 — Create post

> **Estado:** Implementado
> **Depende de:** SPEC 01, SPEC 04
> **Fecha:** 2026-10-03
> **Objetivo:** Implementar la pantalla de crear publicación en `/crear-publicacion` con selector de destinatarios (niños de la sala actual desde `kids.ts`), tipos de publicación fijos, descripción obligatoria, persistencia en localStorage y aparición inmediata en el feed.

## Alcance

**In:**

- Página `/crear-publicacion` con formulario completo siguiendo el mockup `references/pantallas/crear-publicacion.dc.html`.
- Header con tres acciones: "Cancelar" (vuelve al feed), título "Nueva publicación", "Publicar" (guarda y vuelve al feed).
- Sección "PARA": chips con los niños de la sala actual (obtenidos de `app/data/kids.ts` filtrados por sala) + opción "Toda la sala". Selección múltiple.
- Sección "TIPO": 7 tipos fijos (Comida, Siesta, Actividad, Logro, Ánimo, Foto, Anuncio) con colores del mockup. Selección única.
- Sección "DESCRIPCIÓN": textarea obligatorio con placeholder "Contá cómo le fue hoy…".
- Sección "FOTOS": placeholders visuales (botón "Agregar" con borde dashed) — estructura de datos lista para backend futuro, pero sin funcionalidad real de subida.
- Validación: botón "Publicar" deshabilitado si falta descripción o no hay destinatario seleccionado (al menos un niño o "Toda la sala").
- Persistencia en localStorage bajo la clave `opendaycare:posts`.
- Al publicar, la nueva publicación aparece inmediatamente en el feed (`/`) junto con las publicaciones mock del spec 01.
- Redirección al feed tras publicar.
- Estilos del mockup (Fredoka/Nunito, paleta cálida, bordes redondeados).

**Out of scope (para specs futuros):**

- Subida real de fotos (solo placeholders visuales).
- Edición de publicaciones existentes.
- Eliminación de publicaciones.
- Comentarios funcionales (el contador sigue siendo estático).
- Likes funcionales (siguen siendo en memoria como en spec 01).
- Filtro de publicaciones por destinatario en el feed.
- Notificaciones push a padres.

## Modelo de datos

Extender `app/data/mock.ts`:

```ts
// Expandir CategoriaPost para incluir los 7 tipos del mockup
export type CategoriaPost = 
  | "comida" 
  | "siesta" 
  | "actividad" 
  | "logro" 
  | "animo" 
  | "foto" 
  | "anuncio";

// Extender Post con campos para destinatarios específicos
export interface Post {
  id: string;
  autor: string;
  avatar: { inicial: string | null; bg: string; color: string };
  hora: string;
  publicadoPorVos: boolean;
  categoria: CategoriaPost;
  destinatarios: string; // "familia de Mateo" | "toda la sala" | "familia de Mateo, Sofía"
  destinatariosIds?: string[]; // NUEVO: IDs de niños específicos (para filtro futuro)
  texto: string;
  foto?: { etiqueta: string };
  corazones: number;
  comentarios: number;
  createdAt?: string; // NUEVO: ISO date para ordenar
}

// Actualizar estilosPorCategoria con los 7 tipos
export const estilosPorCategoria: Record<
  CategoriaPost,
  { chipBg: string; chipColor: string; punto: string }
> = {
  comida: { chipBg: "#FBD8CC", chipColor: "#D9684A", punto: "#D9684A" },
  siesta: { chipBg: "#E7DCF6", chipColor: "#7B5FC0", punto: "#7B5FC0" },
  actividad: { chipBg: "#C7E7F1", chipColor: "#2E89A6", punto: "#2E89A6" },
  logro: { chipBg: "#CFEBD8", chipColor: "#3E9B6C", punto: "#3E9B6C" },
  animo: { chipBg: "#F9D2DE", chipColor: "#C56486", punto: "#C56486" },
  foto: { chipBg: "#FBD8CC", chipColor: "#D9684A", punto: "#D9684A" },
  anuncio: { chipBg: "#CCD8F4", chipColor: "#4E72C8", punto: "#4E72C8" },
};
```

Crear `app/data/posts.ts`:

```ts
import { Post } from "./mock";

const STORAGE_KEY = "opendaycare:posts";

export function getUserPosts(): Post[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  return JSON.parse(stored);
}

export function addUserPost(post: Post): void {
  const posts = getUserPosts();
  posts.unshift(post); // Agregar al inicio
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function generatePostId(): string {
  return `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
```

Extender `app/data/kids.ts`:

```ts
// Agregar función para obtener niños por sala
export function getKidsBySala(sala: string): Kid[] {
  return kids.filter((kid) => kid.sala === sala);
}
```

## Plan de implementación

1. Extender `app/data/mock.ts`: expandir `CategoriaPost` con los 7 tipos y actualizar `estilosPorCategoria`. Agregar campo opcional `destinatariosIds?: string[]` y `createdAt?: string` al tipo `Post`. Manual: `npx tsc --noEmit` sin errores.
2. Crear `app/data/posts.ts` con las funciones helper para localStorage. Manual: verificar que `getUserPosts()` devuelve array vacío inicialmente.
3. Extender `app/data/kids.ts`: agregar función `getKidsBySala(sala: string)` que filtra los niños por sala. Manual: `getKidsBySala("Soles")` devuelve los niños de esa sala.
4. Crear `app/crear-publicacion/page.tsx` como server component que renderiza el formulario. Manual: `/crear-publicacion` muestra la página con el formulario.
5. Crear `components/create-post-form.tsx` como client component con estado para: destinatarios seleccionados (array de IDs), tipo seleccionado, descripción, estado de validación. Manual: comparar con el mockup.
6. Implementar sección "PARA": cargar niños con `getKidsBySala(sala.nombre)` y renderizar chips. Agregar opción "Toda la sala" como chip adicional. Selección múltiple con toggle. Manual: clic en un niño lo selecciona/deselecciona.
7. Implementar sección "TIPO": 7 botones con colores del mockup. Selección única. Manual: clic en un tipo lo selecciona y deselecciona el anterior.
8. Implementar sección "DESCRIPCIÓN": textarea con placeholder y validación. Manual: escribir texto habilita el botón "Publicar".
9. Implementar sección "FOTOS": placeholders visuales (botón "Agregar" con borde dashed) sin funcionalidad real. Manual: comparar con el mockup.
10. Implementar validación: botón "Publicar" deshabilitado si falta descripción o no hay destinatario seleccionado. Manual: intentar publicar sin descripción muestra el botón deshabilitado.
11. Implementar acción de "Publicar": generar ID único, crear objeto `Post` con los datos del formulario, calcular `createdAt` como fecha actual, formatear `hora` como "HH:mm", guardar en localStorage con `addUserPost`, redirigir a `/`. Manual: publicar una publicación y verificar que aparece en el feed.
12. Implementar acción de "Cancelar": redirigir a `/` sin guardar. Manual: clic en "Cancelar" vuelve al feed.
13. Modificar `app/page.tsx` (feed): cargar publicaciones del usuario con `getUserPosts()` y combinarlas con las publicaciones mock del spec 01. Ordenar por `createdAt` (más recientes primero). Manual: las publicaciones del usuario aparecen en el feed junto con las mock.
14. Modificar `components/post-card.tsx`: asegurar que renderiza correctamente los nuevos tipos de categoría con sus colores. Manual: verificar que los chips de categoría muestran los colores correctos.
15. Verificación visual final lado a lado con el mockup. Manual: `npm run lint` y `npm run build` sin errores.

## Criterios de aceptación

- [ ] `/crear-publicacion` muestra el formulario completo con header, secciones PARA, TIPO, DESCRIPCIÓN y FOTOS.
- [ ] La sección "PARA" muestra los niños de la sala actual (obtenidos de `kids.ts`) + opción "Toda la sala".
- [ ] Se pueden seleccionar múltiples niños o "Toda la sala".
- [ ] La sección "TIPO" muestra los 7 tipos con los colores del mockup (Comida, Siesta, Actividad, Logro, Ánimo, Foto, Anuncio).
- [ ] Solo se puede seleccionar un tipo a la vez.
- [ ] La sección "DESCRIPCIÓN" muestra un textarea con placeholder "Contá cómo le fue hoy…".
- [ ] La sección "FOTOS" muestra placeholders visuales (botón "Agregar" con borde dashed).
- [ ] Botón "Publicar" deshabilitado si falta descripción o no hay destinatario seleccionado.
- [ ] Al publicar, la publicación se guarda en localStorage bajo la clave `opendaycare:posts`.
- [ ] Al publicar, se redirige al feed (`/`).
- [ ] La publicación creada aparece en el feed junto con las publicaciones mock del spec 01.
- [ ] Los chips de categoría en el feed muestran los colores correctos para los 7 tipos.
- [ ] Botón "Cancelar" redirige al feed sin guardar.
- [ ] El formulario sigue el sistema de diseño (Fredoka/Nunito, paleta cálida, bordes redondeados).
- [ ] `npm run lint` y `npm run build` pasan sin errores.

## Decisiones

- **Sí:** selector "PARA" con datos reales de `kids.ts` filtrados por sala — el usuario lo confirmó; cualquier niño agregado en spec 04 aparece automáticamente.
- **Sí:** 7 tipos de publicación fijos — el usuario lo confirmó; los colores siguen el mockup.
- **Sí:** descripción obligatoria — el usuario lo confirmó; botón "Publicar" deshabilitado si falta.
- **Sí:** persistencia en localStorage — el usuario lo confirmó; consistente con specs anteriores.
- **Sí:** publicación aparece en el feed inmediatamente — el usuario lo confirmó; flujo end-to-end completo.
- **Sí:** redirección al feed tras publicar — el usuario lo confirmó; flujo natural.
- **Sí:** placeholders visuales para fotos — el usuario lo confirmó; estructura de datos lista para backend futuro.
- **Sí:** selección múltiple de destinatarios — el mockup muestra varios chips seleccionados.
- **Sí:** opción "Toda la sala" como chip adicional — el mockup lo muestra.
- **No:** subida real de fotos — requiere integración con servicio externo, merece spec separado.
- **No:** edición de publicaciones existentes — agrega complejidad sin valor inmediato.
- **No:** eliminación de publicaciones — fuera de scope, merece spec separado.
- **No:** filtro de publicaciones por destinatario en el feed — spec separado.

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| localStorage se pierde al limpiar datos | Documentado como MVP; migración a backend en specs futuros |
| Combinar publicaciones mock con publicaciones del usuario puede causar duplicados | Usar IDs únicos y verificar que no existan antes de agregar |
| Los nuevos tipos de categoría pueden romper el renderizado de `post-card.tsx` | Actualizar `estilosPorCategoria` con los 7 tipos |
| Filtrar niños por sala puede fallar si la sala no existe | Usar `sala.nombre` del spec 01 como fuente de verdad |

## Lo que **no** está en este spec

- Subida real de fotos.
- Edición de publicaciones existentes.
- Eliminación de publicaciones.
- Comentarios funcionales.
- Likes funcionales.
- Filtro de publicaciones por destinatario en el feed.
- Notificaciones push a padres.

Cada una de esas, si llega, va en su propio spec.
