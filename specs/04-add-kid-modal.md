# SPEC 04 — Modal Agregar Niño

> **Estado:** Implementado
> **Depende de:** SPEC 02
> **Fecha:** 2026-10-01
> **Objetivo:** Implementar un modal de "Agregar niño" que se abre desde el botón en `/kids`, agrega el niño a la lista del spec 02 y cierra el modal, siguiendo el mockup `references/pantallas/agregar-nino.dc.html`.

## Alcance

**In:**

- Modal overlay sobre `/kids` que se abre al hacer click en el botón "Agregar niño"
- Campos: Nombre completo (obligatorio), Fecha de nacimiento (obligatorio), Sala (obligatorio, dropdown con lista fija), Alergias (tags/chips), Notas médicas (textarea libre, opcional)
- Botones: Cancelar (cierra modal sin guardar), Guardar (agrega el niño a la lista del spec 02 y cierra modal)
- Sistema de tags para alergias: input de texto que al presionar Enter o coma agrega un chip/badge independiente
- Validación: Nombre, Fecha y Sala obligatorios — botón Guardar deshabilitado si faltan
- Reutiliza tipo `Kid` del spec 02 (`app/data/kids.ts`), agregando `notasMedicas?: string` como campo opcional
- Calcula automáticamente campos faltantes: `edad` desde `fechaNacimiento`, `inicial` del nombre, `ingreso` como fecha actual, `padres` como array vacío, `colorAvatar` con `getAvatarColors`
- Lista fija de salas: ["Soles", "Lunas", "Estrellas"]
- El niño agregado aparece inmediatamente en la lista de `/kids`
- Estilos del mockup (Fredoka/Nunito, paleta cálida, bordes redondeados)
- El botón "Agregar niño" en `/kids` cambia de `<a href="/add-kid">` a `<button>` que abre el modal

**Out of scope (para specs futuros):**

- Persistencia real de datos (al recargar, los niños agregados se pierden)
- Edición de niños existentes
- Eliminación de niños
- Vinculación de padres
- Navegación a `/add-kid` como página independiente

## Modelo de datos

Modificar `app/data/kids.ts`:

```ts
export interface Kid {
  id: string;
  nombre: string;
  inicial: string;
  edad: number;
  sala: string;
  fechaNacimiento: string;
  ingreso: string;
  alergias: string[];
  padres: Parent[];
  colorAvatar: { bg: string; textColor: string };
  notasMedicas?: string; // NUEVO: campo opcional
}

// Cambiar de const a let, o exportar función addKid
export function addKid(kid: Kid): void;
```

Agregar función helper para calcular edad:

```ts
export function calcularEdad(fechaNacimiento: string): number;
```

## Plan de implementación

1. Modificar `app/data/kids.ts`: agregar campo opcional `notasMedicas?: string` al tipo `Kid`. Manual: `npx tsc --noEmit` sin errores.
2. Modificar `app/data/kids.ts`: convertir `kids` de `const` a `let` y exportar función `addKid(kid: Kid)` que agrega al array. Manual: verificar que la lista sigue funcionando.
3. Agregar función helper `calcularEdad(fechaNacimiento: string): number` en `app/data/kids.ts`. Convierte "dd/mm/aaaa" a años. Manual: `calcularEdad("01/01/2020")` devuelve la edad correcta.
4. Crear `components/add-kid-modal.tsx` como client component con el formulario: nombre, fecha, sala (dropdown), alergias (input), notas médicas (textarea). Manual: comparar con el mockup.
5. Implementar el sistema de tags para alergias en el modal: input de texto que al presionar Enter o coma agrega un chip/badge con fondo y texto del mockup. Manual: tipear "Maní" y presionar Enter crea un chip.
6. Implementar validación: botón "Guardar" deshabilitado si faltan nombre, fecha o sala. Manual: intentar guardar con campos vacíos muestra el botón deshabilitado.
7. Implementar acciones de los botones: "Cancelar" cierra el modal sin guardar, "Guardar" calcula campos faltantes (edad, inicial, ingreso, padres, colorAvatar), llama a `addKid`, y cierra el modal. Manual: clic en Guardar agrega el niño y cierra.
8. Integrar el modal con `/kids`: cambiar el `<a href="/add-kid">` a `<button>` que abre el modal. Estado `showModal` en `KidsPage`. Manual: clic en "Agregar niño" abre el modal.
9. Verificar que el niño agregado aparece en la lista de `/kids` inmediatamente. Manual: agregar un niño y verificar que aparece en el grid.
10. Verificación visual final lado a lado con el mockup. Manual: `npm run lint` y `npm run build` sin errores.

## Criterios de aceptación

- [x] Clic en el botón "Agregar niño" en `/kids` abre el modal overlay.
- [x] Modal muestra campos: Nombre completo, Fecha de nacimiento, Sala, Alergias, Notas médicas.
- [x] Campo "Sala" es un dropdown con lista fija ["Soles", "Lunas", "Estrellas"].
- [x] Input de alergias permite agregar tags/chips al presionar Enter o coma.
- [x] Cada alergia agregada aparece como un badge/chip independiente.
- [x] Botón "Cancelar" cierra el modal sin guardar.
- [x] Botón "Guardar" agrega el niño a la lista del spec 02 y cierra el modal.
- [x] Validación: botón "Guardar" deshabilitado si faltan nombre, fecha o sala.
- [x] El niño agregado aparece inmediatamente en la lista de `/kids`.
- [x] Campos calculados automáticamente: edad, inicial, ingreso, padres (vacío), colorAvatar.
- [x] Modal usa estilos del mockup (Fredoka/Nunito, paleta cálida, bordes redondeados).
- [x] `npm run lint` y `npm run build` pasan sin errores.

## Decisiones

- **Sí:** reutilizar tipo `Kid` del spec 02 — el usuario lo confirmó; agrega `notasMedicas` como campo opcional.
- **Sí:** calcular automáticamente campos faltantes (edad, inicial, ingreso, padres, colorAvatar) — el usuario lo confirmó.
- **Sí:** lista fija de salas ["Soles", "Lunas", "Estrellas"] — el mockup muestra un dropdown, no un input libre.
- **Sí:** tags/chips para alergias — el usuario lo confirmó; cada alergia es un badge independiente.
- **Sí:** botón "Guardar" deshabilitado si faltan campos obligatorios — validación visual clara.
- **Sí:** agregar niño a la lista del spec 02 (no en memoria separada) — el usuario lo confirmó; el niño aparece en la lista de `/kids`.
- **Sí:** modal overlay sobre `/kids` — el usuario lo confirmó; no es una página independiente.
- **No:** persistencia real — consistente con specs 01, 02, 03; al recargar, los niños agregados se pierden.
- **No:** página independiente `/add-kid` — el usuario confirmó que es un modal.
- **No:** integración con el perfil de niño del spec 02 — los niños agregados no tienen perfil detallado.

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| Lista de salas puede cambiar | Constante `SALAS` centralizada, fácil de modificar |
| Tags de alergias pueden ser confusos | Placeholder claro "Ej. Maní, Lactosa" y comportamiento estándar (Enter/coma) |
| Calcular edad puede fallar con formatos de fecha inválidos | Validación de formato dd/mm/aaaa antes de calcular |
| Convertir `kids` de `const` a `let` puede romper imports | Verificar que todos los imports siguen funcionando |

## Lo que **no** está en este spec

- Persistencia real de datos.
- Edición de niños existentes.
- Eliminación de niños.
- Vinculación de padres.
- Página independiente `/add-kid`.
- Integración con el perfil de niño del spec 02.

Cada una de esas, si llega, va en su propio spec.
