import { Book } from "../components/bookCard";
import WelcomeMessage from "../components/welcomeMessage";
import CurrentlyReading from "../components/currentlyReading";
import WantToRead from "../components/wantToRead";
import BooksSection from "../components/booksSection";
import {
  fetchUserShelves,
  mapBookData,
  fetchNytTopTen,
} from "@/utils/userData";
import { parse } from "cookie";
import { GetServerSideProps } from "next";

type HomeProps = {
  currentlyReading: Book[];
  wantToRead: Book[];
  previously_read: Book[];
  nytTopTenBooks: Book[];
};

export default function Home({
  currentlyReading,
  wantToRead,
  previously_read,
  nytTopTenBooks,
}: HomeProps) {
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

        <BooksSection books={nytTopTenBooks} />
      </div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parse(context.req.headers.cookie || "");
  const user_id = cookies.user_id;

  if (!user_id) {
    return {
      props: {
        currentlyReading: [],
        wantToRead: [],
        previously_read: [],
      },
    };
  }

  try {
    const shelves = await fetchUserShelves(user_id);

    const currentlyReading = (shelves.currentlyReading || []).map(mapBookData);
    const wantToRead = (shelves.wantToRead || []).map(mapBookData);
    const previously_read = (shelves.previously_read || []).map(mapBookData);

    const nytTopTenBooks = await fetchNytTopTen();
    return {
      props: {
        currentlyReading,
        wantToRead,
        previously_read,
        nytTopTenBooks,
      },
    };
  } catch (error) {
    return {
      props: {
        currentlyReading: [],
        wantToRead: [],
        previously_read: [],
      },
    };
  }
};
