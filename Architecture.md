# 📋 PROJECT BLUEPRINT: ULTIMATE TIC-TAC-TOE (AI & WEB)

## 1. PROJECT SUMMARY
* **Name:** Ultimate Tic-Tac-Toe (Project UTTT-AI)
* **Objective:** Create a robust engine for the "Ultimate Tic-Tac-Toe" game that serves as a training environment (Gym) for Artificial Intelligence agents and exposes a playable interface for humans.
* **Type:** Hybrid Application (Python Game Engine + Web UI).

## 2. GAME RULES (SPECIFIC)
1.  **Board:** 9 small 3x3 boards arranged in a 3x3 grid (Total 81 cells).
2.  **Movement:**
    * Player 1 moves wherever they want at the start of the central board (x = 2, y = 2).
    * If Player A moves in local cell (x, y) of a small board, Player B *must* play in the small board located at global position (x, y).
3.  **Freedom Rule (Open Board Rule):** If the previous move sends the player to a board that is already **won** or **full**, the player is free to play in **any** empty cell of **any** undecided board.
4.  **Victory:**
    * A small board is won by making a normal 3-in-a-row.
    * The game is won by making a 3-in-a-row with the won small boards.

## 3. TECH STACK (Strict)
* **Core Logic / AI:** Python 3.11+ (Strict typing).
* **API Server:** FastAPI (Python).
* **Frontend:** React + TypeScript + Vite.
* **Styles:** Tailwind CSS.
* **State Management (Front):** Zustand or React Context (to handle complex board state).
* **Data Exchange:** JSON (REST API).

## 4. ARCHITECTURE
We will use a simplified **Hexagonal Architecture (Ports & Adapters)**:
* **Domain (Core):** `UltimateTicTacToe` class. Contains all logic, validations, and state. Knows nothing about API or Frontend.
* **Agents (AI):** An abstract class `BaseAgent`. Implementations (RandomAgent, MinimaxAgent, LLMAgent) will inherit from it.
* **Application (API):** FastAPI endpoints that receive a move, call the Core, and return the new state + AI move (if applicable).
* **Infrastructure (UI):** React consuming the API.

## 5. PREFERRED FOLDER STRUCTURE
/project-root
  /backend (Python)
    /app
      /core (Game logic: board.py, rules.py)
      /agents (BaseAgent, RandomAgent, LLMAgent)
      /api (FastAPI routes, schemas)
      /tests (Unit tests for rules)
  /frontend (React)
    /src
      /components (Board, Cell, GameInfo)
      /hooks (useGameEngine)
      /types (TS Interfaces shared with Python schemas)

## 6. CODING RULES
1.  **Python:** Strict use of Type Hints. Clear classes. Docstrings explaining logic (e.g., "Open Board" rule).
2.  **Separation of Concerns:** The Frontend *does not calculate* if someone won, it only *renders* the state given by the Backend. The "Truth" is always in Python.
3.  **Naming:** Variables in English (`currentBoard`, `winner`, `nextMove`).
4.  **Testing:** Light TDD for victory logic (it is easy to have bugs in Ultimate TTT diagonals).

## 7. CORE FEATURES (MVP)
1.  **Game Engine (Python):** Class capable of playing a full game in console/memory, validating illegal moves, and detecting wins.
2.  **Agent Interface:** System to connect a Python class as "Player 2".
3.  **API REST:** Endpoint `POST /move` that receives `(board_index, cell_index)` and returns the new full state.
4.  **Web UI:** Visual board that highlights valid moves and blocks invalid ones.