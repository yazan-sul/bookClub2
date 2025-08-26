import Link from "next/link";
import { notFound } from "next/navigation";
import { useRef } from "react";
import { useRouter } from "next/router";

export default function Signup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value || "";
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    try {
      const res = await fetch(
        `https://bookclub-backend.nn.r.appspot.com/api/v1/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, password }),
        }
      );
      if (!res.ok) {
        throw Error("Failed to regiester");
      } else {
        const data = await res.json();

        const profile = await fetch(`/api/profile?user_id=${data.user_id}`);
        const profileData = await profile.json();
        await router.push("/");
      }
    } catch (error) {
      return notFound;
    }
  };
  return (
    <div className="flex flex-col items-center w-full space-y-8">
      <div className="block bg-white rounded-md p-12 w-[400px] mx-auto mt-10 shadow-md border">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold">Paprback</h2>
          <p className="text-gray-600">Sign up and build your bookshelf</p>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="emailAddress"
                className="block  text-lg font-semibold  text-gray-700"
              >
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                ref={emailRef}
                placeholder="yazan@gmail.com"
                className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block  text-lg font-semibold  text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                ref={usernameRef}
                placeholder="yazan"
                className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block  text-lg font-semibold  text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                ref={passwordRef}
                placeholder="••••••••"
                className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="pt-4">
              <button
                type="submit"
                className="font-bold text-xl w-full bg-slate-900 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
      <Link
        className="hover:underline transition-all duration-200"
        href="./singing"
      >
        Already have an account? Sign in here
      </Link>
    </div>
  );
}
