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
  return (
    <div className={`w-full ${flag ? 'max-w-xl flex items-center space-x-8' : ''}`}>
      <div className={`bg-blue-500 rounded-md p-4 ${flag ? '' : 'flex justify-center items-center'}`}>
        <img
          className="rounded-md object-contain w-36 p-2 h-48"
          src={book.img}
          alt={book.title}
        />
      </div>

      <div className={`flex flex-col px-2 space-y-1 text-start ${flag ? '' : 'mt-3'}`}>
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
