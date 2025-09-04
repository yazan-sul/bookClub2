import React, { useState } from "react";
import Link from "next/link";
import UserMenu from "../userMenu";
import SearchBar from "../searchBar";
import { useAuth } from "@/context/AuthContext";

export default function HeaderBar() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="p-8 text-center items-center justify-center flex bg-white  w-full space-x-12 border-t-4 border-t-indigo-500">
      <div>
        <Link className="font-bold text-xl hover:underline" href="/">
          Paprback
        </Link>
      </div>
      <SearchBar />
      {isLoggedIn ? (
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
