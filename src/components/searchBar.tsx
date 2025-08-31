import { useRouter } from "next/router";

interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

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
        className="w-full bg-transparent placeholder:text-slate-400 focus:outline-none"
        placeholder="Search for a book..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit"></button>
    </form>
  );
};

export default SearchBar;
