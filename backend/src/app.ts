import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { WebSocket, WebSocketServer } from "ws";

dotenv.config();

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.json());

// WebSocket connection handling
wss.on("connection", (ws: WebSocket) => {
  console.log("Client connected");

  ws.on("message", (data) => {
    // We'll handle audio chunks here
    console.log("Received audio chunk");
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
