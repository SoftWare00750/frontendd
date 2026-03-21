// tenantSignup.tsx
// Three-step signup flow for OgaLandlord:
//   Step 1 → Role selection  (background1.png, logo.png, agent.png, landlord.png)
//   Step 2 → Create Account  (LeftSection2.tsx + background2.png right panel)
//   Step 3 → Verify Phone    (LeftSection2.tsx + 6-digit OTP, auto-fills as "123456")
//
// After successful verification → navigates to /home  (Home.tsx)

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {LeftSection2} from "./../../../components/shared/LeftSection2";
import { saveUser } from "./../../../data/user";

// ─── Shared types ────────────────────────────────────────────────────────────

type Step = "role" | "create" | "verify";
type Role = "agent" | "tenant_landlord";

// ─── Shared helpers ───────────────────────────────────────────────────────────

/** Reusable footer strip */
function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #e5e7eb",
        background: "#fff",
        padding: "16px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 12,
        color: "#9ca3af",
        flexWrap: "wrap",
        gap: 8,
      }}
    >
      <span>© 2026 OgaLandLord. All right reserved.</span>
      <div style={{ display: "flex", gap: 22 }}>
        {["Privacy", "Terms", "Get help"].map((l) => (
          <a key={l} href="#" style={{ color: "#9ca3af", textDecoration: "none" }}>
            {l}
          </a>
        ))}
      </div>
    </footer>
  );
}

/** Logo image from assets */
function Logo() {
  return (
    <img
      src="./../../assets/logo2.png"
      alt="OgaLandlord"
      style={{ height: 36, objectFit: "contain", display: "block" }}
    />
  );
}

// ─── STEP 1 — Role Selection ─────────────────────────────────────────────────

interface RoleSelectProps {
  onSelect: (role: Role) => void;
}

function RoleSelect({ onSelect }: RoleSelectProps) {
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
      img: "./../../assets/agent.png",
      title: "Agent",
      subtitle:
        "List properties, get verified, and connect with tenants and landlords looking to rent",
      features: [
        "Verified agent badge",
        "Build trust with tenants",
        "Grow your rental business",
      ],
    },
    {
      role: "tenant_landlord",
      img: "./../../assets/tenant.png",
      title: "Tenant/LandLord",
      subtitle: "Browse verified listings and connect with trusted agents.",
      features: [
        "Browse verified listings",
        "Secure rental process",
        "Manage your properties",
      ],
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Full-page background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          backgroundImage: "url('./../../assets/background1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.18,
        }}
      />
      {/* Tinted bg overlay for the mint-green tint matching the design */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background: "#e8f5ee",
          opacity: 0.82,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* ── Navbar ── */}
        <nav
          style={{
            height: 68,
            background: "#fff",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px",
          }}
        >
          <Logo />
          <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>
            Already have an account?{" "}
            <a
              href="#"
              style={{
                color: "#1a4d2e",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Login
            </a>
          </p>
        </nav>

        {/* ── Decorative icons (matching the ghost icons in the design) ── */}
        {/* Top-left: search */}
        <svg
          width="48" height="48" viewBox="0 0 48 48" fill="none"
          style={{ position: "fixed", top: 100, left: 60, opacity: 0.13, zIndex: 0 }}
        >
          <circle cx="20" cy="20" r="14" stroke="#1a4d2e" strokeWidth="3" />
          <path d="M30 30l10 10" stroke="#1a4d2e" strokeWidth="3" strokeLinecap="round" />
        </svg>
        {/* Top-right: key */}
        <svg
          width="48" height="48" viewBox="0 0 48 48" fill="none"
          style={{ position: "fixed", top: 100, right: 60, opacity: 0.13, zIndex: 0 }}
        >
          <circle cx="16" cy="20" r="10" stroke="#1a4d2e" strokeWidth="3" />
          <path d="M23 25l14 14M31 31l4 4" stroke="#1a4d2e" strokeWidth="3" strokeLinecap="round" />
        </svg>
        {/* Mid-left: pin */}
        <svg
          width="44" height="44" viewBox="0 0 44 44" fill="none"
          style={{ position: "fixed", top: "42%", left: 40, opacity: 0.12, zIndex: 0 }}
        >
          <path
            d="M22 4C15.4 4 10 9.4 10 16c0 10 12 24 12 24s12-14 12-24c0-6.6-5.4-12-12-12z"
            stroke="#1a4d2e" strokeWidth="3"
          />
          <circle cx="22" cy="16" r="4" stroke="#1a4d2e" strokeWidth="2.5" />
        </svg>
        {/* Mid-right: house */}
        <svg
          width="52" height="52" viewBox="0 0 52 52" fill="none"
          style={{ position: "fixed", top: "40%", right: 44, opacity: 0.12, zIndex: 0 }}
        >
          <path d="M8 26L26 8l18 18" stroke="#1a4d2e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 21v20h26V21" stroke="#1a4d2e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="20" y="32" width="12" height="9" rx="1.5" stroke="#1a4d2e" strokeWidth="2.5" />
          {/* sparkle dots */}
          <circle cx="38" cy="14" r="2" fill="#1a4d2e" opacity="0.6" />
          <circle cx="42" cy="10" r="1.5" fill="#1a4d2e" opacity="0.5" />
          <circle cx="34" cy="10" r="1.5" fill="#1a4d2e" opacity="0.4" />
        </svg>

        {/* ── Hero text ── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 24px 60px",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(28px, 3.8vw, 46px)",
              fontWeight: 900,
              color: "#111827",
              textAlign: "center",
              margin: "0 0 12px",
              letterSpacing: "-0.5px",
            }}
          >
            How would you like to join?
          </h1>
          <p
            style={{
              fontSize: 17,
              color: "#6b7280",
              marginBottom: 44,
              textAlign: "center",
            }}
          >
            Select your role to get started with OgaLandlord
          </p>

          {/* ── Cards ── */}
          <div
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
              const active = hovered === role;
              return (
                <div
                  key={role}
                  onMouseEnter={() => setHovered(role)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() =>
                    role === "tenant_landlord" && onSelect(role)
                  }
                  style={{
                    flex: "1 1 300px",
                    maxWidth: 340,
                    background: "#fff",
                    border: `2px solid ${active ? "#1a4d2e" : "#e5e7eb"}`,
                    borderRadius: 20,
                    padding: "30px 28px 26px",
                    cursor: role === "tenant_landlord" ? "pointer" : "default",
                    transition: "all 0.22s ease",
                    boxShadow: active
                      ? "0 14px 44px rgba(26,77,46,0.14)"
                      : "0 2px 10px rgba(0,0,0,0.05)",
                    transform: active ? "translateY(-5px)" : "none",
                  }}
                >
                  {/* Icon square */}
                  <div
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: 14,
                      background: "linear-gradient(135deg, #1a4d2e 0%, #2d7a4f 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 20,
                      boxShadow: "0 4px 16px rgba(26,77,46,0.30)",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={img}
                      alt={title}
                      style={{
                        width: 30,
                        height: 30,
                        objectFit: "contain",
                        filter: "brightness(0) invert(1)",
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
                      margin: "0 0 20px",
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
                        marginBottom: 10,
                      }}
                    >
                      {/* Circular check icon */}
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

                  {/* Get Started link */}
                  <div
                    style={{
                      marginTop: 22,
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
                        transform: active ? "translateX(4px)" : "none",
                      }}
                    >
                      →
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

// ─── STEP 2 — Create Account ─────────────────────────────────────────────────

interface CreateAccountProps {
  onSuccess: () => void;
  onPhoneCapture: (phone: string) => void;
}

interface FormState {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

type FormErrors = Partial<FormState>;

function CreateAccount({ onSuccess, onPhoneCapture }: CreateAccountProps) {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const setField = (key: keyof FormState) => (val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    const phone = form.phoneNumber.replace(/\s/g, "");
    if (!phone) e.phoneNumber = "Phone number is required";
    else if (!/^0\d{10}$/.test(phone))
      e.phoneNumber = "Enter a valid 11-digit Nigerian number (e.g. 080 1234 5678)";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6)
      e.password = "Password must be at least 6 characters";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const phone = form.phoneNumber.replace(/\s/g, "");
      saveUser({
        fullName: form.fullName.trim(),
        phoneNumber: phone,
        email: form.email.trim() || undefined,
        password: form.password,
        role: "tenant_landlord",
        createdAt: new Date().toISOString(),
      });
      onPhoneCapture(phone);
      setLoading(false);
      onSuccess();
    }, 700);
  };

  // ── Shared input renderer ──
  const renderField = (
    label: string,
    key: keyof FormState,
    placeholder: string,
    type: string = "text",
    required = true
  ) => (
    <div style={{ marginBottom: 20 }}>
      <label
        style={{
          display: "block",
          fontSize: 14,
          fontWeight: 600,
          color: "#111827",
          marginBottom: 6,
        }}
      >
        {label}
        {required && (
          <span style={{ color: "#ef4444", marginLeft: 3 }}>*</span>
        )}
      </label>
      <div style={{ position: "relative" }}>
        <input
          type={key === "password" ? (showPw ? "text" : "password") : type}
          placeholder={placeholder}
          value={form[key]}
          onChange={(e) => setField(key)(e.target.value)}
          style={{
            width: "100%",
            padding: "13px 16px",
            paddingRight: key === "password" ? 44 : 16,
            border: `1.5px solid ${errors[key] ? "#ef4444" : "#e5e7eb"}`,
            borderRadius: 10,
            fontSize: 15,
            outline: "none",
            background: "#fafafa",
            boxSizing: "border-box",
            fontFamily: "inherit",
            transition: "border-color 0.18s",
            color: "#111827",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#1a4d2e";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = errors[key]
              ? "#ef4444"
              : "#e5e7eb";
          }}
        />
        {key === "password" && (
          <button
            type="button"
            onClick={() => setShowPw((s) => !s)}
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#9ca3af",
              padding: 0,
              display: "flex",
              alignItems: "center",
            }}
            tabIndex={-1}
          >
            {showPw ? (
              // eye-off
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              // eye
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>
      {errors[key] && (
        <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>
          {errors[key]}
        </p>
      )}
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <div style={{ flex: 1, display: "flex" }}>
        {/* ── Left panel (LeftSection2) ── */}
        <div
          style={{
            width: "47%",
            flexShrink: 0,
            minHeight: "100vh",
            // hide on narrow viewports
          }}
          className="signup-left-panel"
        >
          <LeftSection2 />
        </div>

        {/* ── Right panel ── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            backgroundImage: "url('./../../assets/background1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
          }}
        >
          {/* Right navbar */}
          <div
            style={{
              height: 70,
              padding: "0 36px",
              borderBottom: "1px solid #f3f4f6",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Logo />
          </div>

          {/* Form */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px 52px",
            }}
          >
            <div style={{ width: "100%", maxWidth: 420 }}>
              <h1
                style={{
                  fontSize: 30,
                  fontWeight: 900,
                  color: "#1a4d2e",
                  marginBottom: 6,
                }}
              >
                Create Account
              </h1>
              <p
                style={{
                  fontSize: 14,
                  color: "#6b7280",
                  marginBottom: 32,
                  lineHeight: 1.5,
                }}
              >
                Find verified agents and rent safely with confidence.
              </p>

              {renderField("Full Name", "fullName", "Enter your full name")}
              {renderField(
                "Phone Number",
                "phoneNumber",
                "080 1234 5678",
                "tel"
              )}
              {renderField(
                "Email (Optional)",
                "email",
                "your.email@example.com",
                "email",
                false
              )}
              {renderField(
                "Password",
                "password",
                "Create a strong password",
                "password"
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "15px",
                  background: loading
                    ? "#6b9e7a"
                    : "linear-gradient(135deg, #1a4d2e 0%, #2d7a4f 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: loading
                    ? "none"
                    : "0 4px 20px rgba(26,77,46,0.30)",
                  fontFamily: "inherit",
                  transition: "opacity 0.2s",
                  marginTop: 4,
                }}
              >
                {loading ? "Creating Account…" : "Create Account"}
              </button>

              <p
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  color: "#6b7280",
                  marginTop: 20,
                }}
              >
                Have an account already?{" "}
                <a
                  href="#"
                  style={{
                    color: "#1a4d2e",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Login
                </a>
              </p>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}

// ─── STEP 3 — Verify Phone ────────────────────────────────────────────────────

const AUTO_CODE = "123456";
const OTP_EXPIRY_SECONDS = 120; // 2 minutes

interface VerifyPhoneProps {
  phone: string;
  onVerified: () => void;
}

function VerifyPhone({ phone, onVerified }: VerifyPhoneProps) {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [secondsLeft, setSecondsLeft] = useState(OTP_EXPIRY_SECONDS);
  const [expired, setExpired] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-fill the code after a short delay (simulates receiving OTP)
  useEffect(() => {
    const t = setTimeout(() => {
      setDigits(AUTO_CODE.split(""));
    }, 900);
    return () => clearTimeout(t);
  }, []);

  // Countdown
  useEffect(() => {
    if (secondsLeft <= 0) {
      setExpired(true);
      return;
    }
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  const handleChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    setError("");
    if (val && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = digits.join("");
    if (code.length < 6) {
      setError("Please complete the 6-digit code.");
      return;
    }
    if (expired) {
      setError("Code expired. Please resend.");
      return;
    }
    if (code !== AUTO_CODE) {
      setError("Incorrect code. Please try again.");
      return;
    }
    setSuccess(true);
    setTimeout(onVerified, 900);
  };

  const handleResend = () => {
    setDigits(["", "", "", "", "", ""]);
    setSecondsLeft(OTP_EXPIRY_SECONDS);
    setExpired(false);
    setError("");
    setTimeout(() => setDigits(AUTO_CODE.split("")), 900);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <div style={{ flex: 1, display: "flex" }}>
        {/* ── Left panel ── */}
        <div style={{ width: "47%", flexShrink: 0, minHeight: "100vh" }}>
          <LeftSection2 />
        </div>

        {/* ── Right panel ── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            backgroundImage: "url('./../../assets/background2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
          }}
        >
          {/* Right navbar */}
          <div
            style={{
              height: 70,
              padding: "0 36px",
              borderBottom: "1px solid #f3f4f6",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Logo />
          </div>

          {/* Decorative ghost icons — matching the design */}
          {/* Search icon top-left */}
          <svg
            width="36" height="36" viewBox="0 0 36 36" fill="none"
            style={{
              position: "absolute",
              top: 100,
              left: 48,
              opacity: 0.10,
              pointerEvents: "none",
            }}
          >
            <circle cx="15" cy="15" r="10.5" stroke="#1a4d2e" strokeWidth="2.5" />
            <path d="M23 23l9 9" stroke="#1a4d2e" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          {/* Key icon top-right */}
          <svg
            width="36" height="36" viewBox="0 0 36 36" fill="none"
            style={{
              position: "absolute",
              top: 100,
              right: 48,
              opacity: 0.10,
              pointerEvents: "none",
            }}
          >
            <circle cx="12" cy="16" r="7.5" stroke="#1a4d2e" strokeWidth="2.5" />
            <path d="M17 19l11 11M22 22l3 3" stroke="#1a4d2e" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          {/* Pin icon mid-left */}
          <svg
            width="34" height="34" viewBox="0 0 34 34" fill="none"
            style={{
              position: "absolute",
              top: "40%",
              left: 32,
              opacity: 0.09,
              pointerEvents: "none",
            }}
          >
            <path
              d="M17 3C11 3 6 8 6 14c0 8 11 18 11 18s11-10 11-18c0-6-5-11-11-11z"
              stroke="#1a4d2e" strokeWidth="2.5"
            />
            <circle cx="17" cy="14" r="3.5" stroke="#1a4d2e" strokeWidth="2" />
          </svg>
          {/* House icon mid-right */}
          <svg
            width="40" height="40" viewBox="0 0 40 40" fill="none"
            style={{
              position: "absolute",
              top: "38%",
              right: 32,
              opacity: 0.09,
              pointerEvents: "none",
            }}
          >
            <path d="M6 20L20 6l14 14" stroke="#1a4d2e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 16v16h20V16" stroke="#1a4d2e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="15" y="25" width="10" height="7" rx="1" stroke="#1a4d2e" strokeWidth="2" />
          </svg>

          {/* OTP content */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px 52px",
            }}
          >
            <div
              style={{ width: "100%", maxWidth: 420, textAlign: "center" }}
            >
              <h1
                style={{
                  fontSize: 30,
                  fontWeight: 900,
                  color: "#1a4d2e",
                  marginBottom: 8,
                  textAlign: "left",
                }}
              >
                Verify Your Phone
              </h1>
              <p
                style={{
                  fontSize: 14,
                  color: "#6b7280",
                  marginBottom: 36,
                  textAlign: "left",
                }}
              >
                Enter the 6-digit code sent to{" "}
                <strong style={{ color: "#111827" }}>{phone}</strong>
              </p>

              {/* ── OTP input boxes ── */}
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  justifyContent: "center",
                  marginBottom: 18,
                }}
              >
                {digits.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputRefs.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    style={{
                      width: 52,
                      height: 60,
                      textAlign: "center",
                      fontSize: 22,
                      fontWeight: 700,
                      border: `2px solid ${
                        success
                          ? "#1a4d2e"
                          : error
                          ? "#ef4444"
                          : d
                          ? "#1a4d2e"
                          : "#e5e7eb"
                      }`,
                      borderRadius: 12,
                      outline: "none",
                      background: d ? "#f0faf4" : "#fafafa",
                      color: "#111827",
                      transition: "border-color 0.18s, background 0.18s",
                      fontFamily: "inherit",
                      boxShadow: d ? "0 2px 8px rgba(26,77,46,0.10)" : "none",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "#1a4d2e")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        error ? "#ef4444" : d ? "#1a4d2e" : "#e5e7eb")
                    }
                  />
                ))}
              </div>

              {/* Error */}
              {error && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: 13,
                    marginBottom: 10,
                    textAlign: "center",
                  }}
                >
                  {error}
                </p>
              )}

              {/* Success */}
              {success && (
                <p
                  style={{
                    color: "#1a4d2e",
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 10,
                  }}
                >
                  ✓ Verified! Redirecting…
                </p>
              )}

              {/* Timer / Resend */}
              <p
                style={{
                  fontSize: 14,
                  color: "#6b7280",
                  marginBottom: 28,
                  textAlign: "center",
                }}
              >
                {expired ? (
                  <>
                    Code expired.{" "}
                    <button
                      onClick={handleResend}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#1a4d2e",
                        fontWeight: 700,
                        cursor: "pointer",
                        fontSize: 14,
                        fontFamily: "inherit",
                        padding: 0,
                      }}
                    >
                      Resend code
                    </button>
                  </>
                ) : (
                  <>
                    Resend code in{" "}
                    <strong style={{ color: "#1a4d2e" }}>
                      {mm}:{ss}
                    </strong>
                  </>
                )}
              </p>

              {/* Verify button */}
              <button
                onClick={handleVerify}
                disabled={success}
                style={{
                  width: "100%",
                  padding: "15px",
                  background: success
                    ? "#6b9e7a"
                    : "linear-gradient(135deg, #1a4d2e 0%, #2d7a4f 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: success ? "not-allowed" : "pointer",
                  boxShadow: success
                    ? "none"
                    : "0 4px 20px rgba(26,77,46,0.30)",
                  fontFamily: "inherit",
                }}
              >
                {success ? "Verified ✓" : "Verify"}
              </button>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

export default function TenantSignup() {
  const [step, setStep] = useState<Step>("role");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  return (
    <>
      {step === "role" && (
        <RoleSelect onSelect={() => setStep("create")} />
      )}

      {step === "create" && (
        <CreateAccount
          onSuccess={() => setStep("verify")}
          onPhoneCapture={(p) => setPhone(p)}
        />
      )}

      {step === "verify" && (
        <VerifyPhone
          phone={phone}
          onVerified={() => navigate("/home")}
        />
      )}
    </>
  );
}