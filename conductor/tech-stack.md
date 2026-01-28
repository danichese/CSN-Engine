# Tech Stack: Computer Says No Bot

## Frontend
- **Framework:** React (TypeScript)
- **Styling:** Tailwind CSS (Custom Retro/Win95 Theme)
- **State Management:** React Context (for UI and refusal state) & LocalStorage (for session persistence and API key storage)
- **Icons:** Pixelated/Retro icon set
- **AI Integration:** Google Gemini API (using `@google/generative-ai` SDK directly in the client)

## Backend
- **None:** The application is a static frontend. Users provide their own Gemini API key for security in a client-side environment.

## Deployment
- **Platform:** GitHub Pages
- **Automation:** GitHub Actions (Build and Deploy workflow)

## Key Technical Decisions
- **Demo-First Interaction:** To ensure a seamless parody experience, the application is locked to "Demo Mode" by default, using pre-defined unhelpful responses and a mandatory 5-second bureaucratic delay.
- **Client-Side AI (Inactive):** While the Gemini SDK remains integrated, active API key management has been removed to simplify the user experience.
- **State Machine:** The refusal sequence (Initial -> Check -> Cough -> False Hope) is managed within the React state.
- **Retro Bureaucracy:** UI/UX remains the priority, mimicking a Windows 95 environment.
