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
    console.error("Error fetching user profile:", error);
    return null;
}
};

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
