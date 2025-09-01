import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/router";
import SigninForm from "@/components/signinForm";
import FormButton from "@/components/formButton";

export default function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    try {
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        throw Error("Failed to login");
      } else {
        const data = await res.json();

        router.push("/");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };
  return (
    <div className="flex flex-col items-center w-full space-y-8">
      <div className="block bg-white rounded-md p-12 w-[400px] mx-auto mt-10 shadow-md border">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold">Paprback</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <SigninForm usernameRef={usernameRef} passwordRef={passwordRef} />
            <FormButton value="Sign in" />
          </form>
        </div>
      </div>
      <Link
        className="hover:underline transition-all duration-200"
        href="./signup"
      >
        Don't have an account? Sign up here
      </Link>
    </div>
  );
}
