import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../shared/Input";
import logo from "/assets/logo.svg";
import { loginUser } from "../../data/user";

export default function LoginForm1() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading]       = useState(false);
  const [identifier, setIdentifier]     = useState("");
  const [password, setPassword]         = useState("");
  const [error, setError]               = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!identifier.trim()) { setError("Please enter your phone number or email."); return; }
    if (!password)           { setError("Please enter your password."); return; }

    setIsLoading(true);

    setTimeout(() => {
      const user = loginUser(identifier.trim(), password);

      if (!user) {
        setError("Invalid phone/email or password. Please try again.");
        setIsLoading(false);
        return;
      }

      if (user.role !== "tenant_landlord") {
        setError("This account is not a tenant account. Please use the agent login.");
        setIsLoading(false);
        return;
      }

      navigate("/Home");
    }, 400);
  };

  return (
    <div className="h-full overflow-hidden bg-[#e8f5ee] md:bg-[rgb(242,253,245)] flex flex-col">

      {/* ── MOBILE: back arrow header / DESKTOP: logo bar ── */}
      <div className="flex-shrink-0 flex items-center px-5 md:px-10 md:border-b md:border-gray-300 md:py-4 h-14 md:h-auto">

        {/* Mobile: back arrow */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="flex md:hidden items-center justify-center w-9 h-9 bg-transparent border-none cursor-pointer p-0"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="#1a4d2e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>

        {/* Desktop: logo */}
        <img
          src={logo}
          alt="OgaLandlord Logo"
          className="hidden md:block md:w-[20%] cursor-pointer"
          onClick={() => navigate("/Home")}
        />
      </div>

      {/* ── MIDDLE SECTION ── */}
      <div className="flex-1 overflow-y-auto flex flex-col md:items-center md:justify-between md:px-20 px-5 pt-2 md:pt-10 md:py-10">

        <div className="w-full md:max-w-sm flex flex-col flex-1 md:flex-none">

          {/* Heading */}
          <h2 className="text-[26px] md:text-[28px] font-extrabold md:font-medium text-[#1a4d2e] leading-tight text-left mb-2">
            Welcome Back!
          </h2>

          {/* Subtitle */}
          <p className="text-gray-500 text-[13px] leading-relaxed text-left mb-8 md:mb-0 md:mt-2">
            Login to your account and continue with your business.
          </p>

          {/* Error banner */}
          {error && (
            <div className="mt-0 md:mt-4 mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-[13px]">
              {error}
            </div>
          )}

          <form className="flex flex-col gap-5 md:mt-10" onSubmit={handleSubmit}>

            {/* Phone / Email field */}
            <div className="flex flex-col">
              <label className="text-[13px] font-medium text-gray-800 pb-1.5">
                Phone Number or Email Address
                <span className="text-red-500 ml-0.5">*</span>
              </label>
              <Input
                type="text"
                required
                placeholder="Enter your phone no/email address"
                value={identifier}
                onChange={(e) => { setIdentifier(e.target.value); setError(""); }}
                className="bg-white py-[14px] md:py-2.5 px-4 border border-gray-200 md:border-gray-300 rounded-xl md:rounded-sm text-[14px] outline-none focus:border-[#1a4d2e] placeholder:text-gray-400 transition-colors duration-[180ms] font-[inherit]"
              />
            </div>

            {/* Password field */}
            <div className="flex flex-col">
              <label className="text-[13px] font-medium text-gray-800 pb-1.5">
                Password
                <span className="text-red-500 ml-0.5">*</span>
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  className="w-full bg-white py-[14px] md:py-2.5 pl-4 pr-11 border border-gray-200 md:border-gray-300 rounded-xl md:rounded-sm text-[14px] outline-none focus:border-[#1a4d2e] placeholder:text-gray-400 transition-colors duration-[180ms] font-[inherit]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-gray-400 p-0 flex items-center"
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className={[
                "w-full text-white border-none font-bold text-[15px] md:text-[16px] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer font-[inherit]",
                "py-[15px] md:py-3 rounded-xl md:rounded-lg mt-2",
                isLoading
                  ? "bg-[#6b9e7a] md:bg-gray-400 cursor-not-allowed"
                  : "bg-[#1a4d2e] hover:bg-green-800 shadow-[0_4px_18px_rgba(26,77,46,0.22)] md:shadow-none",
              ].join(" ")}
            >
              {isLoading && (
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Spacer — pushes sign-up link to bottom on mobile */}
          <div className="flex-1 md:hidden" />

          {/* Sign-up nudge */}
          <p className="w-full text-center text-[13px] md:text-[12px] pt-4 pb-2 md:pb-0 text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/tenant/signup"
              className="text-[#1a4d2e] md:text-green-500 font-semibold no-underline"
            >
              Create An Account
            </Link>
          </p>
        </div>
      </div>

      {/* Footer — hidden on mobile, visible on desktop */}
      <div className="hidden md:flex flex-shrink-0 justify-between text-xs px-10 text-gray-500 border-t border-gray-300 py-4">
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