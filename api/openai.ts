import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { prompt, temperature = 0.1, maxTokens = 300 } = req.body || {};
    if (!prompt || typeof prompt !== "string") {
      res.status(400).json({ error: "Missing prompt" });
      return;
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: "Server missing OPENAI_API_KEY" });
      return;
    }

    const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: maxTokens,
        temperature,
      }),
    });

    const text = await upstream.text();
    if (!upstream.ok) {
      try {
        const err = JSON.parse(text);
        res.status(upstream.status).json({ error: err.error?.message || text });
      } catch {
        res.status(upstream.status).send(text);
      }
      return;
    }

    const data = JSON.parse(text);
    const content = data?.choices?.[0]?.message?.content?.trim?.() || "";
    res.status(200).json({ content });
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
}
