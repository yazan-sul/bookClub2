import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Book } from "@/components/bookCard";
import BooksSection from "@/components/booksSection";
import Spinner from "@/components/spinner";

export default function SearchBooks() {
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { q } = router.query;

  useEffect(() => {
    if (!q || typeof q !== "string") {
      setSearchResults([]);
      return;
    }

    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${q}`
        );
        const data = await response.json();

        if (data.items) {
          const books: Book[] = data.items.map(mapGoogleBookToBook);
          setSearchResults(books);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [q]);

  return (
    <div className="p-6">
      {loading ? (
        <Spinner />
      ) : searchResults.length > 0 ? (
        <div className="max-w-screen-2xl mx-auto ">
          <h1 className="text-2xl font-bold mb-4">Search Results for "{q}"</h1>

          <BooksSection books={searchResults} />
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

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
