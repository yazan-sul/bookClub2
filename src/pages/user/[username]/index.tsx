import { Book, User } from "@/type/types";
import BooksContainerProfile from "@/components/booksContainerProfile";
import UserProfileCard from "@/components/profileCard";
import { fetchUserProfile, fetchUserShelves } from "@/utils/userData";
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
          shelf="currently_reading"
          username={username}
          subtitle="A list of books that you're reading at the moment"
          books={currentlyReading}
        />
        <BooksContainerProfile
          shelf="want_to_read"
          username={username}
          title="To Read"
          subtitle="Some books you have saved to read for later"
          books={wantToRead}
        />
        <BooksContainerProfile
          shelf="previously_read"
          username={username}
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
  const fetchedProfile = await fetchUserProfile(username as string, context);

  if (!fetchedProfile?.profileData) {
    return { notFound: true };
  }

  const shelves = await fetchUserShelves(fetchedProfile.profileData.user_id);

  return {
    props: {
      profileData: fetchedProfile.profileData,
      username,
      currentlyReading: shelves.currentlyReading,
      wantToRead: shelves.wantToRead,
      previously_read: shelves.previously_read,
    },
  };
};
