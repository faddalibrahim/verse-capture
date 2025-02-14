# VerseCapture

real-time sermon companion that listens to live sermons, transcribes speech, detects Bible references, and instantly displays the corresponding scripture

## Tools & Technologies

- [x] React (scaffolded with vite)
- [x] Nodejs (with Express)
- [x] Open AI's Whisper Model (for transcription)
- [x] Google Gemini API (for transcoding)
- [x] WebSockets for real-time communication
- [x] PostgreSQL for database management

## Setup Locally

### Prerequisites

- [x] Node.js installed
- [x] PostgreSQL installed & Setup
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

4. Setup the database

   - Create a PostgreSQL database (verse_capture or whatever you wish)
   - Populate the database with bible data

   Bible data soured from [Bible Translations](https://github.com/jadenzaleski/BibleTranslations)

5. Run the development server for both frontend and backend

   ```bash
   npm run dev
   ```

## Live Link

[Live Link](https://verse-capture.netlify.app)

## Figma UI Reference

[UI Reference](https://www.figma.com/design/8ebbsZw1iDQVUKsCOxWgZV/Full-Stack-Dev-Test?node-id=0-1)

## Sneak Peek

![Demo](demo.gif)
