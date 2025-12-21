# Development Plan: Build the core "Computer Says No" Engine

## Phase 1: Environment Setup & Skeleton (Greenfield) [checkpoint: d0eeb13]
- [x] Task: Initialize Node.js Express server with TypeScript. d054853
- [x] Task: Initialize React application with TypeScript and Tailwind CSS. 6ef1b69
- [x] Task: Set up SQLite database and ORM (Prisma/Drizzle). ec88762
- [x] Task: Create a basic "Hello World" connection between Frontend and Backend. 26df27b
- [x] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md) d0eeb13

## Phase 2: Core Refusal Engine (Backend)
- [x] Task: Implement Session Management and State Machine logic for the 4-step refusal sequence. 8160acf
- [x] Task: Integrate Google Gemini API with a system prompt for the passive-aggressive clerk persona. f13a2f0
- [x] Task: Implement the "Gossip" and "False Hope" logic in the LLM interaction. f13a2f0
- [ ] Task: Write unit tests for state transitions (Ensuring the sequence progress correctly).
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Retro UI & Interaction (Frontend)
- [ ] Task: Build the Retro Windows 95/98 layout using Tailwind CSS.
- [ ] Task: Implement the Chat Window component with message history.
- [ ] Task: Implement the "Screen Shake" visual feedback for the Cough state.
- [ ] Task: Connect the UI to the Backend refusal engine.
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

## Phase 4: Guardrails & Polish
- [ ] Task: Implement persona-check guardrails to ensure 100% unhelpfulness.
- [ ] Task: Optimize token usage by pruning history and prompt tuning.
- [ ] Task: Add final touches (sounds, pixelated icons, "What do YOU want" greeting).
- [ ] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)
