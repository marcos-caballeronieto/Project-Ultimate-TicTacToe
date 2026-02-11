# 🗺️ PROJECT ROADMAP: ULTIMATE TIC-TAC-TOE

Este documento define los hitos de desarrollo. Úsalo como contexto para generar código paso a paso.

## 🏁 FASE 1: Core Engine (Python Backend)
**Objetivo:** Tener la lógica del juego 100% funcional y testeada sin interfaz gráfica.

- [ ] **Estructura de Datos del Tablero:**
    - Crear clase `UltimateBoard`.
    - Representación de 9 tableros de 3x3 (Array 9x9 o lista de objetos `SmallBoard`).
    - Estado de victoria por tablero pequeño.
- [ ] **Lógica de Movimiento y Validación:**
    - Implementar `make_move(global_x, global_y, player)`.
    - **CRÍTICO:** Implementar validación de "Next Valid Board".
    - **CRÍTICO:** Implementar "Open Board Rule" (Si el siguiente tablero está lleno/ganado, el jugador elige cualquiera).
- [ ] **Detección de Victoria Global:**
    - Verificar si 3 tableros pequeños alineados han sido ganados.
- [ ] **Tests Unitarios (Pytest):**
    - Testear victoria simple.
    - Testear regla de libertad (Open Board).
    - Testear empates.

> **Contexto para IA:** Enfócate en `backend/app/core/game.py`. La lógica debe ser pura y sin dependencias de API.

## 🔌 FASE 2: API & Agentes (Backend)
**Objetivo:** Exponer el juego al mundo y preparar el terreno para la IA.

- [ ] **Sistema de Agentes (Abstract Base Class):**
    - Crear `BaseAgent` con método `get_move(game_state)`.
    - Crear `RandomAgent` (toma decisiones aleatorias válidas) para pruebas.
- [ ] **API REST con FastAPI:**
    - `POST /new-game`: Inicia partida (PvP o PvAI).
    - `POST /move`: Recibe coordenadas, valida, actualiza estado.
    - `GET /state`: Devuelve el JSON completo del tablero actual.
- [ ] **Integración de IA en API:**
    - Si el modo es PvAI, el endpoint `/move` debe gatillar automáticamente el movimiento del agente después del humano.

> **Contexto para IA:** Usa Pydantic para validar los requests en `backend/app/api`.

## 🎨 FASE 3: Frontend Base (React)
**Objetivo:** Visualizar el estado del juego.

- [ ] **Setup Inicial:**
    - Instalar React, Tailwind, Vite.
    - Configurar proxy para llamar al backend local.
- [ ] **Componentes UI:**
    - `SmallBoard`: Renderiza 3x3 celdas. Muestra si está ganado (overlay X o O).
    - `BigBoard`: Renderiza los 9 `SmallBoard`.
- [ ] **Visualización de Reglas:**
    - **Highlight:** Resaltar visualmente en qué tablero *debe* jugar el usuario.
    - **Disabled:** Deshabilitar clics en tableros inválidos.
- [ ] **Conexión API:**
    - Hook `useGameState` para sincronizar con el backend.

## 🕹️ FASE 4: Modos de Juego y Menú
**Objetivo:** Experiencia de usuario completa.

- [ ] **Menú Principal:**
    - Pantalla de inicio con botones: "1 vs 1 (Local)" y "1 vs AI".
- [ ] **Gestión de Turnos UI:**
    - Mostrar claramente "Turno de X" o "Turno de O".
    - Manejar estados de "Cargando" cuando la IA está "pensando".
- [ ] **Game Over Screen:**
    - Modal que anuncia al ganador y botón de "Jugar de nuevo".
- [ ] **Script Headless (AI vs AI):**
    - Script en Python (`simulate_games.py`) que haga jugar a dos `RandomAgent` entre sí 100 veces y guarde los logs.

> **Contexto para IA:** El script headless es vital para generar datasets futuros.

## 🧠 FASE 5 (FUTURO): Entrenamiento de IA (Parte 2)
**Objetivo:** Crear un agente inteligente (LLM o RL).

- [ ] **Data Pipeline:**
    - Modificar el script headless para guardar partidas en formato JSONL o CSV (Estado -> Movimiento -> Resultado).
- [ ] **Gym Environment:**
    - Adaptar la clase `UltimateBoard` para que cumpla con la interfaz OpenAI Gym (opcional, pero recomendado).
- [ ] **Entrenamiento:**
    - Opción A: Fine-tuning de un LLM pequeño con los logs de partidas.
    - Opción B: Reinforcement Learning (PPO/DQN).
- [ ] **Integración:**
    - Crear `SmartAgent` que herede de `BaseAgent` y cargue el modelo entrenado.