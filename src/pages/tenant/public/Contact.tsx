// Contact.tsx — OgaLandlord Contact Page
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Shared ───────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      {/* Placeholder: replace src with /assets/logo.png */}
      <img src="/assets/logo.svg" alt="OgaLandlord"
        style={{ height: 32, objectFit: "contain" }}
        onError={(e) => { e.currentTarget.style.display = "none"; }}
      />
    </div>
  );
}

function Navbar({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "#fff", borderBottom: "1px solid #e5e7eb",
      padding: "0 40px", height: 60,
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}><Logo /></div>
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {[
          { label: "About Us", path: "/AboutUs" },
          { label: "Listings", path: "/Listings1" },
          { label: "Contact", path: "/Contact" },
        ].map(({ label, path }) => (
          <button key={label} onClick={() => navigate(path)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 14,
              fontWeight: path === "/contact" ? 700 : 500,
              color: path === "/contact" ? "#1a4d2e" : "#374151",
              fontFamily: "inherit", padding: 0,
            }}
          >{label}</button>
        ))}
        <button onClick={() => navigate("/Onboarding")}
          style={{
            background: "#1a4d2e", color: "#fff", border: "none",
            borderRadius: 8, padding: "10px 20px",
            fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          }}>Get Started</button>
      </div>
    </nav>
  );
}

function Footer({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  const [email, setEmail] = useState("");
  return (
    <footer style={{ background: "#fff", borderTop: "1px solid #e5e7eb" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 40px 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40, marginBottom: 48 }}>
          {/* Footer logo placeholder */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <img src="/assets/logo.svg" alt="OgaLandlord"
              style={{ height: 28, objectFit: "contain" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>
          <div>
            <p style={{ fontSize: 14, color: "#374151", marginBottom: 10, fontWeight: 500 }}>Subscribe to our newsletter</p>
            <div style={{ display: "flex" }}>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email"
                style={{ padding: "10px 16px", borderRadius: "8px 0 0 8px", border: "1px solid #e5e7eb", borderRight: "none", fontSize: 13, outline: "none", width: 220, fontFamily: "inherit" }} />
              <button style={{ padding: "10px 14px", background: "#1a4d2e", border: "none", borderRadius: "0 8px 8px 0", cursor: "pointer" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
        </div>
        <div style={{  display: "flex", gap: 370, flexWrap: "wrap", marginBottom: 40  }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 14 }}>Pages</p>
            {[{ label: "About", path: "/Aboutus" }, { label: "Listings", path: "/Listings1" }, { label: "Agents", path: "/agents" }].map(({ label, path }) => (
              <p key={label}><button onClick={() => navigate(path)} style={{ background: "none", border: "none", color: "#6b7280", fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 8, fontFamily: "inherit" }}>{label}</button></p>
            ))}
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 14 }}>Support</p>
            {[{ label: "FAQ", path: "/FAQ" }, { label: "Contact Us", path: "/Contact" }].map(({ label, path }) => (
              <p key={label}><button onClick={() => navigate(path)} style={{ background: "none", border: "none", color: "#6b7280", fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 8, fontFamily: "inherit" }}>{label}</button></p>
            ))}
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 14 }}>Legal</p>
            {[{ label: "Privacy Policy", path: "/privacy" }, { label: "Terms of Use", path: "/terms" }].map(({ label, path }) => (
              <p key={label}><button onClick={() => navigate(path)} style={{ background: "none", border: "none", color: "#6b7280", fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 8, fontFamily: "inherit" }}>{label}</button></p>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 24 }}>
          <p style={{ fontSize: 12, color: "#9ca3af" }}>© COPYRIGHT 2026 OGALANDLORD</p>
        </div>
        <div style={{ fontSize: "170px", fontWeight: 700, textAlign: "center", color: "rgba(246, 246, 246, 0.92)", letterSpacing: "-3px", userSelect: "none", lineHeight: 1, marginTop: 60, paddingTop: "70px", overflow: "hidden" }}>
          Ogalandlord
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Contact() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.fullName.trim()) e.fullName = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSend = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ fullName: "", email: "", message: "" }); }, 2500);
  };

  const renderInput = (
    label: string,
    key: keyof typeof form,
    placeholder: string,
    type = "text"
  ) => (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
        {label}<span style={{ color: "#ef4444" }}>*</span>
      </label>
      <input type={type} placeholder={placeholder} value={form[key]}
        onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(err => ({ ...err, [key]: undefined })); }}
        style={{
          width: "100%", padding: "13px 14px", boxSizing: "border-box",
          border: `1.5px solid ${errors[key] ? "#ef4444" : "#e5e7eb"}`,
          borderRadius: 8, fontSize: 14, outline: "none",
          fontFamily: "inherit", transition: "border-color 0.15s",
        }}
        onFocus={e => (e.currentTarget.style.borderColor = "#1a4d2e")}
        onBlur={e => (e.currentTarget.style.borderColor = errors[key] ? "#ef4444" : "#e5e7eb")}
      />
      {errors[key] && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errors[key]}</p>}
    </div>
  );

  return (
    <div style={{ fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif", color: "#111827", background: "#f9fafb", minHeight: "100vh" }}>
      <Navbar navigate={navigate} />

      <section style={{ padding: "60px 40px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 60, flexWrap: "wrap", alignItems: "flex-start" }}>

          {/* ── Left: contact info ── */}
          <div style={{ flex: "0 0 280px" }}>
            <h1 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 900, color: "#1a4d2e", lineHeight: 1.15, marginBottom: 16 }}>
              We'd love to hear<br />from you.
            </h1>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65, marginBottom: 40 }}>
              Have a question, concern, or feedback? Our team is here to help.
            </p>

            <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 20, marginBottom: 24 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
                SEND US AN EMAIL
              </p>
              <a href="mailto:support@ogalandlord.com"
                style={{ fontSize: 14, fontWeight: 600, color: "#1a4d2e", textDecoration: "none" }}>
                support@ogalandlord.com
              </a>
            </div>

            <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
                CALL US
              </p>
              <a href="tel:+2348034547828"
                style={{ fontSize: 14, fontWeight: 600, color: "#111827", textDecoration: "none" }}>
                +234 8034547828
              </a>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div style={{
            flex: 1, minWidth: 300,
            background: "#fff", borderRadius: 16,
            border: "1px solid #e5e7eb",
            padding: "36px 36px 32px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
          }}>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: "#1a4d2e", marginBottom: 6 }}>Send a Message</h2>
            <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 28 }}>
              Our support team is available 24/7 to assist with any issues.
            </p>

            {renderInput("Full Name", "fullName", "Enter name")}
            {renderInput("Email Address", "email", "Enter email address", "email")}

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                Message<span style={{ color: "#ef4444" }}>*</span>
              </label>
              <textarea
                placeholder="Enter your message" value={form.message} rows={7}
                onChange={e => { setForm(f => ({ ...f, message: e.target.value })); setErrors(err => ({ ...err, message: undefined })); }}
                style={{
                  width: "100%", padding: "13px 14px", boxSizing: "border-box",
                  border: `1.5px solid ${errors.message ? "#ef4444" : "#e5e7eb"}`,
                  borderRadius: 8, fontSize: 14, outline: "none",
                  fontFamily: "inherit", resize: "vertical", lineHeight: 1.6,
                  transition: "border-color 0.15s",
                }}
                onFocus={e => (e.currentTarget.style.borderColor = "#1a4d2e")}
                onBlur={e => (e.currentTarget.style.borderColor = errors.message ? "#ef4444" : "#e5e7eb")}
              />
              {errors.message && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errors.message}</p>}
            </div>

            <button onClick={handleSend} disabled={sent}
              style={{
                width: "100%", padding: "14px",
                background: sent ? "#2d7a4f" : "#1a4d2e",
                color: "#fff", border: "none", borderRadius: 8,
                fontSize: 15, fontWeight: 700,
                cursor: sent ? "not-allowed" : "pointer",
                fontFamily: "inherit", transition: "background 0.2s",
              }}>
              {sent ? "Message Sent ✓" : "Send Message"}
            </button>
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  );
}