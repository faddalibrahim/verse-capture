# VerseCapture

## Tools & Technologies

- React (scaffolded with vite)
- Nodejs (with Express)
- Open AI's Whisper Model (for transcription)
- Google Gemini API (for transcoding)
- WebSockets for real-time communication

## Setup Locally

### Prerequisites

- Node.js installed
- npm installed
- OpenAI API key
- Google Gemini API key

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd ai-bible-quotation-app-test
   ```

2. Install dependencies for both the client and server

   ```bash
   cd frontend && npm install
   cd backend && npm install
   ```

3. Set up environment variables
   - Create a `.env` file in the root of both frontend and backend directories.
   - Add your API keys and other environment variables
4. Run the development server for both frontend and backend

   ```bash
   npm run dev
   ```

## Live Link

[Live Link](https://verse-capture.netlify.app)

## Figma UI Reference

[UI Reference](https://www.figma.com/design/8ebbsZw1iDQVUKsCOxWgZV/Full-Stack-Dev-Test?node-id=0-1)

## Sneak Peek

![Demo](demo.gif)
