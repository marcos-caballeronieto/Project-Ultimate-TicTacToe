# DESIGN.MD - Design System & UI/UX Guidelines

> **CONTEXT FOR AI:**
> This document acts as the source of truth for all frontend and UI/UX design decisions for the "Ultimate Tic-Tac-Toe" project.
> The visual style should evoke a modern game interface, "Dark Mode" by default, with Cyberpunk/Neon Minimalist aesthetics.
> Whenever you generate components, use these Tailwind classes and color constants.

---

## 1. Overview and "Vibe"
**Description:**
An immersive and dark interface ("Dark Mode First") with geometric aesthetics and bright neon accents. The design should minimize cognitive load, highlighting only the active board and played tokens.

**Style Keywords:**
- [x] Futuristic / Dark Mode Heavy
- [x] Neon / High Contrast
- [x] Geometric / Grid-based
- [x] Minimalist
- [x] Subtle "Glow" effects

**Inspiration:**
* Sci-Fi Interfaces (HUDs).
* "AMOLED Black" Applications.
* Abstract strategy games.

---

## 2. Color Palette

### Game Colors (Semantic)
*The game is based on two players. Use these colors for tokens, win borders, and turns.*

| Semantic | Color (Tailwind) | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| **Player X** | `text-cyan-400` / `bg-cyan-400` | `#22d3ee` | X Tokens, X Win Borders, P1 Button. |
| **Player O** | `text-fuchsia-400` / `bg-fuchsia-400` | `#e879f9` | O Tokens, O Win Borders, P2/AI Button. |
| **Active Board** | `border-yellow-400` | `#facc15` | **CRITICAL:** Indicates the board where *one must* play. |
| **Valid Move** | `bg-zinc-800` | `#27272a` | Hover on valid cell. |

### Neutral Colors (Dark Mode Surfaces)
| Semantic | Color (Tailwind) | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| **Background** | `bg-zinc-950` | `#09090b` | Page background (Body). |
| **Board Bg** | `bg-black` | `#000000` | Big board background (for contrast). |
| **Surface** | `bg-zinc-900` | `#18181b` | Card background, modals. |
| **Grid Lines** | `border-zinc-800` | `#27272a` | Dividing lines of boards. |
| **Text Main** | `text-zinc-100` | `#f4f4f5` | Titles, scoring. |
| **Text Muted** | `text-zinc-500` | `#71717a` | Secondary instructions. |

### Feedback
* **Error:** `text-red-500` (Invalid move).
* **Draw:** `text-zinc-400` (Draw on a board).

---

## 3. Typography

**Main Font (UI & Body):**
* **Family:** `Inter` or `sans-serif`.
* **Usage:** Buttons, instructions, small texts.

**Secondary Font (Display/Numbers):**
* **Family:** `Space Grotesk`, `JetBrains Mono` or `monospace`.
* **Usage:** Scoreboards, Game Title, Tokens (if text).

**Scale:**
* **H1 (Title):** `text-3xl font-bold tracking-tight`
* **X/O Mark:** `text-2xl` (on small board) / `text-6xl` (board winner).

---

## 4. UI Components & Tokens

### Borders and Radius
* **Small Board:** `rounded-lg` (8px).
* **Big Board:** `rounded-2xl` (16px).
* **Buttons:** `rounded-md`.
* **Borders:** Use `border-2` for emphasis on won boards.

### Shadows and Effects (Glows)
* Do not use black shadows (standard `box-shadow`).
* **Active Board Glow:** Use `ring` or `shadow-[color]` to simulate light.
  * Ex: `ring-2 ring-yellow-400 ring-offset-2 ring-offset-zinc-950`.
* **Winning Cell:** Must glow.
  * Ex: `shadow-[0_0_15px_rgba(34,211,238,0.5)]` for X.

### Specific Components

#### 1. The Cell (Individual Cell)
* Base: `h-full w-full flex items-center justify-center transition-colors`.
* Empty & Valid: `hover:bg-zinc-800 cursor-pointer`.
* Filled: `font-bold text-xl`.

#### 2. The Small Board (3x3 Board)
* Layout: 3x3 Grid with `gap-1` or internal borders.
* **"Won" State:** Must have an `absolute inset-0` flex overlay centered with large semi-transparent X or O (`bg-zinc-950/80`).

#### 3. Game Info Panel
* Must clearly show: "Whose turn is it?" and "Which board is valid?".
* If it is AI's turn, show a "Thinking..." indicator.

---

## 5. Layout & Responsive

**Mobile First:**
* The board must occupy the full available width (with padding).
* `w-full max-w-md aspect-square mx-auto`.

**Desktop:**
* Vertically and horizontally centered.
* Information side panel (optional) or top.

---

## 6. Iconography

**Library:** Lucide React.
* **Player X:** Icon `X` (stroke-width 3).
* **Player O:** Icon `Circle` (stroke-width 3).
* **Reset:** Icon `RotateCcw`.
* **Bot vs Human:** Icon `Bot` / `User`.

---

## 7. Tech Stack (Implementation)

* **Framework:** React + Vite + TypeScript.
* **Styling:** Tailwind CSS.
* **State Management:** React Context or Zustand.
* **Utility:** `clsx` and `tailwind-merge` (Indispensable for combining dynamic state classes).
* **Animations:** Framer Motion (for token appearance and victory overlay).

---

## 8. Accessibility Rules (A11y)
* Use `<button>` for each board cell (not `div` with onClick).
* `aria-label` on each cell: "Row 1, Column 1, Empty".
* Full keyboard navigation.