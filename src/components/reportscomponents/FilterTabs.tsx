interface Props {
  active: string;
  setActive: (value: string) => void;
}

const tabs = ["All", "Open", "Reviewed", "Resolved"];

export default function FilterTabs({ active, setActive }: Props) {
  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`px-4 py-1.5 text-sm rounded-md border transition
          ${
            active === tab
              ? "bg-green-700 text-white border-green-700"
              : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}