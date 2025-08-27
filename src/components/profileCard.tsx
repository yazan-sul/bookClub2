export interface User {
  user_id: string;
  first_name?: string;
  last_name?: string;
  location?: string;
  birthday?: string | null;
  bio?: string;
  profile_picture?: string | null;
  favourite_book?: string | null;
}

export default function UserProfileCard({
  username,
  user,
}: {
  username: string;
  user: User;
}) {
  // const firstName = localStorage.getItem("firstName") || "";
  // const lastName = localStorage.getItem("lastName") || "";
  // const location = localStorage.getItem("location") || "";
  // const bio = localStorage.getItem("about") || "";

  const bio = user.bio;
  const firstName = user.first_name;
  const lastName = user.last_name;
  const location = user.location;

  const fullname = `${firstName} ${lastName}`.trim();

  return (
    <div className="relative flex flex-col bg-white px-6 pt-16 pb-6 rounded-lg shadow-lg max-w-sm mx-auto">
      <div className="absolute -top-12 left-0 w-full flex justify-center">
        <img
          src="/favicon.ico"
          alt="User profile"
          className="w-48 h-48 object-cover rounded-full border-2 border-indigo-600 "
        />
      </div>

      <div className="mt-24 text-start space-y-1">
        {fullname && <p className="text-xl font-bold">{fullname}</p>}
        <p className="text-sm text-gray-600">@{username}</p>
        {bio && <p className="text-sm text-gray-700 pt-2">{bio}</p>}
        {location && <p className="text-sm text-gray-500 pt-2">{location}</p>}
      </div>
    </div>
  );
}
