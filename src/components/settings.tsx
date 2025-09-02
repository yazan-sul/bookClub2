import SubmitButton from "@/components/formButton";
import { User } from "@/type/types";
import { useRef, useState, FormEvent } from "react";
import SettingsForm from "./settingsForm";
import Spinner from "./spinner";
import { parse } from "cookie";
import { ErrorToast, SuccessToast } from "@/utils/toast";

export default function Settings({ user }: { user: User }) {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
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
      return;
    }
    setLoading(true);

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

      const text = await response.text();
      document.cookie = `first_name=${updatedData.firstName}; path=/`;
      document.cookie = `last_name=${updatedData.lastName}; path=/`;
      document.cookie = `bio=${updatedData.about}; path=/`;
      document.cookie = `location=${updatedData.location}; path=/`;

      SuccessToast("Updated!");
    } catch (err) {
      ErrorToast("Failed to update!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full space-y-8 mb-20">
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
          <SubmitButton value={loading ? "Saving..." : "Save"} />

          {loading && (
            <div>
              <Spinner />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
