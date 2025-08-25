import BookCard, { Book } from './bookCard';

type CurrentlyReadingProps = {
  books: any[];
};

export default function CurrentlyReading({ books }: CurrentlyReadingProps) {
  return (
    <div>

      <h2 className='font-bold text-3xl mb-2'>Currently Reading</h2>
      <div className="flex gap-6 flex-wrap">
        {books.map((book) => {
          const bookData: Book = {
            volume_id: book.volume_id,
            title: book.title,
            subtitle: book.subtitle,
            authors: book.authors?.length ? book.authors : ['Unknown'],
            desc: book.desc || '',
            ratings: book.ratings || {},
            img: book.img,
            detail: book.detail || { pubDate: '', pages: 0, lang: '' },
            shelf: book.shelf || '',
            start_time: book.start_time || '',
            end_time: book.end_time || '',
          };
          return (
            <div key={book.volume_id} className="w-64">
              <BookCard book={bookData} />
            </div>
          );
        })}
      </div>
    </div>
  );
}