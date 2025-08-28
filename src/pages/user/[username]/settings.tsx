import { User } from "@/components/profileCard";
import Settings from "@/components/settings";
import { fetchUserProfile } from "@/utils/userData";

import { GetServerSideProps } from "next";

interface SettingsPageProps {
  profileData: User;
}

export default function SettingsPage({ profileData }: SettingsPageProps) {
  return <Settings user={profileData} />;
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
