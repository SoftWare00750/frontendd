import { useState } from "react";
import { ArrowLeft, Info } from "lucide-react";

interface Props {
  next: () => void;
  prev: () => void;
  currentStep?: number;   // ← add this
  totalSteps?: number;    // ← add this
  onComplete: (complete: boolean) => void;
  isComplete: boolean;
}

export default function Step2IDDetails({ next, prev, onComplete, isComplete }: Props) {
  const [idNumber, setIdNumber] = useState("");
  const [fullName, setFullName] = useState("");

  const validate = (id: string, name: string) => {
    onComplete(id.trim().length > 0 && name.trim().length > 0);
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdNumber(e.target.value);
    validate(e.target.value, fullName);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
    validate(idNumber, e.target.value);
  };

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
            Step <span className="text-green-600 font-semibold">2</span> of 5
          </p>
          <p className="text-sm font-semibold text-green-900">40%</p>
        </div>
        <div className="w-full h-1.5 rounded-full bg-gray-200 overflow-hidden">
          <div className="h-full rounded-full bg-green-500 transition-all duration-500" style={{ width: "40%" }} />
        </div>
      </div>

      {/* Heading */}
      <div className="mb-5 shrink-0">
        <h1 className="text-2xl font-bold text-green-900 mb-1">Enter ID Details</h1>
        <p className="text-sm text-gray-500 leading-snug">
          Provide your identification number and verify your name
        </p>
      </div>

      {/* ID Number Field */}
      <div className="mb-4 shrink-0">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          ID Number <span className="text-red-500 ml-0.5">*</span>
        </label>
        <input
          type="text"
          value={idNumber}
          onChange={handleIdChange}
          placeholder="Enter your NIN or Voter's Card number"
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
        />
      </div>

      {/* Full Name Field */}
      <div className="mb-5 shrink-0">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Full Name (as on ID) <span className="text-red-500 ml-0.5">*</span>
        </label>
        <input
          type="text"
          value={fullName}
          onChange={handleNameChange}
          placeholder="John Doe"
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
        />
      </div>

      {/* Info Card */}
      <div className="flex gap-3 rounded-xl p-4 shrink-0" style={{ backgroundColor: "#f9fbdc" }}>
        <Info size={18} className="text-gray-500 shrink-0 mt-0.5" strokeWidth={1.8} />
        <div>
          <p className="text-sm font-semibold text-gray-800 mb-0.5">Please Note That</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Make sure that the name matches exactly as it appears on your ID document
          </p>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Continue Button — always visible, disabled until complete */}
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