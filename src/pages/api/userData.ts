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