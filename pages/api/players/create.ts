import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/prisma'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, details, photoURL } = req.body; // Ensure photoURL is included

    try {
      console.log("Received player creation request:", { name, details, photoURL });

      // Check if player name, details, and photoURL are provided
      if (!name || !details || !photoURL) {
        console.error("Missing required fields:", { name, details, photoURL });
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Create the new player in the database
      const newPlayer = await prisma.player.create({
        data: {
          name,
          photo: photoURL, // Save the photo URL
          playerInfo: details, // Store the initial player details
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
