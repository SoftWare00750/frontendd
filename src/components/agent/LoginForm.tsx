import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../shared/Input";
import { Eye, EyeOff } from "lucide-react";
import logo from "/assets/logo.svg";
import { loginUser } from "../../data/user";

export default function LoginForm() {
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

      if (user.role !== "agent") {
        setError("This account is not an agent account. Please use the tenant login.");
        setIsLoading(false);
        return;
      }

      navigate("/dashboard");
    }, 400);
  };

  return (
    <div className="h-full bg-[#e8f5ee] flex flex-col overflow-hidden font-sans">

      {/* ══════════════════════════════════════════════
          MOBILE LAYOUT  (hidden on md+)
      ══════════════════════════════════════════════ */}
      <div className="flex flex-col min-h-screen md:hidden">

        {/* Back arrow — no logo bar, matches image */}
        <div className="flex-shrink-0 h-14 flex items-center px-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="flex items-center justify-center w-9 h-9 bg-transparent border-none cursor-pointer p-0"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a4d2e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 pt-4 pb-4">

          <h1 className="text-[28px] font-extrabold text-[#1a4d2e] mb-2 leading-tight">
            Welcome Back!
          </h1>
          <p className="text-[13px] text-gray-500 mb-8 leading-relaxed">
            Login to your account and continue with your business.
          </p>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-[13px]">
              {error}
            </div>
          )}

          <form className="flex flex-col gap-5" onSubmit={handleSubmit} id="mobile-login-form">

            {/* Identifier */}
            <div className="flex flex-col">
              <label className="text-[13px] font-medium text-gray-800 mb-1.5">
                Phone Number or Email Address<span className="text-red-500 ml-0.5">*</span>
              </label>
              <Input
                type="text"
                required
                placeholder="Enter your phone no/email address"
                value={identifier}
                onChange={(e) => { setIdentifier(e.target.value); setError(""); }}
                className="bg-white py-[14px] px-4 text-[14px] border border-gray-200 rounded-xl outline-none focus:border-[#1a4d2e] placeholder:text-gray-400 text-gray-900 transition-colors duration-200"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="text-[13px] font-medium text-gray-800 mb-1.5">
                Password<span className="text-red-500 ml-0.5">*</span>
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  className="w-full bg-white py-[14px] pl-4 pr-11 text-[14px] border border-gray-200 rounded-xl outline-none focus:border-[#1a4d2e] placeholder:text-gray-400 text-gray-900 transition-colors duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-gray-400 p-0 flex items-center"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

          </form>
        </div>

        {/* Sign In + link — pinned to bottom, matches image */}
        <div className="flex-shrink-0 px-5 pb-10 pt-3 bg-[#e8f5ee]">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => {
              const form = document.getElementById("mobile-login-form") as HTMLFormElement | null;
              form?.requestSubmit();
            }}
            className="w-full py-[15px] bg-[#1a4d2e] text-white rounded-xl text-[15px] font-bold border-none cursor-pointer font-[inherit] flex items-center justify-center gap-2 shadow-[0_4px_18px_rgba(26,77,46,0.22)] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 mb-3"
          >
            {isLoading && (
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
          <p className="text-center text-[13px] text-gray-500">
            Don't have an account?{" "}
            <Link to="/agent/signup" className="text-[#2e7d52] font-semibold no-underline">
              Create An Account
            </Link>
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          DESKTOP LAYOUT  (hidden below md)
      ══════════════════════════════════════════════ */}
      <div className="hidden md:flex md:flex-col md:h-full md:overflow-hidden md:bg-[rgb(242,253,245)]">

        {/* Logo bar */}
        <div className="flex-shrink-0 flex items-center border-b border-gray-300 px-10 py-4">
          <img
            src={logo}
            alt="OgaLandlord Logo"
            className="w-9 cursor-pointer"
            onClick={() => navigate("/Home")}
          />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto flex flex-col items-center justify-between px-20 py-10">

          <div className="w-full max-w-sm">
            <h2 className="text-[28px] font-medium text-green-900 leading-snug text-left">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-[13px] mt-2 text-left">
              Login to your agent account to manage your properties and tenants.
            </p>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-[13px]">
                {error}
              </div>
            )}

            <form className="flex flex-col gap-5 mt-10" onSubmit={handleSubmit}>

              <div className="flex flex-col">
                <label className="text-[13px] pb-2">
                  Email or Phone<span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  required
                  placeholder="Enter your phone or email address"
                  value={identifier}
                  onChange={(e) => { setIdentifier(e.target.value); setError(""); }}
                  className="bg-white py-2.5 border border-gray-300 rounded-sm p-2 outline-green-900 transition-colors duration-500"
                />
              </div>

              <div className="flex flex-col relative">
                <label className="text-[13px] pb-2">
                  Password<span className="text-red-500">*</span>
                </label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  className="bg-white py-2.5 border border-gray-300 rounded-sm p-2 outline-green-900 transition-colors duration-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
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

          <p className="w-full max-w-sm text-center text-[12px] pt-4">
            Don't have an account?{" "}
            <Link to="/agent/signup" className="text-green-500 font-medium">Create an account</Link>
          </p>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 flex justify-between text-xs px-10 text-gray-500 border-t border-gray-300 py-4">
          <span>© {new Date().getFullYear()} OgaLandlord</span>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:underline cursor-pointer">Privacy</Link>
            <Link to="/terms"   className="hover:underline cursor-pointer">Terms</Link>
            <Link to="/help"    className="hover:underline cursor-pointer">Get help</Link>
          </div>
        </div>
      </div>
    </div>
  );
}