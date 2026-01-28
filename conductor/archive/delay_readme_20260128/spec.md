# Specification: Delayed Response & README Overhaul

## Overview
This track focuses on enhancing the "unhelpful" persona of the Computer Says No Bot by enforcing a mandatory delay in responses. This delay ensures users have time to perceive the "audible sigh" and "checking" states, mimicking a slow, bureaucratic process. Additionally, the project documentation (README.md) will be completely overhauled to include character context, technical details, and specific project disclaimers, utilizing existing assets.

## Functional Requirements

### 1. Artificial Response Delay
*   **Global Delay:** The application MUST introduce a fixed **5-second delay** before displaying any response from the bot after a user interaction.
*   **Scope:** This delay MUST apply to ALL response types and states, including:
    *   Initial Refusal ("Computer says no")
    *   Checking Phase ("Rigggggghtt...")
    *   Physical Response ("*Coughs*")
    *   False Hope / Digressions
*   **UI Feedback:** During this 5-second delay, the UI MUST display the appropriate status or "thinking" state (e.g., "The assistant is ignoring you...", "*Audible Sigh*", or simple typing indicators) to visually communicate the specific action being performed.

### 2. README.md Overhaul
The `README.md` file MUST be rewritten to include the following specific sections:
*   **The Character:** A dedicated section explaining the "Carol Beer" persona.
    *   **Image:** This section MUST display the image located at `Assets/carol beer.jpg`.
*   **Technical Architecture:** A section detailing the project's construction:
    *   Client-side Google Gemini integration.
    *   State machine logic for the refusal sequence.
    *   Retro/Windows 95 UI styling.
*   **Contributing:** Guidelines for developers who wish to add new bureaucratic delays, insults, or features.
*   **Disclaimer:** A clear statement that this is a parody application and not a functioning assistant.
*   **Standard Sections:** Ensure Introduction, Installation, and Usage instructions are up-to-date and accurate.

## Non-Functional Requirements
*   **Non-Blocking:** The 5-second delay must be implemented asynchronously (e.g., using `setTimeout`) so it does not freeze the browser or UI thread.
*   **Asset Linking:** The image in the README must use a relative path so it renders correctly on GitHub/GitLab.

## Assets
*   `Assets/carol beer.jpg`

## Out of Scope
*   Randomized or variable delays (must be fixed at 5 seconds).
*   Changing the actual text content or logic of the bot's responses (only the timing is changing).
