import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../shared/Input";
import { Eye, EyeOff } from "lucide-react";
import { registerUser, isAlreadyRegistered } from "../../data/user.ts";

interface FormState {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
}
type FormErrors = Partial<FormState> & { general?: string };

// ── Mobile splash screen (Image 1) ──────────────────────────────────────────
// Shown only on mobile before the user taps "Create Account".
// On desktop this component is never rendered (Signup.tsx shows SignupForm directly).
function MobileSplash({ onCreateAccount, onLogin, onBack }: { onCreateAccount: () => void; onLogin: () => void; onBack: () => void }) {
  const features = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="10" stroke="#1a4d2e" strokeWidth="1.6"/>
          <path d="M6.5 11l3.2 3.2 5.8-6" stroke="#1a4d2e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: "Verified agent badge",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 2L3 5.8v5c0 4.6 3.4 8.9 8 9.9 4.6-1 8-5.3 8-9.9v-5L11 2z"
            stroke="#1a4d2e" strokeWidth="1.6" strokeLinejoin="round"/>
        </svg>
      ),
      label: "Build trust with tenants",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M3 15.5l5-6 4.5 3.5 6-8.5" stroke="#1a4d2e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15.5 4.5h3v3" stroke="#1a4d2e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: "Grow your rental business",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[#e8f5ee]">

      {/* Nav bar — back arrow left, logo centered */}
      <div className="flex-shrink-0 h-14 flex items-center px-5 relative">
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="flex items-center justify-center w-9 h-9 bg-transparent border-none cursor-pointer p-0"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="#1a4d2e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <div className="absolute left-1/2 -translate-x-1/2">
          <img src="/assets/logo.svg" alt="OgaLandlord" className="h-9 object-contain"
            onError={(e) => { e.currentTarget.style.display = "none"; }} />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 pt-8 pb-4 relative">

        {/* Ghost decorative icons — matching Image 1 positions */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Top-left: magnifying glass */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
            className="absolute top-[36%] left-4 opacity-[0.20]">
            <circle cx="12" cy="12" r="8" stroke="#1a4d2e" strokeWidth="2"/>
            <path d="M18 18l7 7" stroke="#1a4d2e" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          {/* Top-right: key */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
            className="absolute top-[36%] right-4 opacity-[0.20]">
            <circle cx="11" cy="11" r="7" stroke="#1a4d2e" strokeWidth="2"/>
            <path d="M16 16l9 9M21 18l-3 3" stroke="#1a4d2e" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          {/* Bottom-left: location pin */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
            className="absolute top-[58%] left-6 opacity-[0.20]">
            <path d="M14 2C9.6 2 6 5.6 6 10c0 6.5 8 16 8 16s8-9.5 8-16c0-4.4-3.6-8-8-8z"
              stroke="#1a4d2e" strokeWidth="2"/>
            <circle cx="14" cy="10" r="3" stroke="#1a4d2e" strokeWidth="1.8"/>
          </svg>
          {/* Bottom-right: house */}
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
            className="absolute top-[56%] right-5 opacity-[0.20]">
            <path d="M4 14L15 4l11 10" stroke="#1a4d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 11v14h16V11" stroke="#1a4d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="11" y="18" width="8" height="7" rx="1" stroke="#1a4d2e" strokeWidth="1.8"/>
          </svg>
        </div>

        {/* Hero text — centered, matches Image 1 */}
        <h1 className="text-[26px] font-extrabold text-[#014421] text-center leading-tight mb-2">
          Join OgaLandlord as a<br />Verified Agent
        </h1>
        <p className="text-[13px] text-gray-500 text-center mb-10 leading-relaxed">
          Get trusted by tenants and grow your business.
        </p>

        {/* Feature rows — left-aligned, matches Image 1 */}
        <div className="flex flex-col gap-6">
          {features.map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-4">
              <span className="flex-shrink-0 w-6 flex items-center justify-center">{icon}</span>
              <span className="text-[15px] font-medium text-gray-800 leading-snug">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTAs — matches Image 1 */}
      <div className="flex-shrink-0 px-5 pb-10 pt-4 bg-[#e8f5ee]">
        <button
          onClick={onCreateAccount}
          className="w-full py-[15px] bg-[#1a4d2e] text-white rounded-xl text-[15px] font-bold border-none cursor-pointer mb-3 shadow-[0_4px_18px_rgba(26,77,46,0.22)]"
        >
          Create Account
        </button>
        <button
          onClick={onLogin}
          className="w-full py-[15px] bg-white text-[#1a4d2e] rounded-xl text-[15px] font-semibold cursor-pointer border border-gray-200 shadow-sm"
        >
          Log In
        </button>
      </div>
    </div>
  );
}

// ── Main SignupForm component ────────────────────────────────────────────────
export default function SignupForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading]       = useState(false);
  const [mobilePage, setMobilePage]     = useState<"splash" | "form">("splash");
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
    if (!form.fullName.trim())         e.fullName    = "Full name is required";
    const phone = form.phoneNumber.replace(/\s/g, "");
    if (!phone)                         e.phoneNumber = "Phone number is required";
    else if (!/^0\d{10}$/.test(phone)) e.phoneNumber = "Enter a valid 11-digit Nigerian number (e.g. 08012345678)";
    if (!form.password)                 e.password    = "Password is required";
    else if (form.password.length < 6)  e.password    = "Password must be at least 6 characters";

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
      navigate("/verify-phone");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Signup failed. Please try again.";
      setErrors({ general: msg });
      setIsLoading(false);
    }
  };

  // ── MOBILE: splash screen (Image 1) ────────────────────────────────────────
  if (mobilePage === "splash") {
    return (
      <>
        {/* Mobile splash — only shown on small screens */}
        <div className="flex flex-col h-full md:hidden">
          <MobileSplash
            onBack={() => navigate("/tenant/signup")}
            onCreateAccount={() => setMobilePage("form")}
            onLogin={() => navigate("/agent/login")}
          />
        </div>

        {/* Desktop form — shown on md+ directly (no splash step) */}
        <div className="hidden md:flex md:flex-col h-full">
          <DesktopForm
            form={form}
            errors={errors}
            isLoading={isLoading}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            setField={setField}
            handleSubmit={handleSubmit}
          />
        </div>
      </>
    );
  }

  // ── MOBILE: create account form (Image 2) ───────────────────────────────────
  return (
    <>
      {/* Mobile form */}
      <div className="flex flex-col h-full md:hidden bg-[#e8f5ee]">

        {/* Back arrow */}
        <div className="flex-shrink-0 h-14 flex items-center px-5">
          <button
            type="button"
            onClick={() => setMobilePage("splash")}
            aria-label="Go back"
            className="flex items-center justify-center w-9 h-9 bg-transparent border-none cursor-pointer p-0"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="#1a4d2e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
        </div>

        {/* Scrollable form body */}
        <div className="flex-1 overflow-y-auto px-5 pt-2 pb-4">

          <h1 className="text-[26px] font-extrabold text-[#1a4d2e] mb-1 leading-tight">
            Create Account
          </h1>
          <p className="text-[13px] text-gray-500 mb-7 leading-relaxed">
            Join as a verified agent and start listing properties
          </p>

          {errors.general && (
            <div className="bg-red-50 border border-red-300 rounded-xl px-4 py-3 mb-4 text-[13px] text-red-600">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-0">

            {/* Full Name */}
            <div className="mb-5">
              <label className="block text-[13px] font-medium text-gray-800 mb-1.5">
                Full Name<span className="text-red-500 ml-0.5">*</span>
              </label>
              <Input
                type="text"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={setField("fullName")}
                className={`w-full bg-white py-[14px] px-4 border rounded-xl text-[14px] outline-none focus:border-[#1a4d2e] placeholder:text-gray-400 transition-colors duration-[180ms] font-[inherit] ${errors.fullName ? "border-red-400" : "border-gray-200"}`}
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>

            {/* Phone Number */}
            <div className="mb-5">
              <label className="block text-[13px] font-medium text-gray-800 mb-1.5">
                Phone Number<span className="text-red-500 ml-0.5">*</span>
              </label>
              <Input
                type="text"
                placeholder="080 1234 5678"
                value={form.phoneNumber}
                onChange={setField("phoneNumber")}
                className={`w-full bg-white py-[14px] px-4 border rounded-xl text-[14px] outline-none focus:border-[#1a4d2e] placeholder:text-gray-400 transition-colors duration-[180ms] font-[inherit] ${errors.phoneNumber ? "border-red-400" : "border-gray-200"}`}
              />
              {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
            </div>

            {/* Email (Optional) */}
            <div className="mb-5">
              <label className="block text-[13px] font-medium text-gray-800 mb-1.5">
                Email <span className="text-gray-500 font-normal">(Optional)</span>
              </label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={form.email}
                onChange={setField("email")}
                className={`w-full bg-white py-[14px] px-4 border rounded-xl text-[14px] outline-none focus:border-[#1a4d2e] placeholder:text-gray-400 transition-colors duration-[180ms] font-[inherit] ${errors.email ? "border-red-400" : "border-gray-200"}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block text-[13px] font-medium text-gray-800 mb-1.5">
                Password<span className="text-red-500 ml-0.5">*</span>
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={setField("password")}
                  className={`w-full bg-white py-[14px] pl-4 pr-11 border rounded-xl text-[14px] outline-none focus:border-[#1a4d2e] placeholder:text-gray-400 transition-colors duration-[180ms] font-[inherit] ${errors.password ? "border-red-400" : "border-gray-200"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-gray-400 p-0 flex items-center"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

          </form>
        </div>

        {/* Bottom CTA — matches Image 2 */}
        <div className="flex-shrink-0 px-5 pb-10 pt-3 bg-[#e8f5ee]">
          <button
            onClick={() => {
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
                navigate("/verify-phone");
              } catch (err: unknown) {
                const msg = err instanceof Error ? err.message : "Signup failed. Please try again.";
                setErrors({ general: msg });
                setIsLoading(false);
              }
            }}
            disabled={isLoading}
            className={[
              "w-full py-[15px] text-white border-none rounded-xl text-[15px] font-bold font-[inherit] transition-opacity duration-200 mb-3",
              isLoading
                ? "bg-[#6b9e7a] cursor-not-allowed"
                : "bg-[#1a4d2e] cursor-pointer shadow-[0_4px_18px_rgba(26,77,46,0.22)]",
            ].join(" ")}
          >
            {isLoading ? "Creating Account…" : "Create Account"}
          </button>
          {/* "Have an account already? Login" — matches Image 2 */}
          <p className="text-center text-[13px] text-gray-500">
            Have an account already?{" "}
            <Link to="/agent/login" className="text-[#1a4d2e] font-semibold no-underline">Login</Link>
          </p>
        </div>
      </div>

      {/* Desktop form — unchanged */}
      <div className="hidden md:flex md:flex-col h-full">
        <DesktopForm
          form={form}
          errors={errors}
          isLoading={isLoading}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          setField={setField}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

// ── Desktop form (original layout, unchanged) ────────────────────────────────
function DesktopForm({
  form, errors, isLoading, showPassword, setShowPassword, setField, handleSubmit,
}: {
  form: FormState;
  errors: FormErrors;
  isLoading: boolean;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setField: (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="h-full overflow-hidden bg-[rgb(242,253,245)] flex flex-col">

      {/* Logo */}
      <div style={{ height: 70, flexShrink: 0, padding: "0 36px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center" }}>
        <img src="/assets/logo.svg" alt="OgaLandlord" style={{ height: 36, objectFit: "contain", display: "block" }}
          onError={(e) => { e.currentTarget.style.display = "none"; }} />
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