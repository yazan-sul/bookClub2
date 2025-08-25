import BookCard, { Book } from './bookCard';
type AllBooks = {
  books: {
    currentlyReading: Book[];
    wantToRead: Book[];
    previously_read: Book[];
  };
};

export default function BooksSection({ books }: AllBooks) {
  const allBooks = [
    ...books.currentlyReading,
    ...books.wantToRead,
    ...books.previously_read,
  ];

  return (
    <div className="mt-10">
      <h2 className="font-bold text-3xl mb-2">The New York Times</h2>
      <p>Best selling books of the week</p>

      <div className="grid grid-cols-5 gap-6 mt-4">
        {allBooks.map((book) => (
          <div key={book.volume_id} className="w-64">
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  );
}
