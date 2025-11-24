import express from 'express';
import multer from 'multer';
import fs from 'fs-extra';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Pfad zur Datei, die hochgeladene Posts speichert
const uploadedPostsFile = './uploadedPosts.json';

// Multer Setup (für Datei-Uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// OpenAI Setup (aktueller default Export)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Healthcheck Endpoint
app.get('/healthz', (req, res) => {
  res.json({ status: 'ok' });
});

// Upload Endpoint (nur JSON)
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const content = req.file.buffer.toString('utf-8');
    let parsed;
    if (req.file.mimetype === 'application/json') {
      parsed = JSON.parse(content);
    } else {
      return res.status(400).json({ error: 'Only JSON files supported for now' });
    }

    // In uploadedPosts.json speichern
    await fs.writeJson(uploadedPostsFile, parsed);
    res.json({ message: 'File uploaded successfully', count: parsed.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Generate Endpoint (OpenAI)
app.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'No prompt provided' });

    // Hochgeladene Posts laden
    const uploadedPosts = await fs.readJson(uploadedPostsFile).catch(() => []);
    if (!uploadedPosts.length) return res.status(400).json({ error: 'No uploaded posts' });

    // OpenAI Chat Completion
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a social media content generator." },
        { role: "user", content: `Based on these posts: ${JSON.stringify(uploadedPosts)}, create content for: ${prompt}` }
      ]
    });

    res.json({ result: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Generation failed' });
  }
});

// Server starten
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
