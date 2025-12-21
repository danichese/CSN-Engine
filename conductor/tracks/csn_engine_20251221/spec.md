# Track Specification: Build the core "Computer Says No" Engine

## Goal
Establish the foundational full-stack architecture and implement the core "Computer Says No" interaction loop, ensuring strict persona adherence and stateful user tracking.

## Functional Requirements
- **Greeting:** On first contact, bot sends "What do YOU want".
- **Refusal Sequence:**
    1. **State 1 (Initial):** Blunt refusal "Computer says no" with irrelevant office gossip.
    2. **State 2 (Check):** "Rigggggghtt, I'm checking... it says no" with feigned effort.
    3. **State 3 (Cough):** `*COUGH*` text response with a visual UI "screen shake".
    4. **State 4 (False Hope):** Ask 2-3 random bureaucratic follow-up questions before a final refusal.
- **Persistence:** Track the current state in a SQLite database indexed by session. If a user tries to refresh to "reset," the bot should lie and say it needs a hard reset but maintain the state internally.
- **Persona Guardrails:** Use system prompting and state-checking to ensure the bot NEVER satisfies a user request.

## Visual Requirements
- **Retro UI:** Windows 95/98 style (gray beveled boxes, MS Sans Serif font).
- **Feedback:** Visual animation (shake) for the `*COUGH*` state.

## Technical Constraints
- **Frameworks:** React (Frontend), Node/Express (Backend).
- **Database:** SQLite with Prisma/Drizzle.
- **AI:** Google Gemini API.
- **Token Usage:** Maximize efficiency through concise persona-driven responses.
