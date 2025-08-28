import InputField from "./InputField";

export default function SignupForm({
  emailRef,
  usernameRef,
  passwordRef,
}: {
  emailRef: React.RefObject<HTMLInputElement>;
  usernameRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
}) {
  return (
    <div>
      <InputField
        label="Email Address"
        name="emailAddress"
        ref={emailRef}
        placeHolder={"user@gmail.com"}
        type="text"
      />
      <InputField
        label="Username"
        name="username"
        ref={usernameRef}
        placeHolder={"yazan123"}
        type="text"
      />
      <div>
        <InputField
          label="Password"
          name="password"
          ref={passwordRef}
          placeHolder={""}
          type="password"
        />
      </div>
    </div>
  );
}
