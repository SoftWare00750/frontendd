// Onboarding.tsx — Tenant Responsive Mobile Onboarding
// Screens:
//   /tenant/signup         → RoleSelect
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

// ─── Global styles injected once ─────────────────────────────────────────────
// const globalStyles = `
//   /* Onboarding mobile reset */
//   @media (max-width: 768px) {
//     .ob-left-panel { display: none !important; }
//     .ob-right-panel {
//       width: 100% !important;
//       flex: 1 !important;
//     }
//     .ob-page-shell {
//       height: 100vh !important;
//       flex-direction: column !important;
//       overflow: hidden !important;
//     }
//   }

//   /* ── Back button: hidden on desktop, shown on mobile ── */
//   .back-btn-mobile {
//     display: none !important;
//   }
//   @media (max-width: 768px) {
//     .back-btn-mobile {
//       display: flex !important;
//       position: fixed !important;
//       top: 12px !important;
//       left: 16px !important;
//       z-index: 100 !important;
//       align-items: center !important;
//       justify-content: center !important;
//       width: 38px !important;
//       height: 38px !important;
//       background: #fff !important;
//       border: 1.5px solid #e5e7eb !important;
//       border-radius: 50% !important;
//       cursor: pointer !important;
//       color: #1a4d2e !important;
//       font-size: 18px !important;
//       box-shadow: 0 2px 8px rgba(0,0,0,0.08) !important;
//       padding: 0 !important;
//       line-height: 1 !important;
//     }
//   }

//   /* ── RoleSelect mobile ── */
//   @media (max-width: 768px) {
//     .rs-page {
//       height: 100vh !important;
//       flex-direction: column !important;
//       overflow: hidden !important;
//       display: flex !important;
//     }
//     .rs-bg-overlay { display: none !important; }
//     .rs-nav {
//       height: 56px !important;
//       padding: 0 16px !important;
//       flex-shrink: 0 !important;
//     }
//     .rs-hero {
//       padding: 28px 20px 20px !important;
//       flex: 1 !important;
//       overflow-y: auto !important;
//       -webkit-overflow-scrolling: touch !important;
//     }
//     .rs-h1 {
//       font-size: 22px !important;
//       margin-bottom: 6px !important;
//     }
//     .rs-subtitle {
//       font-size: 14px !important;
//       margin-bottom: 20px !important;
//     }
//     .rs-cards {
//       flex-direction: column !important;
//       gap: 16px !important;
//       max-width: 100% !important;
//     }
//     .rs-card {
//       flex: none !important;
//       max-width: 100% !important;
//       padding: 20px 18px 18px !important;
//     }
//     .rs-login-btn-row {
//       padding: 0 20px 28px !important;
//     }
//     .rs-login-btn {
//       width: 100% !important;
//       border-radius: 12px !important;
//       padding: 14px !important;
//       font-size: 15px !important;
//     }
//     .rs-footer {
//       padding: 14px 20px !important;
//       font-size: 11px !important;
//       flex-shrink: 0 !important;
//     }
//     .rs-decorative-icons { display: none !important; }
//   }

//   /* ── CreateAccount mobile ── */
//   @media (max-width: 768px) {
//     .ca-logo-bar {
//       height: 56px !important;
//       padding: 0 20px !important;
//       flex-shrink: 0 !important;
//     }
//     .ca-scroll-area {
//       flex: 1 !important;
//       overflow-y: auto !important;
//       -webkit-overflow-scrolling: touch !important;
//     }
//     .ca-body {
//       padding: 60px 20px 10px !important;
//       margin-top: 0 !important;
//       transform: none !important;
//     }
//     .ca-h1 { font-size: 20px !important; margin-bottom: 2px !important }
//     .ca-subtitle { font-size: 13px !important; margin-bottom: 12px !important;}
//     .ca-input {
//       padding: 10px 12px !important;
//       font-size: 14px !important;
//     }
//     .ca-btn {
//       padding: 12px !important;
//       font-size: 15px !important;
//       margin-top: 4px !important;
//     }
//     .ca-footer {
//       padding: 14px 20px !important;
//       font-size: 11px !important;
//       flex-shrink: 0 !important;
//     }
//   }

//   /* ── VerifyPhone mobile ── */
//   @media (max-width: 768px) {
//     .vp-logo-bar {
//       height: 56px !important;
//       padding: 0 20px !important;
//       flex-shrink: 0 !important;
//     }
//     .vp-scroll-area {
//       flex: 1 !important;
//       overflow-y: auto !important;
//       -webkit-overflow-scrolling: touch !important;
//     }
//     .vp-body {
//       padding: 60px 20px 20px !important;
//     }
//     .vp-h1 { font-size: 22px !important; text-align: left !important; margin-bottom: 4px !important; }
//     .vp-subtitle { font-size: 14px !important; text-align: left !important; margin-bottom: 16px !important; }
//     .vp-otp-boxes { gap: 8px !important; margin-bottom: 12px !important; }
//     .vp-otp-input {
//       width: 44px !important;
//       height: 52px !important;
//       font-size: 20px !important;
//       border-radius: 10px !important;
//     }
//     .vp-verify-btn {
//       padding: 15px !important;
//       font-size: 15px !important;
//       border-radius: 10px !important;
//     }
//     .vp-footer {
//       padding: 14px 20px !important;
//       font-size: 11px !important;
//       flex-shrink: 0 !important;
//     }
//     .vp-decorative { display: none !important; }
//   }

//   /* Hide desktop back button on mobile (the fixed circle button covers it) */
//   @media (max-width: 768px) {
//     .back-btn-desktop { display: none !important; }
//   }

//   /* Agent onboarding welcome mobile */
//   @media (max-width: 768px) {
//     .agent-ob-logo-bar {
//       height: 56px !important;
//       padding: 0 20px !important;
//     }
//     .agent-ob-body {
//       padding: 28px 20px 16px !important;
//     }
//     .agent-ob-h1 { font-size: 22px !important; }
//     .agent-ob-icons { padding: 0 24px !important; }
//     .agent-ob-btn { font-size: 14px !important; padding: 13px !important; }
//   }
// `;

function Logo() {
  return (
    <img src="/assets/logo.svg" alt="OgaLandlord" style={{ height: 36, objectFit: "contain", display: "block" }}
      onError={(e) => { e.currentTarget.style.display = "none"; }} />
  );
}

function Footer() {
  return (
    <footer  className="bg-[#F2FDF5] justify-between items-center p-5 border-t border-gray-400 text-xs text-[#9ca3af] mb-2">
      <span>© {new Date().getFullYear()} OgaLandLord. All rights reserved.</span>
      <div className="flex justify-between items-center p-2">
        <Link to="/privacy" >Privacy</Link>
        <Link to="/terms">Terms</Link>
        <Link to="/help" >Get help</Link>
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
      title: "Tenant / Landlord",
      subtitle: "Browse verified listings and connect with trusted agents.",
      features: ["Browse verified listings", "Secure rental process", "Manage your properties"],
    },
  ];

  const handleSelect = (role: Role) => {
    setSelected(role);
    setTimeout(() => {
      if (role === "agent") navigate("/agent/signup");
      else navigate("/tenant/signup/create");
    }, 180);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#e8f5ee] relative overflow-hidden">
      {/* <style>{globalStyles}</style> */}

      {/* Decorative icons */}
      <div className="rs-decorative-icons">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          style={{
            position: "fixed",
            top: 100,
            left: 60,
            opacity: 0.13,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <circle cx="20" cy="20" r="14" stroke="#1a4d2e" strokeWidth="3" />
          <path
            d="M30 30l10 10"
            stroke="#1a4d2e"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          style={{
            position: "fixed",
            top: 100,
            right: 60,
            opacity: 0.13,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <circle cx="16" cy="20" r="10" stroke="#1a4d2e" strokeWidth="3" />
          <path
            d="M23 25l14 14M31 31l4 4"
            stroke="#1a4d2e"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          style={{
            position: "fixed",
            top: "42%",
            left: 40,
            opacity: 0.12,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <path
            d="M22 4C15.4 4 10 9.4 10 16c0 10 12 24 12 24s12-14 12-24c0-6.6-5.4-12-12-12z"
            stroke="#1a4d2e"
            strokeWidth="3"
          />
          <circle cx="22" cy="16" r="4" stroke="#1a4d2e" strokeWidth="2.5" />
        </svg>
        <svg
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          style={{
            position: "fixed",
            top: "40%",
            right: 44,
            opacity: 0.12,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <path
            d="M8 26L26 8l18 18"
            stroke="#1a4d2e"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13 21v20h26V21"
            stroke="#1a4d2e"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="20"
            y="32"
            width="12"
            height="9"
            rx="1.5"
            stroke="#1a4d2e"
            strokeWidth="2.5"
          />
        </svg>
      </div>

      {/* Navbar */}
      <nav
        className="w-full bg-[#f2fdf5] border-b border-gray-300 flex items-center justify-between z-50 fixed py-3 px-7 "
      >
        <Logo />
        <p className="text-xs text-[#6b7280] ">
          <Link to="/login1" className="text-[#1a4d2e] font-medium ">
            Login
          </Link>
        </p>
      </nav>

      {/* Hero — scrollable, sandwiched between nav and footer */}
      <div
        className="rs-hero mt-15  md:mt-10"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 24px 24px",
          overflowY: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h1
          className="rs-h1"
          style={{
            fontSize: "clamp(24px,3.2vw,40px)",
            fontWeight: 700,
            color: "#014421",
            textAlign: "center",
            margin: "0 0 10px",
            letterSpacing: "-0.5px",
          }}
        >
          How would you like to join?
        </h1>
        <p
          className="rs-subtitle"
          style={{
            fontSize: 18,
            color: "rgb(64, 64, 64)",
            marginBottom: 28,
            textAlign: "center",
          }}
        >
          Select your role to get started
        </p>

        <div
          className="rs-cards"
          style={{
            display: "flex",
            gap: 24,
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: 820,
            width: "100%",
          }}
        >
          {cards.map(({ role, img, title, subtitle, features }) => {
            const isSelected = selected === role;
            return (
              <div
                key={role}
                className="rs-card "
                onClick={() => handleSelect(role)}
                style={{
                  flex: "1 1 300px",
                  maxWidth: 340,
                  background: "#fff",
                  border: `2px solid ${isSelected ? "#1a4d2e" : "#e5e7eb"}`,
                  borderRadius: 20,
                  padding: "28px 26px 22px",
                  cursor: "pointer",
                  transition: "all 0.22s ease",
                  boxShadow: isSelected
                    ? "0 14px 44px rgba(26,77,46,0.14)"
                    : "0 2px 10px rgba(0,0,0,0.05)",
                  transform: isSelected ? "translateY(-3px)" : "none",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                    boxShadow: "0 4px 16px rgba(26,77,46,0.30)",
                    overflow: "hidden",
                    background: "#f0faf4",
                  }}
                >
                  <img
                    src={img}
                    alt={title}
                    style={{ width: 54, height: 54, objectFit: "contain" }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#1a4d2e",
                    margin: "0 0 8px",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "#6b7280",
                    lineHeight: 1.56,
                    margin: "0 0 16px",
                  }}
                >
                  {subtitle}
                </p>
                {features.map((f) => (
                  <div
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 8,
                    }}
                  >
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                      <circle
                        cx="9.5"
                        cy="9.5"
                        r="8.75"
                        stroke="#1a4d2e"
                        strokeWidth="1.25"
                      />
                      <path
                        d="M5.5 9.5l3 3 5-5.5"
                        stroke="#1a4d2e"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span style={{ fontSize: 14, color: "#374151" }}>{f}</span>
                  </div>
                ))}
                <div
                  style={{
                    marginTop: 18,
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    color: "#1a4d2e",
                    fontWeight: 700,
                    fontSize: 15,
                  }}
                >
                  Get Started
                  <span
                    style={{
                      display: "inline-block",
                      transition: "transform 0.2s",
                      transform: isSelected ? "translateX(4px)" : "none",
                    }}
                  >
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Log In button row */}
        <div
          className="rs-login-btn-row"
          style={{
            width: "100%",
            maxWidth: 820,
            marginTop: 28,
            padding: "0 0 16px",
          }}
        >
          <button
            className="rs-login-btn"
            onClick={() => navigate("/login1")}
            style={{
              width: "100%",
              border: "1.5px solid #e5e7eb",
              background: "#fff",
              borderRadius: 12,
              padding: "13px",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              color: "#374151",
              fontFamily: "inherit",
              display: "none",
            }}
          >
            Log In
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  PAGE 2 — Create Account  (/tenant/signup/create)
// ══════════════════════════════════════════════════════════════════════════════
interface FormState { fullName: string; phoneNumber: string; email: string; password: string; confirmPassword: string; }
type FormErrors = Partial<FormState> & { general?: string };

export function CreateAccount() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({ fullName: "", phoneNumber: "", email: "", password: "", confirmPassword: "" });
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
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (!form.confirmPassword) e.confirmPassword = "Please confirm your password";
    else if (form.confirmPassword !== form.password) e.confirmPassword = "Passwords do not match";
    if (!e.phoneNumber) {
      const check = isAlreadyRegistered(form.phoneNumber.replace(/\s/g, ""), form.email.trim() || undefined);
      if (check.taken) {
        if (check.field === "phone") e.phoneNumber = "This phone number is already registered.";
        if (check.field === "email") e.email       = "This email address is already registered.";
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
      registerUser({ fullName: form.fullName.trim(), phoneNumber: phone, email: form.email.trim() || undefined, password: form.password, role: "tenant_landlord", createdAt: new Date().toISOString() });
      savePhone(phone);
      setLoading(false);
      navigate("/tenant/signup/verify");
    } catch (err: unknown) {
      setErrors({ general: err instanceof Error ? err.message : "Signup failed. Please try again." });
      setLoading(false);
    }
  };

  const renderField = (label: string, key: keyof FormState, placeholder: string, type = "text", required = true) => {
    const isPassword = key === "password";
    const isConfirm  = key === "confirmPassword";
    const isPwField  = isPassword || isConfirm;
    const showClear  = isPassword ? showPw : showConfirmPw;
    const toggle     = isPassword ? () => setShowPw((s) => !s) : () => setShowConfirmPw((s) => !s);

    return (
      <div className=" w-full ">
        <label  className="block text-xs mb-2 ">
          {label}{required && <span style={{ color: "#ef4444", marginLeft: 3 }}>*</span>}
        </label>
        <div  className="relative">
          <input className="" type={isPwField ? (showClear ? "text" : "password") : type} placeholder={placeholder} value={form[key]}
            onChange={(e) => setField(key)(e.target.value)}
            style={{ width: "100%", padding: "10px 14px", paddingRight: isPwField ? 44 : 14, border: `1.5px solid ${errors[key] ? "#ef4444" : "#e5e7eb"}`, borderRadius: 10, fontSize: 14, outline: "none", background: "#fafafa", boxSizing: "border-box", fontFamily: "inherit", transition: "border-color 0.18s", color: "#111827" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#1a4d2e"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = errors[key] ? "#ef4444" : "#e5e7eb"; }}
          />
          {isPwField && (
            <button type="button" onClick={toggle}
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 0, display: "flex", alignItems: "center" }} tabIndex={-1}>
              {showClear ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </button>
          )}
        </div>
        {errors[key] && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errors[key]}</p>}
      </div>
    );
  };

  return (
    <div className="h-screen  overflow-hidden w-full">
      {/* <style>{globalStyles}</style> */}

      <div className=" grid md:grid-cols-2 grid-cols-1  overflow-hidden">
        {/* Left panel */}
        <div className="overflow-hidden w-full">
          <LeftSection2 />
        </div>

        {/* Right panel */}
        <div className="w-full relative overflow-scroll h-screen">
          <div className="p-5 border-b border-gray-300 fixed top-0 z-50 w-full bg-[#f2fdf5]">
            <Logo />
          </div>

          {/* Scrollable content area — flex: 1 so footer never moves */}
          <div className="ca-scroll-area bg-[#f2fdf5]">
            <div className="w-full p-5 space-y-6 md:px-10">
              <h1 className="text-[26px] font-bold text-green-700 mb-2 mt-20">
                Create Account
              </h1>
              <p
                className="ca-subtitle"
                style={{
                  fontSize: 16,
                  
                  marginBottom: 18,
                  lineHeight: 1.5,
                }}
              >
                Find verified agents and rent safely with confidence.
              </p>

              {errors.general && (
                <div
                  style={{
                    background: "#fef2f2",
                    border: "1px solid #fca5a5",
                    borderRadius: 8,
                    padding: "10px 14px",
                    marginBottom: 14,
                    fontSize: 13,
                    color: "#dc2626",
                  }}
                >
                  {errors.general}
                </div>
              )}

              {renderField("Full Name", "fullName", "Enter your full name")}
              {renderField(
                "Phone Number",
                "phoneNumber",
                "080 1234 5678",
                "tel",
              )}
              {renderField("Email", "email", "your.email@example.com", "email")}
              {renderField(
                "Password",
                "password",
                "Create a strong password",
                "password",
              )}
              {renderField(
                "Confirm Password",
                "confirmPassword",
                "Re-enter your password",
                "password",
              )}

              <button
                className="ca-btn"
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "13px",
                  background: loading ? "#6b9e7a" : "#1a4d2e",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "inherit",
                  transition: "opacity 0.2s",
                  marginTop: 6,
                }}
              >
                {loading ? "Creating Account…" : "Create Account"}
              </button>

              <p
                style={{
                  textAlign: "center",
                  fontSize: 13,
                  color: "#6b7280",
                  marginTop: 14,
                }}
              >
                Have an account already?{" "}
                <Link
                  to="/login1"
                  style={{
                    color: "#1a4d2e",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Login
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

// ══════════════════════════════════════════════════════════════════════════════
//  PAGE 3 — Verify Phone  (/tenant/signup/verify)
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
    setTimeout(() => { clearPhone(); navigate("/Home"); }, 900);
  };

  const handleResend = () => {
    setDigits(["", "", "", "", "", ""]);
    setSecondsLeft(OTP_EXPIRY_SECONDS);
    setExpired(false); setError("");
    setTimeout(() => setDigits(AUTO_CODE.split("")), 900);
  };

  return (
    <div className="h-screen max-w-screen" >
      

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left panel */}
        <div className="hidden md:block">
          <LeftSection2 />
        </div>

        {/* Right panel */}
        <div className="flrx flex-col bg-[#F2FDF5] overflow-hidden relative">
          {/* Decorative SVGs */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="vp-decorative" style={{ position: "absolute", top: 100, left: 48, opacity: 0.10, pointerEvents: "none" }}>
            <circle cx="15" cy="15" r="10.5" stroke="#1a4d2e" strokeWidth="2.5" /><path d="M23 23l9 9" stroke="#1a4d2e" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" className="vp-decorative" style={{ position: "absolute", top: "40%", left: 32, opacity: 0.09, pointerEvents: "none" }}>
            <path d="M17 3C11 3 6 8 6 14c0 8 11 18 11 18s11-10 11-18c0-6-5-11-11-11z" stroke="#1a4d2e" strokeWidth="2.5" /><circle cx="17" cy="14" r="3.5" stroke="#1a4d2e" strokeWidth="2" />
          </svg>

          <div className="vp-logo-bar" style={{ height: 70, flexShrink: 0, padding: "0 36px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center" }}>
            <Logo />
          </div>

          {/* Scrollable content area — flex: 1 so footer never moves */}
          <div className="vp-scroll-area" style={{ flex: 1, overflowY: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="vp-body" style={{ width: "100%", maxWidth: 420, padding: "20px 52px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
             

              <h1 className="vp-h1" style={{ fontSize: 28, fontWeight: 900, color: "#1a4d2e", marginBottom: 8, textAlign: "left" }}>Verify Your Phone</h1>
              <p className="vp-subtitle" style={{ fontSize: 14, color: "#6b7280", marginBottom: 28, textAlign: "left" }}>
                Enter the 6-digit code sent to{" "}<strong style={{ color: "#111827" }}>{phone || "your number"}</strong>
              </p>

              {/* OTP boxes */}
              <div className="flex gap-3 justify-center mb-5 px-10 ">
                {digits.map((d, i) => (
                  <input key={i} className="vp-otp-input"
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text" inputMode="numeric" maxLength={1} value={d}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    style={{
                      width: 50, height: 50, textAlign: "center", fontSize: 20, fontWeight: 700,
                      border: `2px solid ${success ? "#1a4d2e" : error ? "#ef4444" : d ? "#1a4d2e" : "#e5e7eb"}`,
                      borderRadius: 12, outline: "none",
                      background: d ? "#f0faf4" : "#fafafa", color: "#111827",
                      transition: "border-color 0.18s, background 0.18s", fontFamily: "inherit",
                      boxShadow: d ? "0 2px 8px rgba(26,77,46,0.10)" : "none",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#1a4d2e"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = error ? "#ef4444" : d ? "#1a4d2e" : "#e5e7eb"; }}
                  />
                ))}
              </div>

              {error   && <p style={{ color: "#ef4444", fontSize: 13, marginBottom: 10 }}>{error}</p>}
              {success && <p style={{ color: "#1a4d2e", fontSize: 13, fontWeight: 600, marginBottom: 10 }}>✓ Verified! Redirecting…</p>}

              <p className="text-center" style={{ fontSize: 14, color: "#6b7280", marginBottom: 22 }}>
                {expired ? (
                  <>Code expired.{" "}
                    <button onClick={handleResend} style={{ background: "none", border: "none", color: "#1a4d2e", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "inherit", padding: 0 }}>Resend code</button>
                  </>
                ) : (
                  <>Resend code in <strong style={{ color: "#1a4d2e" }}>{mm}:{ss}</strong></>
                )}
              </p>

              <button className="vp-verify-btn" onClick={handleVerify} disabled={success}
                style={{ width: "100%", padding: "14px", background: success ? "#6b9e7a" : "#1a4d2e", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: success ? "not-allowed" : "pointer", boxShadow: success ? "none" : "0 4px 20px rgba(26,77,46,0.30)", fontFamily: "inherit" }}>
                {success ? "Verified ✓" : "Verify"}
              </button>

              <p style={{ textAlign: "center", fontSize: 13, marginTop: 16 }}>
                <Link to="/tenant/signup/create" style={{ color: "#9ca3af", textDecoration: "none" }}> Back to create account</Link>
              </p>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}

// Also hide desktop back btn on mobile via global styles (already handled by back-btn-mobile / back-btn-desktop split)
// Add this to globalStyles above if you want to hide the inline desktop back button on mobile:
// @media (max-width: 768px) { .back-btn-desktop { display: none !important; } }

// ══════════════════════════════════════════════════════════════════════════════
//  Default export — RoleSelect
// ══════════════════════════════════════════════════════════════════════════════
export default RoleSelect;