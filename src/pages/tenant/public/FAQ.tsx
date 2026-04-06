// FAQ.tsx — OgaLandlord FAQ Page
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FAQS = [
  {
    q: 'What does "Verified Agent" mean?',
    a: "A verified agent has passed our identity checks, location confirmation, and activity review. Only agents who meet our verification standards are allowed to list properties on the platform.",
  },
  {
    q: "Are all properties on this platform real?",
    a: "Yes. All listings are submitted by verified agents who have undergone our thorough verification process. We work to ensure every listing is legitimate before it appears on the platform.",
  },
  {
    q: "Do I need to pay before inspection?",
    a: "No. We strongly advise against paying any money before physically inspecting a property. Always inspect before making any financial commitments.",
  },
  {
    q: "Can I report a suspicious agent or listing?",
    a: "Yes. Use the report button on any agent profile or listing page to flag suspicious activity. Our team reviews all reports within 24 hours.",
  },
  {
    q: "How does the inspection fee work?",
    a: "The inspection fee is a one-time non-refundable fee paid directly to the agent to arrange and conduct a property viewing. It does not count toward rent or any other charges.",
  },
  {
    q: "Is OgaLandlord free to use for tenants?",
    a: "Yes. Browsing listings, viewing agent profiles, and searching for properties is completely free for tenants. Fees only apply when booking an inspection.",
  },
  {
    q: "How do I become a verified agent?",
    a: "Register as an agent on the platform, submit your identity documents, location verification, and pass our activity review. Our team will review your application and notify you within 3–5 business days.",
  },
  {
    q: "What happens if an agent scams me?",
    a: "Report the agent immediately using the report button. Our team investigates all fraud reports and will suspend or remove agents found to be acting dishonestly. We also encourage you to report to the relevant authorities.",
  },
];

// ─── Shared ───────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      {/* Placeholder: replace src with /assets/logo.png */}
      <img src="/assets/logo.png" alt="OgaLandlord"
        style={{ height: 32, objectFit: "contain" }}
        onError={(e) => { e.currentTarget.style.display = "none"; }}
      />
      <span style={{ fontWeight: 900, fontSize: 17, color: "#1a4d2e" }}>OGA</span>
      <span style={{ fontWeight: 400, fontSize: 13, color: "#374151" }}>Landlord</span>
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
          { label: "About Us", path: "/about" },
          { label: "Listings", path: "/listings" },
          { label: "Contact", path: "/contact" },
        ].map(({ label, path }) => (
          <button key={label} onClick={() => navigate(path)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 14, fontWeight: 500, color: "#374151",
              fontFamily: "inherit", padding: 0,
            }}>{label}</button>
        ))}
        <button onClick={() => navigate("/listings")}
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
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {/* Footer logo placeholder */}
            <img src="/assets/logo.png" alt="OgaLandlord"
              style={{ height: 28, objectFit: "contain" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <span style={{ fontWeight: 900, fontSize: 15, color: "#1a4d2e" }}>OGA</span>
            <span style={{ fontWeight: 400, fontSize: 13, color: "#374151" }}>Landlord</span>
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
        <div style={{ display: "flex", gap: 80, flexWrap: "wrap", marginBottom: 40 }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 14 }}>Pages</p>
            {[{ label: "About", path: "/about" }, { label: "Listings", path: "/listings" }, { label: "Agents", path: "/agents" }].map(({ label, path }) => (
              <p key={label}><button onClick={() => navigate(path)} style={{ background: "none", border: "none", color: "#6b7280", fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 8, fontFamily: "inherit" }}>{label}</button></p>
            ))}
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 14 }}>Support</p>
            {[{ label: "FAQ", path: "/faq" }, { label: "Contact Us", path: "/contact" }].map(({ label, path }) => (
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
        <div style={{ marginTop: 12, fontSize: "clamp(36px,7vw,88px)", fontWeight: 900, color: "rgba(26,77,46,0.04)", letterSpacing: "-2px", userSelect: "none", lineHeight: 1 }}>
          Ogalandlord
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FAQ() {
  const navigate = useNavigate();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div style={{ fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif", color: "#111827", background: "#f9fafb", minHeight: "100vh" }}>
      <Navbar navigate={navigate} />

      <section style={{ padding: "60px 40px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 80, flexWrap: "wrap", alignItems: "flex-start" }}>

          {/* ── Left ── */}
          <div style={{ flex: "0 0 280px" }}>
            <h1 style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 900, color: "#1a4d2e", lineHeight: 1.15, marginBottom: 16 }}>
              Frequently Asked<br />Questions
            </h1>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65 }}>
              If there are question you want to ask. We will answer all your question.
            </p>
          </div>

          {/* ── Right: accordion ── */}
          <div style={{ flex: 1, minWidth: 300 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{
                background: "#fff", borderRadius: 12, marginBottom: 12,
                border: "1px solid #e5e7eb", overflow: "hidden",
                boxShadow: openIdx === i ? "0 2px 12px rgba(26,77,46,0.07)" : "none",
                transition: "box-shadow 0.2s",
              }}>
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  style={{
                    width: "100%", padding: "18px 20px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: 14, fontWeight: 600, color: "#111827",
                    textAlign: "left", fontFamily: "inherit",
                  }}
                >
                  {faq.q}
                  <span style={{
                    width: 24, height: 24, borderRadius: "50%",
                    border: `1.5px solid ${openIdx === i ? "#1a4d2e" : "#e5e7eb"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    color: openIdx === i ? "#1a4d2e" : "#6b7280",
                    fontSize: 16, fontWeight: 400,
                    transition: "border-color 0.15s, color 0.15s",
                  }}>
                    {openIdx === i ? "−" : "+"}
                  </span>
                </button>
                {openIdx === i && (
                  <div style={{ padding: "0 20px 18px", fontSize: 13, color: "#6b7280", lineHeight: 1.7 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  );
}