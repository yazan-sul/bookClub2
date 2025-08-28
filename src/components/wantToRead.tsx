import  { Book } from './bookCard';
import WantToReadCard from './wantToReadCard';

type WantToReadProps = {
  books: Book[];
};


export default function WantToRead({ books }: WantToReadProps) {
    return (
      <div className='pl-4'>
        <h2 className='font-bold text-3xl mb-2'>Up next</h2>
        <div className="flex gap-6 flex-wrap">
          {books.map((book) => {
            
            return (
              <div key={book.volume_id} className="w-64">
                <WantToReadCard book={book} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

