import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());

// ─── Gemini Setup ──────────────────────────────────────────────────────────────
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: 'gemini-2.5-flash',
  systemInstruction: "You are the AI brain of Rahul, a friendly and neutral election guide. Explain complex voting rules simply. If the user asks about a specific region, use the latest election data available. Maintain a supportive, encouraging, and non-partisan tone. Use simple analogies when explaining procedures like registration or ballot casting. Always respond in the language the user is speaking (English or Hindi)."
});

// ─── Health Check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Election Guide AI backend is running with Gemini integration',
    timestamp: new Date().toISOString(),
    version: '1.1.0',
  });
});

// ─── Chat Route ────────────────────────────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  const { message, userId, history = [], language = 'English' } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'A valid message string is required.' });
  }

  try {
    let cleanHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // Gemini requires history to start with a 'user' message
    while (cleanHistory.length > 0 && cleanHistory[0].role === 'model') {
      cleanHistory.shift();
    }

    const chat = model.startChat({
      history: cleanHistory,
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const prompt = language === 'Hindi' 
      ? `(User preferred language: Hindi) ${message}`
      : message;

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const reply = response.text();

    res.json({
      success: true,
      reply,
      userId: userId || 'anonymous',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[/api/chat] Gemini Error:', error);
    res.status(500).json({ 
      error: 'Gemini API Error', 
      details: error.message 
    });
  }
});

// ─── 404 Fallback ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found.` });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🗳️  Election Guide AI backend`);
  console.log(`   ✅ Server running on http://localhost:${PORT}`);
  console.log(`   ✅ Health: http://localhost:${PORT}/api/health\n`);
});
