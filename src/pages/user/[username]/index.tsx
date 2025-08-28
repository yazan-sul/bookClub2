// pages/user/[username].tsx
import { Book } from "@/components/bookCard";
import BooksContainerProfile from "@/components/booksContainerProfile";
import UserProfileCard, { User } from "@/components/profileCard";
import { fetchUserProfile, mapBookData } from "@/utils/userData";
import { GetServerSideProps } from "next";

interface UserProfileProps {
  profileData: User;
  username: string;
}
type BooksProps = {
  currentlyReading: Book[];
  wantToRead: Book[];
  previously_read: Book[];
};
type ProfileProps = UserProfileProps & BooksProps;
export default function UserProfile({
  profileData,
  username,
  currentlyReading,
  wantToRead,
  previously_read,
}: ProfileProps) {
  return (
    <div className="flex flex-row  max-w-screen-xl mx-auto py-28 space-x-8">
      <UserProfileCard username={username} user={profileData} />
      <div className="space-y-4">
        <BooksContainerProfile
          title="Currently Reading"
          subtitle="A list of books that you're reading at the moment"
          books={currentlyReading}
        />
        <BooksContainerProfile
          title="To Read"
          subtitle="Some books you have saved to read for later"
          books={wantToRead}
        />
        <BooksContainerProfile
          title="Finished"
          subtitle="Books you've already read. Keep going!"
          books={previously_read}
        />
      </div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.params!;

  const fetchedProfile = await fetchUserProfile(username as string);

  if (!fetchedProfile || !fetchedProfile.profileData) {
    return { notFound: true };
  }

  const { profileData } = fetchedProfile;

  const res = await fetch(
    `${process.env.PUBLIC_API}/98aac522330f4c29882dcfd3736822ad/shelves`
  );

  const booksData = await res.json();
  const currentlyReading = booksData.currently_reading.books.map(mapBookData);
  const wantToRead = booksData.want_to_read.books.map(mapBookData);
  const previously_read = booksData.previously_read.books.map(mapBookData);

  return {
    props: {
      profileData,
      username,
      currentlyReading,
      wantToRead,
      previously_read,
    },
  };
};
