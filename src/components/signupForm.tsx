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
      <div>
        <label
          htmlFor="emailAddress"
          className="block  text-lg font-semibold  text-gray-700"
        >
          Email Address
        </label>
        <input
          id="emailAddress"
          type="email"
          ref={emailRef}
          placeholder="yazan@gmail.com"
          className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="username"
          className="block  text-lg font-semibold  text-gray-700"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          ref={usernameRef}
          placeholder="yazan"
          className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block  text-lg font-semibold  text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          ref={passwordRef}
          placeholder="••••••••"
          className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
    </div>
  );
}
