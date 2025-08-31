import { parse } from "cookie";

export function isLoggedIn(): boolean {
    if (typeof window === "undefined") return false;
    const cookies = parse(document.cookie || "");
    return Boolean(cookies.user_id);
}
