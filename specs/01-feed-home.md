# SPEC 01 — Feed como pantalla home

> **Estado:** Implementado
> **Depende de:** ninguna
> **Fecha:** 2026-09-26
> **Objetivo:** Implementar la pantalla Feed del mockup `references/pantallas/feed.dc.html` como home `/` con datos mock, likes en memoria y sidebar responsive.

## Por qué

El scaffold de create-next-app está intacto y su look (Geist, blanco/negro) no tiene relación con el sistema de diseño del producto. Este spec lo reemplaza por el del mockup (Fredoka/Nunito, paleta cálida) y establece la base visual y de navegación que reutilizarán las demás pantallas.

## Alcance

**In:**

- Sustituir `app/page.tsx` por la pantalla Feed con estilo idéntico al mockup (paleta, tipografías, radios, sombras, bordes, scrollbar).
- Sidebar compartido en `components/sidebar.tsx`: logo OpenDayCare · Sala Soles, botón "Nueva publicación", nav (Feed activo, Niños, Avisos, Mi cuenta), bloque de usuario (Caro Giménez) e icono cerrar sesión.
- Responsive: bajo 1024px (breakpoint `lg`) el sidebar colapsa en topbar con hamburguesa y drawer off-canvas con overlay; se cierra al clickear el overlay o cualquier enlace.
- Datos mock tipados en `app/data/mock.ts`: usuario, sala y las 3 publicaciones del mockup.
- Tarjeta de publicación en `components/post-card.tsx` con las 3 variantes (logro, actividad con placeholder de foto, anuncio), chips de categoría y pie con corazones, comentarios y "Editar".
- Corazón clickeable (`components/like-button.tsx`, client component): incrementa el contador en memoria; al recargar vuelve al valor mock.
- Cabecera del feed: "GUARDERÍA · SALA SOLES", "Buenas, Caro", "12 niños · martes 17 jun", caja "Compartí un momento…" y separador "PUBLICADO HOY".
- Fuentes Fredoka (400–700) y Nunito (400–800 + 400 italic) vía `next/font/google`.
- Enlaces a rutas futuras (hoy 404): `/ninos`, `/avisos`, `/mi-cuenta`, `/crear-publicacion`, `/detalle-publicacion`, `/foto`, `/login`.

**Out of scope (para specs futuros):**

- Autenticación y pantalla `/login` funcional (solo existe el enlace).
- Base de datos, API o persistencia de cualquier tipo (likes incluidos).
- Las pantallas destino de la navegación (niños, avisos, mi cuenta, crear/detalle publicación, foto).
- Carga real de fotos: se replica el placeholder dashed del mockup.
- Fecha/hora dinámicas: los textos quedan fijos como en el mockup.
- Comentarios funcionales: el contador es estático y enlaza a `/detalle-publicacion`.

## Modelo de datos

Nuevo archivo `app/data/mock.ts`:

```ts
export type CategoriaPost = "logro" | "actividad" | "anuncio";

export interface Post {
  id: string;
  autor: string;                      // "Mateo" | "Anuncio general"
  avatar: { inicial: string | null; bg: string; color: string }; // inicial null = icono megáfono
  hora: string;                       // "14:20"
  publicadoPorVos: boolean;
  categoria: CategoriaPost;
  destinatarios: string;              // "familia de Mateo" | "toda la sala"
  texto: string;
  foto?: { etiqueta: string };        // solo en actividad
  corazones: number;
  comentarios: number;
}

export const usuario = { nombre: "Caro Giménez", inicial: "C", rol: "Maestra · Soles" };
export const sala = { nombre: "Soles", cantidadNinos: 12, fechaTexto: "martes 17 jun" };
export const posts: Post[] = [/* las 3 del mockup, mismo orden */];

// Chip por categoría: logro #CFEBD8/#3E9B6C · actividad #C7E7F1/#2E89A6 · anuncio #CCD8F4/#4E72C8
export const estilosPorCategoria: Record<CategoriaPost, { chipBg: string; chipColor: string; punto: string }>;
```

Tokens de diseño en `app/globals.css` (`@theme`): fondo `#F6ECDF`, superficie `#FFFDF9`, texto `#3F362E`, bordes `#ECE0D0`/`#E7DAC8`/`#F0E6D8`, secundarios `#A89A8B`/`#94887B`/`#8A7C6D`/`#6E6359`, acentos `#F2A78E`/`#F4977E`/`#EE8164`/`#F2937A`, rojos `#D9583C`/`#E0654A`/`#C5503A`, `--font-display` (Fredoka) y `--font-sans` (Nunito).

## Plan de implementación

1. Tipografías y tokens: en `app/layout.tsx` reemplazar Geist por Fredoka y Nunito (variables `--font-display`/`--font-sans`), `lang="es"`, metadata "OpenDayCare · Sala Soles"; en `app/globals.css` definir los tokens y estilos base (body, scrollbar). Manual: `npm run dev` muestra fondo beige con fuentes nuevas.
2. Crear `app/data/mock.ts` con los tipos y constantes anteriores. Manual: `npx tsc --noEmit` sin errores.
3. Crear `components/sidebar.tsx` (versión desktop estática) y montarlo en `app/page.tsx` con el layout de dos columnas (sidebar 248px sticky + main con scroll). Manual: sidebar visible y fijo a la izquierda.
4. Hacer el sidebar responsive: client component con estado abierto/cerrado, topbar con hamburguesa y drawer off-canvas bajo `lg`. Manual: redimensionar a < 1024px, abrir/cerrar drawer.
5. Crear `components/post-card.tsx` con las 3 variantes y chips por categoría; renderizar en `/` iterando `posts`. Manual: comparar tarjeta por tarjeta con el mockup.
6. Crear `components/like-button.tsx` (client, `useState`) y usarlo en el pie de la tarjeta. Manual: clic incrementa 3→4; recargar restaura 3.
7. Ensamblar la página completa en `app/page.tsx`: cabecera, caja "Compartí un momento…", separador "PUBLICADO HOY" y lista de tarjetas. Manual: comparación visual lado a lado con `references/pantallas/feed.dc.html` y `references/screenshots/feed.png`.

Antes del paso 1, leer los docs de esta versión de Next.js en `node_modules/next/dist/docs/` sobre `next/font` y layouts (advertencia de AGENTS.md: no es la versión que conozco).

## Criterios de aceptación

- [x] `/` muestra las 3 publicaciones del mockup (logro, actividad con foto, anuncio) sin errores en consola.
- [x] Fondo `#F6ECDF`, tarjetas y sidebar `#FFFDF9` con borde `#ECE0D0`, texto principal `#3F362E`.
- [x] Títulos en Fredoka y cuerpo en Nunito servidas por `next/font` (sin `<link>` a fonts.googleapis.com en el HTML).
- [x] Sidebar desktop fijo de 248px con Feed activo (fondo `#FBE3D8`, texto `#D9583C`).
- [x] Bajo 1024px aparece el topbar con hamburguesa; el drawer desliza desde la izquierda sobre un overlay; clic en el overlay o en un enlace lo cierra.
- [x] Clic en un corazón incrementa su contador y al recargar vuelve al valor mock.
- [x] "Nueva publicación", "Compartí un momento…" y "Editar" apuntan a `/crear-publicacion`; comentarios a `/detalle-publicacion`; el placeholder de foto a `/foto`; Niños/Avisos/Mi cuenta a `/ninos`/`/avisos`/`/mi-cuenta`; cerrar sesión a `/login` (404 esperado hoy).
- [x] La cabecera muestra "GUARDERÍA · SALA SOLES", "Buenas, Caro" y "12 niños · martes 17 jun".
- [x] `npm run lint` y `npm run build` pasan sin errores.

## Decisiones

- **Sí:** datos mock tipados en `app/data/mock.ts` — se reemplazan por la BD sin tocar componentes.
- **Sí:** enlaces a rutas futuras aunque hoy den 404 — deja la estructura de navegación lista y el DOM idéntico al mockup.
- **Sí:** corazón clickeable con estado en memoria — interacción mínima; sin lógica de datos.
- **Sí:** responsive completo (topbar + hamburguesa, drawer off-canvas, breakpoint `lg`) — decisión del usuario; el mockup solo define desktop.
- **Sí:** `next/font/google` — autoalojado, sin parpadeo ni dependencia del CDN.
- **Sí:** textos del mockup tal cual, con voseo ("Compartí un momento…").
- **No:** localStorage o cualquier persistencia — no hay BD todavía.
- **No:** fecha/hora dinámicas — fijas como en el mockup.
- **No:** implementar pantallas destino — cada una va en su propio spec.
- **No:** fotos reales — placeholder dashed idéntico al mockup.

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| Next.js 16 difiere de las versiones conocidas | Leer `node_modules/next/dist/docs/` antes del paso 1 |
| 404 al navegar puede confundir en una demo | Esperado y documentado en los criterios de aceptación |
| Móvil no está definido en el mockup (diseño nuevo) | Decisiones registradas arriba; la comparación visual contra el mockup aplica solo a desktop |

## Lo que **no** está en este spec

- Autenticación ni `/login` funcional.
- Base de datos, API ni persistencia (likes incluidos).
- Las demás pantallas (niños, avisos, mi cuenta, crear/detalle publicación, foto).
- Fotos reales y fechas dinámicas.

Cada una de esas, si llega, va en su propio spec.
