import { LeftSection } from "./../../../components/shared/LeftSection";
import LoginForm from "./../../../components/agent/LoginForm";

export default function Login() {
  return (
    <div className="h-screen flex overflow-hidden">

      {/* LEFT PANEL — hidden on mobile, shown on md+ */}
      <div className="hidden md:block md:w-[45%] flex-shrink-0 overflow-hidden">
        <LeftSection />
      </div>

      {/* RIGHT PANEL — full width on mobile, remainder on desktop */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <LoginForm />
      </div>

    </div>
  );
}