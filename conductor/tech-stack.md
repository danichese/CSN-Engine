# Tech Stack: Computer Says No Bot

## Frontend
- **Framework:** React (TypeScript)
- **Styling:** Tailwind CSS (Custom Retro/Win95 Theme)
- **State Management:** React Context or Redux (to track the unhelpful persistence sequence)
- **Icons:** Pixelated/Retro icon set

## Backend
- **Runtime:** Node.js
- **Framework:** Express.js (TypeScript)
- **AI Integration:** Google Gemini API (using `google-generative-ai` SDK)

## Database
- **Engine:** SQLite
- **ORM:** Prisma or Drizzle (for easy schema management)

## Development & Deployment
- **Language:** TypeScript (End-to-end type safety)
- **Version Control:** Git (to be initialized later)
- **Package Manager:** npm or yarn

## Key Technical Decisions
- **Persona Guardrails:** Hardcoded state machine in the backend to manage the refusal sequence (Initial -> Check -> Cough -> False Hope), with Gemini providing the creative "digression" content.
- **Token Optimization:** Responses are prompted to be extremely concise. History is pruned to maintain only the immediate state needed for the sequence.
