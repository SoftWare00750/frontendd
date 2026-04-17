// Onboarding.tsx — Tenant Responsive Mobile Onboarding (Tailwind CSS)
// Screens:
//   /tenant/signup         → RoleSelect
//   /tenant/signup/start   → SignupScreen  (mobile-only welcome/intro step)
//   /tenant/signup/create  → CreateAccount
//   /tenant/signup/verify  → VerifyPhone2
// Plus a standalone Welcome screen for agent onboarding

import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LeftSection2 } from "./../../../components/shared/LeftSection2";
import { registerUser, isAlreadyRegistered } from "./../../../data/user";

type Role = "agent" | "tenant_landlord";

const SESSION_PHONE_KEY = "ogalandlord_signup_phone";
const savePhone  = (p: string) => sessionStorage.setItem(SESSION_PHONE_KEY, p);
const loadPhone  = ()          => sessionStorage.getItem(SESSION_PHONE_KEY) ?? "";
const clearPhone = ()          => sessionStorage.removeItem(SESSION_PHONE_KEY);

// ─── Shared Components ────────────────────────────────────────────────────────
function Logo() {
  return (
    <img
      src="/assets/logo.svg"
      alt="OgaLandlord"
      className="h-9 object-contain block"
      onError={(e) => { e.currentTarget.style.display = "none"; }}
    />
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-[#F2FDF5] px-5 py-3 flex flex-wrap justify-between items-center gap-2 flex-shrink-0">
      <span className="text-xs text-gray-400">© 2026 OgaLandLord. All rights reserved.</span>
      <div className="flex gap-5">
        <Link to="/privacy" className="text-xs text-gray-500 no-underline">Privacy</Link>
        <Link to="/terms"   className="text-xs text-gray-500 no-underline">Terms</Link>
        <Link to="/help"    className="text-xs text-gray-500 no-underline">Get help</Link>
      </div>
    </footer>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  PAGE 1 — Role Selection  (/tenant/signup)
// ══════════════════════════════════════════════════════════════════════════════
export function RoleSelect() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Role | null>(null);

  const cards: { role: Role; img: string; title: string; subtitle: string; features: string[] }[] = [
    {
      role: "agent",
      img: "/assets/agent.png",
      title: "Agent",
      subtitle: "List properties, get verified, and connect with tenants and landlords looking to rent",
      features: ["Verified agent badge", "Build trust with tenants", "Grow your rental business"],
    },
    {
      role: "tenant_landlord",
      img: "/assets/tenant.png",
      title: "Tenant/Landlord",
      subtitle: "Browse verified listings and connect with trusted agents.",
      features: ["Browse verified listings", "Secure rental process", "Manage your properties"],
    },
  ];

  const handleSelect = (role: Role) => {
    setSelected(role);
    setTimeout(() => {
      if (role === "agent") navigate("/agent/signup");
      else navigate("/tenant/signup/start");
    }, 180);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#e8f5ee] relative overflow-hidden">

      {/* Decorative icons — desktop only */}
      <div className="hidden md:block pointer-events-none">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="fixed top-24 left-14 opacity-[0.13] z-0">
          <circle cx="20" cy="20" r="14" stroke="#1a4d2e" strokeWidth="3"/>
          <path d="M30 30l10 10" stroke="#1a4d2e" strokeWidth="3" strokeLinecap="round"/>
        </svg>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="fixed top-24 right-14 opacity-[0.13] z-0">
          <circle cx="16" cy="20" r="10" stroke="#1a4d2e" strokeWidth="3"/>
          <path d="M23 25l14 14M31 31l4 4" stroke="#1a4d2e" strokeWidth="3" strokeLinecap="round"/>
        </svg>
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="fixed top-[42%] left-10 opacity-[0.12] z-0">
          <path d="M22 4C15.4 4 10 9.4 10 16c0 10 12 24 12 24s12-14 12-24c0-6.6-5.4-12-12-12z" stroke="#1a4d2e" strokeWidth="3"/>
          <circle cx="22" cy="16" r="4" stroke="#1a4d2e" strokeWidth="2.5"/>
        </svg>
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" className="fixed top-[40%] right-11 opacity-[0.12] z-0">
          <path d="M8 26L26 8l18 18" stroke="#1a4d2e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 21v20h26V21" stroke="#1a4d2e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="20" y="32" width="12" height="9" rx="1.5" stroke="#1a4d2e" strokeWidth="2.5"/>
        </svg>
      </div>

      {/* ── MOBILE LAYOUT ── */}
      <div className="flex flex-col min-h-screen md:hidden">

        {/* Mobile Nav */}
        <nav className="h-14 flex-shrink-0 flex items-center px-5 bg-[#e8f5ee]">
          <div onClick={() => navigate("/Home")} className="cursor-pointer">
            <Logo />
          </div>
        </nav>

        {/* Mobile scrollable content */}
        <div className="flex-1 flex flex-col px-4 pt-5 pb-4 overflow-y-auto">
          <h1 className="text-2xl font-extrabold text-[#014421] mb-6 leading-snug">
            How would you like<br />to join?
          </h1>

          {/* Cards — equal-width columns, no overflow */}
          <div className="grid grid-cols-2 gap-3 w-full">
            {cards.map(({ role, img, title, subtitle, features }) => {
              const isSelected = selected === role;
              return (
                <div
                  key={role}
                  onClick={() => handleSelect(role)}
                  className={[
                    "bg-white rounded-2xl cursor-pointer transition-all duration-200 p-3 flex flex-col",
                    isSelected
                      ? "border-2 border-[#1a4d2e] shadow-lg"
                      : "border-2 border-[#1a4d2e]/30",
                  ].join(" ")}
                >
                  {/* Icon box */}
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 bg-[#1a4d2e] overflow-hidden flex-shrink-0">
                    <img
                      src={img}
                      alt={title}
                      className="w-7 h-7 object-contain"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-extrabold text-[#1a4d2e] mb-1 leading-tight">{title}</h3>

                  {/* Subtitle */}
                  <p className="text-[11px] text-gray-500 leading-relaxed mb-3">{subtitle}</p>

                  {/* Features */}
                  <div className="flex flex-col gap-1.5 flex-1">
                    {features.map((f) => (
                      <div key={f} className="flex items-start gap-1.5">
                        <svg width="15" height="15" viewBox="0 0 19 19" fill="none" className="flex-shrink-0 mt-px">
                          <circle cx="9.5" cy="9.5" r="8.75" stroke="#1a4d2e" strokeWidth="1.25"/>
                          <path d="M5.5 9.5l3 3 5-5.5" stroke="#1a4d2e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-[10px] text-gray-700 leading-snug">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-3 flex items-center gap-1 text-[#1a4d2e] font-bold text-xs">
                    Get Started
                    <span className={`inline-block transition-transform duration-200 ${isSelected ? "translate-x-1" : ""}`}>→</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile bottom CTA */}
        <div className="flex-shrink-0 px-4 pb-8 pt-3 bg-[#e8f5ee]">
          <button
            onClick={() => navigate("/login1")}
            className="w-full py-4 bg-white text-[#1a4d2e] rounded-xl text-[15px] font-semibold border border-gray-200 cursor-pointer shadow-sm"
          >
            Log In
          </button>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden md:flex md:flex-col md:min-h-screen">
        {/* Desktop Nav */}
        <nav className="h-[68px] flex-shrink-0 bg-[#f2fdf5] border-b border-gray-200 flex items-center justify-between px-8 relative z-10">
          <div onClick={() => navigate("/Home")} className="cursor-pointer">
            <Logo />
          </div>
          <p className="text-sm text-gray-500 m-0">
            Already have an account?{" "}
            <Link to="/login1" className="text-[#1a4d2e] font-semibold no-underline">Login</Link>
          </p>
        </nav>

        {/* Desktop Hero */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 overflow-y-auto relative z-[1]">
          <h1 className="text-[clamp(24px,3.2vw,40px)] font-bold text-[#014421] text-center mb-[10px] tracking-tight">
            How would you like to join?
          </h1>
          <p className="text-lg text-gray-600 mb-7 text-center">
            Select your role to get started
          </p>

          {/* Desktop Cards */}
          <div className="flex flex-row gap-6 w-full max-w-[820px]">
            {cards.map(({ role, img, title, subtitle, features }) => {
              const isSelected = selected === role;
              return (
                <div
                  key={role}
                  onClick={() => handleSelect(role)}
                  className={[
                    "flex-1 bg-white rounded-[20px] cursor-pointer transition-all duration-200 px-[26px] py-7",
                    isSelected
                      ? "border-2 border-[#1a4d2e] shadow-[0_14px_44px_rgba(26,77,46,0.14)] -translate-y-[3px]"
                      : "border-2 border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.05)]",
                  ].join(" ")}
                >
                  <div className="w-[54px] h-[54px] rounded-[14px] flex items-center justify-center mb-4 shadow-[0_4px_16px_rgba(26,77,46,0.30)] overflow-hidden bg-[#f0faf4]">
                    <img src={img} alt={title} className="w-[54px] h-[54px] object-contain"
                      onError={(e) => { e.currentTarget.style.display = "none"; }} />
                  </div>
                  <h3 className="text-lg font-extrabold text-[#1a4d2e] m-0 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-[1.56] m-0 mb-4">{subtitle}</p>
                  {features.map((f) => (
                    <div key={f} className="flex items-center gap-[10px] mb-2">
                      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" className="flex-shrink-0">
                        <circle cx="9.5" cy="9.5" r="8.75" stroke="#1a4d2e" strokeWidth="1.25"/>
                        <path d="M5.5 9.5l3 3 5-5.5" stroke="#1a4d2e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm text-gray-700">{f}</span>
                    </div>
                  ))}
                  <div className="mt-[18px] flex items-center gap-[5px] text-[#1a4d2e] font-bold text-[15px]">
                    Get Started
                    <span className={`inline-block transition-transform duration-200 ${isSelected ? "translate-x-1" : ""}`}>→</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  PAGE 1.5 — Mobile Signup Screen  (/tenant/signup/start)
//  Fixed to match Image 1: logo top-left, centered hero text, left-aligned
//  feature list with icons, ghost icons scattered mid-screen, two CTAs bottom.
// ══════════════════════════════════════════════════════════════════════════════
export function SignupScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth >= 768) {
      navigate("/tenant/signup/create", { replace: true });
    }
  }, [navigate]);

  const features = [
    {
      icon: (
        // Checkmark circle — matches Image 1 first icon
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="10" stroke="#1a4d2e" strokeWidth="1.6"/>
          <path d="M6.5 11l3.2 3.2 5.8-6" stroke="#1a4d2e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: "Verified agent badge",
    },
    {
      icon: (
        // Shield — matches Image 1 second icon
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 2L3 5.8v5c0 4.6 3.4 8.9 8 9.9 4.6-1 8-5.3 8-9.9v-5L11 2z" stroke="#1a4d2e" strokeWidth="1.6" strokeLinejoin="round"/>
        </svg>
      ),
      label: "Build trust with tenants",
    },
    {
      icon: (
        // Trending up arrow — matches Image 1 third icon
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M3 15.5l5-6 4.5 3.5 6-8.5" stroke="#1a4d2e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15.5 4.5h3v3" stroke="#1a4d2e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: "Grow your rental business",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#e8f5ee] font-sans">

      {/* Nav — back arrow left, logo centred */}
      <div className="h-14 flex-shrink-0 flex items-center px-5 bg-[#e8f5ee] relative">
        <button
          onClick={() => navigate("/tenant/signup")}
          aria-label="Go back"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-transparent border-none cursor-pointer p-0 text-[#1a4d2e]"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a4d2e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <div className="absolute left-1/2 -translate-x-1/2">
          <Logo />
        </div>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 flex flex-col px-6 pt-8 pb-4 overflow-y-auto relative">

        {/* Ghost decorative icons — positioned to match Image 1 layout
            (two on left/right near 38% height, two more at ~58% height) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Top-left ghost: magnifying glass */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
            className="absolute top-[36%] left-4 opacity-[0.20]">
            <circle cx="12" cy="12" r="8" stroke="#1a4d2e" strokeWidth="2"/>
            <path d="M18 18l7 7" stroke="#1a4d2e" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          {/* Top-right ghost: key */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
            className="absolute top-[36%] right-4 opacity-[0.20]">
            <circle cx="11" cy="11" r="7" stroke="#1a4d2e" strokeWidth="2"/>
            <path d="M16 16l9 9M21 18l-3 3" stroke="#1a4d2e" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          {/* Bottom-left ghost: location pin */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
            className="absolute top-[58%] left-6 opacity-[0.20]">
            <path d="M14 2C9.6 2 6 5.6 6 10c0 6.5 8 16 8 16s8-9.5 8-16c0-4.4-3.6-8-8-8z"
              stroke="#1a4d2e" strokeWidth="2"/>
            <circle cx="14" cy="10" r="3" stroke="#1a4d2e" strokeWidth="1.8"/>
          </svg>
          {/* Bottom-right ghost: house */}
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
            className="absolute top-[56%] right-5 opacity-[0.20]">
            <path d="M4 14L15 4l11 10" stroke="#1a4d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 11v14h16V11" stroke="#1a4d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="11" y="18" width="8" height="7" rx="1" stroke="#1a4d2e" strokeWidth="1.8"/>
          </svg>
        </div>

        {/* Hero text — centered, matches Image 1 typography */}
        <h1 className="text-[26px] font-extrabold text-[#014421] text-center leading-tight mb-2">
          Join OgaLandlord as a<br />Verified Agent
        </h1>
        <p className="text-[13px] text-gray-500 text-center mb-10 leading-relaxed">
          Get trusted by tenants and grow your business.
        </p>

        {/* Feature list — left-aligned icon + label rows, matches Image 1 */}
        <div className="flex flex-col gap-6">
          {features.map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-4">
              <span className="flex-shrink-0 w-6 flex items-center justify-center">{icon}</span>
              <span className="text-[15px] font-medium text-gray-800 leading-snug">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTAs — dark green "Create Account" + white "Log In", matches Image 1 */}
      <div className="flex-shrink-0 px-5 pb-10 pt-4 bg-[#e8f5ee]">
        <button
          onClick={() => navigate("/tenant/signup/create")}
          className="w-full py-[15px] bg-[#1a4d2e] text-white rounded-xl text-[15px] font-bold cursor-pointer border-none mb-3 shadow-[0_4px_18px_rgba(26,77,46,0.22)]"
        >
          Create Account
        </button>
        <button
          onClick={() => navigate("/login1")}
          className="w-full py-[15px] bg-white text-[#1a4d2e] rounded-xl text-[15px] font-semibold cursor-pointer border border-gray-200 shadow-sm"
        >
          Log In
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  PAGE 2 — Create Account  (/tenant/signup/create)
//  Fixed to match Image 2: back arrow, heading + subtitle, 4 fields (Full Name,
//  Phone Number, Email Optional, Password), "Create Account" CTA, login link.
// ══════════════════════════════════════════════════════════════════════════════
interface FormState {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}
type FormErrors = Partial<FormState> & { general?: string };

export function CreateAccount() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  const setField = (key: keyof FormState) => (val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined, general: undefined }));
  };

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    const phone = form.phoneNumber.replace(/\s/g, "");
    if (!phone) e.phoneNumber = "Phone number is required";
    else if (!/^0\d{10}$/.test(phone)) e.phoneNumber = "Enter a valid 11-digit Nigerian number";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (!form.confirmPassword) e.confirmPassword = "Please confirm your password";
    else if (form.confirmPassword !== form.password) e.confirmPassword = "Passwords do not match";
    if (!e.phoneNumber) {
      const check = isAlreadyRegistered(
        form.phoneNumber.replace(/\s/g, ""),
        form.email.trim() || undefined,
      );
      if (check.taken) {
        if (check.field === "phone") e.phoneNumber = "This phone number is already registered.";
        if (check.field === "email") e.email = "This email address is already registered.";
      }
    }
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    try {
      const phone = form.phoneNumber.replace(/\s/g, "");
      registerUser({
        fullName: form.fullName.trim(),
        phoneNumber: phone,
        email: form.email.trim() || undefined,
        password: form.password,
        role: "tenant_landlord",
        createdAt: new Date().toISOString(),
      });
      savePhone(phone);
      setLoading(false);
      navigate("/tenant/signup/verify");
    } catch (err: unknown) {
      setErrors({
        general: err instanceof Error ? err.message : "Signup failed. Please try again.",
      });
      setLoading(false);
    }
  };

  const goBack = () => {
    if (window.innerWidth < 768) navigate("/tenant/signup/start");
    else navigate("/tenant/signup");
  };

  // Renders a single form field matching Image 2 style:
  // white background, light border, rounded-xl, placeholder in gray
  const renderField = (
    label: string,
    key: keyof FormState,
    placeholder: string,
    type = "text",
    required = true,
  ) => {
    const isPassword = key === "password";
    const isConfirm  = key === "confirmPassword";
    const isPwField  = isPassword || isConfirm;
    const showClear  = isPassword ? showPw : showConfirmPw;
    const toggle     = isPassword
      ? () => setShowPw((s) => !s)
      : () => setShowConfirmPw((s) => !s);
    const hasError = !!errors[key];

    return (
      <div className="mb-5">
        {/* Label row — "Email (Optional)" style matches Image 2 */}
        <label className="block text-[13px] font-medium text-gray-800 mb-1.5">
          {label}
          {!required && (
            <span className="text-gray-500 font-normal ml-0"> (Optional)</span>
          )}
          {required && (
            <span className="text-red-500 ml-0.5">*</span>
          )}
        </label>

        <div className="relative">
          <input
            type={isPwField ? (showClear ? "text" : "password") : type}
            placeholder={placeholder}
            value={form[key]}
            onChange={(e) => setField(key)(e.target.value)}
            className={[
              "w-full py-[14px] pl-4 text-[14px] rounded-xl outline-none bg-white",
              "border font-[inherit] text-gray-900 transition-colors duration-[180ms]",
              "focus:border-[#1a4d2e] placeholder:text-gray-400",
              isPwField ? "pr-11" : "pr-4",
              hasError ? "border-red-400" : "border-gray-200",
            ].join(" ")}
          />
          {isPwField && (
            <button
              type="button"
              onClick={toggle}
              tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-gray-400 p-0 flex items-center"
            >
              {showClear ? (
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
          )}
        </div>
        {hasError && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">

      {/* ── MOBILE LAYOUT ── matches Image 2 exactly */}
      <div className="flex flex-col min-h-screen md:hidden bg-[#e8f5ee]">

        {/* Back arrow — top-left, matches Image 2 */}
        <div className="flex-shrink-0 h-14 flex items-center px-5">
          <button
            onClick={goBack}
            aria-label="Go back"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-transparent border-none cursor-pointer text-[#1a4d2e] p-0"
          >
            {/* Left chevron arrow matching Image 2 */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a4d2e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
        </div>

        {/* Scrollable form — matches Image 2 layout */}
        <div className="flex-1 overflow-y-auto px-5 pt-2 pb-4">

          {/* Heading block */}
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

          {/* Fields — 4 visible fields matching Image 2:
              Full Name, Phone Number, Email (Optional), Password */}
          {renderField("Full Name", "fullName", "Enter your full name")}
          {renderField("Phone Number", "phoneNumber", "080 1234 5678", "tel")}
          {renderField("Email", "email", "your.email@example.com", "email", false)}
          {renderField("Password", "password", "Create a strong password", "password")}
          {/* Confirm password kept for validation but visually below fold on first view */}
          {renderField("Confirm Password", "confirmPassword", "Re-enter your password", "password")}
        </div>

        {/* Bottom CTA block — matches Image 2 */}
        <div className="flex-shrink-0 px-5 pb-10 pt-3 bg-[#e8f5ee]">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={[
              "w-full py-[15px] text-white border-none rounded-xl text-[15px] font-bold cursor-pointer font-[inherit] transition-opacity duration-200 mb-3",
              loading ? "bg-[#6b9e7a] cursor-not-allowed" : "bg-[#1a4d2e]",
            ].join(" ")}
          >
            {loading ? "Creating Account…" : "Create Account"}
          </button>
          {/* "Have an account already? Login" — matches Image 2 bottom link */}
          <p className="text-center text-[13px] text-gray-500 mt-1">
            Have an account already?{" "}
            <Link to="/login1" className="text-[#1a4d2e] font-semibold no-underline">Login</Link>
          </p>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ── unchanged */}
      <div className="hidden md:flex h-screen overflow-hidden">

        {/* Left panel */}
        <div className="w-[45%] flex-shrink-0 overflow-hidden">
          <LeftSection2 />
        </div>

        {/* Right panel */}
        <div className="flex-1 flex flex-col bg-[#F2FDF5] overflow-hidden">
          {/* Logo bar */}
          <div className="h-[70px] flex-shrink-0 px-9 border-b border-gray-100 flex items-center">
            <Logo />
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto flex items-center justify-center">
            <div className="w-full max-w-[380px] px-[46px] py-5 flex flex-col">

              <button
                onClick={goBack}
                className="bg-transparent border-none cursor-pointer text-gray-500 text-[30px] p-0 mb-4 self-start leading-none"
              >
                ←
              </button>

              <h1 className="text-[26px] font-bold text-[#1a4d2e] mb-1">Create Account</h1>
              <p className="text-[13px] text-gray-500 mb-[18px] leading-[1.5]">
                Find verified agents and rent safely with confidence.
              </p>

              {errors.general && (
                <div className="bg-red-50 border border-red-300 rounded-lg px-[14px] py-[10px] mb-[14px] text-[13px] text-red-600">
                  {errors.general}
                </div>
              )}

              {renderField("Full Name", "fullName", "Enter your full name")}
              {renderField("Phone Number", "phoneNumber", "080 1234 5678", "tel")}
              {renderField("Email", "email", "your.email@example.com", "email")}
              {renderField("Password", "password", "Create a strong password", "password")}
              {renderField("Confirm Password", "confirmPassword", "Re-enter your password", "password")}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className={[
                  "w-full py-[13px] text-white border-none rounded-[10px] text-[15px] font-bold cursor-pointer font-[inherit] transition-opacity duration-200 mt-1.5",
                  loading ? "bg-[#6b9e7a] cursor-not-allowed" : "bg-[#1a4d2e]",
                ].join(" ")}
              >
                {loading ? "Creating Account…" : "Create Account"}
              </button>

              <p className="text-center text-[13px] text-gray-500 mt-3.5">
                Have an account already?{" "}
                <Link to="/login1" className="text-[#1a4d2e] font-semibold no-underline">Login</Link>
              </p>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  PAGE 3 — Verify Phone  (/tenant/signup/verify)
//  Fixed to match Image 3: back arrow, "Verify Your Phone" heading, subtitle
//  with bold phone number, 6 white OTP boxes, "Resend code in 51s" in green,
//  "Verify" CTA at bottom.
// ══════════════════════════════════════════════════════════════════════════════
const AUTO_CODE = "123456";
const OTP_EXPIRY_SECONDS = 120;

export function VerifyPhone2() {
  const navigate = useNavigate();
  const [phone] = useState<string>(loadPhone);
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [secondsLeft, setSecondsLeft] = useState(OTP_EXPIRY_SECONDS);
  const [expired, setExpired] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!phone) navigate("/tenant/signup/create", { replace: true });
  }, [phone, navigate]);

  useEffect(() => {
    const t = setTimeout(() => setDigits(AUTO_CODE.split("")), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) { setExpired(true); return; }
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  const handleChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits]; next[i] = val;
    setDigits(next); setError("");
    if (val && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) inputRefs.current[i - 1]?.focus();
  };

  const handleVerify = () => {
    const code = digits.join("");
    if (code.length < 6) { setError("Please complete the 6-digit code."); return; }
    if (expired) { setError("Code expired. Please resend."); return; }
    if (code !== AUTO_CODE) { setError("Incorrect code. Please try again."); return; }
    setSuccess(true);
    setTimeout(() => { clearPhone(); navigate("/"); }, 900);
  };

  const handleResend = () => {
    setDigits(["", "", "", "", "", ""]);
    setSecondsLeft(OTP_EXPIRY_SECONDS);
    setExpired(false); setError("");
    setTimeout(() => setDigits(AUTO_CODE.split("")), 900);
  };

  // OTP boxes — styled to match Image 3:
  // white background, light gray border, rounded corners, equal spacing
  const OtpBoxes = ({ compact = false }: { compact?: boolean }) => (
    <div className={`flex gap-2 mb-4 ${compact ? "justify-start" : "md:gap-3 justify-start"}`}>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className={[
            // Matches Image 3: white boxes, light gray border, rounded-xl
            "text-center font-bold rounded-xl outline-none font-[inherit] transition-all duration-[180ms]",
            "border bg-white text-gray-900",
            compact
              ? "w-[46px] h-[50px] text-xl"
              : "w-[52px] h-[56px] text-[22px]",
            success
              ? "border-[#1a4d2e] bg-[#f0faf4]"
              : error
              ? "border-red-400"
              : d
              ? "border-[#1a4d2e]"
              : "border-gray-200",
          ].join(" ")}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#1a4d2e";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error
              ? "#ef4444"
              : d
              ? "#1a4d2e"
              : "#e5e7eb";
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans">

      {/* ── MOBILE LAYOUT ── matches Image 3 */}
      <div className="flex flex-col min-h-screen md:hidden bg-[#e8f5ee]">

        {/* Back arrow — top-left, matches Image 3 */}
        <div className="flex-shrink-0 h-14 flex items-center px-5">
          <button
            onClick={() => navigate("/tenant/signup/create")}
            aria-label="Go back"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-transparent border-none cursor-pointer p-0"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a4d2e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
        </div>

        {/* Main content — matches Image 3 layout */}
        <div className="flex-1 px-5 pt-2 pb-4">

          {/* Heading */}
          <h1 className="text-[26px] font-extrabold text-[#1a4d2e] mb-2 leading-tight">
            Verify Your Phone
          </h1>

          {/* Subtitle — "Enter the 6-digit code sent to <bold phone>" matches Image 3 */}
          <p className="text-[13px] text-gray-500 mb-7 leading-relaxed">
            Enter the 6-digit code sent to{" "}
            <strong className="text-gray-900 font-semibold">{phone || "your number"}</strong>
          </p>

          {/* OTP boxes */}
          <OtpBoxes compact />

          {/* Error / success states */}
          {error   && <p className="text-red-500 text-[13px] mb-3">{error}</p>}
          {success && <p className="text-[#1a4d2e] text-[13px] font-semibold mb-3">✓ Verified! Redirecting…</p>}

          {/* Resend row — "Resend code in 51s" with green timer, matches Image 3 */}
          <p className="text-[13px] text-gray-500">
            {expired ? (
              <>
                Code expired.{" "}
                <button
                  onClick={handleResend}
                  className="bg-transparent border-none text-[#1a4d2e] font-semibold cursor-pointer text-[13px] font-[inherit] p-0"
                >
                  Resend code
                </button>
              </>
            ) : (
              <>
                Resend code in{" "}
                {/* Green colored timer matching Image 3 */}
                <span className="text-[#1a4d2e] font-semibold">{mm}:{ss}</span>
              </>
            )}
          </p>
        </div>

        {/* Verify button — dark green, full width, at bottom, matches Image 3 */}
        <div className="flex-shrink-0 px-5 pb-10 pt-3 bg-[#e8f5ee]">
          <button
            onClick={handleVerify}
            disabled={success}
            className={[
              "w-full py-[15px] text-white border-none rounded-xl text-[15px] font-bold font-[inherit] transition-opacity duration-200",
              success
                ? "bg-[#6b9e7a] cursor-not-allowed"
                : "bg-[#1a4d2e] cursor-pointer shadow-[0_4px_18px_rgba(26,77,46,0.22)]",
            ].join(" ")}
          >
            {success ? "Verified ✓" : "Verify"}
          </button>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ── unchanged */}
      <div className="hidden md:flex h-screen overflow-hidden">

        <div className="w-[47%] flex-shrink-0 overflow-hidden">
          <LeftSection2 />
        </div>

        <div className="flex-1 flex flex-col bg-[#F2FDF5] overflow-hidden relative">
          {/* Decorative SVGs */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="absolute top-24 left-12 opacity-10 pointer-events-none">
            <circle cx="15" cy="15" r="10.5" stroke="#1a4d2e" strokeWidth="2.5"/>
            <path d="M23 23l9 9" stroke="#1a4d2e" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" className="absolute top-[40%] left-8 opacity-[0.09] pointer-events-none">
            <path d="M17 3C11 3 6 8 6 14c0 8 11 18 11 18s11-10 11-18c0-6-5-11-11-11z" stroke="#1a4d2e" strokeWidth="2.5"/>
            <circle cx="17" cy="14" r="3.5" stroke="#1a4d2e" strokeWidth="2"/>
          </svg>

          <div className="h-[70px] flex-shrink-0 px-9 border-b border-gray-100 flex items-center">
            <Logo />
          </div>

          <div className="flex-1 overflow-y-auto flex items-center justify-center">
            <div className="w-full max-w-[420px] px-[52px] py-5 flex flex-col">

              <button
                onClick={() => navigate("/tenant/signup/create")}
                className="bg-transparent border-none cursor-pointer text-gray-500 text-[22px] mb-2 self-start leading-none flex items-center"
              >
                ←
              </button>

              <h1 className="text-[28px] font-black text-[#1a4d2e] mb-2 text-left">
                Verify Your Phone
              </h1>
              <p className="text-sm text-gray-500 mb-7 text-left">
                Enter the 6-digit code sent to{" "}
                <strong className="text-gray-900">{phone || "your number"}</strong>
              </p>

              <OtpBoxes />

              {error   && <p className="text-red-500 text-[13px] mb-[10px]">{error}</p>}
              {success && <p className="text-[#1a4d2e] text-[13px] font-semibold mb-[10px]">✓ Verified! Redirecting…</p>}

              <p className="text-sm text-gray-500 mb-[22px]">
                {expired ? (
                  <>
                    Code expired.{" "}
                    <button
                      onClick={handleResend}
                      className="bg-transparent border-none text-[#1a4d2e] font-bold cursor-pointer text-sm font-[inherit] p-0"
                    >
                      Resend code
                    </button>
                  </>
                ) : (
                  <>
                    Resend code in{" "}
                    <strong className="text-[#1a4d2e]">{mm}:{ss}</strong>
                  </>
                )}
              </p>

              <button
                onClick={handleVerify}
                disabled={success}
                className={[
                  "w-full py-[15px] text-white border-none rounded-[10px] text-[15px] font-bold font-[inherit]",
                  success
                    ? "bg-[#6b9e7a] cursor-not-allowed shadow-none"
                    : "bg-[#1a4d2e] cursor-pointer shadow-[0_4px_20px_rgba(26,77,46,0.30)]",
                ].join(" ")}
              >
                {success ? "Verified ✓" : "Verify"}
              </button>

              <p className="text-left text-[13px] mt-4">
                <Link to="/tenant/signup/create" className="text-gray-400 no-underline">
                  ← Back to create account
                </Link>
              </p>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default RoleSelect;