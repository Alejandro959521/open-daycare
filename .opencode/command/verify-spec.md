---
description: Verifica y marca los criterios de aceptación de un spec (ej. /verify-spec 01-feed-home)
agent: spec-verifier
---

Verifica los criterios de aceptación del spec indicado.

$ARGUMENTS

**Resolución del argumento:**
- Si es un número o slug (ej. `01`, `01-feed-home`, `feed`), resuélvelo a `specs/<slug>.md` (busca primero con ese nombre exacto; si no existe, busca `specs/*<slug>*.md`).
- Si es una ruta completa (empieza con `specs/` o `/`), úsala tal cual.
- Si no hay argumento, pregunta qué spec verificar.

Una vez identificado el archivo spec, ejecuta el flujo completo de verificación: extraer criterios, clasificarlos, verificar con Playwright/Context7/comandos, corregir la implementación cuando sea necesario, marcar los checks, y entregar el reporte final.
