
import { parse } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PATCH") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    const updatedData = req.body;
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.access_token;
    const userId = cookies.user_id;

    if (!userId || typeof userId !== "string") {
        return res.status(400).json({ error: "Missing user id" });
    }

    if (!token) {
        return res.status(401).json({ error: "Missing access token" });
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API}/${userId}/profile`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            }
        );

        if (!response.ok) {
            return res.status(response.status).json({ error: "Failed to update!" });
        }
        const responseData = await response.text();
        return res.status(200).json(responseData);
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
}