import { WebSocket } from "ws";
import { transcribeAudio } from "./transcription";

export function handleWebSocketConnection(ws: WebSocket) {
  console.log("Client connected");

  let audioChunks: Buffer[] = [];
  let transcriptionInProgress = false;
  let header: Buffer | null = null; // Store the header

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

      // Capture the header from the first chunk
      if (!header) {
        header = chunk;
      }

      audioChunks.push(chunk);

      if (!transcriptionInProgress && audioChunks.length >= 20) {
        transcriptionInProgress = true;
        const chunksToProcess = [header, ...audioChunks.slice(0, 20)]; // Prepend the header
        console.log("Processing chunks:", chunksToProcess.length);
        await transcribeAudio(ws, chunksToProcess);
        audioChunks = []; // Clear buffer for new chunks
        transcriptionInProgress = false;
      }
    } catch (error: any) {
      console.error("Processing error:", error.message);
      audioChunks = [];
      transcriptionInProgress = false;
      header = null; // Reset the header on error
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    audioChunks = [];
    transcriptionInProgress = false;
    header = null; // Reset the header on disconnect
  });
}
