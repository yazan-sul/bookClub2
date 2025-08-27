import React from "react";
import { User } from "./profileCard";

interface UserFormFieldsProps {
  user: User
  firstNameRef: React.Ref<HTMLInputElement>;
  lastNameRef: React.Ref<HTMLInputElement>;
  aboutRef: React.Ref<HTMLInputElement>;
  locationRef: React.Ref<HTMLInputElement>;
}

const SettingsForm: React.FC<UserFormFieldsProps> = ({
  user,
  firstNameRef,
  lastNameRef,
  aboutRef,
  locationRef,
}) => {
  return (
    <>
      <div>
        <label
          htmlFor="firstname"
          className="block text-lg font-semibold text-gray-700"
        >
          First Name
        </label>
        <input
          id="firstname"
          type="text"
          ref={firstNameRef}
          defaultValue={user.first_name ?? ""}
          className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="lastname"
          className="block text-lg font-semibold text-gray-700"
        >
          Last Name
        </label>
        <input
          id="lastname"
          type="text"
          ref={lastNameRef}
          defaultValue={user.last_name ?? ""}
          className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="about"
          className="block text-lg font-semibold text-gray-700"
        >
          About
        </label>
        <input
          id="about"
          type="text"
          ref={aboutRef}
          defaultValue={user.bio ?? ""}
          className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-lg font-semibold text-gray-700"
        >
          Location
        </label>
        <input
          id="location"
          type="text"
          ref={locationRef}
          defaultValue={user.location ?? ""}
          className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </>
  );
};

export default SettingsForm;
