export default function BookPageButtons() {
  return (
    <div className="flex w-full space-x-12">
        <button className="font-semibold bg-purple-200 text-indigo-700 py-2 px-4 rounded-md transition-colors duration-200 hover:text-white hover:bg-indigo-700 ">Reading</button>
        <button className="font-semibold bg-blue-100 text-blue-500 py-2 px-4 rounded-md transition-colors duration-200 hover:text-white hover:bg-indigo-700 ">Save for later</button>
        <button className="font-semibold bg-green-100 text-green-500 py-2 px-4 rounded-md transition-colors duration-200  hover:bg-slate-200 ">Finished</button>
    </div>
  );
}
