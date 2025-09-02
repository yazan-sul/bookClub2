import { Book } from "../type/types";
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
  username: string;
};

export default function Home({
  currentlyReading,
  wantToRead,
  previously_read,
  nytTopTenBooks,
  username,
}: HomeProps) {
  return (
    <div className="bg-slate-100 min-h-screen py-8 px-4">
      {currentlyReading.length > 0 || wantToRead.length > 0 ? (
        <div className="max-w-screen-xl mx-auto space-y-20">
          <WelcomeMessage />
          <div className="flex flex-col md:flex-row gap-12">
            {currentlyReading.length > 0 && (
              <div className="md:w-1/4">
                <CurrentlyReading books={currentlyReading} />
              </div>
            )}
            {wantToRead.length > 0 && (
              <div className="md:w-3/4">
                <WantToRead books={wantToRead} />
              </div>
            )}
          </div>
          <BooksSection books={nytTopTenBooks} />
        </div>
      ) : (
        <div className="flex flex-col max-w-screen-xl mx-auto space-y-20 items-center justify-center">
          <WelcomeMessage />
          <div className="max-w-screen-xl mx-auto space-y-20">
            <BooksSection books={nytTopTenBooks} />
          </div>
        </div>
      )}
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parse(context.req.headers.cookie || "");
  const user_id = cookies.user_id;
  const nytTopTenBooks = await fetchNytTopTen();
  const username = cookies.username || null;

  if (!user_id) {
    return {
      props: {
        currentlyReading: [],
        wantToRead: [],
        previously_read: [],
        nytTopTenBooks,
        username,
      },
    };
  }

  try {
    const shelves = await fetchUserShelves(user_id);

    return {
      props: {
        currentlyReading: shelves.currentlyReading,
        wantToRead: shelves.wantToRead,
        previously_read: shelves.previously_read,
        nytTopTenBooks,
        username,
      },
    };
  } catch (error) {
    return {
      props: {
        currentlyReading: [],
        wantToRead: [],
        previously_read: [],
        nytTopTenBooks,
        username,
      },
    };
  }
};
