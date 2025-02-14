import { WebSocket } from "ws";
import fs from "fs";
import path from "path";
import { openai, genAI } from "../ai-clients";
import { findVerseByReference, searchVersesByText } from "./verses";

export interface GeminiResponse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export async function transcribeAudio(ws: WebSocket, audioChunks: Buffer[]) {
  let filePath = "";
  try {
    const audioBuffer = Buffer.concat(audioChunks);
    filePath = path.join(__dirname, `../temp_audio_${Date.now()}.webm`);
    fs.writeFileSync(filePath, audioBuffer);

    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: "whisper-1",
      response_format: "json",
      language: "en",
      temperature: 0,
    });

    if (transcription.text) {
      console.log("Transcription:", transcription.text);

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Given this spoken text: "${transcription.text}", identify any Bible verses mentioned. Return a JSON response with:
      - book (e.g., "John")
      - chapter (as number)
      - verse (as number)
      - text (the actual verse text)
      If no specific verse is mentioned, analyze the theme and suggest a relevant verse.`;

      const result = await model.generateContent(prompt);
      const response = JSON.parse(result.response.text());

      console.log("gemini-pro:", response);

      // Try to find the exact verse in our database
      const verse = await findVerseByReference(
        response.book,
        response.chapter,
        response.verse
      );

      // If no exact verse found, try searching by theme
      const verseData = verse || (await searchVersesByText(transcription.text))[0];

      if (verseData) {
        ws.send(
          JSON.stringify({
            type: "bible_reference",
            verse: verseData
          })
        );
      }
    }
  } catch (error: any) {
    console.error("Error:", error.message);
    ws.send(
      JSON.stringify({
        type: "error",
        message: error.message,
      })
    );
  } finally {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }
  }
}
