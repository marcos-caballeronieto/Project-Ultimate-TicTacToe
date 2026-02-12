# 🗺️ PROJECT ROADMAP: ULTIMATE TIC-TAC-TOE

Este documento define los hitos de desarrollo. Úsalo como contexto para generar código paso a paso.

## ✅ FASE 1: Core Engine (Python Backend) - COMPLETADO
**Objetivo:** Tener la lógica del juego 100% funcional y testeada sin interfaz gráfica.

- [x] **Estructura de Datos del Tablero:**
    - Crear clase `UltimateBoard`.
    - Representación de 9 tableros de 3x3 (Estructura jerárquica).
    - Estado de victoria por tablero pequeño.
- [x] **Lógica de Movimiento y Validación:**
    - Implementar `make_move(board_row, board_col, cell_row, cell_col)`.
    - **CRÍTICO:** Implementar validación de "Next Valid Board".
    - **CRÍTICO:** Implementar "Open Board Rule".
- [x] **Detección de Victoria Global:**
    - Verificar si 3 tableros pequeños alineados han sido ganados.
- [x] **Tests Unitarios (Pytest):**
    - Cobertura de victoria, regla de libertad y estados iniciales.

## ✅ FASE 2: API & Agentes (Backend) - COMPLETADO
**Objetivo:** Exponer el juego al mundo y preparar el terreno para la IA.

- [x] **Sistema de Agentes (Abstract Base Class):**
    - Crear `BaseAgent` con método `get_move(game_state)`.
- [x] **Agente Random:**
    - Crear `RandomAgent` para pruebas de validación.
- [x] **API REST con FastAPI:**
    - Endpoints `/new-game`, `/move`, `/state` implementados y funcionales.
- [x] **Integración de IA en API:**
    - Modo PvAI donde el agente responde automáticamente.

## ✅ FASE 3: Frontend Base (React) - COMPLETADO
**Objetivo:** Visualizar el estado del juego.

- [x] **Setup Inicial:**
    - React + Vite + Tailwind CSS v4 con configuración PostCSS.
- [x] **Componentes UI:**
    - `SmallBoard` y `BigBoard` con renderizado jerárquico.
- [x] **Visualización de Reglas:**
    - Resaltado de tableros válidos y deshabilitación de celdas inválidas.
- [x] **Conexión API:**
    - Hook `useGameState` con llamadas fetch y manejo de errores.

## ✅ FASE 4: Pulido Visual y UX - COMPLETADO
**Objetivo:** Elevar la estética del juego a un nivel premium y mejorar la interacción.

- [x] **Diseño Estético (Aesthetics):**
    - Implementar una paleta de colores moderna y armónica (Cyberpunk/Neon).
    - Usar tipografía premium (Inter & Space Grotesk).
    - Añadir efectos de glow y neón sutiles.
- [x] **Animaciones y Micro-interacciones:**
    - Animación suave al colocar una ficha (Framer Motion).
    - Transiciones de color al resaltar tableros.
    - Animación de victoria para tableros pequeños.
- [x] **Responsive Design:**
    - Asegurar que el tablero sea perfectamente jugable en móviles.

## ✨ FASE 5: Funcionalidades Premium (EN PROCESO)
**Objetivo:** Añadir extras que mejoren la experiencia y preparar la simulación.

- [X] **Animación de Victoria Global:**
    - Efecto de "System Override" o explosión de partículas cuando se gana la partida.
- [x] **Modo Fullscreen:**
    - Botón para jugar en pantalla completa e inmersiva (Solo el tablero visible).
- [x] **Balance de Reglas:**
    - Obligar el inicio en el tablero central (Fijado en backend).
- [ ] **Game Over Screen Avanzada:**
    - Modal con efectos visuales y estadísticas de la partida.

## 🕹️ FASE 5: Modos Avanzados y Simulación
**Objetivo:** Preparar el camino para el entrenamiento de IA.

- [ ] **Game Over Screen Avanzada:**
    - Modal con efectos visuales y estadísticas de la partida.
- [ ] **Script Headless (AI vs AI):**
    - Script en Python (`simulate_games.py`) para generar logs de partidas masivas.

## 🧠 FASE 6: Entrenamiento de IA (Parte 2)
**Objetivo:** Crear un agente inteligente (LLM o RL).

- [ ] **Data Pipeline:**
    - Guardado de estados en formato JSONL para entrenamiento.
- [ ] **Gym Environment:**
    - Adaptación a interfaz OpenAI Gym.
- [ ] **Entrenamiento:**
    - Fine-tuning o Reinforcement Learning.
- [ ] **Integración Smart Agent:**
    - Implementar el modelo entrenado en la interfaz de juego.