import Link from "next/link";
import { useState, useEffect } from "react";
import { parse } from "cookie";
import { useShelfChange } from "@/hooks/useShelfChange";
import Spinner from "../core/spinner";
import { Book } from "@/type/types";
import { useAuth } from "@/context/AuthContext";
export default function WantToReadCard({ book }: { book: Book }) {
  const { userId } = useAuth();
  const [accessToken, setAccessToken] = useState<string | null>();

  useEffect(() => {
    if (typeof document !== "undefined") {
      const cookies = parse(document.cookie || "");
      setAccessToken(cookies.access_token || null);
    }
  }, []);
  const { handleShelfChange, loadingShelf } = useShelfChange({
    userId,
    accessToken: accessToken ?? undefined,
    volumeData: {
      id: book.volume_id,
      title: book.title,
      subtitle: book.subtitle,
      authors: book.authors,
      desc: book.desc,
      detail: book.detail,
      img: book.img,
      ratings: book.ratings,
    },
  });
  return (
    <div className="h-40 w-full bg-white rounded-xl shadow-md p-2 flex flex-col text-start items-start">
      <div className="flex flex-col mt-3  space-y-1 text-start">
        <Link
          href={`/book/${book.volume_id}`}
          className="font-semibold text-lg  hover:underline"
        >
          {book.title}
        </Link>
        <p className="text-slate-800 text-sm">{book.authors}</p>
      </div>
      <button
        type="button"
        className="text-gray-500 text-base hover:underline transition"
        onClick={() => handleShelfChange("currently_reading")}
        disabled={loadingShelf === "currently_reading"}
      >
        {loadingShelf === "currently_reading" ? <Spinner /> : "Mark as reading"}
      </button>
    </div>
  );
}
