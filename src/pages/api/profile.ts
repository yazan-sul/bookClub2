
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id } = req.query;

  if (!user_id || typeof user_id !== "string") {
    return res.status(400).json({ error: "Missing or invalid user_id" });
  }

  try {
    const backendRes = await fetch(
      `https://bookclub-backend.nn.r.appspot.com/api/v1/${user_id}/profile`
    );

    if (!backendRes.ok) {
      return res.status(backendRes.status).json({ error: "Failed to fetch profile" });
    }

    const data = await backendRes.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}
