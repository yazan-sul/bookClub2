// pages/user/[username].tsx
import BooksContainerProfile from "@/components/booksContainerProfile";
import UserProfileCard, { User } from "@/components/profileCard";
import { fetchUserProfile } from "@/pages/api/userData";
import { GetServerSideProps } from "next";

interface UserProfileProps {
  profileData: User;
  username: string;
}

export default function UserProfile({
  profileData,
  username,
}: UserProfileProps) {
  return (
    <div className="flex flex-row  max-w-screen-xl mx-auto p-28 space-x-12">
      <UserProfileCard username={username} user={profileData} />

    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.params!;
  const data = await fetchUserProfile(username as string);
  if (!data) {
    return { notFound: true };
  }

  return {
    props: data,
  };
};
