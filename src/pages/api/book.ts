
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { volume_id } = req.query;

    if (!volume_id || typeof volume_id !== "string") {
        return res.status(400).json({ error: "Missing or invalid volume_id" });
    }

    try {
        const googleRes = await fetch(
            `${process.env.GOOGLE_API}/volumes/${volume_id}`
        );

        if (!googleRes.ok) {
            return res.status(googleRes.status).json({ error: "Failed to fetch profile" });
        }

        const data = await googleRes.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
}
