// Login1.tsx — Tenant Login — Responsive Mobile (Tailwind CSS)
import { LeftSection2 } from "../../../components/shared/LeftSection2";
import LoginForm from "../../../components/tenant/LoginForm1";

export default function Login1() {
  return (
    <div className="h-screen flex overflow-hidden">

      {/* LEFT PANEL — hidden on mobile, matches desktop split layout */}
      <div className="hidden md:block w-[45%] flex-shrink-0 overflow-hidden">
        <LeftSection2 />
      </div>

      {/* RIGHT PANEL — full width on mobile */}
      <div className="flex-1 min-w-0 overflow-hidden flex flex-col md:w-auto">
        <LoginForm />
      </div>

    </div>
  );
}