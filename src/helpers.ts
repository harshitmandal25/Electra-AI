import { apiKey } from './constants';

export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export const callGemini = async (prompt: string, history: any[] = [], language: string = "English") => {
  const systemPrompt = `You are ElectraAI, a highly advanced, futuristic, and helpful AI democracy assistant. 
  Your goal is to explain election concepts, voting processes, and civic duties simply and interactively. 
  Keep answers concise (max 3-4 sentences), encouraging, and strictly neutral. 
  Simplify complex terms automatically. 
  ALWAYS respond in this language: ${language}.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  
  const formattedHistory = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  const payload = {
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents: [...formattedHistory, { role: "user", parts: [{ text: prompt }] }],
  };

  let delay = 1000;
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble processing that right now.";
    } catch (error) {
      if (attempt === 5) return "ElectraAI System Error: Unable to connect to the democracy database. Please try again later.";
      await sleep(delay);
      delay *= 2;
    }
  }
};
