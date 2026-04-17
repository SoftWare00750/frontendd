import { useState } from "react";
import ProgressBar from "../../../components/shared/ProgressBar";
import Step1UploadID from "./Step1UploadID";
import Step2IDDetails from "./Step2IdDetails";
import Step3Selfie from "./Step3TakeSelfie";
import Step4BusinessUpload from "./Step4BusinessUpload";
import { LeftSection } from "../../../components/shared/LeftSection";
import Step5ReviewDetails from "./Step5ReviewDocuments";
import Verification from "./Verification";
import { useNavigate } from "react-router-dom";

export default function StepForm() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [stepComplete, setStepComplete] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const markStep = (s: number, complete: boolean) =>
    setStepComplete((prev) => ({ ...prev, [s]: complete }));

  const next = () => {
    if (step < 5 && !stepComplete[step]) return;
    setStep((s) => Math.min(s + 1, 6));
  };

  const prev = () => {
    if (step === 1) {
      navigate(-1);
    } else {
      setStep((s) => Math.max(s - 1, 1));
    }
  };

  if (step === 6) {
    return <Verification prev={() => setStep(5)} />;
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 max-w-7xl mx-auto">
      {/* LEFT SIDE — hidden on mobile */}
      <div className="hidden lg:block">
        <LeftSection />
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-[rgb(242,253,245)] flex flex-col min-h-screen md:min-h-0">
        {/* Header — hidden on mobile, visible on md+ */}
        <div className="hidden md:flex items-center gap-2 mb-5 border-b py-3 border-b-gray-300">
          <img
            src="/logo.svg"
            alt="OgaLandlord Logo"
            className="pb-5 px-10 md:w-[35%] w-[50%]"
          />
        </div>

        {/* Progress Bar — hidden on mobile, visible on md+ */}
        <div className="hidden md:block px-10">
          <ProgressBar step={step} total={5} />
        </div>

        {/* Step content — full height on mobile, centered on desktop */}
        <div className="flex-1 flex flex-col md:items-center md:justify-center md:px-6">
          {step === 1 && (
            <Step1UploadID
              next={next}
              prev={prev}
              currentStep={1}
              totalSteps={5}
              onComplete={(complete) => markStep(1, complete)}
              isComplete={stepComplete[1]}
            />
          )}
          {step === 2 && (
            <Step2IDDetails
              next={next}
              prev={prev}
              currentStep={2}
              totalSteps={5}
              onComplete={(complete) => markStep(2, complete)}
              isComplete={stepComplete[2]}
            />
          )}
          {step === 3 && (
            <Step3Selfie
              next={next}
              prev={prev}
              currentStep={3}
              totalSteps={5}
              onComplete={(complete) => markStep(3, complete)}
              isComplete={stepComplete[3]}
            />
          )}
          {step === 4 && (
            <Step4BusinessUpload
              next={next}
              prev={prev}
              currentStep={4}
              totalSteps={5}
              onComplete={(complete) => markStep(4, complete)}
              isComplete={stepComplete[4]}
            />
          )}
          {step === 5 && (
            <Step5ReviewDetails
              next={next}
              prev={prev}
              currentStep={5}
              totalSteps={5}
              onComplete={(complete) => markStep(5, complete)}
              isComplete={stepComplete[5]}
            />
          )}
        </div>

        {/* Footer — hidden on mobile, visible on md+ */}
        <div className="hidden md:flex justify-between text-xs md:px-10 px-5 text-gray-500 mt-12 border-t border-gray-300 pt-5">
          <span>© {new Date().getFullYear()} OgaLandlord</span>
          <div className="flex gap-5">
            <span className="hover:underline cursor-pointer">Privacy</span>
            <span className="hover:underline cursor-pointer">Terms</span>
            <span className="hover:underline cursor-pointer">Get help</span>
          </div>
        </div>
      </div>
    </div>
  );
}