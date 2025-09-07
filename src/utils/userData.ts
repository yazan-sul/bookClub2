import { Book, GoogleBook } from "@/type/types";
import { User } from "@/type/types";
import { parse } from "cookie";
import { GetServerSidePropsContext } from "next";
import { pathForServer } from "./path";

type ShelvesData = {
  currently_reading?: { books: Book[] };
  want_to_read?: { books: Book[] };
  previously_read?: { books: Book[] };
};

export const fetchUserProfileClient = async () => {
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
  } catch {
    return null;
  }
};

export const fetchUserProfile = async (username: string, context: GetServerSidePropsContext
) => {
  try {
    const cookies = parse(context.req.headers.cookie || "");
    const user_id = cookies.user_id;
    if (!user_id) throw new Error("User ID not found in cookies");


    const profileRes = await fetch(`${pathForServer(context)}/api/profile?user_id=${user_id}`);
    if (!profileRes.ok) {
      throw new Error("Failed to fetch profile data");
    }

    const profileData: User = await profileRes.json();

    return { profileData, username };
  } catch {
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
  } catch {
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
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API}/nyt-top-ten`);
  const res = await fetch(`https://bookclub-backend.nn.r.appspot.com/api/v1/nyt-top-ten`);

  if (!res.ok) return [];

  const data: NytTopTenEntry[] = await res.json();

  return data.map((entry) => {
    const nyt = entry.nyt;
    const googleBook = entry.google_books?.items?.[0];

    if (googleBook && googleBook.id) {
      return mapGoogleBookToLocalBook(googleBook);
    }

    return {
      volume_id: nyt.primary_isbn13 || nyt.title,
      title: nyt.title,
      subtitle: "",
      authors: nyt.author ? [nyt.author] : ["Unknown"],
      desc: nyt.description,
      img: nyt.book_image,
      detail: {
        pubDate: nyt.created_date || "", // Note: from your example it is updated_date or created_date - choose one
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
  });
}


export function mapBookData(book: Book): Book {
  return {
    volume_id: book.volume_id,
    title: book.title,
    subtitle: book.subtitle,
    authors: book.authors?.length ? book.authors : ["Unknown"],
    desc: book.desc || "",
    ratings: book.ratings || {},
    img: book.img || book.img || "",
    detail: book.detail || { pubDate: "", pages: 0, lang: "" },
    shelf: book.shelf || "",
    start_time: book.start_time || "",
    end_time: book.end_time || "",
  };
}

export function mapGoogleBookToLocalBook(googleBook: GoogleBook): Book {
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
export interface NytIsbn {
  isbn10: string;
  isbn13: string;
}

export interface NytBuyLink {
  name: string;
  url: string;
}

export interface NytData {
  age_group: string;
  amazon_product_url: string;
  article_chapter_link: string;
  asterisk: number;
  author: string;
  book_image: string;
  book_image_height: number;
  book_image_width: number;
  book_review_link: string;
  book_uri: string;
  contributor: string;
  contributor_note: string;
  created_date: string; // ISO string
  dagger: number;
  description: string;
  first_chapter_link: string;
  price: string;
  primary_isbn10: string;
  primary_isbn13: string;
  publisher: string;
  rank: number;
  rank_last_week: number;
  sunday_review_link: string;
  title: string;
  updated_date: string; // ISO string
  weeks_on_list: number;
  isbns: NytIsbn[];
  buy_links: NytBuyLink[];
}

export interface GoogleBooksImageLinks {
  smallThumbnail?: string;
  thumbnail?: string;
}

export interface GoogleBooksVolumeInfo {
  title?: string;
  subtitle?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  industryIdentifiers?: Array<{
    type: string;
    identifier: string;
  }>;
  readingModes?: {
    text: boolean;
    image: boolean;
  };
  pageCount?: number;
  printType?: string;
  categories?: string[];
  maturityRating?: string;
  allowAnonLogging?: boolean;
  contentVersion?: string;
  panelizationSummary?: {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
  };
  imageLinks?: GoogleBooksImageLinks;
  language?: string;
  previewLink?: string;
  infoLink?: string;
  canonicalVolumeLink?: string;
}

export interface GoogleBooksSaleInfo {
  country?: string;
  saleability?: string;
  isEbook?: boolean;
}

export interface GoogleBooksAccessInfo {
  country?: string;
  viewability?: string;
  embeddable?: boolean;
  publicDomain?: boolean;
  textToSpeechPermission?: string;
  epub?: {
    isAvailable: boolean;
  };
  pdf?: {
    isAvailable: boolean;
  };
  webReaderLink?: string;
  accessViewStatus?: string;
  quoteSharingAllowed?: boolean;
}

export interface GoogleBooksSearchInfo {
  textSnippet?: string;
}

export interface GoogleBookItem {
  kind?: string;
  id: string;
  etag?: string;
  selfLink?: string;
  volumeInfo?: GoogleBooksVolumeInfo;
  saleInfo?: GoogleBooksSaleInfo;
  accessInfo?: GoogleBooksAccessInfo;
  searchInfo?: GoogleBooksSearchInfo;
}

export interface GoogleBooks {
  kind?: string;
  totalItems?: number;
  items?: GoogleBookItem[];
}

export interface NytTopTenEntry {
  nyt: NytData;
  rank: number;
  google_books?: GoogleBooks;
}
