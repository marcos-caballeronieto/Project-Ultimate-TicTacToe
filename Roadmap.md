# 🗺️ PROJECT ROADMAP: ULTIMATE TIC-TAC-TOE

This document defines the development milestones. Use it as context to generate code step-by-step.

## ✅ PHASE 1: Core Engine (Python Backend) - COMPLETED
**Objective:** Have the game logic 100% functional and tested without a graphical interface.

- [x] **Board Data Structure:**
    - Create `UltimateBoard` class.
    - Representation of 9 3x3 boards (Hierarchical structure).
    - Win state per small board.
- [x] **Movement & Validation Logic:**
    - Implement `make_move(board_row, board_col, cell_row, cell_col)`.
    - **CRITICAL:** Implement "Next Valid Board" validation.
    - **CRITICAL:** Implement "Open Board Rule".
- [x] **Global Win Detection:**
    - Verify if 3 aligned small boards have been won.
- [x] **Unit Tests (Pytest):**
    - Coverage for wins, freedom rule, and initial states.

## ✅ PHASE 2: API & Agents (Backend) - COMPLETED
**Objective:** Expose the game to the world and prepare the ground for AI.

- [x] **Agent System (Abstract Base Class):**
    - Create `BaseAgent` with `get_move(game_state)` method.
- [x] **Random Agent:**
    - Create `RandomAgent` for validation testing.
- [x] **REST API with FastAPI:**
    - Endpoints `/new-game`, `/move`, `/state` implemented and functional.
- [x] **AI Integration in API:**
    - PvAI mode where the agent responds automatically.

## ✅ PHASE 3: Frontend Base (React) - COMPLETED
**Objective:** Visualize the game state.

- [x] **Initial Setup:**
    - React + Vite + Tailwind CSS v4 with PostCSS configuration.
- [x] **UI Components:**
    - `SmallBoard` and `BigBoard` with hierarchical rendering.
- [x] **Rules Visualization:**
    - Highlighting valid boards and disabling invalid cells.
- [x] **API Connection:**
    - `useGameState` hook with fetch calls and error handling.

## ✅ PHASE 4: Visual Polish & UX - COMPLETED
**Objective:** Elevate the game aesthetics to a premium level and improve interaction.

- [x] **Aesthetic Design (Aesthetics):**
    - Implement a modern and harmonic color palette (Cyberpunk/Neon).
    - Use premium typography (Inter & Space Grotesk).
    - Add subtle glow and neon effects.
- [x] **Animations & Micro-interactions:**
    - Smooth animation when placing a piece (Framer Motion).
    - Color transitions when highlighting boards.
    - Win animation for small boards.
- [x] **Responsive Design:**
    - Ensure the board is perfectly playable on mobile.

## ✨ PHASE 5: Premium Features (IN PROGRESS)
**Objective:** Add extras that improve the experience and prepare the simulation.

- [X] **Global Win Animation:**
    - "System Override" effect or particle explosion when the game is won.
- [x] **Fullscreen Mode:**
    - Button to play in immersive fullscreen (Only the board visible).
- [x] **Rules Balance:**
    - Force start in the central board (Fixed in backend).

## 🕹️ PHASE 5: Advanced Modes & Simulation
**Objective:** Prepare the path for AI training.

- [ ] **Advanced Game Over Screen:**
    - Modal with visual effects and match statistics.
- [ ] **Headless Script (AI vs AI):**
    - Python script (`simulate_games.py`) to generate massive game logs.

## 🧠 PHASE 6: AI Training (Part 2)
**Objective:** Create an intelligent agent (LLM or RL).

- [ ] **Data Pipeline:**
    - Saving states in JSONL format for training.
- [ ] **Gym Environment:**
    - Adaptation to OpenAI Gym interface.
- [ ] **Training:**
    - Fine-tuning or Reinforcement Learning.
- [ ] **Smart Agent Integration:**
    - Implement the trained model in the game interface.