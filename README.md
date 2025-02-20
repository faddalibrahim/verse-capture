# VerseCatch

![Banner](vc-banner.jpg)

real-time sermon companion that listens to live sermons, transcribes speech, detects Bible & Quran references, and instantly displays the corresponding scripture

## Tools & Technologies

- [x] React (scaffolded with vite)
- [x] Nodejs (with Express)
- [x] Open AI's Whisper Model (for transcription)
- [x] Google Gemini API (for verse recognition)
- [x] WebSockets for real-time communication
- [x] Tailwind CSS

## Setup Locally

### Prerequisites

- [x] Node.js installed
- [x] OpenAI API key
- [x] Google Gemini API key

1. Clone the repository

   ```bash
   git clone https://github.com/faddalibrahim/verse-capture.git
   cd verse-capture
   ```

2. Install dependencies for both the client and server

   ```bash
   cd frontend && npm install
   cd backend && npm install
   ```

3. Set up environment variables

   - Create a `.env` file in the root of both frontend and backend directories.
   - Add your API keys and other environment variables (check `.env.example` files)

4. Run the development server for both frontend and backend

   ```bash
   npm run dev
   ```

## Live Link

[Live Link](https://verse-capture.netlify.app) (backend server may not be active -- its a free instance)

## Figma UI Reference

[UI Reference](https://www.figma.com/design/8ebbsZw1iDQVUKsCOxWgZV/Full-Stack-Dev-Test?node-id=0-1)

## Sneak Peek

![Demo](demo.gif)
