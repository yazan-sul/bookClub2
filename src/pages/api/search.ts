import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { q } = req.query;

    if (!q || typeof q !== "string") {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {

        const response = await fetch(
            `${process.env.GOOGLE_API}/volumes?q=${q}`
        );
        if (!response.ok) {
            return res.status(response.status).json({ error: "Failed to search book" });
        }
        const data = await response.json();
        return res.status(200).json(data);
    } catch {
        return res.status(500).json({ error: "Server error" });
    }
}
