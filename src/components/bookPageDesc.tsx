import { useEffect, useState } from "react";
import { Book } from "../type/types";

export default function BookPageDesc({ book }: { book: Book }) {
  const [showMore, setShowMore] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const MAX_CHARACTERS = 400;
  const shouldTruncate = book.desc.length > MAX_CHARACTERS;

  const visibleDesc =
    !mounted || showMore
      ? book.desc
      : book.desc.slice(0, MAX_CHARACTERS) + (shouldTruncate ? "..." : "");

  return (
    <div className="flex flex-col justify-between">
      <div>
        <div
          className="text-gray-700 mb-4 text-justify space-y-4"
          dangerouslySetInnerHTML={{ __html: visibleDesc }}
        />

        {mounted && shouldTruncate && (
          <button
            onClick={() => setShowMore((prev) => !prev)}
            className="text-gray-600 text-sm hover:underline"
          >
            {showMore ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    </div>
  );
}
