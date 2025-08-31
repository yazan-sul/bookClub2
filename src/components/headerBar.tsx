import React, { useEffect, useState } from "react";
import { isLoggedIn } from "@/utils/auth";
import Link from "next/link";
import UserMenu from "./userMenu";
import SearchBar from "./searchBar";

export default function HeaderBar() {
  const [isLogged, setIsLogged] = useState<boolean | null>(null);
  const [query, setQuery] = useState("");
  useEffect(() => {
    setIsLogged(isLoggedIn());
  }, []);

  if (isLogged === null) {
    return null;
  }

  return (
    <div className="p-8 text-center items-center justify-center flex bg-white  w-full space-x-12 border-t-4 border-t-indigo-500">
      <div>
        <a className="font-bold text-xl hover:underline" href="/">
          Paprback
        </a>
      </div>
      <SearchBar query={query} setQuery={setQuery} />

      {isLogged ? (
        <UserMenu />
      ) : (
        <div className="flex gap-6 pl-6">
          <Link
            className="font-semibold text-lg p-3 transition-colors duration-200 rounded-lg hover:bg-slate-100 hover:shadow-sm"
            href="/signin"
          >
            Sign In
          </Link>
          <Link
            className="font-semibold text-lg p-3 text-white bg-indigo-500 transition-colors duration-200 rounded-lg hover:bg-slate-600 hover:shadow-sm"
            href="/signup"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}
