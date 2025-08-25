import { Book } from "../components/bookCard";

import Link from "next/link";
import HeaderBar from "../components/headerBar";
import WelcomeMessage from "../components/welcomeMessage";
import CurrentlyReading from "../components/currentlyReading";
import WantToRead from "../components/wantToRead";
import BooksSection from "../components/booksSection";
import Footer from "../components/footer";

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
    <div className="bg-slate-100 text-center">
      <div className="bg-slate-100 text-start ml-56">
        <WelcomeMessage name={"Yazan"} />
        <div className="flex">
          <div className="w-1/4">
            <CurrentlyReading books={currentlyReading} />
          </div>

          <div className="w-3/4 ">
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
    "https://bookclub-backend.nn.r.appspot.com/api/v1/98aac522330f4c29882dcfd3736822ad/shelves"
  );
  const data = await res.json();

  return {
    props: {
      currentlyReading: data.currently_reading.books,
      wantToRead: data.want_to_read.books,
      previously_read: data.previously_read.books,
    },
  };
}
