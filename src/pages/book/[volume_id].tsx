import { GetServerSideProps } from "next";
import { Book } from "../../type/types";
import { notFound } from "next/navigation";
import { mapGoogleBookToLocalBook } from "@/utils/userData";

import BookPageButtons from "@/components/bookPageButtons";
import BookPageDesc from "@/components/bookPageDesc";

type Props = {
  book: Book | null;
};
export default function BookDetailPage({ book }: Props) {
  if (!book) return notFound;

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
          <BookPageButtons
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
  const volume_id = context.params?.volume_id;

  if (!volume_id || typeof volume_id !== "string") {
    return { notFound: true };
  }

  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${volume_id}`
  );

  if (!res.ok) {
    return { notFound: true };
  }

  const rawBook = await res.json();
  const book = mapGoogleBookToLocalBook(rawBook);

  return { props: { book } };
};
