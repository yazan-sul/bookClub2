import { useShelfChange } from "@/hooks/useShelfChange";
import { useAuth } from "@/context/AuthContext";
import { VolumeData } from "@/type/types";

type BookActionsProps = {
  volumeData: VolumeData;
  accessToken: string;
  foundShelf: string | null;
};

export default function BookActions({
  volumeData,
  accessToken,
}: BookActionsProps) {
  const { userId } = useAuth();
  const { loadingShelf, currentShelf, handleShelfChange } = useShelfChange({
    userId: userId,
    accessToken: accessToken ?? undefined,
    volumeData,
  });

  const renderButton = (
    label: string,
    shelf: string,
    color: keyof typeof colorClasses
  ) => (
    <button
      onClick={() => handleShelfChange(shelf)}
      disabled={loadingShelf === shelf}
      className={`btn font-semibold py-2 px-4 rounded-md transition-colors duration-200 hover:text-white ${
        colorClasses[color]
      } ${currentShelf === shelf ? "ring-2 ring-gray-700" : ""}`}
    >
      {loadingShelf === shelf ? "Saving..." : label}
    </button>
  );

  return (
    <div className="space-x-2 mt-4">
      {renderButton("Reading", "currently_reading", "purple")}
      {renderButton("Save for Later", "want_to_read", "blue")}
      {renderButton("Finished", "previously_read", "green")}
    </div>
  );
}
const colorClasses: Record<string, string> = {
  purple: "bg-purple-100 text-purple-500 hover:bg-purple-500",
  blue: "bg-blue-100 text-blue-500 hover:bg-blue-500",
  green: "bg-green-100 text-green-500 hover:bg-green-500",
};
