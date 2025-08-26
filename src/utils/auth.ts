export function isLoggedIn(): boolean {
    if (typeof window === "undefined") return false;
    return Boolean(localStorage.getItem("user_id"));
}
