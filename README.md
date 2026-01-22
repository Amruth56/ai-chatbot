# Real-Time AI Chatbot with Streaming

A robust, full-stack AI chatbot application featuring real-time streaming responses over WebSockets. Built with React, TypeScript, and Node.js, this project demonstrates a smooth, interactive chat experience with a "typewriter" effect for AI responses.

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 2. Environment Variables
Create a `.env` file in the root directory based on the `.env.example` file:
```env
VITE_OPEN_ROUTER_API_KEY=your_api_key_here
VITE_OPENROUTER_API_URL="https://openrouter.ai/api/v1/chat/completions"
VITE_FRONTEND_URL="http://localhost:5173"
VITE_AI_MODEL="tngtech/deepseek-r1t2-chimera:free"
VITE_WS_URL="ws://localhost:8080"
```

### 3. Installation
```bash
npm install
```

### 4. Commands to Run the Project
To run both the frontend and the WebSocket server concurrently:
```bash
npm start
```
- **Frontend URL**: [http://localhost:5173](http://localhost:5173)
- **WebSocket Server**: `ws://localhost:8080`

---

## 🛠️ Tech Stack & Libraries
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Backend**: Node.js, Express, `ws` (WebSocket)
- **AI Integration**: OpenRouter API
- **Key Libraries**: 
  - `react-markdown` (Rich text rendering)
  - `uuid` (Unique message tracking)
  - `concurrently` (Running dual servers)
  - `dotenv` (Environment management)

---

## ✅ Features Implemented

### Core Requirements
- [x] **WebSocket Communication**: Real-time bi-directional messaging.
- [x] **Streaming AI Responses**: Token-by-token display for a natural feel.
- [x] **Connection Management**: Automatic reconnection logic and live status indicator.
- [x] **Chat UI**: Responsive design with auto-scroll and distinct message bubbles.
- [x] **State Management**: Handling loading, error, and connection states.

### Bonus Features
- [x] **Message Persistence**: History saved via `localStorage`.
- [x] **Dark/Light Mode**: Full theme toggle support.
- [x] **Markdown Support**: Renders headers, lists, and code blocks.
- [x] **Copy to Clipboard**: Quick message copying with visual feedback.
- [x] **Clear Chat**: Functionality to reset the conversation.
- [x] **Typing Indicator**: Visual feedback while the AI prepares its response.
- [x] **Character Counter**: Real-time limit indicator for user input.

---

## ⏱️ Time Spent on Assignment
Approximately **1.5 days** covering architectural design, WebSocket implementation, styling, and polishing bonus features.

---

## 🎥 Video Walkthrough (Demo)
[Click here to watch the demo video]
1. https://www.loom.com/share/362a8a811f9b4f558517a09997966936
2. https://www.loom.com/share/61873bd9ab0b48a48d06ca5554e72802
