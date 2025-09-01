import { useRouter } from "next/router";

interface LogoutButtonProps {
  onLogout?: () => void;
}

export default function LogoutButton({ onLogout }: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });

    if (onLogout) onLogout();
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      role="menuitem"
      className="w-full text-left px-4 py-2 border-t-2 border-slate-200 text-red-500 font-bold hover:underline hover:bg-gray-100"
      type="button"
    >
      Logout
    </button>
  );
}
