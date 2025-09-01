import { Book } from "@/components/bookCard";
import { User } from "@/components/profileCard";
import { parse } from "cookie";
import { GetServerSidePropsContext } from "next";

type ShelvesData = {
  currently_reading?: { books: any[] };
  want_to_read?: { books: any[] };
  previously_read?: { books: any[] };
};

export const fetchUserProfileClient = async (username: string) => {
  try {
    if (typeof window === "undefined") throw new Error("Not in browser");

    const cookies = parse(document.cookie || "");
    const user_id = cookies.user_id;
    const access_token = cookies.access_token;
    const username = cookies.username;

    if (!user_id) throw new Error("User ID not found in cookies");

    const profileRes = await fetch(`${process.env.NEXT_PUBLIC_API}/${user_id}/profile`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!profileRes.ok) {
      throw new Error("Failed to fetch profile data");
    }

    const profileData: User = await profileRes.json();

    return { profileData, username };
  } catch (error) {
    return null;
  }
};

export const fetchUserProfile = async (username: string, context: GetServerSidePropsContext
) => {
  try {
    const cookies = parse(context.req.headers.cookie || "");
    const user_id = cookies.user_id;
    const access_token = cookies.access_token;
    const username = cookies.username;

    if (!user_id) throw new Error("User ID not found in cookies");


    const profileRes = await fetch(`${process.env.PUBLIC_API}/${user_id}/profile`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (!profileRes.ok) {
      throw new Error("Failed to fetch profile data");
    }

    const profileData: User = await profileRes.json();

    return { profileData, username };
  } catch (error) {
    return null;
  }
};
export async function fetchUserShelves(user_id: string) {
  try {
    const res = await fetch(`${process.env.PUBLIC_API}/${user_id}/shelves`);
    if (!res.ok) {

      return {
        currentlyReading: [],
        wantToRead: [],
        previously_read: [],
      };
    }
    const shelvesData: ShelvesData = await res.json();

    return {
      currentlyReading:
        shelvesData.currently_reading?.books?.map(mapBookData) || [],
      wantToRead: shelvesData.want_to_read?.books?.map(mapBookData) || [],
      previously_read:
        shelvesData.previously_read?.books?.map(mapBookData) || [],
    };
  } catch (err) {
    return {
      currentlyReading: [],
      wantToRead: [],
      previously_read: [],
    };
  }

}

export async function fetchUserShelvesClinet(user_id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API environment variable is not defined");
  }

  const res = await fetch(`${baseUrl}/${user_id}/shelves`);

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
}
export async function fetchNytTopTen(): Promise<Book[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/nyt-top-ten`);

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
    img: book.img || book.imageLinks?.thumbnail || "",
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
