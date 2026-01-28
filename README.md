# Computer Says No Bot (CSN Engine v1.0)

![Carol Beer](./Assets/carol%20beer.jpg)

## Overview
**Computer Says No Bot** is a humorous, persona-driven chat application inspired by the iconic "Little Britain" character, Carol Beer. It is designed to be an intentionally unhelpful, bureaucratic, and dismissive assistant that prioritizes its own eccentricities and "system rules" over actually helping the user.

[**🚀 View Live Demo**](https://danichese.github.io/CSN-Engine/)

While the project is a parody, it serves as a technical demonstration of **Hybrid Chat Architecture**—a concept where fixed, state-machine-driven responses are combined with LLM capabilities. This approach allows for strict persona enforcement and token efficiency, with future expansion plans to use LLMs only for handling complex out-of-scope requests while maintaining the "hard no" core logic.

## The Character: Carol Beer
Carol Beer is the quintessential unhelpful clerk. Whether she's working in a travel agency, a hospital, or a bank, her response is almost always a blunt "Computer says no," followed by a series of stalling tactics:
1. **The Stare:** Ignoring the user while staring blankly.
2. **The "Check":** Pretending to tap keys while giving the user false hope.
3. **The Physical Response:** An annoyed, loud cough or an audible sigh.
4. **The Diversion:** Asking nonsensical bureaucratic questions or complaining about office gossip (like Janet's tuna sandwich).

## Key Features
- **Artificial Bureaucratic Delay:** Every response is preceded by a mandatory 5-second delay to ensure the user feels the weight of Carol's indifference.
- **Dynamic Status Indicators:** During the delay, the UI communicates Carol's current state (e.g., "*Sighing audibly*", "*Preparing a big cough*").
- **State-Locked Unhelpfulness:** A progressive refusal sequence that eventually loops into an infinite state of bureaucratic stalling.
- **Retro Windows 95 UI:** A custom-styled "Win95" environment featuring desktop icons, a classic taskbar, and a teal background.
- **Hybrid Intent (Future):** Built with the foundation to bridge deterministic state machines with LLM guardrails.

## Technical Architecture
- **Frontend:** React (TypeScript) with Tailwind CSS.
- **State Machine:** A custom `RefusalEngine` that manages the transition between unhelpful states and enforces the refusal sequence.
- **AI Integration:** Google Gemini API (implemented for persona-driven text generation, currently operating in a controlled Demo Mode).
- **Styling:** Custom "retro-outset" borders and classic Microsoft system aesthetics.

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Dan/CSN-Engine.git
   cd CSN-Engine
   ```

2. **Install dependencies:**
   ```bash
   # Root directory
   npm install
   # Client directory
   cd client
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

## Contributing
We welcome contributions that add more unhelpfulness to the project!
- **New States:** Add new levels of refusal to the `RefusalEngine`.
- **UI Flairs:** Contribute more Win95-era pixel art or components.
- **Bureaucracy:** Propose new nonsense forms (like Form A12) for Carol to request.

## Disclaimer
This is a **parody application**. It is not a functional AI assistant and is designed specifically to be unhelpful. No actual data is processed for any purpose other than comedy and technical demonstration.

---
*Computer says no.*