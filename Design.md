# DESIGN.MD - Design System & UI/UX Guidelines

> **CONTEXTO PARA LA IA:**
> Este documento actúa como la fuente de la verdad para todas las decisiones de diseño frontend y UI/UX del proyecto "Ultimate Tic-Tac-Toe".
> El estilo visual debe evocar una interfaz de juego moderna, "Dark Mode" por defecto, con estética Cyberpunk/Neon Minimalista.
> Cada vez que generes componentes, usa estas clases de Tailwind y constantes de color.

---

## 1. Visión General y "Vibe"
**Descripción:**
Una interfaz inmersiva y oscura ("Dark Mode First") con estética geométrica y acentos de neón brillante. El diseño debe minimizar la carga cognitiva, destacando solo el tablero activo y las fichas jugadas.

**Palabras clave de estilo:**
- [x] Futurista / Dark Mode Heavy
- [x] Neon / High Contrast
- [x] Geométrico / Grid-based
- [x] Minimalista
- [x] "Glow" effects (sutiles)

**Inspiración:**
* Interfaces de Sci-Fi (HUDs).
* Aplicaciones "AMOLED Black".
* Juegos de estrategia abstracta.

---

## 2. Paleta de Colores

### Colores de Juego (Semánticos)
*El juego se basa en dos jugadores. Usar estos colores para fichas, bordes de victoria y turnos.*

| Semántica | Color (Tailwind) | Hex Code | Uso |
| :--- | :--- | :--- | :--- |
| **Player X** | `text-cyan-400` / `bg-cyan-400` | `#22d3ee` | Fichas X, Bordes de victoria X, Botón P1. |
| **Player O** | `text-fuchsia-400` / `bg-fuchsia-400` | `#e879f9` | Fichas O, Bordes de victoria O, Botón P2/AI. |
| **Active Board** | `border-yellow-400` | `#facc15` | **CRÍTICO:** Indica el tablero donde *se debe* jugar. |
| **Valid Move** | `bg-zinc-800` | `#27272a` | Hover en celda válida. |

### Colores Neutros (Superficies Dark Mode)
| Semántica | Color (Tailwind) | Hex Code | Uso |
| :--- | :--- | :--- | :--- |
| **Background** | `bg-zinc-950` | `#09090b` | Fondo de la página (Body). |
| **Board Bg** | `bg-black` | `#000000` | Fondo del tablero grande (para contraste). |
| **Surface** | `bg-zinc-900` | `#18181b` | Fondo de tarjetas, modales. |
| **Grid Lines** | `border-zinc-800` | `#27272a` | Líneas divisorias de los tableros. |
| **Text Main** | `text-zinc-100` | `#f4f4f5` | Títulos, puntuación. |
| **Text Muted** | `text-zinc-500` | `#71717a` | Instrucciones secundarias. |

### Feedback
* **Error:** `text-red-500` (Movimiento inválido).
* **Draw:** `text-zinc-400` (Empate en un tablero).

---

## 3. Tipografía

**Fuente Principal (UI & Body):**
* **Familia:** `Inter` o `sans-serif`.
* **Uso:** Botones, instrucciones, textos pequeños.

**Fuente Secundaria (Display/Numbers):**
* **Familia:** `Space Grotesk`, `JetBrains Mono` o `monospace`.
* **Uso:** Marcadores, Título del juego, Fichas (si son texto).

**Escala:**
* **H1 (Título):** `text-3xl font-bold tracking-tight`
* **X/O Mark:** `text-2xl` (en tablero pequeño) / `text-6xl` (ganador de tablero).

---

## 4. UI Components & Tokens

### Bordes y Radius
* **Small Board:** `rounded-lg` (8px).
* **Big Board:** `rounded-2xl` (16px).
* **Buttons:** `rounded-md`.
* **Bordes:** Usar `border-2` para énfasis en tableros ganados.

### Sombras y Efectos (Glows)
* No usar sombras negras (`box-shadow` estándar).
* **Active Board Glow:** Usar `ring` o `shadow-[color]` para simular luz.
  * Ej: `ring-2 ring-yellow-400 ring-offset-2 ring-offset-zinc-950`.
* **Winning Cell:** Debe brillar.
  * Ej: `shadow-[0_0_15px_rgba(34,211,238,0.5)]` para X.

### Componentes Específicos

#### 1. The Cell (Casilla individual)
* Base: `h-full w-full flex items-center justify-center transition-colors`.
* Empty & Valid: `hover:bg-zinc-800 cursor-pointer`.
* Filled: `font-bold text-xl`.

#### 2. The Small Board (Tablero 3x3)
* Layout: Grid 3x3 con `gap-1` o bordes internos.
* **Estado "Ganado":** Debe tener un `absolute inset-0` overlay flex centrado con la gran X u O semitransparente (`bg-zinc-950/80`).

#### 3. Game Info Panel
* Debe mostrar claramente: "¿A quién le toca?" y "¿Qué tablero es válido?".
* Si es turno de la IA, mostrar un indicador de "Thinking...".

---

## 5. Layout & Responsive

**Mobile First:**
* El tablero debe ocupar el ancho completo disponible (con padding).
* `w-full max-w-md aspect-square mx-auto`.

**Desktop:**
* Centrado vertical y horizontal.
* Panel de información a un lado (opcional) o arriba.

---

## 6. Iconografía

**Librería:** Lucide React.
* **Jugador X:** Icono `X` (stroke-width 3).
* **Jugador O:** Icono `Circle` (stroke-width 3).
* **Reset:** Icono `RotateCcw`.
* **Bot vs Human:** Icono `Bot` / `User`.

---

## 7. Tech Stack (Implementación)

* **Framework:** React + Vite + TypeScript.
* **Styling:** Tailwind CSS.
* **State Management:** React Context o Zustand.
* **Utility:** `clsx` y `tailwind-merge` (Indispensable para combinar clases dinámicas de estado).
* **Animations:** Framer Motion (para la aparición de fichas y overlay de victoria).

---

## 8. Reglas de Accesibilidad (A11y)
* Usar `<button>` para cada celda del tablero (no `div` con onClick).
* `aria-label` en cada celda: "Row 1, Column 1, Empty".
* Navegación por teclado completa.