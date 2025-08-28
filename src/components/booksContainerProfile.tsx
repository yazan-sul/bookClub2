import React from "react";
import BookCard, { Book } from "./bookCard";

interface BooksSectionProps {
  title: string;
  subtitle: string;
  books: Book[];
}

export default function BooksContainerProfile({
  title,
  subtitle,
  books,
}: BooksSectionProps) {
  return (
    <div className="max-w-4xl mx-auto px-6 pb-6">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <h2 className="text-base font-light text-gray-500 uppercase">{title}</h2>
          <p className=" text-slate-900 text-basE">{subtitle}</p>
        </div>

        <button
          className="text-blue-600 font-semibold hover:underline focus:outline-none"
          type="button"
        >
          Show all
        </button>
      </div>
      {books?.length > 0 ? (
        books.map((book, idx) => (
          <div key={idx} className="flex flex-col bg-white  gap-6 mt-4">
            <BookCard book={book} flag />
          </div>
        ))
      ) : (
        <p className="text-gray-500 italic">No books available.</p>
      )}
    </div>
  );
}
