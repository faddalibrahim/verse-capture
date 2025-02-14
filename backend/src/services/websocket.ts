import { WebSocket } from "ws";
import { transcribeAudio } from "./transcription";

export function handleWebSocketConnection(ws: WebSocket) {
  console.log("Client connected");

  let audioChunks: Buffer[] = [];
  let transcriptionInProgress = false;

  ws.on("message", async (data) => {
    try {
      let chunk: Buffer;
      if (Buffer.isBuffer(data)) {
        chunk = data;
      } else if (data instanceof ArrayBuffer) {
        chunk = Buffer.from(new Uint8Array(data));
      } else {
        console.error("Unsupported data type received:", typeof data);
        return;
      }

      audioChunks.push(chunk);

      if (!transcriptionInProgress && audioChunks.length >= 10) {
        transcriptionInProgress = true;
        await transcribeAudio(ws, audioChunks);
        transcriptionInProgress = false;
        audioChunks = [];
      }
    } catch (error: any) {
      console.error("Processing error:", error.message);
      audioChunks = [];
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
}