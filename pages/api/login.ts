// pages/api/login.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { loginUser } from '../../src/auth/login';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const user = await loginUser(email, password);

      // Send back the userId
      res.status(200).json({ message: 'Login successful', userId: user.id });
    } catch (error) {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
