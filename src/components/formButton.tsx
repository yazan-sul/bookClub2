export default function FormButton({value} :{value : string}) {
  return (
    <div className="pt-4">
      <button
        type="submit"
        className="font-bold text-xl w-full bg-slate-900 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        {value}
      </button>
    </div>
  );
}
