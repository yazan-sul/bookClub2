import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const response = await fetch(`${process.env.PUBLIC_API}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(req.body),
            });

            const data = await response.json();

            if (!response.ok) {
                return res.status(response.status).json(data);
            }

            const user_id = data?.user_id;
            const access_token = data?.access_token;

            if (user_id && access_token) {
                res.setHeader("Set-Cookie", [
                    serialize("user_id", user_id, {
                        httpOnly: false,
                        secure: process.env.NODE_ENV === "production",
                        maxAge: 60 * 60 * 24 * 7,
                        sameSite: "lax",
                        path: "/",
                    }),
                    serialize("access_token", access_token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        maxAge: 60 * 60 * 24 * 7,
                        sameSite: "lax",
                        path: "/",
                    }),
                ]);
            }

            res.status(response.status).json(data);
        } catch (error: any) {
            res.status(500).json({ message: "Server Error", error: error.message })
        }
    } else {
        res.status(400).json({ message: "this is not Post method!" });
    }
}
