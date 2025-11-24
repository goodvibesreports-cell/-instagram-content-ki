import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs-extra';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- OpenAI Client ---
if (!process.env.OPENAI_API_KEY) {
  console.warn("⚠️ WARNUNG: OPENAI_API_KEY fehlt in der Umgebung!");
}
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// --- Upload-Handling ---
const upload = multer({ dest: 'uploads/' });

// --- Speicher für Posts ---
let uploadedPosts = [];

// ----------------------------
// HEALTHCHECK
// ----------------------------
app.get('/healthz', (req, res) => {
  res.json({ status: 'OK' });
});

// ----------------------------
// JSON Upload Endpoint
// ----------------------------
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const fileContent = await fs.readFile(filePath, 'utf8');

    let json;
    try {
      json = JSON.parse(fileContent);
    } catch {
      await fs.unlink(filePath);
      return res.status(400).json({ error: 'Invalid JSON format' });
    }

    if (!Array.isArray(json)) {
      await fs.unlink(filePath);
      return res.status(400).json({ error: 'JSON must be an array of posts' });
    }

    uploadedPosts = json;
    await fs.unlink(filePath);

    return res.json({
      message: `Upload erfolgreich: ${uploadedPosts.length} Posts`,
      count: uploadedPosts.length,
    });

  } catch (err) {
    console.error("Upload Error:", err);
    return res.status(500).json({ error: 'Upload failed' });
  }
});

// ----------------------------
// Prompt Generation Endpoint
// ----------------------------
app.post('/generate-prompts', async (req, res) => {
  try {
    const { category } = req.body;

    if (!uploadedPosts.length) {
      return res.status(400).json({ error: 'No posts uploaded' });
    }

    const systemMessage = `
Du bist ein professioneller Social Media Content Creator.
Erstelle 3–5 klare, kreative und virale Instagram Reel Prompts.
`.trim();

    const userMessage = category
      ? `Kategorie: ${category}. Analysiere diese Posts und erstelle passende Prompts:\n${JSON.stringify(uploadedPosts)}`
      : `Analysiere diese Posts und erstelle 3–5 virale Prompts:\n${JSON.stringify(uploadedPosts)}`;

    const result = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userMessage }
      ],
      max_tokens: 500,
    });

    const prompts = (result.choices || [])
      .map(choice => choice?.message?.content || null)
      .filter(Boolean);

    if (!prompts.length) {
      return res.status(500).json({ error: "AI returned no prompts" });
    }

    return res.json({ prompts });

  } catch (err) {
    console.error("Prompt Generation Error:", err);
    return res.status(500).json({ error: 'Prompt generation failed' });
  }
});

// ----------------------------
// VIDEO IDEAS / SCRIPT GENERATION
// ----------------------------
app.post('/generate-video-ideas', async (req, res) => {
  try {
    const { prompts } = req.body;

    if (!Array.isArray(prompts) || prompts.length === 0) {
      return res.status(400).json({ error: "No prompts provided" });
    }

    const videoIdeas = [];

    for (const prompt of prompts) {
      const result = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
Du bist ein professioneller Instagram Reel Script Writer.
Erstelle ein vollständiges Mini-Skript inklusive:
• Handlung / Szene
• Voiceover-Text
• Wichtige Texteinblendungen
• Passende Hashtags
`.trim()
          },
          {
            role: "user",
            content: `Erstelle ein Reel-Skript basierend auf folgendem Prompt: "${prompt}"`
          }
        ],
        max_tokens: 500
      });

      const idea = result.choices?.[0]?.message?.content || "";

      videoIdeas.push({
        prompt,
        idea,
      });
    }

    return res.json({ videoIdeas });

  } catch (err) {
    console.error("Video Ideas Error:", err);
    return res.status(500).json({ error: 'Video ideas generation failed' });
  }
});

// ----------------------------
// SERVER START
// ----------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend läuft auf Port ${PORT}`);
});
