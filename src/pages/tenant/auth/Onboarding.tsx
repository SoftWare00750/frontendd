// tenantSignup.tsx
//
// Each step lives at its own URL so the browser back button works naturally:
//   /tenant/signup          → Role selection
//   /tenant/signup/create   → Create Account
//   /tenant/signup/verify   → Verify Phone
//
// Mount in your router like this:
//   <Route path="/tenant/signup"         element={<RoleSelect />} />
//   <Route path="/tenant/signup/create"  element={<CreateAccount />} />
//   <Route path="/tenant/signup/verify"  element={<VerifyPhone2 />} />

import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LeftSection2 } from "./../../../components/shared/LeftSection2";
import { registerUser, isAlreadyRegistered } from "./../../../data/user";

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = "agent" | "tenant_landlord";

// ─── Session: keeps phone alive across a refresh on /verify ──────────────────

const SESSION_PHONE_KEY = "ogalandlord_signup_phone";
const savePhone  = (p: string) => sessionStorage.setItem(SESSION_PHONE_KEY, p);
const loadPhone  = ()          => sessionStorage.getItem(SESSION_PHONE_KEY) ?? "";
const clearPhone = ()          => sessionStorage.removeItem(SESSION_PHONE_KEY);

// ─── Shared components ────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #e5e7eb",
        background: "#F2FDF5",
        padding: "12px 22px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 12,
        color: "#9ca3af",
        flexWrap: "wrap",
        gap: 8,
        flexShrink: 0,
      }}
    >
      <span>© 2026 OgaLandLord. All rights reserved.</span>
      <div style={{ display: "flex", gap: 22 }}>
        <Link to="/privacy" style={{ color: "#5c5d5d", textDecoration: "none" }}>Privacy</Link>
        <Link to="/terms"   style={{ color: "#5c5d5d", textDecoration: "none" }}>TermsOfUse</Link>
        <Link to="/help"    style={{ color: "#5c5d5d", textDecoration: "none" }}>Get help</Link>
      </div>
    </footer>
  );
}

function Logo() {
  return (
    <img
      src="/assets/logo.svg"
      alt="OgaLandlord"
      style={{ height: 36, objectFit: "contain", display: "block" }}
    />
  );
}

// ─── PAGE 1 — Role Selection  (/tenant/signup) ────────────────────────────────

export function RoleSelect() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<Role | null>(null);

  const cards: {
    role: Role;
    img: string;
    title: string;
    subtitle: string;
    features: string[];
  }[] = [
    {
      role: "agent",
      img: "/assets/agent.png",
      title: "Agent",
      subtitle: "List properties, get verified, and connect with tenants and landlords looking to rent",
      features: [
        "Verified agent badge",
        "Build trust with tenants",
        "Grow your rental business",
      ],
    },
    {
      role: "tenant_landlord",
      img: "/assets/tenant.png",
      title: "Tenant / LandLord",
      subtitle: "Browse verified listings and connect with trusted agents.",
      features: [
        "Browse verified listings",
        "Secure rental process",
        "Manage your properties",
      ],
    },
  ];

  const handleSelect = (role: Role) => {
    if (role === "agent") {
      navigate("/agent/signup");
    } else {
      navigate("/tenant/signup/create");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, backgroundImage: "url('/assets/background1.png')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.18 }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "#e8f5ee", opacity: 0.82 }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>

        {/* Navbar */}
        <nav style={{ height: 68, flexShrink: 0, background: "#f2fdf5", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px" }}>
          <Logo />
          <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>
            Already have an account?{" "}
            <Link to="/login1" style={{ color: "#1a4d2e", fontWeight: 600, textDecoration: "none" }}>Login</Link>
          </p>
        </nav>

        {/* Decorative SVG icons */}
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ position: "fixed", top: 100, left: 60, opacity: 0.13, zIndex: 0 }}>
          <circle cx="20" cy="20" r="14" stroke="#1a4d2e" strokeWidth="3" />
          <path d="M30 30l10 10" stroke="#1a4d2e" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ position: "fixed", top: 100, right: 60, opacity: 0.13, zIndex: 0 }}>
          <circle cx="16" cy="20" r="10" stroke="#1a4d2e" strokeWidth="3" />
          <path d="M23 25l14 14M31 31l4 4" stroke="#1a4d2e" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" style={{ position: "fixed", top: "42%", left: 40, opacity: 0.12, zIndex: 0 }}>
          <path d="M22 4C15.4 4 10 9.4 10 16c0 10 12 24 12 24s12-14 12-24c0-6.6-5.4-12-12-12z" stroke="#1a4d2e" strokeWidth="3" />
          <circle cx="22" cy="16" r="4" stroke="#1a4d2e" strokeWidth="2.5" />
        </svg>
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" style={{ position: "fixed", top: "40%", right: 44, opacity: 0.12, zIndex: 0 }}>
          <path d="M8 26L26 8l18 18" stroke="#1a4d2e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 21v20h26V21" stroke="#1a4d2e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="20" y="32" width="12" height="9" rx="1.5" stroke="#1a4d2e" strokeWidth="2.5" />
          <circle cx="38" cy="14" r="2" fill="#1a4d2e" opacity="0.6" />
          <circle cx="42" cy="10" r="1.5" fill="#1a4d2e" opacity="0.5" />
          <circle cx="34" cy="10" r="1.5" fill="#1a4d2e" opacity="0.4" />
        </svg>

        {/* Hero */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 24px 24px", overflowY: "auto" }}>
          <h1 style={{ fontSize: "clamp(24px, 3.2vw, 40px)", fontWeight: 700, color: "#014421", textAlign: "center", margin: "0 0 10px", letterSpacing: "-0.5px" }}>
            How would you like to join?
          </h1>
          <p style={{ fontSize: 18, color: "rgb(64, 64, 64)", marginBottom: 28, textAlign: "center" }}>
            Select your role to get started with OgaLandlord
          </p>

          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center", maxWidth: 820, width: "100%" }}>
            {cards.map(({ role, img, title, subtitle, features }) => {
              const active = hovered === role;
              return (
                <div
                  key={role}
                  onMouseEnter={() => setHovered(role)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleSelect(role)}
                  style={{
                    flex: "1 1 300px", maxWidth: 340, background: "#fff",
                    border: `2px solid ${active ? "#1a4d2e" : "#e5e7eb"}`,
                    borderRadius: 20, padding: "28px 26px 22px", cursor: "pointer",
                    transition: "all 0.22s ease",
                    boxShadow: active ? "0 14px 44px rgba(26,77,46,0.14)" : "0 2px 10px rgba(0,0,0,0.05)",
                    transform: active ? "translateY(-5px)" : "none",
                  }}
                >
                  <div style={{ width: 54, height: 54, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, boxShadow: "0 4px 16px rgba(26,77,46,0.30)", overflow: "hidden" }}>
                    <img src={img} alt={title} style={{ width: 54, height: 54, objectFit: "contain" }} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#1a4d2e", margin: "0 0 8px" }}>{title}</h3>
                  <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.56, margin: "0 0 16px" }}>{subtitle}</p>
                  {features.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                        <circle cx="9.5" cy="9.5" r="8.75" stroke="#1a4d2e" strokeWidth="1.25" />
                        <path d="M5.5 9.5l3 3 5-5.5" stroke="#1a4d2e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span style={{ fontSize: 14, color: "#374151" }}>{f}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 5, color: "#1a4d2e", fontWeight: 700, fontSize: 15 }}>
                    Get Started
                    <span style={{ display: "inline-block", transition: "transform 0.2s", transform: active ? "translateX(4px)" : "none" }}>
                      <img src="/assets/arrow.png" alt="" />
                    </span>
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

// ─── PAGE 2 — Create Account  (/tenant/signup/create) ─────────────────────────

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
    else if (!/^0\d{10}$/.test(phone))
      e.phoneNumber = "Enter a valid 11-digit Nigerian number (e.g. 080 1234 5678)";

    if (!form.email.trim()) e.email = "email is required";

    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters";

    if (!form.confirmPassword) e.confirmPassword = "Please confirm your password";
    else if (form.confirmPassword !== form.password) e.confirmPassword = "Passwords do not match";

    // Global uniqueness check (before hitting registerUser)
    if (!e.phoneNumber) {
      const check = isAlreadyRegistered(phone, form.email.trim() || undefined);
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
      registerUser({
        fullName:    form.fullName.trim(),
        phoneNumber: phone,
        email:       form.email.trim() || undefined,
        password:    form.password,
        role:        "tenant_landlord",
        createdAt:   new Date().toISOString(),
      });
      savePhone(phone);
      setLoading(false);
      navigate("/tenant/signup/verify");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Signup failed. Please try again.";
      setErrors({ general: msg });
      setLoading(false);
    }
  };

  // ── Generic field renderer ──
  const renderField = (
    label: string,
    key: keyof FormState,
    placeholder: string,
    type = "text",
    required = true
  ) => {
    const isPassword        = key === "password";
    const isConfirmPassword = key === "confirmPassword";
    const showToggle        = isPassword || isConfirmPassword;
    const showClear         = isPassword ? showPw : showConfirmPw;
    const toggleShow        = isPassword
      ? () => setShowPw((s) => !s)
      : () => setShowConfirmPw((s) => !s);

    return (
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#111827", marginBottom: 5 }}>
          {label}{required && <span style={{ color: "#ef4444", marginLeft: 3 }}>*</span>}
        </label>
        <div style={{ position: "relative" }}>
          <input
            type={showToggle ? (showClear ? "text" : "password") : type}
            placeholder={placeholder}
            value={form[key]}
            onChange={(e) => setField(key)(e.target.value)}
            style={{
              width: "100%", padding: "11px 14px",
              paddingRight: showToggle ? 44 : 14,
              border: `1.5px solid ${errors[key] ? "#ef4444" : "#e5e7eb"}`,
              borderRadius: 10, fontSize: 14, outline: "none",
              background: "#fafafa", boxSizing: "border-box",
              fontFamily: "inherit", transition: "border-color 0.18s", color: "#111827",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#1a4d2e"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = errors[key] ? "#ef4444" : "#e5e7eb"; }}
          />
          {showToggle && (
            <button
              type="button"
              onClick={toggleShow}
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 0, display: "flex", alignItems: "center" }}
              tabIndex={-1}
            >
              {showClear ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          )}
        </div>
        {errors[key] && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errors[key]}</p>}
      </div>
    );
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif", overflow: "hidden" }}>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* Left panel */}
        <div style={{ width: "45%", flexShrink: 0, overflow: "hidden" }}>
          <LeftSection2 />
        </div>

        {/* Right panel */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundImage: "url('/assets/background1.png')", backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden" }}>

          <div style={{ height: 70, flexShrink: 0, padding: "0 36px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center" }}>
            <Logo />
          </div>

          <div style={{ flex: 1, overflow: "hidden", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "24px 46px", transform: "scale(1.01)", transformOrigin: "top center" }}>
            <div style={{ width: "100%", maxWidth: 380 }}>
              <h1 style={{ fontSize: 26, fontWeight: 700, color: "#1a4d2e", marginBottom: 4 }}>Create Account</h1>
              <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 18, lineHeight: 1.5 }}>
                Find verified agents and rent safely with confidence.
              </p>

              {errors.general && (
                <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: "#dc2626" }}>
                  {errors.general}
                </div>
              )}

              {renderField("Full Name", "fullName", "Enter your full name")}
              {renderField("Phone Number", "phoneNumber", "080 1234 5678", "tel")}
              {renderField("Email ", "email", "your.email@example.com", "email",)}
              {renderField("Password", "password", "Create a strong password", "password")}
              {renderField("Confirm Password", "confirmPassword", "Re-enter your password", "password")}

              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width: "100%", padding: "13px",
                  background: loading ? "#6b9e7a" : "linear-gradient(135deg, #1a4d2e 0%, #2d7a4f 100%)",
                  color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: loading ? "none" : "0 4px 20px rgba(26,77,46,0.30)",
                  fontFamily: "inherit", transition: "opacity 0.2s", marginTop: 6,
                }}
              >
                {loading ? "Creating Account…" : "Create Account"}
              </button>

              <p style={{ textAlign: "center", fontSize: 13, color: "#6b7280", marginTop: 14 }}>
                Have an account already?{" "}
                <Link to="/login1" style={{ color: "#1a4d2e", fontWeight: 600, textDecoration: "none" }}>Login</Link>
              </p>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}

// ─── PAGE 3 — Verify Phone  (/tenant/signup/verify) ───────────────────────────

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
    setTimeout(() => {
      clearPhone();
      // After tenant verification → go to tenant home
      navigate("/");
    }, 900);
  };

  const handleResend = () => {
    setDigits(["", "", "", "", "", ""]);
    setSecondsLeft(OTP_EXPIRY_SECONDS);
    setExpired(false); setError("");
    setTimeout(() => setDigits(AUTO_CODE.split("")), 900);
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif", overflow: "hidden" }}>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* Left panel */}
        <div style={{ width: "47%", flexShrink: 0, overflow: "hidden" }}>
          <LeftSection2 />
        </div>

        {/* Right panel */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundImage: "url('/assets/background2.png')", backgroundSize: "cover", backgroundPosition: "center", position: "relative", overflow: "hidden" }}>

          <div style={{ height: 70, flexShrink: 0, padding: "0 36px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center" }}>
            <Logo />
          </div>

          {/* Decorative icons */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ position: "absolute", top: 100, left: 48, opacity: 0.10, pointerEvents: "none" }}>
            <circle cx="15" cy="15" r="10.5" stroke="#1a4d2e" strokeWidth="2.5" />
            <path d="M23 23l9 9" stroke="#1a4d2e" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ position: "absolute", top: 100, right: 48, opacity: 0.10, pointerEvents: "none" }}>
            <circle cx="12" cy="16" r="7.5" stroke="#1a4d2e" strokeWidth="2.5" />
            <path d="M17 19l11 11M22 22l3 3" stroke="#1a4d2e" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" style={{ position: "absolute", top: "40%", left: 32, opacity: 0.09, pointerEvents: "none" }}>
            <path d="M17 3C11 3 6 8 6 14c0 8 11 18 11 18s11-10 11-18c0-6-5-11-11-11z" stroke="#1a4d2e" strokeWidth="2.5" />
            <circle cx="17" cy="14" r="3.5" stroke="#1a4d2e" strokeWidth="2" />
          </svg>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ position: "absolute", top: "38%", right: 32, opacity: 0.09, pointerEvents: "none" }}>
            <path d="M6 20L20 6l14 14" stroke="#1a4d2e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 16v16h20V16" stroke="#1a4d2e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="15" y="25" width="10" height="7" rx="1" stroke="#1a4d2e" strokeWidth="2" />
          </svg>

          {/* OTP form */}
          <div style={{ flex: 1, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 52px" }}>
            <div style={{ width: "100%", maxWidth: 420 }}>
              <h1 style={{ fontSize: 28, fontWeight: 900, color: "#1a4d2e", marginBottom: 8, textAlign: "left" }}>
                Verify Your Phone
              </h1>
              <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 28, textAlign: "left" }}>
                Enter the 6-digit code sent to{" "}
                <strong style={{ color: "#111827" }}>{phone}</strong>
              </p>

              {/* OTP boxes */}
              <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 16 }}>
                {digits.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text" inputMode="numeric" maxLength={1} value={d}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    style={{
                      width: 52, height: 58, textAlign: "center", fontSize: 22, fontWeight: 700,
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

              {error   && <p style={{ color: "#ef4444", fontSize: 13, marginBottom: 10, textAlign: "center" }}>{error}</p>}
              {success && <p style={{ color: "#1a4d2e", fontSize: 13, fontWeight: 600, marginBottom: 10, textAlign: "center" }}>✓ Verified! Redirecting…</p>}

              <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 22, textAlign: "center" }}>
                {expired ? (
                  <>Code expired.{" "}
                    <button onClick={handleResend} style={{ background: "none", border: "none", color: "#1a4d2e", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "inherit", padding: 0 }}>
                      Resend code
                    </button>
                  </>
                ) : (
                  <>Resend code in <strong style={{ color: "#1a4d2e" }}>{mm}:{ss}</strong></>
                )}
              </p>

              <button
                onClick={handleVerify} disabled={success}
                style={{
                  width: "100%", padding: "14px",
                  background: success ? "#6b9e7a" : "linear-gradient(135deg, #1a4d2e 0%, #2d7a4f 100%)",
                  color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700,
                  cursor: success ? "not-allowed" : "pointer",
                  boxShadow: success ? "none" : "0 4px 20px rgba(26,77,46,0.30)",
                  fontFamily: "inherit",
                }}
              >
                {success ? "Verified ✓" : "Verify"}
              </button>

              <p style={{ textAlign: "center", fontSize: 13, marginTop: 16 }}>
                <Link to="/tenant/signup/create" style={{ color: "#9ca3af", textDecoration: "none" }}>
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

// ─── Default export (convenience re-export of RoleSelect) ────────────────────

export default RoleSelect;