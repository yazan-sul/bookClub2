import { isLoggedIn } from "@/utils/auth";
import { useState, useEffect } from "react";

export default function WelcomeMessage() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    setLoggedIn(() => isLoggedIn());
  }, []);
  if (loggedIn === null) {

    return (
      <div className="my-8">
        <h1 className="font-bold text-3xl py-2">Welcome to Paprback 👋</h1>
        <p className="text-sm text-slate-700">Search for your favourite book</p>
      </div>
    );
  }
  return (
    <div className="my-8">
      {loggedIn ? (
        <>
          <h1 className="font-bold text-3xl py-2">Welcome back, {localStorage.getItem("username")} 👋</h1>
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
