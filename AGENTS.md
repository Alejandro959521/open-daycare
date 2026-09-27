<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Comandos

- `npm run dev` — dev server en http://localhost:3000
- `npm run build` — build de producción (incluye validación de tipos)
- `npm run lint` — ESLint 9 flat config (`eslint.config.mjs`)
- Typecheck suelto: `npx tsc --noEmit` (no hay script definido para ello)
- No hay framework de tests ni CI configurados — no inventar comandos de test

## Stack

- Next.js 16 App Router (`app/`), React 19, TypeScript strict, Tailwind CSS v4
- Tailwind v4 es CSS-first: la configuración vive en `app/globals.css` (`@theme`); no existe (ni crear) `tailwind.config.*`
- Alias de importación `@/*` → raíz del repo (p. ej. `@/app/page.tsx`)

## Producto y diseño (fuente de verdad de la UI)

- "Open Daycare": app de guardería con UI en **español**. Hoy `app/` es el scaffold intacto de create-next-app; las pantallas reales aún están por construir según las referencias.
- `references/pantallas/*.dc.html` — mockups HTML de cada pantalla; empezar por `index.dc.html` (galería navegable de todas). `references/screenshots/*.png` — capturas del diseño objetivo.
- Sistema de diseño de los mockups (difiere del look Geist del scaffold): Fredoka para títulos, Nunito para texto; paleta cálida — fondo `#f6ecdf`, superficies `#fffdf9`, texto `#3f362e`, acento `#f2a78e`.
- `references/` es de solo lectura: no editar los mockups (`support.js` es código generado).

## Workflow

- Features grandes: usar los skills `/spec` → `/spec-impl` (método spec-driven). Los specs se guardan en `specs/NN-slug.md`.
- `CLAUDE.md` solo contiene `@AGENTS.md`: editar este archivo, no aquel.

## MCPs

- Playwright Screenshots y cualquier cosa relacionada a Playwright tienen que estar en la carpeta `.playwright-mcp` (ya está en `.gitignore`).

- Context7 Usaremos este MCP para traer la documentación actualizada del framework.

## Spec Driven Development - Skills

- /spec Usaremos esta habilidad para crear las especificaciones.
- /spec-impl Usaremos esta skill para hacer las implementaciones.

## Agentes

- `spec-verifier` — Verifica y marca los criterios de aceptación de un archivo spec. Usa este agente cuando el usuario pide revisar un spec, verificar pantallas contra mockups, o marcar los checkboxes de aceptación.

## Comandos

- `Verify Spec` — Verifica los criterios de aceptación de un spec contra mockups o la implementación actual.

## Reglas de código  
- Usar código limpio, nombres, funciones, variables, etc. en inglés.   