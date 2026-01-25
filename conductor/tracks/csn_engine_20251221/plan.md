# Development Plan: Build the core "Computer Says No" Engine

## Phase 1: Environment Setup & Skeleton (Greenfield) [checkpoint: d0eeb13]
- [x] Task: Initialize Node.js Express server with TypeScript. d054853
- [x] Task: Initialize React application with TypeScript and Tailwind CSS. 6ef1b69
- [x] Task: Set up SQLite database and ORM (Prisma/Drizzle). [DEPRECATED: Architecture Simplified]
- [x] Task: Create a basic "Hello World" connection between Frontend and Backend. 26df27b
- [x] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md) d0eeb13

## Phase 2: Core Refusal Engine (Backend)
- [x] Task: Implement Session Management and State Machine logic. [Needs Refactor: Move to In-Memory]
- [x] Task: Integrate Google Gemini API with a system prompt for the passive-aggressive clerk persona. f13a2f0
- [x] Task: Implement the "Gossip" and "False Hope" logic in the LLM interaction. f13a2f0
- [x] Task: Write unit tests for state transitions. 4cb26a7
- [x] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 2.5: Backend Refinements & Migration [checkpoint: ac71825]
- [x] Task: Remove Prisma/SQLite dependencies and files (`prisma/`, `db.ts`, etc.). 0165642
- [x] Task: Refactor `server/src/controllers/chat.ts` to use In-Memory Map for session state. 8503515
- [x] Task: Implement "First Contact" Greeting logic. c9ef5f9
- [x] Task: Update Chat API to return `state` or `screenShake` flag for UI triggers. 26fd2a7
- [x] Task: Improve Error Handling in Gemini service. abd6391
- [x] Task: Update/Add tests for In-Memory State Machine. 3dfa8c0
- [x] Task: Port State Machine and Gemini Logic to Frontend. 7120358
- [x] Task: Implement Client-Side API Key Management (UI for entry & localStorage storage). 6105054
- [x] Task: Conductor - User Manual Verification 'Phase 2.5' (Protocol in workflow.md) 6105054

## Phase 3: Retro UI & Interaction (Frontend)
- [ ] Task: Build the Retro Windows 95/98 layout using Tailwind CSS.
- [ ] Task: Implement the Chat Window component with message history.
- [ ] Task: Implement Session Persistence (localStorage) for the refusal state.
- [ ] Task: Connect UI to the Frontend-based refusal engine.
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

## Phase 4: Guardrails & Polish
- [ ] Task: Implement persona-check guardrails to ensure 100% unhelpfulness.
- [ ] Task: Optimize token usage by pruning history and prompt tuning.
- [ ] Task: Add final touches (sounds, pixelated icons, "What do YOU want" greeting).
- [ ] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)

## Phase 5: Deployment
- [ ] Task: Configure GitHub Actions for GitHub Pages deployment.
- [ ] Task: Set up Vite base path for GitHub Pages subfolder (if applicable).
- [ ] Task: Verify live deployment and API key functionality.
- [ ] Task: Conductor - User Manual Verification 'Phase 5' (Protocol in workflow.md)
