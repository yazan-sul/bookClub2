// pages/user/[username].tsx
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
    <div className="max-w-screen-xl mx-auto space-y-20 p-28">
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
