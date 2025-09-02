import { GetServerSideProps } from "next";
import { Book } from "@/type/types";
import BooksContainerProfile from "@/components/booksContainerProfile";
import { mapBookData } from "@/utils/userData";
import { parse } from "cookie";

interface ShelfPageProps {
  shelf: string;
  books: Book[];
  username: string;
}

const shelfTitles: Record<string, { title: string; subtitle: string }> = {
  currently_reading: {
    title: "Currently Reading",
    subtitle: "Books you're currently reading",
  },
  want_to_read: {
    title: "Want to Read",
    subtitle: "Books you want to read in the future",
  },
  previously_read: {
    title: "Previously Read",
    subtitle: "Books you've already finished reading",
  },
};

export default function ShelfPage({ shelf, books, username }: ShelfPageProps) {
  const shelfInfo = shelfTitles[shelf] || {
    title: "Books",
    subtitle: "Shelf view",
  };

  return (
    <div className="max-w-screen-xl mx-auto py-28">
      <BooksContainerProfile
        title={shelfInfo.title}
        subtitle={shelfInfo.subtitle}
        books={books}
        shelf={shelf}
        username={username}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username, shelf } = context.params as {
    username: string;
    shelf: string;
  };

  const validShelves = ["currently_reading", "want_to_read", "previously_read"];
  if (!validShelves.includes(shelf)) {
    return { notFound: true };
  }

  const cookieHeader = context.req.headers.cookie || "";
  const cookies = parse(cookieHeader);

  const userId = cookies.user_id || null;
  const res = await fetch(`${process.env.PUBLIC_API}/${userId}/shelves`);

  const booksData = await res.json();

  const shelfBooksRaw = booksData[shelf]?.books;
  if (!shelfBooksRaw) {
    return { notFound: true };
  }

  const books = shelfBooksRaw.map(mapBookData);

  return {
    props: {
      shelf,
      books,
      username,
    },
  };
};
