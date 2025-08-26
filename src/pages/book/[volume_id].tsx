import { GetServerSideProps } from "next";
import { Book } from "../../components/bookCard";
import { notFound } from "next/navigation";
import HeaderBar from "@/components/headerBar";
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
          <BookPageButtons />
        </div>
      </div>
      <div className="bg-white p-8 m-auto w-6/12 rounded-xl">
        <BookPageDesc book={book} />
        <div className="flex flex-col text-sm text-gray-600 mt-4">
        <p><strong>Pages:</strong> {book.detail.pages}</p>
        <p><strong>Language:</strong> {book.detail.lang.toUpperCase()}</p>
        <p><strong>Published-in:</strong> {book.detail.pubDate}</p>
      </div>
      </div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const volume_id = context.params?.volume_id;
  if (!volume_id || typeof volume_id !== "string") {
    return {
      notFound: true,
    };
  }
  const res = await fetch(
    `${process.env.PUBLIC_API}/98aac522330f4c29882dcfd3736822ad/shelves`
  );
  const data = await res.json();
  const allBooks: Book[] = [
    ...(data?.currently_reading?.books || []),
    ...(data?.want_to_read?.books || []),
    ...(data?.previously_read?.books || []),
  ];
  const book = allBooks.find((b) => b.volume_id === volume_id) || null;
  return {
    props: { book },
  };
};
