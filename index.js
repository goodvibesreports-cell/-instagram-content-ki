import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs-extra';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// OpenAI Setup
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

// In-Memory Storage
let uploadedPosts = [];

// Healthcheck
app.get('/healthz', (req, res) => res.send('OK'));

// Upload Endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  if (!req.file.originalname.endsWith('.json')) return res.status(400).json({ error: 'Only JSON files supported' });

  try {
    const data = await fs.readFile(req.file.path, 'utf-8');
    uploadedPosts = JSON.parse(data);
    await fs.remove(req.file.path);
    res.json({ message: `Upload erfolgreich: ${uploadedPosts.length} Posts` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Posts abrufen
app.get('/posts', (req, res) =>
