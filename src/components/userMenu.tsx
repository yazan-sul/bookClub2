import LogoutButton from "@/pages/logout";
import Link from "next/link";
import React, { useState } from "react";

const UserMenu = () => {
  const [open, setOpen] = useState(false);
    const username = localStorage.getItem("username");

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);
  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-2 px-4 py-2 bg-slate-200 border rounded-md shadow-sm hover:bg-slate-300"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span>{username}</span>
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M19 9l-7 7-7-7"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
        >
          <ul className="py-1">
            <li>
              <Link
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                role="menuitem"
                href="/"
                onClick={closeMenu}
              >
                🏠 Home
              </Link>
            </li>
            <li>
              <Link
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                role="menuitem"
                href={`/user/${username}`}
                onClick={closeMenu}
              >
                👤 Profile
              </Link>
            </li>
            <li>
              <Link
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                role="menuitem"
                href={`/user/${username}/settings`}
                onClick={closeMenu}
              >
                ⚙️ Settings
              </Link>
            </li>
            <li>
              <LogoutButton onLogout={closeMenu} />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
