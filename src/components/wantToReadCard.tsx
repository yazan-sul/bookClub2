import Link from "next/link";
export interface Book {
  volume_id: string;
  title: string;
  subtitle?: string;
  authors: string[];
  desc: string;
  ratings: Record<string, unknown>;
  img: string;
  detail: {
    pubDate: string;
    pages: number;
    lang: string;
  };
  shelf: string;
  start_time: string;
  end_time: string;
}

export default function WantToReadCard({ book }: { book: Book }) {
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
      >
        Mark as reading
      </button>
    </div>
  );
}
