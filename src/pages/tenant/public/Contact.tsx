// Contact.tsx — OgaLandlord Contact Page
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";


const mobileStyles = `
  @media (max-width: 768px) {
    .about-navbar {
      padding: 0 16px !important;
      height: 52px !important;
    }
    .about-navbar-links { display: none !important; }
    .about-navbar-menu-btn { display: flex !important; }

    .about-hero-section {
      padding: 24px 16px 0 !important;
    }
    .about-hero-h1 {
      font-size: 26px !important;
      margin-bottom: 16px !important;
    }
    .about-hero-img {
      height: 220px !important;
      border-radius: 12px !important;
      margin-bottom: 20px !important;
    }
    .about-stats-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      width: 100% !important;
      margin-left: 0 !important;
      height: auto !important;
    }
    .about-stat-item {
      padding: 14px 16px !important;
    }
    .about-stat-value {
      font-size: 28px !important;
    }
    .about-stat-label {
      font-size: 13px !important;
      margin-top: 4px !important;
    }

    .about-mission-section {
      padding: 40px 16px !important;
    }
    .about-mission-row {
      flex-direction: column !important;
      gap: 12px !important;
      padding-bottom: 32px !important;
      margin-bottom: 32px !important;
    }
    .about-mission-title {
      flex: none !important;
      font-size: 22px !important;
      margin-top: 0 !important;
    }
    .about-mission-text {
      margin-left: 0 !important;
      font-size: 14px !important;
    }

    .about-safer-section {
      padding: 40px 16px !important;
    }
    .about-safer-inner {
      flex-direction: column !important;
      gap: 32px !important;
    }
    .about-safer-text { min-width: unset !important; }
    .about-safer-h2 { font-size: 22px !important; }
    .about-safer-btn {
      padding: 12px 32px !important;
      width: 100% !important;
    }
    .about-safer-image {
      flex: none !important;
      width: 100% !important;
      height: 220px !important;
      border-radius: 12px !important;
    }
    .about-safer-image img {
      width: 100% !important;
      height: 100% !important;
    }

    .about-faq-section {
      padding: 40px 16px !important;
    }
    .about-faq-inner {
      flex-direction: column !important;
      gap: 24px !important;
    }
    .about-faq-left {
      flex: none !important;
      width: 100% !important;
    }
    .about-faq-h2 { font-size: 22px !important; }
    .about-faq-btn { font-size: 15px !important; }

    .about-footer { padding: 0 !important; }
    .about-footer-inner {
      padding: 32px 16px 0 !important;
    }
    .about-footer-top {
      flex-direction: column !important;
      gap: 24px !important;
      margin-bottom: 32px !important;
    }
    .about-footer-newsletter input {
      width: 100% !important;
      max-width: 260px !important;
    }
    .about-footer-nav-cols {
      gap: 32px !important;
    }
    .about-footer-watermark {
      font-size: clamp(36px, 12vw, 72px) !important;
    }
  }
`;
// ─── Shared ───────────────────────────────────────────────────────────────────

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
    <div
      style={{
        fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif",
        color: "#111827",
        background: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      <style>{mobileStyles}</style>
      <Navbar />

      <section style={{ padding: "60px 40px 80px" }}>
        <div
          style={{
            margin: "0 auto",
            display: "flex",
            gap: 60,
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          {/* ── Left: contact info ── */}
          <div style={{ flex: "0 0 280px" }}>
            <h1 className="text-green-700 text-3xl"
              style={{
                fontWeight: 900,
                lineHeight: 1.15,
                marginBottom: 16,
              }}
            >
              We'd love to hear
              <br />
              from you.
            </h1>
            <p
              style={{
                fontSize: 16,
                color: "#6b7280",
                lineHeight: 1.65,
                marginBottom: 40,
              }}
            >
              Have a question, concern, or feedback? Our team is here to help.
            </p>

            <div
              style={{
                borderTop: "1px solid #e5e7eb",
                paddingTop: 20,
                marginBottom: 24,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#9ca3af",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                SEND US AN EMAIL
              </p>
              <a
                href="mailto:support@ogalandlord.com"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#1a4d2e",
                  textDecoration: "none",
                }}
              >
                support@ogalandlord.com
              </a>
            </div>

            <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 20 }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#9ca3af",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                CALL US
              </p>
              <a
                href="tel:+2348034547828"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#111827",
                  textDecoration: "none",
                }}
              >
                +234 8034547828
              </a>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div
            style={{
              flex: 1,
              minWidth: 300,
              background: "#fff",
              borderRadius: 16,
              border: "1px solid #e5e7eb",
              padding: "36px 36px 32px",
              boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
            }}
          >
            <h2 className="text-green-700"
              style={{
                fontSize: 22,
                fontWeight: 900,
               
                marginBottom: 6,
              }}
            >
              Send a Message
            </h2>
            <p style={{ fontSize: 16, color: "#6b7280", marginBottom: 28 }}>
              Our support team is available 24/7 to assist with any issues.
            </p>

            {renderInput("Full Name", "fullName", "Enter name")}
            {renderInput(
              "Email Address",
              "email",
              "Enter email address",
              "email",
            )}

            <div style={{ marginBottom: 24 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: 6,
                }}
              >
                Message<span style={{ color: "#ef4444" }}>*</span>
              </label>
              <textarea
                placeholder="Enter your message"
                value={form.message}
                rows={7}
                onChange={(e) => {
                  setForm((f) => ({ ...f, message: e.target.value }));
                  setErrors((err) => ({ ...err, message: undefined }));
                }}
                style={{
                  width: "100%",
                  padding: "13px 14px",
                  boxSizing: "border-box",
                  border: `1.5px solid ${errors.message ? "#ef4444" : "#e5e7eb"}`,
                  borderRadius: 8,
                  fontSize: 14,
                  outline: "none",
                  fontFamily: "inherit",
                  resize: "vertical",
                  lineHeight: 1.6,
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#1a4d2e")}
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = errors.message
                    ? "#ef4444"
                    : "#e5e7eb")
                }
              />
              {errors.message && (
                <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>
                  {errors.message}
                </p>
              )}
            </div>

            <button
              onClick={handleSend}
              disabled={sent}
              style={{
                width: "100%",
                padding: "14px",
                background: sent ? "#2d7a4f" : "#1a4d2e",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 700,
                cursor: sent ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                transition: "background 0.2s",
              }}
            >
              {sent ? "Message Sent ✓" : "Send Message"}
            </button>
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  );
}