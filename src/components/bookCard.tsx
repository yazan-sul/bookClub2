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

type CardProps = {
  book: Book;
  flag?: boolean;
};
export default function BookCard({ book, flag }: CardProps) {
  const randomColor =
    colorClasses[Math.floor(Math.random() * colorClasses.length)];

  return (
    <div
      className={`w-full ${flag ? "max-w-xl flex items-center space-x-8" : ""}`}
    >
      <div
        className={`${randomColor} rounded-md p-4 ${
          flag ? "" : "flex justify-center items-center"
        }`}
      >
        <img
          className="rounded-md object-contain w-36 p-2 h-48"
          src={getBookImage(book)}
          alt={book.title}
        />
      </div>

      <div
        className={`flex flex-col px-2 space-y-1 text-start ${
          flag ? "" : "mt-3"
        }`}
      >
        <Link
          href={`/book/${book.volume_id}`}
          className="font-semibold text-lg line-clamp-2 hover:underline"
        >
          {book.title}
        </Link>
        <p className="text-slate-500 text-sm">{book.authors}</p>
      </div>
    </div>
  );
}
function getBookImage(book: Book): string {
  if (book.img) return book.img;
  if (book.volume_id)
    return `https://books.google.com/books/content?id=${book.volume_id}&printsec=frontcover&img=1&zoom=1`;
  return "/default-placeholder.png";
}

const colorClasses = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-yellow-400",
  "bg-orange-500",
  "bg-pink-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-indigo-500",
  "bg-lime-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-fuchsia-500",
  "bg-rose-500",
  "bg-slate-500",
  "bg-gray-500",
  "bg-zinc-500",
  "bg-stone-500",
  "bg-neutral-500",
];
