import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {


    res.setHeader("Set-Cookie", [
        serialize("user_id", "", {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            maxAge: -1,
            sameSite: "lax",
            path: "/",
        }),
        serialize("access_token", "", {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            maxAge: -1,
            sameSite: "lax",
            path: "/",
        }),
        serialize("username", "", {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            maxAge: -1,
            sameSite: "lax",
            path: "/",
        })
    ]);

    res.status(200).json({ message: "Logged out successfully" });
}
