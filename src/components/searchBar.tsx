import { useRouter } from "next/router";
import { useRef } from "react";

const SearchBar = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputRef.current?.value.trim();

    if (!query) return;

    router.push(`/search?q=${query}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center space-x-2 border rounded-md w-full max-w-4xl px-3 py-2 
                    bg-white hover:border-slate-300 
                    focus-within:border-blue-500 focus-within:ring focus-within:ring-blue-100"
    >
      <div>🔍</div>
      <input
        type="text"
        id="query"
        ref={inputRef}
        className="w-full bg-transparent placeholder:text-slate-400 focus:outline-none"
        placeholder="Search for a book..."
      />
      <button type="submit"></button>
    </form>
  );
};

export default SearchBar;
