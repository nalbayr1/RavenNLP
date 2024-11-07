import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../src/prisma'; // Adjust the path based on your setup

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const players = await prisma.player.findMany(); // Fetch all players from the database
      res.status(200).json(players); // Send players data as JSON
    } catch (error) {
      console.error('Error fetching players:', error);
      res.status(500).json({ error: 'Failed to fetch players' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
