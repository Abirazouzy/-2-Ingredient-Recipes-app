import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Endpoint for AI Chef Rabbit custom 2-ingredient recipe creation
app.post('/api/recipe-ai/generate', async (req, res) => {
  try {
    const { ingredient1, ingredient2, dietary, notes } = req.body;

    if (!ingredient1 || !ingredient2) {
      res.status(400).json({ error: 'Please specify two ingredients!' });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      res.status(503).json({
        error: 'No Gemini API key detected. Chef Pip will use offline culinary knowledge.',
      });
      return;
    }

    const ai = getGeminiClient();

    const systemPrompt = `You are Chef Pip, an adorable, enthusiastic master bunny chef who specializes in quick, delicious 2-ingredient recipes that take STRICTLY under 10 minutes from start to finish.
Your tone is cozy, encouraging, and culinary-sharp.
RULES:
1. The recipe MUST use STRICTLY the two core ingredients provided (or minimal pantry freebies like a pinch of salt/cinnamon/water/cooking spray if strictly needed, labeled as freebies).
2. The total time MUST be 10 minutes or less (prep + cook).
3. Provide realistic, delicious cooking technique (microwave, stovetop skillet, air-fryer, toaster, or chilled/blender).
4. Return structured JSON matching the requested schema.`;

    const prompt = `Create a delicious 2-ingredient recipe made in UNDER 10 MINUTES using:
Ingredient 1: "${ingredient1}"
Ingredient 2: "${ingredient2}"
${dietary ? `Dietary preference: ${dietary}` : ''}
${notes ? `User request: ${notes}` : ''}
Make it practical, delicious, and achievable in <10 minutes!`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: 'Catchy, mouthwatering recipe name' },
            totalTimeMinutes: { type: Type.INTEGER, description: 'Total time in minutes (1 to 10)' },
            prepTimeMinutes: { type: Type.INTEGER, description: 'Prep time in minutes' },
            cookTimeMinutes: { type: Type.INTEGER, description: 'Cook time in minutes' },
            category: { type: Type.STRING, description: 'Sweet, Savory, Breakfast, Snack, or Drink' },
            method: { type: Type.STRING, description: 'e.g. Microwave, Skillet, Air Fryer, Blender, No-Cook' },
            ingredient1Details: { type: Type.STRING, description: 'Exact measurement and description of ingredient 1' },
            ingredient2Details: { type: Type.STRING, description: 'Exact measurement and description of ingredient 2' },
            optionalPantryPinch: { type: Type.STRING, description: 'Optional pinch of salt/cinnamon/pepper if any' },
            steps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Step-by-step instructions (3-5 concise steps)'
            },
            bunnyChefTip: { type: Type.STRING, description: 'A cute, insightful pro tip from Chef Pip the rabbit' },
            flavorProfile: { type: Type.STRING, description: 'e.g., Crispy & Cheesy, Velvety & Sweet' },
            nutritionEstimate: {
              type: Type.OBJECT,
              properties: {
                calories: { type: Type.STRING, description: 'Estimated calories e.g. ~180 kcal' },
                highlight: { type: Type.STRING, description: 'e.g. High Protein, Gluten-Free, Rich & Creamy' }
              }
            }
          },
          required: ['title', 'totalTimeMinutes', 'category', 'method', 'ingredient1Details', 'ingredient2Details', 'steps', 'bunnyChefTip']
        }
      }
    });

    const text = response.text;
    if (!text) {
      res.status(500).json({ error: 'Chef Pip could not whip up a recipe right now.' });
      return;
    }

    const recipe = JSON.parse(text);
    res.json({ recipe });
  } catch (err: any) {
    console.error('Error generating 2-ingredient recipe:', err);
    res.status(500).json({
      error: err.message || 'Chef Pip had a hiccup in the kitchen.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Pip's 2-Ingredient Kitchen running on http://localhost:${PORT}`);
  });
}

startServer();
