export const generateProfileData = async (input: string) => {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "anthropic-version": "2023-06-01",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-3-5-sonnet-20240620",
      messages: [{ role: "user", content: `Analyze this resume:\n\n${input}` }],
      max_tokens: 1000,
    }),
  });

  const data = await res.json();
  return data?.content?.[0]?.text;
};
