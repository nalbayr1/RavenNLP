// pages/api/users/[userId]/favorites/[playerId].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../../src/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, playerId } = req.query;

  if (typeof userId !== 'string' || typeof playerId !== 'string') {
    res.status(400).json({ error: 'Invalid userId or playerId' });
    return;
  }

  const userIdNum = parseInt(userId, 10);
  const playerIdNum = parseInt(playerId, 10);

  if (req.method === 'POST') {
    try {
      await prisma.favorite.create({
        data: {
          userId: userIdNum,
          playerId: playerIdNum,
        },
      });
      res.status(200).json({ message: 'Player added to favorites' });
    } catch (error) {
      console.error('Error adding player to favorites:', error);
      res.status(500).json({ error: 'Error adding player to favorites' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.favorite.delete({
        where: {
          userId_playerId: {
            userId: userIdNum,
            playerId: playerIdNum,
          },
        },
      });
      res.status(200).json({ message: 'Player removed from favorites' });
    } catch (error) {
      console.error('Error removing player from favorites:', error);
      res.status(500).json({ error: 'Error removing player from favorites' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
