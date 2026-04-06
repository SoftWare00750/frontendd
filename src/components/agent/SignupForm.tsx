import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../shared/Input";
import { Eye, EyeOff } from "lucide-react";
import { registerUser, isAlreadyRegistered } from "../../data/user";

interface FormState {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
}
type FormErrors = Partial<FormState> & { general?: string };

export default function SignupForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading]       = useState(false);
  const [form, setForm]                 = useState<FormState>({
    fullName: "", phoneNumber: "", email: "", password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const setField = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined, general: undefined }));
  };

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.fullName.trim())         e.fullName     = "Full name is required";
    const phone = form.phoneNumber.replace(/\s/g, "");
    if (!phone)                         e.phoneNumber  = "Phone number is required";
    else if (!/^0\d{10}$/.test(phone)) e.phoneNumber  = "Enter a valid 11-digit Nigerian number (e.g. 08012345678)";
    if (!form.password)                 e.password     = "Password is required";
    else if (form.password.length < 6)  e.password     = "Password must be at least 6 characters";

    // Global uniqueness check (live, before submission)
    if (!e.phoneNumber || !e.email) {
      const check = isAlreadyRegistered(phone, form.email.trim() || undefined);
      if (check.taken) {
        if (check.field === "phone") e.phoneNumber = "This phone number is already registered.";
        if (check.field === "email") e.email       = "This email address is already registered.";
      }
    }

 

    return e;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setIsLoading(true);
    try {
      registerUser({
        fullName:    form.fullName.trim(),
        phoneNumber: form.phoneNumber.replace(/\s/g, ""),
        email:       form.email.trim() || undefined,
        password:    form.password,
        role:        "agent",
        createdAt:   new Date().toISOString(),
      });
      // After signup agents proceed to phone verification / onboarding
      navigate("/verify-phone");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Signup failed. Please try again.";
      setErrors({ general: msg });
      setIsLoading(false);
    }
  };

  function Logo () {
  return (
    <img
      src="/assets/logo.svg"
      alt="OgaLandlord"
      style={{ height: 36, objectFit: "contain", display: "block" }}
    />
  );
}

  return (
    <div className="h-full overflow-hidden bg-[rgb(242,253,245)] flex flex-col">

      {/* Logo */}
      <div style={{ height: 70, flexShrink: 0, padding: "0 36px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center" }}> 

        <Logo />

     </div>
      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto md:px-20 px-8 py-8">
        <h2 className="md:text-[28px] text-[16px] font-semibold text-green-900 leading-snug text-left">
          Create Account
        </h2>
        <p className="text-gray-600 text-[12px] mt-2 text-left">
          Join as a verified agent and start listing properties.
        </p>

        {errors.general && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-[13px]">
            {errors.general}
          </div>
        )}

        <form className="flex flex-col gap-4 mt-10" onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="flex flex-col">
            <label className="text-[13px] pb-2">
              Full Name<span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={setField("fullName")}
              className={`bg-white py-2.5 border rounded-sm p-2 outline-green-900 transition-colors duration-500 ${errors.fullName ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.fullName && <p className="text-red-500 text-[11px] mt-1">{errors.fullName}</p>}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label className="text-[13px] pb-2">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="08012345678"
              value={form.phoneNumber}
              onChange={setField("phoneNumber")}
              className={`bg-white py-2.5 border rounded-sm p-2 outline-green-900 transition-colors duration-500 ${errors.phoneNumber ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.phoneNumber && <p className="text-red-500 text-[11px] mt-1">{errors.phoneNumber}</p>}
          </div>

          {/* Email (Optional) */}
          <div className="flex flex-col">
            <label className="text-[13px] pb-2">Email (Optional)</label>
            <Input
              type="email"
              placeholder="Enter your email here"
              value={form.email}
              onChange={setField("email")}
              className={`bg-white py-2.5 border rounded-sm p-2 outline-green-900 transition-colors duration-500 ${errors.email ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label className="text-[13px] pb-2">
              Password<span className="text-red-500">*</span>
            </label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={form.password}
              onChange={setField("password")}
              className={`bg-white py-2.5 border rounded-sm p-2 outline-green-900 transition-colors duration-500 ${errors.password ? "border-red-400" : "border-gray-300"}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-[58%] cursor-pointer"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
            {errors.password && <p className="text-red-500 text-[11px] mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
           className="w-48 mx-auto bg-green-900 text-white py-3 rounded-lg hover:bg-green-800 transition font-medium text-[16px] flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading && (
              <span className="h-2 w-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {isLoading ? "Creating account..." : "Create account"}
          </button>

          <p className="text-center text-[12px]">
            Already have an account?{" "}
            <Link to="/agent/login" className="text-green-900 font-medium">Log in</Link>
          </p>
        </form>
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