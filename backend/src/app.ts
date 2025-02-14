import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { handleWebSocketConnection } from "./services/websocket";

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());

wss.on("connection", handleWebSocketConnection);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("WebSocket server is ready");
});
