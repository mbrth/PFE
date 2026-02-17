import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Keys
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

// Initialize Gemini if key exists
const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

// GEMINI ENDPOINT (Recommended)
app.post('/api/gemini', async (req, res) => {
  if (!genAI) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not set on server.' });
  }

  try {
    const { prompt, messages, history } = req.body || {};
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Handle history if provided
    if (history && Array.isArray(history)) {
      const chat = model.startChat({ history });
      const result = await chat.sendMessage(prompt || "");
      const response = await result.response;
      return res.json({ text: response.text() });
    }

    // Single prompt
    const result = await model.generateContent(prompt || "Hello");
    const response = await result.response;
    return res.json({ text: response.text() });
  } catch (err) {
    console.error('Gemini Error:', err);
    return res.status(500).json({ error: 'Gemini request failed', details: String(err) });
  }
});

// OPENAI ENDPOINT (Legacy / Optional)
app.post('/api/openai', async (req, res) => {
  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OPENAI_API_KEY is not set on server.' });
  }

  try {
    const { prompt, messages } = req.body || {};
    let body;
    if (Array.isArray(messages) && messages.length > 0) {
      body = { model: 'gpt-3.5-turbo', messages };
    } else {
      body = {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are EcoOrient assistant.' },
          { role: 'user', content: prompt || '' }
        ]
      };
    }

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify(body)
    });

    if (!resp.ok) {
      const errText = await resp.text();
      return res.status(resp.status).json({ error: errText });
    }

    const json = await resp.json();
    const text = json?.choices?.[0]?.message?.content ?? json;
    return res.json({ text, raw: json });
  } catch (err) {
    console.error('OpenAI Error:', err);
    return res.status(500).json({ error: 'OpenAI request failed', details: String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  if (GEMINI_API_KEY) console.log('Gemini AI enabled');
  if (OPENAI_API_KEY) console.log('OpenAI enabled');
});
