import { WebSocketServer } from "ws";
import express from "express";
import http from "http";
import dotenv from "dotenv";
import fetch from "node-fetch";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = 8080;
const OPENROUTER_API_KEY = process.env.VITE_OPEN_ROUTER_API_KEY;
const API_URL =
  process.env.VITE_OPENROUTER_API_URL ||
  "https://openrouter.ai/api/v1/chat/completions";
const FRONTEND_URL = process.env.VITE_FRONTEND_URL || "http://localhost:5173";
const AI_MODEL =
  process.env.VITE_AI_MODEL || "tngtech/deepseek-r1t2-chimera:free";

if (!OPENROUTER_API_KEY) {
  console.error("VITE_OPEN_ROUTER_API_KEY is missing in .env");
  process.exit(1);
}

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", async (message) => {
    try {
      const { text, history } = JSON.parse(message);
      console.log("Received message:", text);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": FRONTEND_URL,
          "X-Title": "AI Chatbot",
        },
        body: JSON.stringify({
          model: AI_MODEL,
          messages: [...history, { role: "user", content: text }],
          stream: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        ws.send(
          JSON.stringify({
            type: "error",
            message: errorData.error?.message || "API request failed",
          }),
        );
        return;
      }

      ws.send(JSON.stringify({ type: "start" }));

      const reader = response.body;
      reader.on("data", (chunk) => {
        const lines = chunk.toString().split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") {
              ws.send(JSON.stringify({ type: "end" }));
              continue;
            }
            try {
              const json = JSON.parse(data);
              const content = json.choices[0]?.delta?.content || "";
              if (content) {
                ws.send(JSON.stringify({ type: "chunk", content }));
              }
            } catch (e) {
              // Ignore parse errors from incomplete chunks
            }
          }
        }
      });

      reader.on("end", () => {
        // ws.send(JSON.stringify({ type: 'end' }));
      });
    } catch (error) {
      console.error("Server Error:", error);
      ws.send(
        JSON.stringify({ type: "error", message: "Internal server error" }),
      );
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`WebSocket server is running on ws://localhost:${PORT}`);
});
