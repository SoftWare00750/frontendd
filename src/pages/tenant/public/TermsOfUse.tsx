// TermsOfUse.tsx — OgaLandlord Terms of Use Page
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

export default function TermsOfUse() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif", color: "#111827", background: "#f9fafb", minHeight: "100vh" }}>
      <Navbar navigate={navigate} />

      <section style={{ padding: "52px 40px 80px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>

          {/* Page title */}
          <h1 style={{ fontSize: "clamp(30px,4vw,48px)", fontWeight: 900, color: "#1a4d2e", textAlign: "center", marginBottom: 40 }}>
            Terms of Use
          </h1>

          {/* Content card */}
          <div style={{
            background: "#fff", borderRadius: 16,
            border: "1px solid #e5e7eb",
            padding: "44px 48px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
          }}>
            <Para>
              Welcome to <strong>Oga Landlord.</strong> By accessing or using our website and services, you agree to comply with and be bound by the following Terms of Use. Please read them carefully. If you do not agree with any part of these terms, you should not use this website.
            </Para>

            <div style={{ height: 20 }} />

            <Section num="1" title="Acceptance of Terms">
              <Para>
                By accessing or using Oga Landlord, you confirm that you have read, understood, and agree to be bound by these Terms of Use and our Privacy Policy. These terms apply to all visitors, tenants, agents, and other users of the platform.
              </Para>
            </Section>

            <Section num="2" title="Use of the Website">
              <Para>You agree to use this website only for lawful purposes and in a manner that does not infringe on the rights of others or restrict their use of the platform.</Para>
              <Para>You must not:</Para>
              <Bullet items={[
                "Submit false or misleading information",
                "Attempt to bypass verification or security measures",
                "Use the platform to facilitate fraud, scams, or illegal activity",
                "Interfere with the operation or performance of the website",
              ]} />
              <Para>Any misuse of the platform may result in suspension or termination of access.</Para>
            </Section>

            <Section num="3" title="Content Ownership and Restrictions">
              <Para>All content on this website—including text, images, logos, listings, design elements, and software—is the property of Oga Landlord or its content providers and is protected by applicable intellectual property laws.</Para>
              <Para>You may view and use content for personal, non-commercial purposes only. Reproduction, redistribution, or modification of any content without prior written consent is strictly prohibited.</Para>
            </Section>

            <Section num="4" title="Information Accuracy and Listings">
              <Para>While we strive to ensure that property listings and agent information are accurate and up to date, we do not guarantee the completeness, accuracy, or availability of all information. Property details, pricing, and availability may change without notice. Users are responsible for verifying information during inspections and direct engagements with agents.</Para>
              <Para>Oga Landlord does not own or manage listed properties and is not a party to rental agreements between tenants and agents or landlords.</Para>
            </Section>

            <Section num="5" title="Third-Party Links and Services">
              <Para>Our website may include links to third-party websites or services for convenience or additional information. Oga Landlord does not control or endorse these external platforms and is not responsible for their content, practices, or policies.</Para>
              <Para>Accessing third-party sites is done at your own risk, and we encourage you to review their respective terms and privacy policies.</Para>
            </Section>

            <Section num="6" title="Termination of Use">
              <Para>We reserve the right to suspend or terminate access to the website at any time, without prior notice, if a user violates these Terms of Use or engages in behavior that may harm the platform, other users, or our community.</Para>
            </Section>

            <Section num="7" title="Changes to the Terms">
              <Para>We may update or modify these Terms of Use from time to time to reflect changes in our services or legal requirements. Updated versions will be posted on this page with a revised effective date. Continued use of the website after changes constitutes acceptance of the updated terms.</Para>
            </Section>

            <Section num="8" title="Contact">
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