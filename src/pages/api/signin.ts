import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const response = await fetch(`${process.env.PUBLIC_API}/login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(req.body),
                });
            const data = await response.json();
            res.status(response.status).json(data);
        } catch (error: any) {
            res.status(500).json({ message: "Server Error", error: error.message })
        }
    } else {
        res.status(400).json({ message: "this is not Post method!" });
    }

}