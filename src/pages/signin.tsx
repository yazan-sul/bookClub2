import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import SigninForm from "@/components/forms/signinForm";
import SubmitButton from "@/components/defaultComponents/formButton";
import Spinner from "@/components/defaultComponents/spinner";
import { ErrorToast, SuccessToast } from "@/utils/toast";
import { useAuth } from "@/context/AuthContext";

export default function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
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
        SuccessToast("login success!!");
        login(data.user_id, data.username);

        router.push("/");
      }
    } catch (error) {
      ErrorToast("failed to sign in!");
    } finally {
      setLoading(false);
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
            {loading ? <Spinner /> : <SubmitButton value="Sign in" />}
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
