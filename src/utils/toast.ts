
import toast from "react-hot-toast";

export function ErrorToast(message: string) {
    toast(message, {
        icon: "🚫",
        style: {
            background: "#b91c1c",
            color: "white",
        },
    });
}


export function SuccessToast(message: string) {
    toast(message, {
        icon: "✅",
        style: {
            background: "#22c55e",
            color: "white",
        },
    });
}
