// pages/api/users/[userId]/favorites/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../../src/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (typeof userId !== 'string') {
    res.status(400).json({ error: 'Invalid userId' });
    return;
  }

  const userIdNum = parseInt(userId, 10);

  if (req.method === 'GET') {
    try {
      const favoritePlayers = await prisma.player.findMany({
        where: {
          favoritedBy: {
            some: {
              userId: userIdNum,
            },
          },
        },
      });
      res.status(200).json(favoritePlayers);
    } catch (error) {
      console.error('Error fetching favorite players:', error);
      res.status(500).json({ error: 'Error fetching favorite players' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
