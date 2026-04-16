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

      // Success — go to tenant home
      navigate("/Home");
    }, 400);
  };

  return (
    <div className="h-full overflow-hidden bg-[rgb(242,253,245)] flex flex-col">

      {/* Logo */}
      <div className="flex-shrink-0 flex items-center border-b border-gray-300 px-10 py-4">
        <img src={logo} alt="OgaLandlord Logo" className="md:w-[27%] w-[40%]" />
      </div>

      {/* Middle section */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center justify-between  px-8 py-10">

        <div className="w-full max-w-sm">
          <h2 className="md:text-[28px] text-[16px] font-medium text-green-900 leading-snug text-left">
            Welcome Back
          </h2>
          <p className="text-gray-600 text-[13px] mt-2 text-left">
            Login to browse verified listings and connect with trusted agents.
          </p>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-[13px]">
              {error}
            </div>
          )}

          <form className="flex flex-col gap-5 mt-10" onSubmit={handleSubmit}>

            {/* Identifier */}
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

            {/* Password */}
            <div className="flex flex-col relative">
              <label className="text-[13px] pb-2">
                Password<span className="text-red-500">*</span>
              </label>
              <Input
     type="password" // Fixed to password only
     placeholder="Enter your password"
     value={password}
     onChange={(e) => { setPassword(e.target.value); setError(""); }}
     className="bg-white py-2.5 border border-gray-300 rounded-sm p-2 outline-green-900 transition-colors duration-500"
/>
              <button
       type="button"
      onClick={() => setShowPassword((s) => !s)}
     className="absolute right-3 top-[58%] cursor-pointer"
  aria-label={showPassword ? "Hide password" : "Show password"}
>
  
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

        {/* Sign-up nudge */}
        <p className="w-full max-w-sm text-center text-[12px] pt-4">
          Don't have an account?{" "}
          <Link to="/tenant/signup/create" className="text-green-500 font-medium">Create an account</Link>
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