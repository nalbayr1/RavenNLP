import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/prisma'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { playerId, name, details, textContent } = req.body;

    try {
      console.log('Received request to call GPT API:', { playerId, name, details, textContent });
      const gptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'Provide insights based on the player details and name.' },
            {
              role: 'user',
              content: `Player: ${name}. Details: ${details}. Additional Text: ${textContent || 'N/A'}`,
            },
          ],
        }),
      });

      if (!gptResponse.ok) {
        console.error('Failed to get response from GPT API:', gptResponse.statusText);
        return res.status(500).json({ error: 'Failed to process the ChatGPT request' });
      }

      const gptData = await gptResponse.json();
      const gptResult = gptData.choices[0]?.message.content || 'No response from GPT';

      const heightMatch = gptResult.match(/Height:\s*(.*)/i);
      const ageMatch = gptResult.match(/Age:\s*(.*)/i);
      const weightMatch = gptResult.match(/Weight:\s*(.*)/i);
      const positionMatch = gptResult.match(/Position:\s*(.*)/i);

      const height = heightMatch ? heightMatch[1].trim() : 'Unavailable';
      const age = ageMatch ? ageMatch[1].trim() : 'Unavailable';
      const weight = weightMatch ? weightMatch[1].trim() : 'Unavailable';
      const position = positionMatch ? positionMatch[1].trim() : 'Unavailable';

      const updatedPlayer = await prisma.player.update({
        where: { id: Number(playerId) },
        data: { 
          playerInfo: gptResult,
          height,
          age,
          weight,
          position
        },
      });

      console.log('Player successfully updated with GPT response and stats:', updatedPlayer);

      res.status(200).json({ player: updatedPlayer });
    } catch (error) {
      console.error('Error calling GPT API or updating player:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
