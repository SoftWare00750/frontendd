import { LeftSection } from "../../../components/shared/LeftSection";
import SignupForm from "../../../components/agent/SignupForm";

export default function Signup() {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* LEFT PANEL — hidden on mobile */}
      <div className="hidden md:block w-[45%] flex-shrink-0 overflow-hidden">
        <LeftSection />
      </div>

      {/* RIGHT PANEL — full width on mobile */}
      <div className="flex-1 min-w-0 overflow-hidden flex flex-col">
        <SignupForm />
      </div>
    </div>
  );
}