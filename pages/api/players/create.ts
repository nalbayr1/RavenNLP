import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/prisma'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, details, photoURL } = req.body; 

    try {
      console.log("Received player creation request:", { name, details, photoURL });

     
      if (!name || !details || !photoURL) {
        console.error("Missing required fields:", { name, details, photoURL });
        return res.status(400).json({ error: 'Missing required fields' });
      }

     
      const newPlayer = await prisma.player.create({
        data: {
          name,
          photo: photoURL, 
          playerInfo: details, 
        },
      });

      console.log("Player successfully created:", newPlayer);

      res.status(201).json({ player: newPlayer });
    } catch (error) {
      console.error("Error creating player:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
