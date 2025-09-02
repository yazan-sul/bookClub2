
import { parse } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PATCH") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    const { userId, shelf, volumeData } = req.body;

    if (!userId || typeof userId !== "string" || !shelf || !volumeData) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.access_token;

    if (!token) {
        return res.status(401).json({ error: "Missing access token" });
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API}/${userId}/shelves/exclusive`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,

                },
                body: JSON.stringify({
                    op: "upsert",
                    to_shelf: shelf,
                    volume_data: volumeData,
                }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Shelf update failed:", response.status, errorText);
            return res.status(response.status).json({ error: "Failed to update shelf" });
        }
        const data = await response.text();
        return res.status(200).json(data);
    } catch (error) {
        console.error("Shelf update server error:", error);

        return res.status(500).json({ error: "Server error" });
    }
}