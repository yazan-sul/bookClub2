import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    res.setHeader("Set-Cookie", serialize("user_id", "", {
        path: "/",
        httpOnly: true,
        maxAge: -1,
        sameSite: "lax",
    }));

    res.status(200).json({ message: "Logged out successfully" });
}
