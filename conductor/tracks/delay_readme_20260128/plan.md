# Plan: Delayed Response & README Overhaul

This plan covers the implementation of a global 5-second response delay for the bot and a comprehensive update to the project's README, including technical details and character context.

## Phase 1: Artificial Response Delay

The goal of this phase is to ensure every bot response is preceded by a mandatory 5-second waiting period to enhance the bureaucratic persona.

- [x] Task: Update `client/src/services/engine.ts` (or relevant state handler) to implement a 5-second delay. cd31ac3
    - [ ] Identify the core response generation/dispatch function.
    - [ ] Wrap the response logic in an asynchronous delay (e.g., `await new Promise(resolve => setTimeout(resolve, 5000))`).
- [x] Task: Ensure UI status indicators are visible during the delay. 6dc8cfc
    - [ ] Verify that states like "Checking..." or "*Audible Sigh*" are rendered immediately when the user sends a message, remaining visible for the duration of the delay.
- [ ] Task: Write/Update unit tests for the engine delay.
    - [ ] Add a test in `client/src/services/engine.test.ts` to verify that responses take at least 5000ms to resolve.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Artificial Response Delay' (Protocol in workflow.md)

## Phase 2: README Overhaul

This phase focuses on updating the project documentation to provide better context, technical explanation, and character background.

- [ ] Task: Gather technical details and setup instructions.
    - [ ] Review `tech-stack.md` and `package.json` to ensure README installation steps are accurate.
- [ ] Task: Rewrite `README.md`.
    - [ ] Add "The Character" section with a relative link to `Assets/carol beer.jpg`.
    - [ ] Add "Technical Architecture" section (Gemini, State Machine, Retro UI).
    - [ ] Add "Contributing" guidelines.
    - [ ] Add the parody "Disclaimer".
    - [ ] Update standard Intro/Installation/Usage sections.
- [ ] Task: Verify README rendering.
    - [ ] Check that the image link is valid and sections are formatted correctly in Markdown.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: README Overhaul' (Protocol in workflow.md)
