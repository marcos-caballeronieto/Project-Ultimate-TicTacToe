# 🌀 Ultimate Tic-Tac-Toe (AI & Web)

> **A Next-Gen AI Playground & Competitive Strategy Game**
> 
> > 🕹️ **[Play the Live Demo Here](https://project-utttweb.vercel.app/)**
> > 
> *✨ This project was built using **planned and very organized vibe-coding** techniques to ensure high-quality software craftsmanship.*

---

### 💻 Tech Stack

**Core & Backend** [![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Pytest](https://img.shields.io/badge/Pytest-0A9EDC?logo=pytest&logoColor=white)](https://docs.pytest.org/)

**Frontend** [![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)

**Infrastructure** [![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Nginx](https://img.shields.io/badge/Nginx-009639?logo=nginx&logoColor=white)](https://www.nginx.com/)

---

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

### 🛡️ Security & Scalability (Vercel Deployment)
* **API Hardening:** Sanitized backend responses to remove sensitive system metadata and internal file structures.
* **Environment Security:** Secured production API endpoints with strictly enforced HTTPS and a multi-environment variable system.
* **Infrastructure Strategy:** Implemented a robust CORS policy to restrict backend access to authorized frontend domains only.
* **Roadmap (Stateless Transition):** Currently refactoring toward a stateless architecture to support high-concurrency and eliminate cross-user state bleeding.

---

## 🗺️ Roadmap

The project is evolved in distinct phases, moving from the core Python engine to a full-fledged AI training environment.

*   **Phase 1:** Core Engine (Python) ✅
*   **Phase 2:** API & Basic Agents ✅
*   **Phase 3:** React Frontend & UI ✅
*   **Phase 4:** Polish & UX (Animations, Responsive) ✅
*   **Phase 5:** Premium Features (Fullscreen, Particles) 🚧
*   **Phase 6:** Stateless Refactor (Transition from global server-side state to client-side state passing or database persistence to allow multiple simultaneous sessions.) 📅
*   **Phase 7:** Advanced AI Training (RL/LLM Integration) 📅

👉 **[View the detailed Roadmap](Roadmap.md)**

---

## 🛠️ Installation & Running

*💡 Just want to play? Check out the **[Live Demo](https://project-utttweb.vercel.app/)**!*

### 🐳 Run with Docker (Recommended)

The easiest way to get the project running is using Docker Compose. This will start both the backend and frontend in synchronized containers.

1.  **Ensure Docker is installed** on your system.
2.  **Run the following command** in the project root:
    ```bash
    docker-compose up --build
    ```
3.  **Access the game** at [http://localhost](http://localhost).

---

### 🐍 Manual Backend setup (Python)

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
