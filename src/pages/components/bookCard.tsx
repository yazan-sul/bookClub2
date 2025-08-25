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

export default function BookCard({ book }: { book: Book }) {
  return (
    <div className="w-full">
      <div className="bg-blue-500 rounded-md flex justify-center items-center p-4">
        <img
          className="rounded-md object-contain w-28 h-40"
          src={book.img}
          alt={book.title}
        />
      </div>

      <div className="flex flex-col mt-3 px-2 space-y-1 text-start">
        <Link
          href="#"
          className="font-semibold text-lg line-clamp-2 hover:underline"
        >
          {book.title}
        </Link>
        <p className="text-slate-500 text-sm">{book.authors}</p>
      </div>
    </div>
  );
}