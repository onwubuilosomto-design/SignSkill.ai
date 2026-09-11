import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Handle webcam video and image payloads up to 50MB
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // API health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Core Gemini sign language evaluation endpoint (supports video and image)
  app.post("/api/evaluate-sign", async (req, res) => {
    try {
      const { videoBase64, imageBase64, targetWord, mimeType, keyframeBase64 } = req.body;
      const rawMedia = videoBase64 || imageBase64;

      if (!rawMedia || !targetWord) {
        return res.status(400).json({
          is_correct: false,
          score: 0,
          feedback: "Missing sign video/image or target word."
        });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({
          is_correct: false,
          score: 0,
          feedback: "❌ Error: API Key missing from configuration environment variables."
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const isVideo = Boolean(videoBase64);
      const cleanBase64 = rawMedia.replace(/^data:[a-zA-Z0-9+\/-]+;base64,/, "");
      const effectiveMimeType = mimeType || (isVideo ? "video/webm" : "image/jpeg");

      const prompt = isVideo
        ? `You are an expert American Sign Language (ASL) coach and evaluator in Duolingo SignLingo.
Analyze this short 1-3 second user video recording of someone attempting to perform the ASL sign for '${targetWord}'.
Evaluate their dynamic hand motion trajectory, finger formation, orientation, and transition from start to finish.
Be encouraging, accurate, and fair. If they succeeded, praise their specific movement. If they missed an element, give an actionable 1-sentence tip on what to adjust (such as wrist tilt, hand shape, or motion direction).`
        : `You are the Duolingo AI Sign Language grading coach.
Analyze this snapshot frame of a user attempting to sign the word '${targetWord}' in American Sign Language (ASL).
Evaluate their hand shape, layout orientation, and finger positioning accurately.
Be encouraging but distinct. If they fail, keep the feedback tip extremely brief and helpful.`;

      let parsedResult: any = null;

      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: [
            {
              inlineData: {
                mimeType: effectiveMimeType,
                data: cleanBase64,
              },
            },
            {
              text: prompt,
            },
          ],
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                is_correct: {
                  type: Type.BOOLEAN,
                  description: "Whether the user's hand gesture and motion reasonably matches the ASL sign for the target word.",
                },
                score: {
                  type: Type.INTEGER,
                  description: "Accuracy score between 0 and 100.",
                },
                feedback: {
                  type: Type.STRING,
                  description: "Encouraging and constructive coaching tip on motion, finger/palm alignment or praising perfect form.",
                },
              },
              required: ["is_correct", "score", "feedback"],
            },
            temperature: 0.2,
          },
        });

        const text = response.text?.trim() || "{}";
        parsedResult = JSON.parse(text);
      } catch (videoErr: any) {
        console.warn("Video evaluation direct attempt warning:", videoErr?.message);
        // Fallback: If video container failed and a keyframe was provided, evaluate the keyframe
        if (keyframeBase64) {
          const cleanKeyframe = keyframeBase64.replace(/^data:image\/[a-zA-Z0-9+-]+;base64,/, "");
          const fallbackResponse = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: [
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: cleanKeyframe,
                },
              },
              {
                text: `You are the Duolingo SignLingo AI coach. Analyze this captured frame from a user's sign attempt for '${targetWord}'. Evaluate their hand shape and finger positioning. Keep feedback short, encouraging and actionable.`,
              },
            ],
            config: {
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  is_correct: { type: Type.BOOLEAN },
                  score: { type: Type.INTEGER },
                  feedback: { type: Type.STRING },
                },
                required: ["is_correct", "score", "feedback"],
              },
            },
          });
          parsedResult = JSON.parse(fallbackResponse.text?.trim() || "{}");
        } else {
          throw videoErr;
        }
      }

      return res.json({
        is_correct: Boolean(parsedResult?.is_correct),
        score: typeof parsedResult?.score === "number" ? Math.max(0, Math.min(100, parsedResult.score)) : (parsedResult?.is_correct ? 90 : 35),
        feedback: parsedResult?.feedback || "Great effort! Keep practicing your hand motion.",
      });
    } catch (err: any) {
      console.error("Evaluation error:", err);
      return res.json({
        is_correct: false,
        score: 0,
        feedback: `API Evaluation failure: ${err?.message || "Unknown error"}`
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
