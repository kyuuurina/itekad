import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), devOpenAIProxy()],
});

function devOpenAIProxy() {
  return {
    name: "dev-openai-proxy",
    configureServer(server) {
      server.middlewares.use("/api/openai", (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end("Method not allowed");
          return;
        }

        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", async () => {
          try {
            const {
              prompt,
              temperature = 0.1,
              maxTokens = 300,
            } = JSON.parse(body || "{}");

            if (!prompt || typeof prompt !== "string") {
              res.statusCode = 400;
              res.end("Missing prompt");
              return;
            }

            const apiKey = process.env.OPENAI_API_KEY;
            if (!apiKey) {
              res.statusCode = 500;
              res.end("Missing OPENAI_API_KEY in dev");
              return;
            }

            const upstream = await fetch(
              "https://api.openai.com/v1/chat/completions",
              {
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
              }
            );

            const text = await upstream.text();
            if (!upstream.ok) {
              res.statusCode = upstream.status;
              res.end(text);
              return;
            }

            const data = JSON.parse(text);
            const content =
              data?.choices?.[0]?.message?.content?.trim?.() || "";
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ content }));
          } catch (e) {
            res.statusCode = 500;
            res.end((e && e.message) || "Server error");
          }
        });
      });
    },
  };
}
