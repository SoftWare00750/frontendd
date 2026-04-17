import { useState } from "react";
import { ArrowLeft, Info, ChevronDown } from "lucide-react";

interface Props {
  next: () => void;
  prev: () => void;
  currentStep?: number;   // ← add this
  totalSteps?: number;    // ← add this
  onComplete: (complete: boolean) => void;
  isComplete: boolean;
}

const CITY_LGA: Record<string, string[]> = {
  Ibadan: ["Ibadan North", "Ibadan South-East", "Ibadan South-West", "Egbeda", "Oluyole"],
  Lagos: ["Ikeja", "Ikoyi", "Victoria Island", "Lekki", "Surulere", "Yaba", "Ajah"],
  Abuja: ["Garki", "Wuse", "Maitama", "Asokoro", "Gwarinpa"],
  PortHarcourt: ["Port Harcourt City", "Obio-Akpor", "Eleme", "Oyigbo"],
};

export default function Step4BusinessUpload({ next, prev, onComplete, isComplete }: Props) {
  const [city, setCity] = useState("");
  const [lga, setLga] = useState("");
  const lgaOptions = city ? CITY_LGA[city] ?? [] : [];

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
    setLga("");
    onComplete(false);
  };

  const handleLgaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLga(value);
    onComplete(!!city && !!value);
  };

  const selectClass = "w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition pr-10";

  return (
    <div className="h-screen w-full flex flex-col px-5" style={{ backgroundColor: "#f0f7f0" }}>

      {/* Back Arrow */}
      <button
        onClick={prev}
        className="mt-4 mb-3 w-8 h-8 shrink-0 flex items-center justify-center rounded-full hover:bg-green-100 transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft size={20} className="text-green-900" strokeWidth={2.2} />
      </button>

      {/* Progress */}
      <div className="mb-4 shrink-0">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-500">
            Step <span className="text-green-600 font-semibold">4</span> of 5
          </p>
          <p className="text-sm font-semibold text-green-900">80%</p>
        </div>
        <div className="w-full h-1.5 rounded-full bg-gray-200 overflow-hidden">
          <div className="h-full rounded-full bg-green-500 transition-all duration-500" style={{ width: "80%" }} />
        </div>
      </div>

      {/* Heading */}
      <div className="mb-5 shrink-0">
        <h1 className="text-2xl font-bold text-green-900 mb-1">Business Information</h1>
        <p className="text-sm text-gray-500 leading-snug">Tell us about your real estate business</p>
      </div>

      {/* Business Name (optional) */}
      <div className="mb-4 shrink-0">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Business Name <span className="text-gray-400 text-xs font-normal">(Optional)</span>
        </label>
        <input
          type="text"
          placeholder="Enter your business name"
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
        />
      </div>

      {/* City Select */}
      <div className="mb-4 shrink-0">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Select Area of Operation (City) <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select value={city} onChange={handleCityChange} className={selectClass}>
            <option value="" disabled>Select your area of operation</option>
            {Object.keys(CITY_LGA).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <ChevronDown size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* LGA Select */}
      <div className="mb-4 shrink-0">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Select LG Area <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            value={lga}
            onChange={handleLgaChange}
            disabled={!city}
            className={`${selectClass} disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            <option value="" disabled>Select your LG area</option>
            {lgaOptions.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <ChevronDown size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Info Card */}
      <div className="flex gap-3 rounded-xl p-4 shrink-0" style={{ backgroundColor: "#f9fbdc" }}>
        <Info size={18} className="text-gray-500 shrink-0 mt-0.5" strokeWidth={1.8} />
        <div>
          <p className="text-sm font-semibold text-gray-800 mb-1">We are only available in these areas</p>
          <ul className="space-y-0.5">
            {["Ibadan", "Lagos", "Abuja", "Port Harcourt"].map((area) => (
              <li key={area} className="text-xs text-gray-500 flex gap-1.5">
                <span>•</span><span>{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Continue — always visible, disabled until city + LGA selected */}
      <div className="pb-8 pt-2 shrink-0">
        <button
          onClick={next}
          disabled={!isComplete}
          className={`w-full text-sm font-semibold py-4 rounded-2xl active:scale-[0.98] transition-all duration-150
            ${isComplete
              ? "bg-green-900 text-white hover:bg-green-800 shadow-md shadow-green-900/20 cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}