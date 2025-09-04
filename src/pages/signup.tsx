import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import SignupForm from "@/components/forms/signupForm";
import SubmitButton from "@/components/defaultComponents/formButton";
import { fetchUserProfileClient } from "@/utils/userData";
import Spinner from "@/components/defaultComponents/spinner";
import { ErrorToast, SuccessToast } from "@/utils/toast";
import { useAuth } from "@/context/AuthContext";

export default function Signup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const email = emailRef.current?.value || "";
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });
      if (!res.ok) {
        throw Error("Failed to regiester");
      } else {
        const data = await res.json();

        fetchUserProfileClient(username);
        SuccessToast("Signup success!!");
        login(data.user_id, data.username);

        router.push("/");
      }
    } catch (error) {
      ErrorToast("failed to sign up!");
    } finally {
      setLoading(false);
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
            <SignupForm
              emailRef={emailRef}
              usernameRef={usernameRef}
              passwordRef={passwordRef}
            />
            {loading ? <Spinner /> : <SubmitButton value="Sign up" />}
          </form>
        </div>
      </div>
      <Link
        className="hover:underline transition-all duration-200"
        href="./signin"
      >
        Already have an account? Sign in here
      </Link>
    </div>
  );
}
