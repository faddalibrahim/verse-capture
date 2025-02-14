import { WebSocket } from "ws";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { openai } from "../config/openai";
import { genAI } from "../config/gemini";
import { GeminiResponse } from "../types/gemini";

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
      - reference (e.g., "John 3:16")
      - text (the actual verse text)
      If no specific verse is mentioned, suggest a relevant verse based on the theme.`;

      const result = await model.generateContent(prompt);
      const response = JSON.parse(result.response.text());

      console.log("gemini-pro:", response);

      ws.send(
        JSON.stringify({
          type: "bible_reference",
          verse: {
            reference: response.reference,
            text: response.text,
          },
        })
      );
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
