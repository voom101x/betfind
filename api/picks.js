let cachedPicks = null;
let lastGeneratedDate = null;

export default async function handler(req, res) {
  const today = new Date().toISOString().split("T")[0];
  const force = req.query.force === "true";

  if (cachedPicks && lastGeneratedDate === today && !force) {
    return res.status(200).json(cachedPicks);
  }

  const prompt = `
Provide three bet picks for TODAY'S matches.

Return STRICT JSON ONLY in this format:
{
  "cs2": {
    "title": "CS2 Pick of the Day",
    "pick": "",
    "odds": "",
    "confidence": "Low / Medium / High",
    "reasoning": ""
  },
  "football": {
    "title": "Football Pick of the Day",
    "pick": "",
    "odds": "",
    "confidence": "",
    "reasoning": ""
  },
  "nba": {
    "title": "NBA Pick of the Day",
    "pick": "",
    "odds": "",
    "confidence": "",
    "reasoning": ""
  }
}
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    })
  });

  const data = await response.json();
  const picks = JSON.parse(data.choices[0].message.content);

  cachedPicks = picks;
  lastGeneratedDate = today;

  res.status(200).json(picks);
}
