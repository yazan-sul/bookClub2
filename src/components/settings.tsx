import FormButton from "@/components/formButton";
import { User } from "@/components/profileCard";
import { useRef, useState, FormEvent } from "react";
import SettingsForm from "./settingsForm";

export default function Settings({ user }: { user: User }) {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const firstNameConst = firstNameRef.current?.value;
  const lastNameConst = lastNameRef.current?.value;
  const aboutConst = aboutRef.current?.value;
  const locationConst = locationRef.current?.value;
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const updatedData = {
      firstName: firstNameConst,
      lastName: lastNameConst,
      about: aboutConst,
      location: locationConst,
    };

    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("You are not authenticated.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(
        `https://bookclub-backend.nn.r.appspot.com/api/v1/${user.user_id}/profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      const result = await response.text();

      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.status}`);
      }
      localStorage.setItem("firstName", firstNameConst || "");
      localStorage.setItem("lastName", lastNameConst || "");
      localStorage.setItem("about", aboutConst || "");
      localStorage.setItem("location", locationConst || "");

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

          {success && (
            <p className="text-green-600 mt-2">Profile updated successfully!</p>
          )}
          {error && <p className="text-red-600 mt-2">Error: {error}</p>}
        </form>
      </div>
    </div>
  );
}
