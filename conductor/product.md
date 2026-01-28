# Initial Concept

I would like to build a chatgpt clone but just a single chat window. The product is called Computer Says No Bot. Its broadly based on the Little Britain Sketch where the unhelpful assistant when asked for a request will say in a manor of ways, the computer says no, if they persist then the assistant will do a big cough. I want to first of all get this running and see if there is anything we can do to enforce guardrails so the first answer will always be some digression then it should respond with computer says no. I also want to see if a mechanic can be created to mimimise token usage. I can see it needing a front end as well as server to process requests and DB to store.

# Product Guide: Computer Says No Bot

## Overview
A humorous, persona-driven chat application based on the iconic "Little Britain" sketch. The "Computer Says No Bot" acts as an intentionally unhelpful and bureaucratic assistant that prioritizes its own eccentricities over user requests.

## Target Audience
- **Primary:** Hiring managers and developers (showcasing technical proficiency with modern AI tools and persona enforcement).
- **Secondary:** Fans of British comedy seeking a nostalgic and interactive experience.

## Key Features
- **Strict Persona Enforcement (Guardrails):**
    - The assistant follows a specific sequence of unhelpfulness for persistent requests:
        1. **Initial Refusal:** A blunt "Computer says no."
        2. **The "Check":** "Rigggggghtt, I'm checking... it says no."
        3. **The Physical Response:** A "Big Cough" to show annoyance.
        4. **The False Hope:** A big sigh followed by a period where the bot appears to be actually helping or processing the request, only to eventually return to "Computer says no."
    - Irrelevant personal anecdotes and gossip are woven into the responses to further detour from the user's goal.
- **Token Efficiency:**
    - Uses "Persona-based response limiting," where the assistant's dismissive nature naturally minimizes token consumption by keeping responses concise and avoiding helpful explanations.
- **Retro Bureaucratic UI:**
    - A 1990s-era office aesthetic featuring classic gray windows, pixelated UI elements, and system fonts to match the unhelpful clerk persona.

## Technical Goals
- Demonstrate successful integration of LLM guardrails for consistent persona maintenance through a stateful interaction loop.
- **Hybrid Chat Architecture:** Showcase a blend of deterministic state-machine responses for core persona enforcement with LLM capabilities for complex/out-of-scope handling.
- Implement a streamlined "Lite Server" architecture (Frontend + Node.js Backend) for rapid MVP deployment.
- Showcase cost-effective AI interaction through strategic response design.