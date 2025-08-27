import React from "react";
import BookCard, { Book } from "./bookCard";

interface BooksSectionProps {
  title: string;
  subtitle: string;
  books?: Book[];

}

export default function BooksContainerProfile({ title, subtitle }: BooksSectionProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-gray-600 text-sm">{subtitle}</p>
        </div>

        <button
          className="text-blue-600 font-semibold hover:underline focus:outline-none"
          type="button"
        >
          Show all
        </button>
      </div>

      <div className="flex flex-col bg-white  gap-6">
        <h1>hi</h1>
        <h2>das</h2>
        {/* {books.length > 0 ? (
          books.map((book, idx) => (
            <div key={idx}>
              <BookCard book={book} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No books available.</p>
        )} */}
      </div>
    </div>
  );
}
