# 🌐 Multiplayer & Multi-Client Architecture Guide

This document defines the strategy to evolve the Ultimate Tic-Tac-Toe project from a single global state model to a scalable, multi-client architecture supporting concurrent game sessions. It also analyzes deployment feasibility on **Render's Free Tier**.

## 1. Core Objectives
*   Allow multiple pairs of users to play simultaneously in isolated "Rooms".
*   Provide real-time updates with minimal latency.
*   Support role assignment (Player X, Player O, Spectators).
*   Keep infrastructure costs at $0 using Render's Free Tier.

## 2. Backend Architecture Changes (FastAPI)

Currently, the backend maintains a single global `Game` instance. This must be refactored into a session-based model.

### 2.1. Session Management
*   **State Store:** Migrate from a singleton game variable to a dictionary mapping: `games: Dict[str, GameInstance]`.
*   **Room Generation:** Create an endpoint (e.g., `POST /api/rooms`) that generates a unique 6-character alphanumeric Room ID, initializes a new `GameInstance`, and returns the ID.

### 2.2. Real-Time Communication (WebSockets)
Standard REST API polling is inefficient for real-time multiplayer games. We will migrate to **WebSockets**.
*   **Connection Manager:** Implement a `ConnectionManager` class in FastAPI to track active WebSockets per Room ID.
*   **Events Protocol:**
    *   `join`: A user connects to a room.
    *   `move`: A user submits a valid move.
    *   `update`: The server broadcasts the new board state to all clients in the room.
    *   `error`: Invalid move or out-of-turn alerts.

## 3. Frontend Architecture Changes (React)

### 3.1. Routing & UI
*   **React Router:** Introduce frontend routing to handle the Lobby and Game instances.
    *   `/` -> Home (Create a new game or enter a Room Code).
    *   `/:roomId` -> The actual game board interface.
*   **Link Sharing:** Add a "Copy Invite Link" button so players can easily invite friends via URL.

### 3.2. Role Handling
*   The first person to explicitly join an empty room (or the creator) is assigned Player X.
*   The second person to join via link is assigned Player O.
*   Any subsequent connections default to a read-only "Spectator" mode.

### 3.3. State Synchronization
*   Replace standard `fetch()` API calls with WebSocket listeners using `window.WebSocket` or a library like `react-use-websocket`.
*   Implement automatic reconnection logic in case the socket drops.

## 4. Render Free Tier Considerations

Deploying this architecture on Render for free is **100% possible**, but requires understanding Render's Free Web Services limitations:

### 4.1. WebSockets on Render
✅ **Supported:** Render supports WebSockets natively on their free tier. You do not need a separate port; WebSocket upgrades work seamlessly over standard HTTP ports.

### 4.2. Inactivity Spin-Down (The Catch)
⚠️ **Restriction:** Render Free Web Services automatically spin down after **15 minutes of inactivity** (no incoming HTTP or WebSocket traffic).
*   **Impact on In-Memory State:** If the backend stores game sessions in a Python dictionary (RAM), *all active games will be erased* every time the server spins down.
*   **Impact on Cold Starts:** The first user to visit the site after a spin-down will experience a 30-50 second delay while the server boots up.

### 4.3. Connection Timeouts
⚠️ **Restriction:** Idle connections may be dropped silently by Render's load balancers.
*   **Solution:** Implement a simple "Ping/Pong" heartbeat in your WebSocket implementation (e.g., sending a ping frame every 30 seconds) to keep the connection alive indefinitely during a match.

## 5. Recommended Persistence Strategy (Keeping it Free)

If losing game states upon server spin-down is unacceptable, you must move the state out of the FastAPI server's RAM. Since Render does not offer free databases with persistence, you can plug in a free external Database-as-a-Service (DBaaS):

1.  **Redis Cloud (Free 30MB Database):** Ideal for real-time game states. Fast read/write and native TTL (Time-To-Live) to auto-delete stale rooms.
2.  **MongoDB Atlas (Free 512MB Cluster):** Great for storing game history, logs, and current JSON state of matches.
3.  **Supabase / Neon (Free Postgres):** Excellent if you plan to add user accounts or leaderboards later.

**Conclusion:** For MVP development, starting purely with in-memory state is fine. If the application gets public traction and session drops become annoying due to Render's Free tier spin-down, integrating **Redis Cloud** as a persistent store is the best free next step.
