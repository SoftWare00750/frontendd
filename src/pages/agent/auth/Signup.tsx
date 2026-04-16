import { LeftSection } from "../../../components/shared/LeftSection";
import SignupForm from "../../../components/agent/SignupForm";

export default function Signup() {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 ">
      {/* LEFT PANEL */}
      <div  className=" hidden md:block">
        <LeftSection />
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1">
        <SignupForm />
        {/* <Onboarding /> */}
      </div>
    </div>
  );
}