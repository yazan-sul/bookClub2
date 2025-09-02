import { useEffect, useState } from "react";
import { fetchUserShelvesClinet } from "@/utils/userData";
import { ErrorToast } from "@/utils/toast";
import { useShelfChange } from "@/hooks/useShelfChange";
import { Book } from "../type/types";
import { useAuth } from "@/context/AuthContext";
import { VolumeData } from "@/type/types";
import { parse } from "cookie";

type BookPageButtonsProps = {
  volumeData: VolumeData;
};

export default function BookPageButtons({ volumeData }: BookPageButtonsProps) {
  const { userId } = useAuth();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const { loadingShelf, currentShelf, handleShelfChange, setCurrentShelf } =
    useShelfChange({
      userId: userId,
      accessToken: accessToken ?? undefined,

      volumeData,
    });
  useEffect(() => {
    if (typeof document !== "undefined") {
      const cookies = parse(document.cookie || "");

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

  const renderButton = (
    label: string,
    shelf: string,
    color: keyof typeof colorClasses
  ) => (
    <button
      onClick={() => handleShelfChange(shelf)}
      disabled={loadingShelf === shelf}
      className={`btn font-semibold py-2 px-4 rounded-md transition-colors duration-200 hover:text-white ${
        colorClasses[color]
      } ${currentShelf === shelf ? "ring-2 ring-gray-700" : ""}`}
    >
      {loadingShelf === shelf ? "Saving..." : label}
    </button>
  );

  return (
    <div className="space-x-2 mt-4">
      {renderButton("Reading", "currently_reading", "purple")}
      {renderButton("Save for Later", "want_to_read", "blue")}
      {renderButton("Finished", "previously_read", "green")}
    </div>
  );
}
const colorClasses: Record<string, string> = {
  purple: "bg-purple-100 text-purple-500 hover:bg-purple-500",
  blue: "bg-blue-100 text-blue-500 hover:bg-blue-500",
  green: "bg-green-100 text-green-500 hover:bg-green-500",
};
