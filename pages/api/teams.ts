import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const teams = await prisma.team.findMany();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
}
