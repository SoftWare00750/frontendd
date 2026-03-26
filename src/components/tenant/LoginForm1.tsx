import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../shared/Input";
import { Eye, EyeOff } from "lucide-react";
import logo from "/assets/logo.svg";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean | null>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const HandleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
  };

  return (
    <div className="h-full overflow-hidden bg-[rgb(242,253,245)] flex flex-col">

      {/* Logo */}
      <div className="flex-shrink-0 flex items-center border-b border-gray-300 px-10 py-4">
        <img
          src={logo}
          alt="OgaLandlord Logo"
          className="md:w-[27%] w-[40%]"
        />
      </div>

      {/* Middle section */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center justify-between md:px-20 px-8 py-10">

        {/* Top: heading + form — constrained to 50% width, centered */}
        <div className="w-1/2">
          <h2 className="md:text-[28px] text-[16px] font-medium text-green-900 leading-snug text-left">
            Welcome Back
          </h2>
          <p className="text-gray-600 text-[13px] mt-2 text-left">
            Login to your account to continue managing your properties and tenants with ease.
          </p>

          <form className="flex flex-col gap-5 mt-16" onSubmit={HandleSignup}>
            <div className="flex flex-col">
              <label htmlFor="identifier" className="text-[13px] pb-2">
                Email or Phone<span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                required
                placeholder="Enter your phone or email address"
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
                placeholder="Enter your password"
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
              className="w-full bg-green-900 text-white py-3 rounded-lg hover:bg-green-800 transition font-medium text-[16px] flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer mt-2"
            >
              {isLoading && (
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* Bottom: sign-up nudge */}
        <p className="w-1/2 text-center text-[12px] pt-4">
          Don't have an account?{" "}
          <Link to="/tenant/signup" className="text-green-500 font-medium">
            Create an account
          </Link>
        </p>
      </div>

      {/* Footer */}
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