import React from "react";
import { User } from "./profileCard";
import InputField from "./InputField";

interface UserFormFieldsProps {
  user: User;
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
      <InputField
        label="First name"
        name="firstname"
        ref={firstNameRef}
        defaultValue={user.first_name ?? ""}
        type="text"
      />
      <InputField
        label="Last Name"
        name="lastname"
        ref={lastNameRef}
        defaultValue={user.last_name ?? ""}
        type="text"
      />
      <InputField
        label="about"
        name="about"
        ref={aboutRef}
        defaultValue={user.bio ?? ""}
        type="text"
      />
      <InputField
        label="location"
        name="location"
        ref={locationRef}
        defaultValue={user.location ?? ""}
        type="text"
      />
    </>
  );
};

export default SettingsForm;
