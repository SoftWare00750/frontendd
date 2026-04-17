// AboutUs.tsx — OgaLandlord About Us Page — Responsive Mobile
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Mobile-first responsive styles injected ──────────────────────────────────
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

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
      <img
        src="/assets/logo.svg"
        alt="OgaLandlord"
        style={{ height: 32, objectFit: "contain" }}
        onError={(e) => {
          e.currentTarget.style.display = "none";
          (e.currentTarget.nextSibling as HTMLElement).style.display = "flex";
        }}
      />
      <div style={{ display: "none", alignItems: "center", gap: 4, width: 32, height: 32, borderRadius: 8, background: "#014421", justifyContent: "center" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="9" r="6" stroke="white" strokeWidth="2" />
          <path d="M13 13l5 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

function Navbar({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <nav
        className="about-navbar"
        style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "#fff", borderBottom: "1px solid #e5e7eb",
          padding: "0 40px", height: 60,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <div onClick={() => navigate("/Home")} style={{ cursor: "pointer" }}><Logo /></div>

        {/* Desktop links */}
        <div className="about-navbar-links" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {[{ label: "About Us", path: "/AboutUs" }, { label: "Listings", path: "/Listings1" }, { label: "Contact", path: "/Contact" }].map(({ label, path }) => (
            <button key={label} onClick={() => navigate(path)}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#374151", fontFamily: "inherit", padding: 0 }}>
              {label}
            </button>
          ))}
          <button onClick={() => navigate("/RoleSelect")}
            style={{ background: "#014421", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            Get Started
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="about-navbar-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 4, flexDirection: "column", gap: 5 }}
        >
          <span style={{ width: 22, height: 2, background: "#374151", borderRadius: 2, display: "block", transition: "all 0.2s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
          <span style={{ width: 22, height: 2, background: "#374151", borderRadius: 2, display: "block", transition: "all 0.2s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: 22, height: 2, background: "#374151", borderRadius: 2, display: "block", transition: "all 0.2s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{ position: "fixed", top: 52, left: 0, right: 0, background: "#fff", zIndex: 99, borderBottom: "1px solid #e5e7eb", padding: "16px", display: "flex", flexDirection: "column", gap: 12 }}>
          {[{ label: "About Us", path: "/AboutUs" }, { label: "Listings", path: "/Listings1" }, { label: "Contact", path: "/Contact" }].map(({ label, path }) => (
            <button key={label} onClick={() => { navigate(path); setMenuOpen(false); }}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 15, fontWeight: 500, color: "#374151", fontFamily: "inherit", padding: "8px 0", textAlign: "left" }}>
              {label}
            </button>
          ))}
          <button onClick={() => { navigate("/RoleSelect"); setMenuOpen(false); }}
            style={{ background: "#014421", color: "#fff", border: "none", borderRadius: 8, padding: "12px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginTop: 4 }}>
            Get Started
          </button>
        </div>
      )}
    </>
  );
}

function Footer({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  const [email, setEmail] = useState("");
  return (
    <footer className="about-footer" style={{ background: "#fff", color: "#111827", borderTop: "1px solid #e5e7eb" }}>
      <div className="about-footer-inner" style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 40px 0" }}>
        <div className="about-footer-top" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 48, flexWrap: "wrap", gap: 32 }}>
          <Logo />
          <div className="about-footer-newsletter">
            <p style={{ fontSize: 15, color: "#111827", marginBottom: 10 }}>Subscribe to our newsletter</p>
            <div style={{ display: "flex" }}>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"
                style={{ padding: "11px 9px", borderRadius: "20px 20px 20px 20px", border: "1px solid #e5e7eb", fontSize: 14, outline: "none", width: 240, background: "#e5e7eb", color: "#00040b", fontFamily: "inherit" }} />
              <button style={{ padding: "2px 15px", background: "#014421", border: "none", borderRadius: "25px 25px 25px 25px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "-42px" }}>
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
        
        <div className="about-footer-watermark" style={{ fontSize: "clamp(60px, 12vw, 160px)", fontWeight: 700, textAlign: "center", color: "rgba(0,0,0,0.04)", letterSpacing: "-3px", userSelect: "none", lineHeight: 1, marginTop: 8, paddingTop: 16, overflow: "hidden" }}>
          Ogalandlord
        </div>
        </div>
    </footer>
    
  );
}

const FAQS = [
  { q: 'What does "Verified Agent" mean?', a: "A verified agent has passed our identity checks, location confirmation, and activity review. Only agents who meet our verification standards are allowed to list properties on the platform." },
  { q: "Are all properties on this platform real?", a: "Yes. All listings are submitted by verified agents who have undergone our thorough verification process." },
  { q: "Do I need to pay before inspection?", a: "No. We advise against paying any money before physically inspecting a property." },
  { q: "Can I report a suspicious agent or listing?", a: "Yes. Use the report button on any agent profile or listing page to flag suspicious activity." },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="about-faq-section" style={{ background: "#f9fafb", padding: "80px 40px" }}>
      <div className="about-faq-inner" style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 80, flexWrap: "wrap" }}>
        <div className="about-faq-left" style={{ flex: "0 0 320px" }}>
          <h2 className="about-faq-h2" style={{ fontSize: 32, fontWeight: 700, color: "#014421", lineHeight: 1.2, marginBottom: 16, maxWidth: 500 }}>
            Frequently Asked<br />Questions
          </h2>
          <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.65 }}>
            If there are question you want to ask. We will answer all your question.
          </p>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 12, marginBottom: 12, border: "1px solid #e5e7eb", overflow: "hidden" }}>
              <button
                className="about-faq-btn"
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", fontSize: 15, fontWeight: 600, color: "#111827", textAlign: "left", fontFamily: "inherit" }}
              >
                {faq.q}
                <span style={{ width: 24, height: 24, borderRadius: "50%", border: "1.5px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#6b7280", fontSize: 18, minWidth: 24 }}>
                  {open === i ? "−" : "+"}
                </span>
              </button>
              {open === i && (
                <div style={{ padding: "0 20px 18px", fontSize: 14, color: "#6b7280", lineHeight: 1.65 }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif", color: "#111827", background: "#fff" }}>
      <style>{mobileStyles}</style>
      <Navbar navigate={navigate} />

      {/* SECTION 1 — Hero */}
      <section className="about-hero-section" style={{ background: "#f9fafb", padding: "48px 40px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h1 className="about-hero-h1" style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 700, color: "#014421", lineHeight: 1.15, marginBottom: 28, maxWidth: 700 }}>
            Trusted Experts in Real<br />Estate Excellence
          </h1>

          <div className="about-hero-img" style={{ width: "100%", height: 520, borderRadius: 16, overflow: "hidden", background: "#d1fae5", marginBottom: 36, position: "relative" }}>
            <img src="/assets/about-hero.png" alt="Real estate agents at work"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }} />
          </div>

          {/* Stats */}
          <div className="about-stats-grid" style={{ display: "grid", height: 136, width: "100%", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden", marginBottom: 0 }}>
            {[
              { value: "100+", label: "Inspections Completed" },
              { value: "200+", label: "Verified Listings" },
              { value: "1000+", label: "Tenants Assisted" },
              { value: "95%", label: "Positive Feedback" },
            ].map((stat) => (
              <div className="about-stat-item" key={stat.label} style={{ background: "#fff", padding: "15px 20px", textAlign: "left", borderRight: "1px solid #f3f4f6" }}>
                <p className="about-stat-value" style={{ fontSize: "clamp(24px, 3vw, 44px)", fontWeight: 600, color: "#111827", margin: "0 0 6px 0", lineHeight: 1 }}>{stat.value}</p>
                <p className="about-stat-label" style={{ fontSize: 13, color: "#111827", marginTop: "8px" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — Mission & Vision */}
      <section className="about-mission-section" style={{ background: "#f9fafb", padding: "80px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="about-mission-row" style={{ display: "flex", gap: 48, alignItems: "flex-start", flexWrap: "wrap", paddingBottom: 48, borderBottom: "1px solid #e5e7eb", marginBottom: 48 }}>
            <h2 className="about-mission-title" style={{ flex: "0 0 220px", fontSize: 26, fontWeight: 700, color: "#014421", margin: 0, marginTop: "10px" }}>Our Mission</h2>
            <p className="about-mission-text" style={{ flex: 1, fontSize: 15, color: "#3d3d3d", lineHeight: 1.75, margin: 0 }}>
              Our mission is to make renting safer and more transparent by connecting tenants with verified agents and reliable property listings. We work to reduce rental scams through verification, community reporting, and clear guidance, helping people find homes with confidence and peace of mind.
            </p>
          </div>
          <div className="about-mission-row" style={{ display: "flex", gap: 48, alignItems: "flex-start", flexWrap: "wrap" }}>
            <h2 className="about-mission-title" style={{ flex: "0 0 220px", fontSize: 26, fontWeight: 700, color: "#014421", margin: 0, marginTop: "10px" }}>Our Vision</h2>
            <p className="about-mission-text" style={{ flex: 1, fontSize: 15, color: "#3d3d3d", lineHeight: 1.75, margin: 0 }}>
              Our vision is to create a trusted rental ecosystem where finding a home is transparent, secure, and stress-free. We aim to become the go-to platform for verified rental listings, empowering tenants to make informed decisions while holding agents accountable through trust, technology, and community collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Safer Rentals */}
      <section className="about-safer-section" style={{ background: "#f9fafb", padding: "80px 40px" }}>
        <div className="about-safer-inner" style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 64, alignItems: "center", flexWrap: "wrap" }}>
          <div className="about-safer-text" style={{ flex: 1, minWidth: 280 }}>
            <h2 className="about-safer-h2" style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, color: "#014421", lineHeight: 1.2, marginBottom: 36 }}>
              Leading the Way in Safer<br />Rentals
            </h2>
            <h4 style={{ fontSize: 20, fontWeight: 600, color: "#014421", marginBottom: 8, marginTop: 0 }}>Verified Agents</h4>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65, marginBottom: 28, marginTop: 0 }}>
              Only agents who pass our identity, location, and activity checks are allowed to list properties. This helps tenants engage with confidence and reduces the risk of rental scams.
            </p>
            <h4 style={{ fontSize: 20, fontWeight: 600, color: "#014421", marginBottom: 8, marginTop: 0 }}>Transparent Renting</h4>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65, marginBottom: 36, marginTop: 0 }}>
              We provide clear property details, upfront charges, and inspection guidance so tenants understand what they're paying for—before making any commitment.
            </p>
            <button className="about-safer-btn" onClick={() => navigate("/Listings1")}
              style={{ padding: "13px 48px", background: "#014421", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              View Listings
            </button>
          </div>
          <div className="about-safer-image" style={{ flex: "0 0 480px", height: 400, borderRadius: 16, overflow: "hidden", background: "#d1fae5", position: "relative" }}>
            <img src="/assets/about-rentals.png" alt="Property interior"
              style={{ width: "108%", height: "103%", objectFit: "contain", display: "block" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }} />
          </div>
        </div>
      </section>

      {/* SECTION 4 — FAQ */}
      <FAQSection />

      {/* SECTION 5 — Footer */}
      <Footer navigate={navigate} />
    </div>
  );
}