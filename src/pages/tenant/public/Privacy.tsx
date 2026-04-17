// Privacy.tsx — OgaLandlord Privacy Policy Page
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Shared ───────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      {/* Placeholder: replace src with /assets/logo.png */}
      <img src="/assets/logo.svg" 
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
            <img src="/assets/logo.svg" 
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
        <div style={{ display: "flex", gap: 370, flexWrap: "wrap", marginBottom: 40 }}>
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
        <div style={{ fontSize: "170px", fontWeight: 700, textAlign: "center", color: "rgba(246, 246, 246, 0.92)", letterSpacing: "-3px", userSelect: "none", lineHeight: 1, marginTop: 60, paddingTop: "70px", overflow: "hidden" }}>
          Ogalandlord
        </div>
      </div>
    </footer>
  );
}

// ─── Content helpers ──────────────────────────────────────────────────────────

function Section({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <h2 style={{ fontSize: 16, fontWeight: 800, color: "#111827", marginBottom: 12 }}>
        {num}. {title}
      </h2>
      {children}
    </div>
  );
}

function Bullet({ items }: { items: string[] }) {
  return (
    <ul style={{ paddingLeft: 20, margin: "10px 0" }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: 14, color: "#374151", lineHeight: 1.75, marginBottom: 4 }}>{item}</li>
      ))}
    </ul>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.8, marginBottom: 10 }}>{children}</p>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif", color: "#111827", background: "#f9fafb", minHeight: "100vh" }}>
      <Navbar navigate={navigate} />

      <section style={{ padding: "52px 40px 80px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>

          {/* Page title */}
          <h1 style={{ fontSize: "clamp(30px,4vw,48px)", fontWeight: 900, color: "#1a4d2e", textAlign: "center", marginBottom: 40 }}>
            Privacy Policy
          </h1>

          {/* Content card */}
          <div style={{
            background: "#fff", borderRadius: 16,
            border: "1px solid #e5e7eb",
            padding: "44px 48px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
          }}>
            <Para>
              At <strong>Oga Landlord,</strong> your privacy matters to us. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our website and services.
            </Para>

            <div style={{ height: 20 }} />

            <Section num="1" title="Information We Collect">
              <Bullet items={[
                "Personal Information such as name, email address, and phone number when you create an account, contact us, or request an inspection",
                "Location Information when you search for properties or filter listings by area",
                "Agent Verification Information submitted by agents for identity and listing verification",
                "Usage Data including device type, browser information, IP address, and interaction with our platform through cookies and analytics tools",
              ]} />
            </Section>

            <Section num="2" title="How We Use Your Information">
              <Bullet items={[
                "Provide access to verified rental listings and platform features",
                "Verify agents and improve trust and safety on the platform",
                "Communicate updates, notifications, and responses to inquiries",
                "Improve website performance, usability, and security",
                "Monitor and prevent fraudulent or suspicious activity",
              ]} />
            </Section>

            <Section num="3" title="Sharing of Information">
              <Para>We do not sell, rent, or trade your personal information. We may share limited information only when necessary to:</Para>
              <Bullet items={[
                "Verify agent identities and listings",
                "Comply with legal obligations or lawful requests",
                "Analyze anonymized or aggregated data for platform improvement",
              ]} />
              <Para>Your contact details are never shared for marketing purposes without your consent.</Para>
            </Section>

            <Section num="4" title="Third-Party Links">
              <Para>Our website may contain links to third-party websites or services. Once you leave our platform, we are not responsible for the privacy practices, content, or data handling of those third parties.</Para>
              <Para>We encourage you to review the privacy policies of any external sites you visit.</Para>
            </Section>

            <Section num="5" title="Disclaimer of Warranties">
              <Para>Our services are provided on an "as is" basis. While we work to maintain accurate and up-to-date information, we do not guarantee that all listings or content will always be error-free, complete, or suitable for every user's situation.</Para>
              <Para>Using the platform is at your own discretion, and we encourage users to follow safe rental practices at all times.</Para>
            </Section>

            <Section num="6" title="Updates to This Policy">
              <Para>We may update this Privacy Policy periodically to reflect changes in our services or legal requirements. Any updates will be posted on this page with a revised effective date.</Para>
            </Section>

            <Section num="7" title="Contact">
              <Para>If you have questions, concerns, or legal inquiries regarding this Privacy Policy, please contact us at:</Para>
              <a href="mailto:support@ogalandlord.com"
                style={{ fontSize: 14, color: "#1a4d2e", fontWeight: 600, textDecoration: "none" }}>
                support@ogalandlord.com
              </a>
            </Section>
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  );
}