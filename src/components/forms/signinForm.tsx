import InputField from "../core/InputField";

export default function SigninForm({
  usernameRef,
  passwordRef,
}: {
  usernameRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
}) {
  return (
    <div>
      <InputField
        label="Username"
        name="username"
        inputRef={usernameRef}
        placeHolder={"yazan"}
        type="text"
      />
      <InputField
        label="Password"
        name="password"
        inputRef={passwordRef}
        placeHolder={""}
        type="password"
      />
    </div>
  );
}
