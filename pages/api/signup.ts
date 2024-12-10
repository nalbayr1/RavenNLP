// pages/api/signup.ts
import { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "../../src/auth/login";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password, name } = req.body;
    
    try {
      const user = await createUser(email, password, name);
      res.status(200).json({ message: "User created successfully", user });
    } catch (error: any) { // Cast the error as 'any' or 'Error'
      res.status(500).json({ message: error?.message || "Something went wrong" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
