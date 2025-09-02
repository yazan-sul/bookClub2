import { useState } from "react";
import { ErrorToast, SuccessToast } from "@/utils/toast";
import { VolumeData } from "@/type/types";

interface UseShelfChangeParams {
    userId: string | null;
    accessToken?: string;
    volumeData: VolumeData;
}

export function useShelfChange({ userId, accessToken, volumeData }: UseShelfChangeParams) {
    const [loadingShelf, setLoadingShelf] = useState<string | null>(null);
    const [currentShelf, setCurrentShelf] = useState<string | null>(null);

    const handleShelfChange = async (shelf: string) => {
        if (!userId) {
            ErrorToast("You must be logged in to save this book.");
            return;
        }

        setLoadingShelf(shelf);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API}/${userId}/shelves/exclusive`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
                    },
                    body: JSON.stringify({
                        op: "upsert",
                        to_shelf: shelf,
                        volume_data: volumeData,
                    }),
                }
            );

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
