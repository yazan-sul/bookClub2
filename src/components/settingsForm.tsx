import React from "react";
import { User } from "./profileCard";
import InputField from "./InputField";

interface UserFormFieldsProps {
  user: User;
  firstNameRef: React.RefObject<HTMLInputElement>;
  lastNameRef: React.RefObject<HTMLInputElement>;
  aboutRef: React.RefObject<HTMLInputElement>;
  locationRef: React.RefObject<HTMLInputElement>;
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
      <InputField
        label="First name"
        name="firstname"
        inputRef={firstNameRef}
        defaultValue={user.first_name ?? ""}
        type="text"
      />
      <InputField
        label="Last Name"
        name="lastname"
        inputRef={lastNameRef}
        defaultValue={user.last_name ?? ""}
        type="text"
      />
      <InputField
        label="about"
        name="about"
        inputRef={aboutRef}
        defaultValue={user.bio ?? ""}
        type="text"
      />
      <InputField
        label="location"
        name="location"
        inputRef={locationRef}
        defaultValue={user.location ?? ""}
        type="text"
      />
    </>
  );
};

export default SettingsForm;
