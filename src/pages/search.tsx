import { useState } from "react";
import { useRouter } from "next/router";
import { Book } from "@/type/types";
import BooksSection from "@/components/booksSection";
import Spinner from "@/components/spinner";
import { GetServerSideProps } from "next";
import { pathForServer } from "@/utils/path";
interface SearchBooksProps {
  initialResults: Book[];
}

export default function SearchBooks({ initialResults }: SearchBooksProps) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { q } = router.query;

  return (
    <div className="p-6">
      {initialResults.length > 0 ? (
        <div className="max-w-screen-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Search Results for "{q}"</h1>
          <BooksSection books={initialResults} />
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const q = context.query.q;

  if (!q || typeof q !== "string") {
    return {
      props: {
        initialResults: [],
      },
    };
  }
  try {
    const response = await fetch(`${pathForServer(context)}/api/search?q=${q}`);
    const data = await response.json();
    const initialResults: Book[] = data.items?.map(mapGoogleBookToBook) || [];
    return {
      props: {
        initialResults,
      },
    };
  } catch (error) {
    return {
      props: {
        initialResults: [],
      },
    };
  }
};

export function mapGoogleBookToBook(book: any): Book {
  return {
    volume_id: book.id,
    title: book.volumeInfo?.title || "Untitled",
    subtitle: book.volumeInfo?.subtitle || "",

    authors: book.volumeInfo?.authors?.length
      ? book.volumeInfo.authors
      : ["Unknown"],
    desc: book.volumeInfo?.description || "No description available.",
    ratings: book.volumeInfo?.averageRating
      ? { average: book.volumeInfo.averageRating }
      : {},
    img:
      book.volumeInfo?.imageLinks?.thumbnail ||
      "https://via.placeholder.com/128x192.png?text=No+Image",
    detail: {
      pubDate: book.volumeInfo?.publishedDate || "Unknown",
      pages: book.volumeInfo?.pageCount || 0,
      lang: book.volumeInfo?.language || "Unknown",
    },
    shelf: "none",
    start_time: "",
    end_time: "",
  };
}
