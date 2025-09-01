import { isLoggedIn } from "@/utils/auth";
import { useState, useEffect } from "react";

export default function WelcomeMessage() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    setLoggedIn(() => isLoggedIn());

    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);
  if (loggedIn === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="bg-white p-8 rounded shadow-md text-center">
          <h1 className="font-bold text-3xl py-2">Welcome to Paprback 👋</h1>
          <p className="text-sm text-slate-700">
            Search for your favourite book
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8">
      {loggedIn ? (
        <>
          <h1 className="font-bold text-3xl py-2">
            Welcome back, {username} 👋
          </h1>
          <p className="text-sm text-slate-700">
            What would you like to read today?
          </p>
        </>
      ) : (
        <>
          <h1 className="font-bold text-3xl py-2">Welcome to Paprback 👋</h1>
          <p className="text-sm text-slate-700">
            Search for your favourite book
          </p>
        </>
      )}
    </div>
  );
}
