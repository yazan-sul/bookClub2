import { Book } from "@/type/types";
import Link from "next/link";
import Image from "next/image";

type CardProps = {
  book: Book;
  flag?: boolean;
};
export default function BookCard({ book, flag }: CardProps) {
  return (
    <div
      className={`w-full ${flag ? "max-w-xl flex items-center space-x-8" : ""}`}
    >
      <div
        className={`bg-indigo-300 rounded-md p-4 ${
          flag ? "" : "flex justify-center items-center"
        }`}
      >
        <Image
          className="rounded-md object-contain p-2"
          src={getBookImage(book)}
          height={48}
          width={36}
          priority
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
