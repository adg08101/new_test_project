import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config({ override: true });

export async function askChatGPT(question: string): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Respondé solo con la respuesta correcta, sin explicaciones.",
        },
        {
          role: "user",
          content: question,
        },
      ],
      temperature: 0,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI error: ${response.statusText}`);
  }

  const data: any = await response.json();
  return data.choices[0].message.content.trim();
}
