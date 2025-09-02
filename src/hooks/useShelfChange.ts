import { useState } from "react";
import { ErrorToast, SuccessToast } from "@/utils/toast";
import { VolumeData } from "@/type/types";

interface UseShelfChangeParams {
    userId: string | null;
    accessToken?: string;
    volumeData: VolumeData;
}

export function useShelfChange({ userId, volumeData }: UseShelfChangeParams) {
    const [loadingShelf, setLoadingShelf] = useState<string | null>(null);
    const [currentShelf, setCurrentShelf] = useState<string | null>(null);

    const handleShelfChange = async (shelf: string) => {
        if (!userId) {
            ErrorToast("You must be logged in to save this book.");
            return;
        }

        setLoadingShelf(shelf);

        try {
            const response = await fetch("/api/shelfChange", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    shelf,
                    volumeData,
                }),
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            SuccessToast("You updated your shelf.!");
            setCurrentShelf(shelf);
        } catch (err) {
            ErrorToast("Something went wrong.");
        } finally {
            setLoadingShelf(null);
        }
    };

    return { loadingShelf, currentShelf, setCurrentShelf, handleShelfChange };
}
