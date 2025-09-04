import React from "react";
import { User } from "../../type/types";
import InputField from "../defaultComponents/InputField";

interface UserFormFieldsProps {
  user: User;
}

const SettingsForm: React.FC<UserFormFieldsProps> = ({ user }) => {
  return (
    <div>
      <InputField
        label="First name"
        name="firstName"
        defaultValue={user.first_name ?? ""}
        type="text"
      />
      <InputField
        label="Last Name"
        name="lastName"
        defaultValue={user.last_name ?? ""}
        type="text"
      />
      <InputField
        label="bio"
        name="bio"
        defaultValue={user.bio ?? ""}
        type="text"
      />
      <InputField
        label="location"
        name="location"
        defaultValue={user.location ?? ""}
        type="text"
      />
    </div>
  );
};

export default SettingsForm;
