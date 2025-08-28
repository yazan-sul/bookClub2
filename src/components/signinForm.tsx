import InputField from "./InputField";

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
        ref={usernameRef}
        placeHolder={"yazan"}
        type="text"
      />
      <InputField
        label="Password"
        name="password"
        ref={passwordRef}
        placeHolder={""}
        type="password"
      />
    </div>
  );
}
