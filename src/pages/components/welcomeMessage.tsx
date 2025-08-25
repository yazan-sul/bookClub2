
export default function WelcomeMessage({name} :{ name : string}) {
  return (
    <div className="my-8">
      <h1 className="font-bold text-3xl py-2">Welcome back, {name} 👋</h1>
      <p className="text-sm text-slate-700 ">What would you like to read today?</p>
    </div>
  );
}
