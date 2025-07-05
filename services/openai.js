const { OpenAI } = require('openai');

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate a remix using LLM
 * @param {string} originalName - Original entity name
 * @param {string} originalDescription - Original entity description
 * @param {string} derivativeDescription - Derivative description
 * @returns {Promise<{name: string, description: string}>}
 */
async function generateRemix(originalName, originalDescription, derivativeDescription) {
  const prompt = `
Original Entity Name: ${originalName}
Original Entity Description: ${originalDescription}
Derivative Description: ${derivativeDescription}

Based on the information above, create a completely new entity. Combine characteristics of the original entity with the derivative description to create an original result.
Never copy the original description directly.
Description should be under 210 bytes.

Response Format:
Entity Name: [New Name]
Entity Description: [New Description]
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
  });

  const content = response.choices[0].message.content;
  console.log(`Remix result: ${content}`);
  
  // Parse response
  const nameMatch = content.match(/Entity Name: (.*)/);
  const descriptionMatch = content.match(/Entity Description: ([\s\S]*)/);
  
  const name = nameMatch ? nameMatch[1].trim() : "Unknown Entity";
  const description = descriptionMatch ? descriptionMatch[1].trim() : "No description available";
  
  return { name, description };
}

/**
 * Generate battle results using LLM
 * @param {string} entity1Description - First entity description
 * @param {string} entity2Description - Second entity description
 * @returns {Promise<{winner: number, battleDescription: string}>}
 */
async function generateBattle(entity1Name, entity1Description, entity2Name, entity2Description) {
  const prompt = `
First Entity Name: ${entity1Name}
First Entity Description: ${entity1Description}
Second Entity Name: ${entity2Name}
Second Entity Description: ${entity2Description}

What would happen if these two entities battled? Consider the characteristics and abilities of each entity to determine the battle outcome.
There must be a winner (no draws allowed).
Describe the battle in 2-3 concise lines.

Response Format:
Winner: [1 or 2]
Battle Description: [2-3 lines describing the battle]
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const content = response.choices[0].message.content;
  console.log(`Battle result: ${content}`);
  
  // Parse response
  const winnerMatch = content.match(/Winner: (\d+)/);
  const battleDescriptionMatch = content.match(/Battle Description: ([\s\S]*)/);
  
  // Winner is 0 (first entity) or 1 (second entity)
  const winner = winnerMatch && winnerMatch[1] === "1" ? 0 : 1;
  const battleDescription = battleDescriptionMatch ? battleDescriptionMatch[1].trim() : "No battle description available";
  
  return { winner, battleDescription };
}

module.exports = {
  generateRemix,
  generateBattle
}; 