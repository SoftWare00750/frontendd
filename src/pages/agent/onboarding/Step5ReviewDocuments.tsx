import { useEffect } from "react";
import { ArrowLeft, Info, FileText, Camera, User, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  next: () => void;
  prev: () => void;
  currentStep?: number;   // ← add this
  totalSteps?: number;    // ← add this
  onComplete: (complete: boolean) => void;
  isComplete: boolean;
}

const submittedDetails = [
  { id: 1, icon: <FileText size={18} className="text-green-700" strokeWidth={1.8} />, label: "Government ID", value: "NIN - 1234567890" },
  { id: 2, icon: <Camera size={18} className="text-green-700" strokeWidth={1.8} />, label: "Selfie Verification", value: "Completed" },
  { id: 3, icon: <User size={18} className="text-green-700" strokeWidth={1.8} />, label: "Full Name", value: "John Doe" },
  { id: 4, icon: <Briefcase size={18} className="text-green-700" strokeWidth={1.8} />, label: "Area of Operation", value: "Lekki, Lagos" },
];

export default function Step5ReviewDetails({ next, prev, onComplete }: Props) {

  useEffect(() => { onComplete(true); }, []);

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
            Step <span className="text-green-600 font-semibold">5</span> of 5
          </p>
          <p className="text-sm font-semibold text-green-900">100%</p>
        </div>
        <div className="w-full h-1.5 rounded-full bg-gray-200 overflow-hidden">
          <div className="h-full rounded-full bg-green-500 transition-all duration-500" style={{ width: "100%" }} />
        </div>
      </div>

      {/* Heading */}
      <div className="mb-4 shrink-0">
        <h1 className="text-2xl font-bold text-green-900 mb-1">Review & Submit</h1>
        <p className="text-sm text-gray-500 leading-snug">
          Please review your information before submitting for verification
        </p>
      </div>

      {/* Submitted Details Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-3 shrink-0">
        <p className="text-sm font-semibold text-gray-800 mb-3">Submitted Details</p>
        <div className="space-y-3">
          {submittedDetails.map((item, index) => (
            <div key={item.id}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "#d4f8e5" }}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                </div>
              </div>
              {index < submittedDetails.length - 1 && <div className="mt-3 border-t border-gray-100" />}
            </div>
          ))}
        </div>
      </div>

      {/* Please Note Info Card */}
      <div className="flex gap-3 rounded-xl p-3 shrink-0" style={{ backgroundColor: "#f9fbdc" }}>
        <Info size={18} className="text-gray-500 shrink-0 mt-0.5" strokeWidth={1.8} />
        <div>
          <p className="text-sm font-semibold text-gray-800 mb-0.5">Please note</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Verification typically takes 24-48 hours. You'll be notified once your account is verified
          </p>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom Buttons — always visible */}
      <div className="pb-8 pt-2 flex flex-col gap-3 shrink-0">
        <button
          onClick={next}
          className="w-full bg-green-900 text-white text-sm font-semibold py-4 rounded-2xl hover:bg-green-800 active:scale-[0.98] transition-all duration-150 shadow-md shadow-green-900/20"
        >
          Submit for Verification
        </button>
        <button
          onClick={prev}
          className="w-full bg-white border border-gray-200 text-gray-800 text-sm font-semibold py-4 rounded-2xl hover:bg-gray-50 active:scale-[0.98] transition-all duration-150"
        >
          Edit Information
        </button>
      </div>
    </div>
  );
}