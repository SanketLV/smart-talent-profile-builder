export const generateProfileData = async (input: string) => {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "anthropic-version": "2023-06-01",
      "x-api-key": process.env.CLAUDE_API_KEY!,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-3-5-sonnet-20240620",
      messages: [
        {
          role: "user",
          content: `Extract the following structured data from this resume:\n\n${input}\n\n
          Output ONLY valid JSON with these fields:
        - name
        - bio (1-2 sentences summarizing the resume)
        - categories (roles like "Director", "Photographer")
        - skills (technical skills like "Fashion Shoots")
        - style_tags (creative styles like "cinematic")
        - budget_range (e.g., "₹33546–₹66470")
        - experience_years
        - languages
        - past_credits (companies worked with)
        - endorsements (names of people who endorsed them)
        - soft_skills (array of objects with "trait" and "rating")
        - software_skills (array of objects with "tool" and "proficiency")
        - portfolio (array of objects with "title", "tags", "keywords", "mediaUrl")
        - links (array of objects with "url" and "platform")
        - tags (AI-generated hashtags like #photographer, #cinematic)

        If a field is missing in the resume, omit it or set it to an empty array/string.

        Example format:
        {
          "name": "Tyler Baker",
          "bio": "8-year experienced photographer specializing in fashion and corporate shoots.",
          "categories": ["Director", "Photographer"],
          "skills": ["Fashion Shoots", "Corporate Shoots"],
          "style_tags": ["documentary", "vibrant"],
          "experience_years": 8,
          "languages": ["Tamil", "Marathi"],
          "past_credits": ["Baxter-Peterson", "Salazar, Craig and Saunders"],
          "endorsements": ["Andre Maldonado", "Nathaniel White"],
          "soft_skills": [
            {"trait": "communication", "rating": "good"},
            {"trait": "collaboration", "rating": "excellent"}
          ],
          "software_skills": [
            {"tool": "Adobe Photoshop", "proficiency": 5},
            {"tool": "Final Cut Pro", "proficiency": 7}
          ],
          "portfolio": [
            {
              "title": "Branding Portfolio 1",
              "tags": ["vibrant", "minimal"],
              "keywords": ["mood", "natural light"],
              "mediaUrl": "https://portfolio.com/branding-1 "
            }
          ],
          "links": [
            {"url": "https://linkedin.com/in/tylerbaker ", "platform": "LinkedIn"}
          ],
          "tags": ["#photographer", "#cinematic"]
        }`,
        },
      ],
      max_tokens: 1000,
    }),
  });

  const data = await res.json();
  const rawText = data?.content?.[0]?.text;

  try {
    // Parse AI-generated JSON
    return JSON.parse(rawText);
  } catch (error) {
    console.error(error);
    console.error("Failed to parse AI response:", rawText);
    throw new Error("Invalid AI response format");
  }
};
