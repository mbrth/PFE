import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const OPENAI_KEY = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY || '';

if (!OPENAI_KEY) {
  console.warn('Warning: OPENAI_API_KEY is not set. Add it to server/.env');
}

app.post('/api/openai', async (req, res) => {
  try {
    const { prompt, messages } = req.body || {};

    // Prepare OpenAI request payload
    let body;
    if (Array.isArray(messages) && messages.length > 0) {
      body = {
        model: 'gpt-3.5-turbo',
        messages
      };
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
        'Authorization': `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify(body)
    });

    if (!resp.ok) {
      const errText = await resp.text();
      return res.status(resp.status).json({ error: errText });
    }

    const json = await resp.json();
    // Try to extract assistant text
    const text = json?.choices?.[0]?.message?.content ?? json;
    return res.json({ text, raw: json });
  } catch (err) {
    console.error('Proxy error', err);
    return res.status(500).json({ error: 'Proxy failed', details: String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`OpenAI proxy listening on http://localhost:${PORT}`);
});
