import FormButton from "@/components/formButton";
import { User } from "@/components/profileCard";
import { useRef, useState, FormEvent } from "react";
import SettingsForm from "./settingsForm";
import Spinner from "./spinner";
import { parse } from "cookie";

export default function Settings({ user }: { user: User }) {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      firstName: { value: string };
      lastName: { value: string };
      about: { value: string };
      location: { value: string };
    };
    const updatedData = {
      firstName: target.firstName.value,
      lastName: target.lastName.value,
      about: target.about.value,
      location: target.location.value,
    };

    const cookies = parse(document.cookie || "");
    const access_token = cookies.access_token;

    if (!access_token) {
      setError("You are not authenticated.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/${user.user_id}/profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );
      const contentType = response.headers.get("content-type");

      const text = await response.text();

      localStorage.setItem("firstName", updatedData.firstName);
      localStorage.setItem("lastName", updatedData.lastName);
      localStorage.setItem("about", updatedData.about);
      localStorage.setItem("location", updatedData.location);
      setSuccess(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full space-y-8">
      <div className="text-center mt-12">
        <h2 className="text-2xl font-bold">Paprback</h2>
      </div>
      <div className="block bg-white rounded-md p-12 w-[600px] mx-auto mt-10 shadow-md border">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <SettingsForm
            user={user}
            firstNameRef={firstNameRef}
            lastNameRef={lastNameRef}
            aboutRef={aboutRef}
            locationRef={locationRef}
          />
          <FormButton value={loading ? "Saving..." : "Save"} />

          {loading && (
            <div>
              <Spinner />
            </div>
          )}
          {success && (
            <p className="text-green-600 mt-2">Profile updated successfully!</p>
          )}
          {error && <p className="text-red-600 mt-2">Error: {error}</p>}
        </form>
      </div>
    </div>
  );
}
