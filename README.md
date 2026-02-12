# 🌀 Ultimate Tic-Tac-Toe (AI & Web)

> **A Next-Gen AI Playground & Competitive Strategy Game**
> 
> *✨ This project was built using **planned and very organized vibe-coding** techniques to ensure high-quality software craftsmanship.*

## 🚀 Overview

**Ultimate Tic-Tac-Toe** is not just a game; it's a dual-purpose platform designed to push the boundaries of strategic AI and provide a premium gaming experience for humans.

This project implements a robust game engine for **Ultimate Tic-Tac-Toe**—a complex variant of Tic-Tac-Toe played on 9 nested boards (81 total cells). It serves as both a challenging strategy game and a sophisticated **Gym environment** for training Artificial Intelligence agents (Reinforcement Learning & LLMs).

## 🧠 Why is this an interesting AI Project?

Ultimate Tic-Tac-Toe offers a unique challenge for AI research compared to traditional board games:

1.  **High Branching Factor:** Unlike standard Tic-Tac-Toe, the state space is significantly larger ($3^{81}$ theoretical states), making brute-force approaches infeasible.
2.  **Long-Term Strategy:** Moves in one small board dictate where the opponent *must* play next. This "forcing move" mechanic requires agents to plan several steps ahead to control the flow of the game, not just the board they are currently playing on.
3.  **Local vs. Global Objectives:** Agents must balance winning small local boards with the global objective of winning the meta-game, often sacrificing local wins for strategic positioning.
4.  **Emergent Complexity:** While deterministic, the interaction between the 9 boards creates deep tactical nuances ideal for testing **MCTS (Monte Carlo Tree Search)** and **Deep Reinforcement Learning** algorithms.

---

## 🏗️ Architecture

We employ a **Hexagonal Architecture (Ports & Adapters)** to ensure the Core Game Logic remains pure and decoupled from the delivery mechanisms (API & UI).

*   **Core Domain (Python):** The heart of the system. A pure Python implementation of the game rules, state management, and move validation, intentionally isolated from frameworks.
*   **API Layer (FastAPI):** Exposes the core logic to the world via REST endpoints, handling HTTP requests and serializing game states.
*   **Frontend (React + Vite):** A modern web client that consumes the API to render the game state.

👉 **[Read the full Architecture Documentation](Architecture.md)**

---

## 🎨 Design & UX

The interface is designed with a **"Dark Mode First"** philosophy, featuring **Cyberpunk/Neon Minimalist** aesthetics.

*   **Visual Style:** High contrast, neon accents (Cyan for Player X vs. Fuchsia for Player O), and subtle glow effects to reduce cognitive load while maintaining a "futuristic sport" vibe.
*   **UX Focus:** The design emphasizes the **"Active Board" constraint**, using visual cues (glowing borders) to guide the player's attention to the only valid playing area, reducing confusion for new players.

👉 **[Read the Design System & UI Guidelines](Design.md)**

---

## 🗺️ Roadmap

The project is evolved in distinct phases, moving from the core Python engine to a full-fledged AI training environment.

*   **Phase 1:** Core Engine (Python) ✅
*   **Phase 2:** API & Basic Agents ✅
*   **Phase 3:** React Frontend & UI ✅
*   **Phase 4:** Polish & UX (Animations, Responsive) ✅
*   **Phase 5:** Premium Features (Fullscreen, Particles) 🚧
*   **Phase 6:** Advanced AI Training (RL/LLM Integration) 📅

👉 **[View the detailed Roadmap](Roadmap.md)**

---

## 🛠️ Installation & Running

### Backend setup (Python)

1.  Navigate to the project root.
2.  Create and activate a virtual environment:
    ```bash
    python -m venv venv
    # Windows:
    .\venv\Scripts\activate
    # Linux/Mac:
    # source venv/bin/activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Run the API server:
    ```bash
    uvicorn backend.app.main:app --reload
    ```
    *(Adjust the import path `backend.app.main:app` based on your exact `main.py` location if needed)*

### Frontend setup (React)

1.  Navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

---
*Created by Marcos Caballero Nieto*
