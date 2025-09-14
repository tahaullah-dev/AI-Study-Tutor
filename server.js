// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

// Allow requests only from your frontend (Netlify site)
app.use(cors({origin: 'https://ai-study-tutor.netlify.app'}));

// ✅ Use environment variable instead of hardcoding
const API_KEY = process.env.API_KEY;
if (!API_KEY) console.warn("⚠️ API_KEY not set in environment");

app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`, // secure
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat-v3.1:free',
        messages: [
          { role: 'system', content: 'You are an AI study tutor.' },
          { role: 'user', content: prompt }
        ]
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: { message: err.message } });
  }
});

// Render gives you PORT env var, use it
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`✅ Server running on port ${port}`));
