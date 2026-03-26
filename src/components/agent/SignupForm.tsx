import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../shared/Input";
import { Eye, EyeOff } from "lucide-react";
import logo from "/assets/logo.svg";

export default function Onboarding() {
  const [showPassword, setShowPassword] = useState<boolean | null>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const HandleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
  };

  return (
    // h-full fills whatever height the parent gives (100vh panel)
    <div className="h-full overflow-hidden bg-[rgb(242,253,245)] flex flex-col">

      {/* Logo — fixed height, never shrinks */}
      <div className="flex-shrink-0 flex items-center border-b border-gray-300 px-10 py-4">
        <img
          src={logo}
          alt="OgaLandlord Logo"
          className="md:w-[35%] w-[50%]"
        />
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto md:px-20 px-8 py-8">
        <h2 className="md:text-[28px] text-[16px] font-semibold text-green-900 leading-snug text-left">
          Create Account
        </h2>
        <p className="text-gray-600 text-[12px] mt-2 text-left">
          Join as a verified agent and start listing properties.
        </p>

        <form className="flex flex-col gap-4 mt-8" onSubmit={HandleSignup}>
          <div className="flex flex-col">
            <label htmlFor="fullName" className="text-[13px] pb-2">
              Full Name<span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter your full name"
              className="bg-white py-2.5 border border-gray-300 rounded-sm p-2 outline-green-900 transition-colors duration-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="text-[13px] pb-2">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="081234567890"
              className="bg-white py-2.5 border border-gray-300 rounded-sm p-2 outline-green-900 transition-colors duration-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-[13px] pb-2">
              Email (Optional)
            </label>
            <Input
              type="email"
              placeholder="Enter your email here"
              className="bg-white py-2.5 border border-gray-300 rounded-sm p-2 outline-green-900 transition-colors duration-500"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-[13px] pb-2">
              Password<span className="text-red-500">*</span>
            </label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              className="bg-white py-2.5 border border-gray-300 rounded-sm p-2 outline-green-900 transition-colors duration-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[58%] cursor-pointer"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-900 text-white py-3 rounded-lg hover:bg-green-800 transition font-medium text-[16px] flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading && (
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {isLoading ? "Creating account..." : "Create account"}
          </button>

          <p className="text-center text-[12px]">
            Already have an account?{" "}
            <Link to="/login" className="text-green-900 font-medium">
              Log in
            </Link>
          </p>
        </form>
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