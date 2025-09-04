import SubmitButton from "@/components/defaultComponents/formButton";
import { User } from "@/type/types";
import { useRef, useState, FormEvent } from "react";
import SettingsForm from "./settingsForm";
import Spinner from "../defaultComponents/spinner";
import { ErrorToast, SuccessToast } from "@/utils/toast";

export default function Settings({ user }: { user: User }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    const target = e.target as typeof e.target & {
      firstName: { value: string };
      lastName: { value: string };
      bio: { value: string };
      location: { value: string };
    };
    const updatedData = {
      first_name: target.firstName.value,
      last_name: target.lastName.value,
      bio: target.bio.value,
      location: target.location.value,
    };

    setLoading(true);

    try {
      const response = await fetch(`/api/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

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
          <SettingsForm user={user} />
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
