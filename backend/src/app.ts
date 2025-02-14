import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.WHISPER_API_KEY,
});

// WebSocket connection handling
wss.on("connection", (ws) => {
  console.log("Client connected");
  console.log(process.env.WHISPER_API_KEY);
  let audioChunks: Buffer[] = []; // Store chunks

  ws.on("message", async (data) => {
    // let chunk: Buffer;
    // if (Buffer.isBuffer(data)) {
    //   chunk = data;
    // } else if (data instanceof ArrayBuffer) {
    //   chunk = Buffer.from(new Uint8Array(data));
    // } else {
    //   console.error("Unsupported data type received:", typeof data);
    //   return;
    // }

    // audioChunks.push(chunk);

    // // After collecting enough chunks, transcribe
    // if (audioChunks.length >= 10) {
    //   const audioBuffer = Buffer.concat(audioChunks);
    //   const filePath = path.join(__dirname, "temp_audio.webm");

    //   console.log(filePath);

    //   fs.writeFileSync(filePath, audioBuffer);

    //   const transcription = await openai.audio.transcriptions.create({
    //     file: fs.createReadStream(filePath),
    //     model: "whisper-1",
    //   });

    //   console.log("Transcription:", transcription.text);
    //   audioChunks = []; // Reset for next batch
    // }

    const filePath = path.join(__dirname, "temp_audio.webm");
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: "whisper-1",
    });
    console.log("Transcription:", transcription.text);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("WebSocket server is ready");
  console.log("Gemini API Key:", process.env.GEMINI_API_KEY ? "✓" : "✗");
  console.log("Whisper API Key:", process.env.WHISPER_API_KEY ? "✓" : "✗");
});
