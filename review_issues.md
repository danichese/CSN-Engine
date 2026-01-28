# Code Review: CSN Engine (2025-12-22)

## Overview
Review of the "Computer Says No" (CSN) Engine implementation against the Phase 2 specifications.

**Reviewer:** Gemini CLI
**Date:** 2025-12-22
**Status:** Phase 2 mostly complete, but critical integration gaps remain.

## Critical Issues (Must Fix)

### 1. Missing "First Contact" Greeting
- **Spec:** "On first contact, bot sends 'What do YOU want'."
- **Current Behavior:** The API (`/api/chat`) expects a user message `prompt` in the request body. It does not support an empty "init" call to trigger the greeting.
- **Recommendation:** 
    - Modify `POST /api/chat` to allow an empty prompt (or create a new `GET /api/init` endpoint) that creates a session and returns the initial greeting without incrementing the state logic incorrectly.
    - Alternatively, handle this purely on the frontend (hardcoded first message), but server-side is more secure/consistent.

### 2. Frontend-Backend Disconnect
- **Spec:** Phase 1 "Hello World" connection.
- **Current Behavior:** `client/src/App.tsx` fetches from root `/` but does not interact with the core `/api/chat` endpoint.
- **Risk:** The core engine is isolated and not actually usable by the frontend yet.
- **Recommendation:** Update `client/src/App.tsx` to call `/api/chat` and handle the JSON response structure.

### 3. State 3 (Cough) & UI Trigger
- **Spec:** "State 3 (Cough): `*COUGH*` text response with a visual UI 'screen shake'."
- **Current Behavior:** The backend relies on the LLM to generate the text `*COUGH*`.
- **Risk:** LLM variability might result in "Cough cough" or "Excuse me *cough*", making it hard for the UI to detect when to trigger the animation.
- **Recommendation:** 
    - Update the `/api/chat` response to include the current `state` (integer) or a `screenShake` (boolean) flag.
    - This allows the frontend to trigger the animation deterministically based on `state === 3` rather than parsing text.

### 4. Persistence & "Refresh" Logic
- **Spec:** "If a user tries to refresh to 'reset,' the bot should lie... but maintain the state internally."
- **Current Behavior:** The backend creates a new session if no `sessionId` is provided.
- **Gap:** This logic requires the Frontend to persist the `sessionId` (e.g., in `localStorage`) so that a browser refresh restores the active session. If the session ID is lost, the backend cannot "maintain state".
- **Recommendation:** Ensure the Frontend implementation (Phase 3) includes `localStorage` logic for the `sessionId`.

## Code Quality & Polish

### 5. Error Handling
- **Observation:** `server/src/services/gemini.ts` has basic error handling.
- **Recommendation:** Ensure rate limits (429s) from the Gemini API are handled gracefully (e.g., with a "Computer is... busy" fallback response) rather than crashing or timing out.

### 6. Test Coverage
- **Observation:** Tests cover the state transitions well.
- **Recommendation:** Add a test specifically for the "Loop" behavior (State 4 -> State 1) to ensure the gossip resets correctly.
