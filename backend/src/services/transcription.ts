import { WebSocket } from "ws";
import fs from "fs";
import path from "path";
import { openai, genAI } from "../ai-clients";

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
      const prompt = `Given this spoken text: "${transcription.text}", identify any Bible verses mentioned or suggest a relevant verse. Return ONLY a JSON object in this exact format (no additional text, no markdown):
{
  "book": "BookName",
  "chapter": number,
  "verse": number,
  "text": "Complete verse text"
}
If no specific verse is mentioned, analyze the theme and suggest the most relevant verse.`;

      const result = await model.generateContent(prompt);
      let response;
      try {
        const cleanedResponse = result.response
          .text()
          .replace(/```json\n|\n```/g, "")
          .trim();
        console.log("Cleaned Gemini response:", cleanedResponse);
        response = JSON.parse(cleanedResponse);

        ws.send(
          JSON.stringify({
            type: "bible_reference",
            verse: response,
          })
        );
      } catch (parseError) {
        console.error("Parse error:", parseError);
        throw parseError;
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
    // if (filePath && fs.existsSync(filePath)) {
    //   fs.unlink(filePath, (err) => {
    //     if (err) console.error("Error deleting file:", err);
    //   });
    // }
  }
}
