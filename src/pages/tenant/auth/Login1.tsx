// Login1.tsx — Tenant Login — Responsive Mobile
import { LeftSection2 } from "../../../components/shared/LeftSection2";
import LoginForm from "../../../components/tenant/LoginForm1";


// Mobile-aware Login1 page wrapper
export default function Login1() {
  return (
    <>
      {/* <style>{mobileStyles}</style> */}
      <div className="h-screen grid md:grid-cols-2 overflow-hidden w-full">
        {/* LEFT PANEL */}
        <div className="overflow-hidden w-full">
          <LeftSection2 />
        </div>

        {/* RIGHT PANEL */}
        <div className=" w-full " >
          <LoginForm />
        </div>
      </div>
    </>
  );
}