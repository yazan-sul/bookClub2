export default function HeaderBar() {
  return (
    <div className="p-8 text-center items-center justify-center flex bg-white  w-full space-x-12">
      <div>
        <a className="font-bold text-xl hover:underline" href="/">
          Paprback
        </a>
      </div>
      <div
        className="flex items-center justify-center space-x-2 border rounded-md w-full max-w-4xl px-3 py-2 
                    bg-white hover:border-slate-300 
                    focus-within:border-blue-500 focus-within:ring focus-within:ring-blue-100"
      >
        <div>🔍</div>
        <input
        className="w-full bg-transparent placeholder:text-slate-400 focus:outline-none"
          type="text"
          placeholder="Search for a book..."
        />
      </div>
      <div>
        <h1>drop down menu</h1>
      </div>
    </div>
  );
}
