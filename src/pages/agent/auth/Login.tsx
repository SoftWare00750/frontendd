import { LeftSection } from "./../../../components/shared/LeftSection";
import LoginForm from "./../../../components/agent/LoginForm";

export default function Login() {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 ">
      {/* LEFT PANEL */}
      <div className=" hidden md:block">
        <LeftSection />
      </div>

      {/* RIGHT PANEL */}
      <div
      >
        <LoginForm />
      </div>
    </div>
  );
}