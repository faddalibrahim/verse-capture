import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

if (!process.env.WHISPER_API_KEY) {
  throw new Error("WHISPER_API_KEY is not set in environment variables");
}

export const openai = new OpenAI({
  apiKey: process.env.WHISPER_API_KEY,
});