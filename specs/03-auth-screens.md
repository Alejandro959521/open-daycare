# SPEC 03 — Pantallas de autenticación (Login y Activar cuenta)

> **Estado:** Implementado
> **Depende de:** SPEC 01
> **Fecha:** 2026-09-30
> **Objetivo:** Implementar las pantallas `/login` y `/activar-cuenta` como mockups visuales sin autenticación real, siguiendo los diseños de `references/pantallas/login.dc.html` y `references/pantallas/activar-cuenta.dc.html`.

## Por qué

El spec 01 dejó el enlace a `/login` apuntando a una ruta inexistente (404). Este spec agrega las dos pantallas públicas de autenticación del producto: login para usuarios existentes y activación de cuenta para familias invitadas. Ambas son mockups visuales sin lógica de backend, consistentes con el sistema de diseño (Fredoka/Nunito, paleta cálida).

## Alcance

**In:**

- Ruta `/login` — pantalla de inicio de sesión con layout de dos columnas (panel izquierdo decorativo + formulario derecho).
- Ruta `/activar-cuenta` — pantalla de activación de cuenta para familias invitadas con layout centrado.
- Panel izquierdo del login: gradiente naranja con logo OpenDayCare, título "El día de cada niño, compartido con su familia", subtítulo y etiqueta "Guardería Sala Soles".
- Formulario de login: campos EMAIL y CONTRASEÑA, enlace "¿Olvidaste tu contraseña?", botón principal "Iniciar sesión", enlace a "Activá tu cuenta".
- **Sin selección de rol** (botones Personal/Familia eliminados del UI).
- Formulario de activar-cuenta: tarjeta con info del niño invitado (avatar "M", "Mateo · Sala Soles"), campos CÓDIGO DE INVITACIÓN, EMAIL, CREAR CONTRASEÑA, checkbox de autorización, botón "Activar mi cuenta", enlace a "Iniciar sesión".
- Checkbox de autorización debe estar marcado para habilitar el botón "Activar mi cuenta" (client component con `useState`).
- Validaciones básicas de formulario: email con formato válido y contraseña no vacía.
- Botón "Iniciar sesión" redirige a `/` (feed).
- Botón "Activar mi cuenta" redirige a `/` (feed) solo si el checkbox está marcado.
- Layout independiente sin sidebar (pantallas públicas).
- Icono de logo OpenDayCare (sol con rayos) reutilizado en ambas pantallas.
- Enlaces de navegación entre login ↔ activar-cuenta.

**Out of scope (para specs futuros):**

- Autenticación real contra backend o base de datos.
- Gestión de sesiones, tokens o cookies.
- Recuperación de contraseña funcional (solo enlace visual).
- Validaciones avanzadas (longitud mínima de contraseña, confirmación, etc.).
- Manejo de errores de autenticación (credenciales inválidas).
- Selección de rol (Personal/Familia) — eliminado del scope.
- Layout con sidebar (estas son pantallas públicas).

## Modelo de datos

Este spec no introduce nuevas estructuras de datos. Reutiliza los tokens de diseño definidos en SPEC 01 (`app/globals.css`).

## Plan de implementación

1. Crear `app/login/page.tsx` con el layout de dos columnas: panel izquierdo decorativo (gradiente, logo, textos) y formulario derecho. Manual: navegar a `/login` muestra la pantalla completa sin errores.
2. Implementar el formulario de login en `app/login/page.tsx`: campos EMAIL y CONTRASEÑA con estilos del mockup, enlace "¿Olvidaste tu contraseña?", botón "Iniciar sesión" con gradiente naranja. Manual: comparar visualmente con `login.dc.html`.
3. Agregar validación básica de formulario en login: email con formato válido (regex simple) y contraseña no vacía. Mostrar mensajes de error inline si fallan. Manual: intentar enviar con email inválido muestra error.
4. Hacer el botón "Iniciar sesión" redirija a `/` usando `next/navigation` (`router.push`). Manual: clic en el botón lleva al feed.
5. Agregar enlace "Activá tu cuenta" que navega a `/activar-cuenta` usando `next/link`. Manual: clic lleva a la pantalla de activación.
6. Crear `app/activar-cuenta/page.tsx` con layout centrado: icono de logo, título "Bienvenida a OpenDayCare", subtítulo. Manual: navegar a `/activar-cuenta` muestra la pantalla.
7. Implementar la tarjeta de info del niño en `app/activar-cuenta/page.tsx`: avatar circular "M" con fondo azul, texto "Te invitaron a seguir a" y "Mateo · Sala Soles". Manual: comparar con el mockup.
8. Agregar los campos de formulario: CÓDIGO DE INVITACIÓN (con letter-spacing), EMAIL, CREAR CONTRASEÑA. Manual: verificar estilos con el mockup.
9. Implementar el checkbox de autorización como client component con `useState`: cuando no está marcado, el botón "Activar mi cuenta" está deshabilitado (opacity reducida, cursor not-allowed). Manual: toggle del checkbox habilita/deshabilita el botón.
10. Agregar validación básica en activar-cuenta: email válido y contraseña no vacía. Mostrar mensajes de error inline. Manual: intentar enviar con datos inválidos muestra errores.
11. Hacer el botón "Activar mi cuenta" redirija a `/` solo si el checkbox está marcado y las validaciones pasan. Manual: clic con checkbox marcado y datos válidos lleva al feed.
12. Agregar enlace "Iniciar sesión" que navega a `/login` usando `next/link`. Manual: clic lleva al login.
13. Verificación visual final lado a lado con ambos mockups. Manual: `npm run lint` y `npm run build` sin errores.

## Criterios de aceptación

- [x] `/login` muestra el layout de dos columnas idéntico al mockup sin errores en consola.
- [x] Panel izquierdo del login tiene gradiente naranja (#F6A98E → #F2937A → #EC7E62) con logo, título y subtítulo en blanco.
- [x] Formulario de login tiene campos EMAIL y CONTRASEÑA con estilos del mockup (bordes redondeados, fondo blanco).
- [x] Enlace "¿Olvidaste tu contraseña?" visible con color `#C5503A`.
- [x] Botón "Iniciar sesión" tiene gradiente naranja y sombra.
- [x] Validación de email: si el formato es inválido, muestra mensaje de error al intentar enviar.
- [x] Validación de contraseña: si está vacía, muestra mensaje de error al intentar enviar.
- [x] Clic en "Iniciar sesión" con datos válidos redirige a `/` (feed).
- [x] Enlace "Activá tu cuenta" navega a `/activar-cuenta`.
- [x] `/activar-cuenta` muestra layout centrado con icono de logo, título y subtítulo.
- [x] Tarjeta de info del niño muestra avatar "M" con fondo `#A9D9E8` y texto "Mateo · Sala Soles".
- [x] Campos CÓDIGO DE INVITACIÓN, EMAIL y CREAR CONTRASEÑA visibles con estilos del mockup.
- [x] Checkbox de autorización visible con texto "Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro de la app."
- [x] Checkbox desmarcado: botón "Activar mi cuenta" deshabilitado (opacity reducida, cursor not-allowed).
- [x] Checkbox marcado: botón "Activar mi cuenta" habilitado y clickeable.
- [x] Validación de email y contraseña en activar-cuenta: muestra errores si son inválidos.
- [x] Clic en "Activar mi cuenta" con checkbox marcado y datos válidos redirige a `/` (feed).
- [x] Enlace "Iniciar sesión" en activar-cuenta navega a `/login`.
- [x] Ambas pantallas usan Fredoka para títulos y Nunito para texto (vía `next/font`).
- [x] Ambas pantallas usan los tokens de diseño del spec 01 (fondo `#FBF4EC`, texto `#3F362E`).
- [x] `npm run lint` y `npm run build` pasan sin errores.

## Decisiones

- **Sí:** eliminar selección de rol (Personal/Familia) del UI — el usuario lo confirmó explícitamente; simplifica el flujo.
- **Sí:** solo mockup visual sin autenticación real — consistente con specs anteriores, no hay backend todavía.
- **Sí:** redirección a `/` después de login y activación — flujo simple para el mockup.
- **Sí:** validaciones básicas (email válido, contraseña no vacía) — mínimo necesario para formularios funcionales.
- **Sí:** checkbox obligatorio para activar cuenta — decisión del usuario; refleja consentimiento real.
- **Sí:** layout independiente sin sidebar — pantallas públicas no usan el layout del feed.
- **Sí:** reutilizar tokens de diseño del spec 01 — consistencia visual en todo el producto.
- **No:** autenticación real contra backend — no hay BD ni API todavía.
- **No:** validaciones avanzadas (longitud mínima, confirmación) — scope futuro si se necesita.
- **No:** manejo de errores de autenticación — no hay backend que devuelva errores.
- **No:** selección de rol — eliminado del scope por decisión del usuario.

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| Validación de email muy simple | Regex básica suficiente para el mockup; se puede mejorar en specs futuros |
| Checkbox deshabilita el botón pero el usuario no entiende por qué | El texto del checkbox es claro; el mockup original ya muestra este comportamiento |
| Redirección a `/` sin autenticación real puede confundir | Esperado y documentado en los criterios de aceptación; es un mockup |

## Lo que **no** está en este spec

- Autenticación real, sesiones, tokens o cookies.
- Recuperación de contraseña funcional.
- Validaciones avanzadas de formularios.
- Manejo de errores de backend.
- Selección de rol (Personal/Familia).
- Layout con sidebar.

Cada una de esas, si llega, va en su propio spec.
