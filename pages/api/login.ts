// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import { loginUser } from "../../src/auth/login";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    
    try {
      const user = await loginUser(email, password);
      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      res.status(401).json({ message: (error as Error).message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
