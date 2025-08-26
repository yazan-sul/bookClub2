import LogoutButton from "@/pages/logout";
import Link from "next/link";
import React, { useState } from "react";

interface User {
  name: string;
}

interface UserMenuProps {
  user: User;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [open, setOpen] = useState(false);

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
        <span>{user.name}</span>
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
              >
                🏠 Home
              </Link>
            </li>
            <li>
              <Link
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                role="menuitem"
                href="/profile"
              >
                👤 Profile
              </Link>
            </li>
            <li>
              <Link
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                role="menuitem"
                href="/settings"
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
