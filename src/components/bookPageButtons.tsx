import { useState, useEffect } from "react";
import { parse } from "cookie";
import { fetchUserShelves, fetchUserShelvesClinet } from "@/utils/userData";
import { SuccessToast, ErrorToast } from "@/utils/toast";
import { useShelfChange } from "@/hooks/useShelfChange";
import { Book } from "./bookCard";

type VolumeData = {
  id: string;
  title: string;
  subtitle?: string;
  authors: string[];
  desc?: string;
  detail?: {
    pubDate?: string;
    pages?: number;
    lang?: string;
  };
  img?: string;
  ratings?: {
    count?: number;
    avg?: number;
  };
};

type BookPageButtonsProps = {
  volumeData: VolumeData;
};

export default function BookPageButtons({ volumeData }: BookPageButtonsProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const { loadingShelf, currentShelf, handleShelfChange, setCurrentShelf } =
    useShelfChange({
      userId: userId,
      accessToken: accessToken ?? undefined,
      volumeData,
    });

  useEffect(() => {
    if (typeof document !== "undefined") {
      const cookies = parse(document.cookie || "");
      setUserId(cookies.user_id || null);

      setAccessToken(cookies.access_token || null);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    async function fetchShelves() {
      if (!userId) return;
      try {
        const shelves = await fetchUserShelvesClinet(userId);
        const shelfKeys = [
          "currentlyReading",
          "wantToRead",
          "previously_read",
        ] as const;

        let foundShelf: string | null = null;

        for (const shelfKey of shelfKeys) {
          const books = shelves[shelfKey] || [];
          if (books.find((b: Book) => b.volume_id === volumeData.id)) {
            foundShelf = shelfKey;
            break;
          }
        }
        setCurrentShelf(foundShelf);
      } catch (e: any) {
        ErrorToast("Error fetching shelves.");
      }
    }

    fetchShelves();
  }, [userId, volumeData.id]);

  const renderButton = (label: string, shelf: string, color: string) => (
    <button
      onClick={() => handleShelfChange(shelf)}
      disabled={loadingShelf === shelf}
      className={`btn ${color} font-semibold bg-purple-200 text-indigo-700 py-2 px-4 rounded-md transition-colors duration-200 hover:text-white hover:bg-indigo-700 ${
        currentShelf === shelf ? "ring-2 ring-indigo-700" : ""
      }`}
    >
      {loadingShelf === shelf ? "Saving..." : label}
    </button>
  );

  return (
    <div className="space-x-2 mt-4">
      {renderButton("Reading", "currently_reading", "btn-primary")}
      {renderButton("Save for Later", "want_to_read", "btn-secondary")}
      {renderButton("Finished", "previously_read", "btn-success")}
    </div>
  );
}
