
import { parse } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id } = req.query;
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.access_token;
  if (!user_id || typeof user_id !== "string") {
    return res.status(400).json({ error: "Missing or invalid user_id" });
  }

  try {

    const backendRes = await fetch(
      `${process.env.PUBLIC_API}/${user_id}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
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
