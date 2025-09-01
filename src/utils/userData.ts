import { Book } from "@/components/bookCard";
import { User } from "@/components/profileCard";

export const fetchUserProfile = async (username: string) => {
  try {
    const userRes = await fetch(
      `${process.env.PUBLIC_API}/user/${username}`
    );

    if (!userRes.ok) {
      return null;
    }
    const user: User = await userRes.json();

    const profileRes = await fetch(
      `${process.env.PUBLIC_API}/${user.user_id}/profile`
    );

    if (!profileRes.ok) {
      throw new Error("Failed to fetch profile data");
    }

    const profileData: User = await profileRes.json();

    return { profileData, username };
  } catch (error) {
    return null;
  }
};
type ShelvesData = {
  currently_reading?: { books: any[] };
  want_to_read?: { books: any[] };
  previously_read?: { books: any[] };
};

export async function fetchUserShelves(user_id: string) {
  const res = await fetch(`${process.env.PUBLIC_API}/${user_id}/shelves`);
  if (!res.ok) {
    throw new Error(`Failed to fetch shelves for user ${user_id}`);
  }
  const shelvesData: ShelvesData = await res.json();

  return {
    currentlyReading:
      shelvesData.currently_reading?.books?.map(mapBookData) || [],
    wantToRead: shelvesData.want_to_read?.books?.map(mapBookData) || [],
    previously_read:
      shelvesData.previously_read?.books?.map(mapBookData) || [],
  };
} export async function fetchNytTopTen(): Promise<Book[]> {
  try {
    const res = await fetch("https://bookclub-backend.nn.r.appspot.com/api/v1/nyt-top-ten");
    if (!res.ok) {
      return [];
    }
    const data = await res.json();


    return data.map((entry: any): Book => {
      const nyt = entry.nyt || {};
      const googleBook = entry.google_books?.items?.[0];

      if (googleBook) {

        return mapGoogleBookToLocalBook(googleBook);
      } else {

        return {
          volume_id: nyt.primary_isbn13 || nyt.title,
          title: nyt.title || "Untitled",
          subtitle: "",
          authors: nyt.author ? [nyt.author] : ["Unknown"],
          desc: nyt.description || "",
          img: nyt.book_image || "",
          detail: {
            pubDate: nyt.published_date || "",
            pages: 0,
            lang: "",
          },
          ratings: {
            avg: 0,
            count: 0,
          },
          shelf: "",
          start_time: "",
          end_time: "",
        };
      }
    });
  } catch (error) {
    return [];
  }
}


export function mapBookData(book: any): Book {
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
export function mapGoogleBookToLocalBook(googleBook: any): Book {
  const volumeInfo = googleBook.volumeInfo || {};

  return {
    volume_id: googleBook.id,
    title: volumeInfo.title || "Untitled",
    subtitle: volumeInfo.subtitle || "",
    authors: volumeInfo.authors || ["Unknown"],
    desc: volumeInfo.description || "",
    img: volumeInfo.imageLinks?.thumbnail || "",
    detail: {
      pubDate: volumeInfo.publishedDate || "",
      pages: volumeInfo.pageCount || 0,
      lang: volumeInfo.language || "",
    },
    ratings: {
      avg: volumeInfo.averageRating || 0,
      count: volumeInfo.ratingsCount || 0,
    },
    shelf: "",
    start_time: "",
    end_time: "",
  };
}
