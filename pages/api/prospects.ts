import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../src/prisma'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const prospects = await prisma.prospect.findMany();
      res.status(200).json(prospects);
    } catch (error) {
      console.error('Error fetching prospects:', error);
      res.status(500).json({ error: 'Failed to fetch prospects' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
