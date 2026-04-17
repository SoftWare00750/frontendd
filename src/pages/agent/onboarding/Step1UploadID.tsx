import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadBox from "../../../components/agent/UploadBox";
import InfoCard from "../../../components/shared/InfoCard";

interface Props {
  next: () => void;
  prev?: () => void;
  currentStep?: number;
  totalSteps?: number;
  onComplete: (complete: boolean) => void;
  isComplete: boolean;
}

export default function Step1UploadID({
  next,
  prev,
  currentStep = 1,
  totalSteps = 5,
  onComplete,
  isComplete,
}: Props) {
  const navigate = useNavigate();
  const progress = Math.round((currentStep / totalSteps) * 100);

  const [idType, setIdType] = useState("");
  const [idFile, setIdFile] = useState<File | null>(null);

  const handleBack = () => {
    if (prev) prev();
    else navigate(-1);
  };

  const handleIdTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setIdType(value);
    onComplete(!!value && !!idFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setIdFile(file);
    onComplete(!!idType && !!file);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#e8f5ee]">

      {/* ══════════════════════════════════════════════
          MOBILE LAYOUT  (hidden on md+)
      ══════════════════════════════════════════════ */}
      <div className="flex flex-col h-screen md:hidden">

        {/* Back arrow */}
        <div className="shrink-0 h-14 flex items-center px-5">
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="flex items-center justify-center w-9 h-9 bg-transparent border-none cursor-pointer p-0"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a4d2e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">

          {/* Step indicator + progress bar */}
          <div className="px-5 pb-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-[13px] text-gray-500">
                Step <span className="text-[#1a4d2e] font-semibold">{currentStep}</span> of {totalSteps}
              </p>
              <span className="text-[13px] font-semibold text-[#1a4d2e]">{progress}%</span>
            </div>
            <div className="w-full h-[6px] rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#1a4d2e] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Heading */}
          <div className="px-5 mb-4">
            <h1 className="text-[26px] font-extrabold text-[#1a4d2e] mb-1 leading-tight">
              Upload Government ID
            </h1>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              Verify your identity with a valid government-issued ID
            </p>
          </div>

          {/* Select ID Type */}
          <div className="px-5 mb-4">
            <label className="block text-[13px] font-medium text-gray-800 mb-1.5">
              Select ID Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={idType}
                onChange={handleIdTypeChange}
                className="w-full appearance-none bg-white border border-gray-200 rounded-xl py-[14px] pl-4 pr-10 text-[14px] text-gray-400 outline-none focus:border-[#1a4d2e] transition-colors duration-200 font-[inherit] cursor-pointer"
              >
                <option value="" disabled>Choose ID Type</option>
                <option value="national">National ID</option>
                <option value="drivers">Driver's License</option>
                <option value="passport">International Passport</option>
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Upload ID Image */}
          <div className="px-5 mb-4">
            <label className="block text-[13px] font-medium text-gray-800 mb-1.5">
              Upload ID Image <span className="text-red-500">*</span>
            </label>
            <div className="bg-white border border-gray-200 rounded-2xl p-3">
              <label className="flex flex-col items-center justify-center py-7 px-4 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer active:bg-gray-50 transition-colors duration-150">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                {idFile ? (
                  <p className="text-[13px] font-semibold text-[#1a4d2e]">{idFile.name}</p>
                ) : (
                  <>
                    <p className="text-[14px] font-semibold text-gray-700 mb-1">Tap to upload</p>
                    <p className="text-[12px] text-gray-400">PNG, JPG up to 5MB</p>
                  </>
                )}
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          {/* Tips card */}
          <div className="px-5 pb-4">
            <div className="bg-[#fefce8] border border-[#fef08a] rounded-2xl px-4 py-3 flex items-start gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#854d0e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <div>
                <p className="text-[13px] font-bold text-gray-800 mb-0.5">Tips</p>
                <p className="text-[12px] text-gray-600 leading-relaxed">
                  Ensure your details are clearly visible and the image is not blurry
                </p>
              </div>
            </div>
          </div>

        </div>
        {/* End scrollable content area */}

        {/* Continue — pinned to bottom, disabled until complete */}
        <div className="shrink-0 px-5 pb-10 pt-3 bg-[#e8f5ee]">
          <button
            type="button"
            onClick={next}
            disabled={!isComplete}
            className={`w-full py-[15px] rounded-xl text-[15px] font-bold border-none font-[inherit] transition-all duration-200
              ${isComplete
                ? "bg-[#1a4d2e] text-white cursor-pointer shadow-[0_4px_18px_rgba(26,77,46,0.22)] hover:bg-[#163d24]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            Continue
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          DESKTOP LAYOUT  (hidden below md)
      ══════════════════════════════════════════════ */}
      <div className="hidden md:flex md:flex-col md:items-center md:justify-center md:flex-1 md:py-10">
        <div className="max-w-md w-full space-y-6 px-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-green-900">Upload Government ID</h2>
            <p className="text-sm text-gray-600">Verify your identity with a valid government-issued ID</p>
          </div>

          <div>
            <label className="text-sm font-medium">Select ID Type *</label>
            <select
              value={idType}
              onChange={handleIdTypeChange}
              className="w-full mt-2 border rounded-lg p-3"
            >
              <option value="" disabled>Choose ID Type</option>
              <option value="national">National ID</option>
              <option value="drivers">Driver's License</option>
              <option value="passport">International Passport</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Upload ID Image *</label>
            <div className="mt-2">
              <UploadBox onChange={handleFileChange} fileName={idFile?.name} />
            </div>
          </div>

          <InfoCard
            title="Tips"
            desc="Ensure your details are clearly visible and the image is not blurry."
            children={``}
          />

          {/* Spacer */}
          <div className="flex-1" />

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
      </div>
    </div>
  );
}