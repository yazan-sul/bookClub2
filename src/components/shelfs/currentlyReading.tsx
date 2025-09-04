import { useShelfChange } from "@/hooks/useShelfChange";
import { parse } from "cookie";
import { useState, useEffect } from "react";
import BookCard from "./../cards/bookCard";
import { Book } from "../../type/types";
import { useAuth } from "@/context/AuthContext";

export default function CurrentlyReading({ books }: { books: Book[] }) {
  const [accessToken, setAccessToken] = useState<string | null>();
  const { userId } = useAuth();

  useEffect(() => {
    if (typeof document !== "undefined") {
      const cookies = parse(document.cookie || "");
      setAccessToken(cookies.access_token || null);
    }
  }, []);
  const book = books[0];
  const { handleShelfChange } = useShelfChange({
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
    <div>
      <h2 className="font-bold text-3xl mb-2">Currently Reading</h2>
      <div className="flex gap-6 flex-wrap">
        <div key={book.volume_id} className="w-64">
          <div className="bg-white space-y-2 text-center ">
            <BookCard book={book} />
            <button
              onClick={() => handleShelfChange("previously_read")}
              className="text-lg w-full font-semibold bg-slate-50  text-slate-900 py-2 rounded-full hover:bg-slate-100 transition"
            >
              Mark as completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
