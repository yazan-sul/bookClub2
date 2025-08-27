import { Book } from "../components/bookCard";
import WelcomeMessage from "../components/welcomeMessage";
import CurrentlyReading from "../components/currentlyReading";
import WantToRead from "../components/wantToRead";
import BooksSection from "../components/booksSection";

type HomeProps = {
  currentlyReading: Book[];
  wantToRead: Book[];
  previously_read: Book[];
};

export default function Home({
  currentlyReading,
  wantToRead,
  previously_read,
}: HomeProps) {
  const allBooks = {
    currentlyReading,
    wantToRead,
    previously_read,
  };
  return (
    <div className="bg-slate-100 min-h-screen py-8 px-4">
      <div className="max-w-screen-xl mx-auto space-y-20">
        <WelcomeMessage />
        
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/4">
            <CurrentlyReading books={currentlyReading} />
          </div>
          <div className="md:w-3/4">
            <WantToRead books={wantToRead} />
          </div>
        </div>

        <BooksSection books={allBooks} />
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  const res = await fetch(
    `${process.env.PUBLIC_API}/98aac522330f4c29882dcfd3736822ad/shelves`
  );
  const data = await res.json();
  const currentlyReading = data.currently_reading.books.map(mapBookData);
  const wantToRead = data.want_to_read.books.map(mapBookData);
  const previously_read = data.previously_read.books.map(mapBookData);

  return {
    props: {
      currentlyReading,
      wantToRead,
      previously_read,
    },
  };
}

function mapBookData(book: any): Book {
  return {
    volume_id: book.volume_id,
    title: book.title,
    subtitle: book.subtitle,
    authors: book.authors?.length ? book.authors : ["Unknown"],
    desc: book.desc || "",
    ratings: book.ratings || {},
    img: book.img,
    detail: book.detail || { pubDate: "", pages: 0, lang: "" },
    shelf: book.shelf || "",
    start_time: book.start_time || "",
    end_time: book.end_time || "",
  };
}
