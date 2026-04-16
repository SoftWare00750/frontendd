import { CheckCircle, Shield, LineChartIcon } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "/assets/logo.svg";
import icons from "/assets/icons.svg";

export default function Onboarding() {
  return (
    // h-full fills whatever height the parent gives (100vh panel)
    <div className="h-full overflow-hidden bg-[rgb(242,253,245)] flex flex-col">

      {/* Logo — fixed height, never shrinks */}
      <div className="flex-shrink-0 flex items-center border-b border-gray-300 px-5 py-4">
        <Link to="/Home"><img src={logo} alt="OgaLandlord Logo" className="" /></Link>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto flex flex-col justify-center md:px-20 px-8 py-8">

        {/* Icons illustration */}
        <div className="flex items-center justify-center">
          <img src={icons} alt="OgaLandlord icons" className="px-10" />
        </div>

        {/* Heading */}
        <h2 className="text-[28px] font-semibold text-green-900 leading-snug text-center">
          Join OgaLandlord as a Verified Agent
        </h2>
        <p className="text-gray-600 text-[12px] mt-2 text-center">
          Get trusted by tenants and grow your business.
        </p>

        {/* Features */}
        <div className="space-y-4 mt-8">
          <div className="flex gap-3 items-center text-sm">
            <CheckCircle size={16} className="text-green-700 flex-shrink-0" />
            Verified agent badge
          </div>
          <div className="flex gap-3 items-center text-sm">
            <Shield size={16} className="text-green-700 flex-shrink-0" />
            Build trust with tenants
          </div>
          <div className="flex gap-3 items-center text-sm">
            <LineChartIcon size={16} className="text-green-700 flex-shrink-0" />
            Grow your rental business
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 mt-10">
          <Link
            to="/agent/signup"
            className="bg-green-900 text-white py-3 rounded-lg hover:bg-green-800 transition font-medium text-[16px] text-center"
          >
            Create Account
          </Link>
          <Link
            to="/agent/login"
            className="border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition font-medium text-[16px] text-center"
          >
            Log in
          </Link>
        </div>
      </div>

      {/* Footer — pinned at the bottom */}
      <div className="flex-shrink-0 flex justify-between text-xs md:px-10 px-5 text-gray-500 border-t border-gray-300 py-4">
        <span>© {new Date().getFullYear()} OgaLandlord</span>
        <div className="flex gap-5">
          <Link to="/privacy" className="hover:underline cursor-pointer">Privacy</Link>
          <Link to="/terms"   className="hover:underline cursor-pointer">Terms</Link>
          <Link to="/help"    className="hover:underline cursor-pointer">Get help</Link>
        </div>
      </div>
    </div>
  );
}