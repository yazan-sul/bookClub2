import { GetServerSideProps } from "next";
import { Book } from "../../type/types";
import {
  fetchUserShelvesClinet,
  mapGoogleBookToLocalBook,
} from "@/utils/userData";
import BookActions from "@/components/bookPage/bookActions";
import BookPageDesc from "@/components/bookPage/bookPageDesc";
import { parse } from "cookie";
import { ErrorToast } from "@/utils/toast";

type Props = {
  book: Book | null;
  foundShelf: string | null;
  accessToken: string;
};
export default function BookDetailPage({
  book,
  accessToken,
  foundShelf,
}: Props) {
  if (!book) {
    return { notFound: true };
  }
  return (
    <div className="flex flex-col items-center p-20 space-y-20 ">
      <div className="flex items-center gap-28 justify-center">
        <img
          className="w-64 h-auto object-cover"
          src={book.img}
          alt={book.title}
        />
        <div className="flex flex-col space-y-2">
          <h1 className="font-bold text-4xl">{book.title}</h1>
          <h4 className="font-semibold">{book.subtitle}</h4>
          <p className="font-extralight">by {book.authors[0]}</p>
          <BookActions
            accessToken={accessToken}
            foundShelf={foundShelf && foundShelf}
            volumeData={{
              id: book.volume_id,
              title: book.title,
              subtitle: book.subtitle,
              authors: book.authors,
            }}
          />{" "}
        </div>
      </div>
      <div className="bg-white p-8 m-auto w-6/12 rounded-xl">
        <BookPageDesc book={book} />
        <div className="flex flex-col text-sm text-gray-600 mt-4">
          <p>
            <strong>Pages:</strong> {book.detail.pages}
          </p>
          <p>
            <strong>Language:</strong> {book.detail.lang.toUpperCase()}
          </p>
          <p>
            <strong>Published-in:</strong> {book.detail.pubDate}
          </p>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parse(context.req.headers.cookie || "");

  const volumeId = context.params?.volume_id;
  const accessToken = cookies.access_token;
  const userId = cookies.user_id;

  if (!volumeId || typeof volumeId !== "string") {
    return { notFound: true };
  }

  const res = await fetch(
    `http://localhost:3000/api/book?volume_id=${volumeId}`
  );

  if (!res.ok) {
    return { notFound: true };
  }

  const rawBook = await res.json();
  const book = mapGoogleBookToLocalBook(rawBook);

  if (!userId) {
    return {
      props: {
        book,
        accessToken,
        foundShelf: null,
      },
    };
  }
  let foundShelf: string | null = null;

  try {
    const shelves = await fetchUserShelvesClinet(userId);
    const shelfKeys = [
      "currentlyReading",
      "wantToRead",
      "previously_read",
    ] as const;

    for (const shelfKey of shelfKeys) {
      const books = shelves[shelfKey] || [];
      if (books.find((b: Book) => b.volume_id === book.volume_id)) {
        foundShelf = shelfKey;
        break;
      }
    }
  } catch (e: any) {
    ErrorToast("Error fetching shelves.");
  }

  return { props: { book, accessToken, foundShelf } };
};
