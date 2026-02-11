# 📋 PROJECT BLUEPRINT: ULTIMATE TIC-TAC-TOE (AI & WEB)

## 1. RESUMEN DEL PROYECTO
* **Nombre:** Ultimate Tic-Tac-Toe (Project UTTT-AI)
* **Objetivo:** Crear un motor robusto del juego "Tres en Raya Definitivo" que sirva como entorno de entrenamiento (Gym) para agentes de Inteligencia Artificial y exponga una interfaz jugable para humanos.
* **Tipo:** Hybrid Application (Python Game Engine + Web UI).

## 2. REGLAS DE JUEGO (ESPECÍFICAS)
1.  **Tablero:** 9 tableros pequeños de 3x3 dispuestos en una cuadrícula de 3x3 (Total 81 casillas).
2.  **Movimiento:**
    * Jugador 1 mueve donde quiera en el inicio del tablero central (x = 2, y = 2).
    * Si Jugador A mueve en la casilla local (x, y) de un tablero pequeño, el Jugador B *debe* jugar en el tablero pequeño ubicado en la posición global (x, y).
3.  **Regla de Libertad (Open Board Rule):** Si el movimiento anterior envía al jugador a un tablero que ya está **ganado** o **lleno**, el jugador tiene libertad para jugar en **cualquier** casilla vacía de **cualquier** tablero no decidido.
4.  **Victoria:**
    * Se gana un tablero pequeño haciendo 3 en raya normal.
    * Se gana el juego haciendo 3 en raya con los tableros pequeños ganados.

## 3. TECH STACK (Estricto)
* **Core Logic / AI:** Python 3.11+ (Tipado estricto).
* **API Server:** FastAPI (Python).
* **Frontend:** React + TypeScript + Vite.
* **Estilos:** Tailwind CSS.
* **Gestión de Estado (Front):** Zustand o React Context (para manejar el estado complejo del tablero).
* **Intercambio de datos:** JSON (REST API).

## 4. ARQUITECTURA
Usaremos una **Arquitectura Hexagonal (Ports & Adapters)** simplificada:
* **Domain (Núcleo):** `UltimateTicTacToe` class. Contiene toda la lógica, validaciones y estado. No sabe nada de API ni de Frontend.
* **Agents (AI):** Una clase abstracta `BaseAgent`. Las implementaciones (RandomAgent, MinimaxAgent, LLMAgent) heredarán de ella.
* **Application (API):** Endpoints de FastAPI que reciben un movimiento, llaman al Núcleo, y devuelven el nuevo estado + el movimiento de la IA (si aplica).
* **Infrastructure (UI):** React consumiendo la API.

## 5. ESTRUCTURA DE CARPETAS PREFERIDA
/project-root
  /backend (Python)
    /app
      /core (Lógica del juego: board.py, rules.py)
      /agents (BaseAgent, RandomAgent, LLMAgent)
      /api (FastAPI routes, schemas)
      /tests (Unit tests para reglas)
  /frontend (React)
    /src
      /components (Board, Cell, GameInfo)
      /hooks (useGameEngine)
      /types (Interfaces TS compartidas con esquemas Python)

## 6. REGLAS DE CODIFICACIÓN
1.  **Python:** Uso estricto de Type Hints. Clases claras. Docstrings explicando la lógica (Por ejemplo de la regla de "Tablero Abierto").
2.  **Separación de Responsabilidades:** El Frontend *no calcula* si alguien ganó, solo *renderiza* el estado que le da el Backend. La "Verdad" está siempre en Python.
3.  **Nomenclatura:** Variables en inglés (`currentBoard`, `winner`, `nextMove`).
4.  **Testing:** TDD ligero para la lógica de victoria (es fácil tener bugs en las diagonales del Ultimate TTT).

## 7. FUNCIONALIDADES CORE (MVP)
1.  **Game Engine (Python):** Clase capaz de jugar una partida completa en consola/memoria, validando movimientos ilegales y detectando victorias.
2.  **Agent Interface:** Sistema para conectar una clase Python como "Jugador 2".
3.  **API REST:** Endpoint `POST /move` que recibe `(board_index, cell_index)` y devuelve el nuevo estado completo.
4.  **Web UI:** Tablero visual que resalte las jugadas válidas y bloquee las inválidas.