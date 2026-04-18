// Home.tsx — OgaLandlord Homepage — Responsive Mobile
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TestimonialCarousel from "./../../../components/shared/TestimonialCarousel.tsx";
import TenantNavbar from "../../../components/tenant/TenantNavbar";

const mobileStyles = `
  @media (max-width: 768px) {
    .home-navbar {
      padding: 0 16px !important;
      height: 52px !important;
    }
    .home-navbar-links { display: none !important; }
    .home-navbar-menu-btn { display: flex !important; }

    .home-hero-section {
      padding: 32px 16px 0 !important;
    }
    .home-hero-h1 {
      font-size: 24px !important;
      margin-bottom: 12px !important;
    }
    .home-hero-p {
      font-size: 14px !important;
      margin-bottom: 20px !important;
    }
    .home-hero-ctas {
      flex-direction: column !important;
      align-items: stretch !important;
      margin-bottom: 28px !important;
    }
    .home-hero-ctas button {
      width: 100% !important;
      justify-content: center !important;
    }
    .home-hero-grid {
      grid-template-columns: 1fr !important;
      grid-template-rows: auto !important;
      gap: 10px !important;
    }
    .home-panel1 {
      grid-column: 1 / 2 !important;
      grid-row: 1 / 2 !important;
      min-height: 220px !important;
      border-radius: 12px !important;
    }
    .home-panel2 {
      grid-column: 1 / 2 !important;
      grid-row: 2 / 3 !important;
      width: 100% !important;
      height: 160px !important;
      margin: 0 !important;
    }
    .home-panel3 {
      display: none !important;
    }
    .home-panel4 {
      grid-column: 1 / 2 !important;
      grid-row: 3 / 4 !important;
      height: 160px !important;
      border-radius: 12px !important;
      padding: 16px 16px 0 !important;
    }

    .home-why-section {
      padding: 40px 16px !important;
    }
    .home-why-h2 { font-size: 22px !important; }
    .home-why-cards {
      flex-direction: column !important;
      gap: 16px !important;
    }
    .home-why-card {
      flex: none !important;
      width: 100% !important;
      min-height: unset !important;
      padding: 20px !important;
    }

    .home-howitworks-section {
      padding: 40px 16px !important;
    }
    .home-howitworks-inner {
      flex-direction: column !important;
      gap: 24px !important;
    }
    .home-howitworks-img {
      height: 220px !important;
      width: 100% !important;
      border-radius: 12px !important;
    }
    .home-howitworks-img img { width: 100% !important; }

    .home-property-section {
      padding: 32px 16px !important;
    }
    .home-property-inner {
      padding: 28px 16px !important;
      flex-direction: column !important;
      gap: 24px !important;
    }
    .home-property-text { min-width: unset !important; }
    .home-property-h2 { font-size: 22px !important; }
    .home-property-img {
      flex: none !important;
      width: 100% !important;
      height: 220px !important;
    }

    .home-agent-section {
      padding: 40px 16px !important;
    }
    .home-agent-cards {
      flex-direction: column !important;
      gap: 16px !important;
    }
    .home-agent-card1 {
      flex: none !important;
      width: 100% !important;
      height: 220px !important;
    }
    .home-agent-card2, .home-agent-card3 {
      flex: none !important;
      width: 100% !important;
      height: 180px !important;
    }

    .home-faq-section {
      padding: 40px 16px !important;
    }
    .home-faq-inner {
      flex-direction: column !important;
      gap: 24px !important;
    }
    .home-faq-left { flex: none !important; }
    .home-faq-h2 { font-size: 22px !important; }

    .home-footer-inner {
      padding: 32px 16px 0 !important;
    }
    .home-footer-top {
      flex-direction: column !important;
      gap: 24px !important;
      margin-bottom: 32px !important;
    }
    .home-footer-cols {
      gap: 28px !important;
      flex-wrap: wrap !important;
    }
    .home-footer-newsletter input { width: 180px !important; }
    .home-footer-watermark {
      font-size: clamp(40px, 13vw, 90px) !important;
    }
  }
`;

function Footer({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  const [email, setEmail] = useState("");
  return (
    <footer style={{ background: "#014421", color: "#fff" }}>
      <div className="home-footer-inner" style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 60px 0" }}>
        <div className="home-footer-top" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 56, flexWrap: "wrap", gap: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src="/assets/logo3.png" alt="OgaLandlord logo" style={{ height: 40, objectFit: "contain" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }} />
          </div>
          <div className="home-footer-newsletter">
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginBottom: 12 }}>Subscribe to our newsletter</p>
            <div style={{ display: "flex" }}>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"
                style={{ padding: "11px 18px", borderRadius: "8px 0 0 8px", border: "none", fontSize: 14, outline: "none", width: 240, background: "#fff", color: "#111827", fontFamily: "inherit" }} />
              <button style={{ padding: "11px 16px", background: "#014421", border: "2px solid rgba(255,255,255,0.25)", borderLeft: "none", borderRadius: "0 8px 8px 0", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
        </div>
        <div className="home-footer-cols" style={{ display: "flex", gap: 80, flexWrap: "wrap", marginBottom: 48 }}>
          {[
            { title: "Pages", links: [{ label: "About us", path: "/AboutUs" }, { label: "Listings", path: "/Listings1" }, { label: "Agents", path: "/AgentList" }] },
            { title: "Support", links: [{ label: "FAQ", path: "/FAQ" }, { label: "Contact Us", path: "/Contact" }] },
            { title: "Legal", links: [{ label: "Privacy Policy", path: "/privacy" }, { label: "Terms of Use", path: "/terms" }] },
          ].map(col => (
            <div key={col.title}>
              <p style={{ fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 18 }}>{col.title}</p>
              {col.links.map(({ label, path }) => (
                <p key={label} style={{ marginBottom: 10 }}>
                  <button onClick={() => navigate(path)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: 13, cursor: "pointer", padding: 0, fontFamily: "inherit", textAlign: "left" }}>{label}</button>
                </p>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 24, paddingBottom: 8 }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textAlign: "left" }}>© COPYRIGHT 2026 OGALANDLORD</p>
        </div>
        <div className="home-footer-watermark" style={{ fontSize: "160px", fontWeight: 700, textAlign: "center", color: "rgba(255,255,255,0.07)", letterSpacing: "-3px", userSelect: "none", lineHeight: 1, marginTop: 8, paddingTop: "26px", overflow: "hidden" }}>
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
    <section className="home-faq-section" style={{ background: "#f2fdf5", padding: "80px 40px" }}>
      <div className="home-faq-inner" style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 80, flexWrap: "wrap" }}>
        <div className="home-faq-left" style={{ flex: "0 0 280px" }}>
          <h2 className="home-faq-h2" style={{ fontSize: 28, fontWeight: 900, color: "#111827", marginBottom: 12 }}>Frequently Asked Questions</h2>
          <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65 }}>If there are question you want to ask. We will answer all your question.</p>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 12, marginBottom: 12, border: "1px solid #e5e7eb", overflow: "hidden" }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#111827", textAlign: "left", fontFamily: "inherit" }}>
                {faq.q}
                <span style={{ width: 22, height: 22, borderRadius: "50%", border: "1.5px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#6b7280", fontSize: 16, minWidth: 22 }}>
                  {open === i ? "−" : "+"}
                </span>
              </button>
              {open === i && <div style={{ padding: "0 20px 18px", fontSize: 13, color: "#6b7280", lineHeight: 1.65 }}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif", color: "#111827" }}>
      <style>{mobileStyles}</style>

      <TenantNavbar activePath="/Home" background="#f2fdf5" />

      {/* HERO */}
      <section className="home-hero-section" style={{ background: "#f0faf4", padding: "64px 40px 0", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h1 className="home-hero-h1" style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: "#014421", lineHeight: 1.2, marginBottom: 16 }}>
            Find Verified Rental Agents.<br />Avoid House Scams.
          </h1>
          <p className="home-hero-p" style={{ fontSize: 15, color: "#6b7280", marginBottom: 32 }}>
            Connecting tenants with trusted agents in Ibadan, Abuja, Lagos and Port Harcourt.
          </p>
          <div className="home-hero-ctas" style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 48 }}>
            <button onClick={() => navigate("/Listings1")}
              style={{ padding: "13px 28px", background: "#014421", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 16px rgba(1,68,33,0.3)" }}>
              Find a House
            </button>
            <button onClick={() => navigate("/agent")}
              style={{ padding: "13px 28px", background: "transparent", color: "#014421", border: "2px solid #014421", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              Join as an Agent
            </button>
          </div>
        </div>

        {/* Hero grid */}
        <div className="home-hero-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "42fr 33fr 25fr", gridTemplateRows: "auto auto", gap: 12 }}>
          <div className="home-panel1" style={{ gridColumn: "1 / 2", gridRow: "1 / 3", borderRadius: 16, overflow: "hidden", minHeight: 440, position: "relative", background: "#b6dfc4" }}>
            <img src="/assets/hero-house.png" alt="Nigerian house exterior" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
          </div>
          <div className="home-panel2" style={{ gridColumn: "2 / 3", gridRow: "1 / 2", background: "#014421", borderRadius: 13, height: "96%", width: "92%", marginTop: "6px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 11 }}>
            <img src="/assets/frame2.png" alt="Agent verification" style={{ width: "100%", height: "110%", objectFit: "contain", display: "block" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
          </div>
          <div className="home-panel3" style={{ gridColumn: "3 / 4", gridRow: "1 / 2", background: "#014421", borderRadius: 16, display: "flex", marginLeft: "-23px", alignItems: "center", width: "110%", justifyContent: "center", minHeight: 160, position: "relative" }}>
            <img src="/assets/housekey.png" alt="OgaLandlord icon" style={{ width: 80, height: 80, objectFit: "contain" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
          </div>
          <div className="home-panel4" style={{ flex: 1, gridColumn: "2 / 4", gridRow: "2 / 3", background: "#014421", borderRadius: 16, gap: 20, display: "flex", alignItems: "flex-end", padding: "24px 24px 0", position: "relative", overflow: "hidden" }}>
            <img src="/assets/frame1.png" style={{ width: "100%", height: "95%", display: "block" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
          </div>
        </div>
      </section>

      {/* WHY OGALANDLORD */}
      <section className="home-why-section" style={{ padding: "80px 40px", background: "#f2fdf5" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 className="home-why-h2" style={{ fontSize: 26, fontWeight: 900, color: "#014421", marginBottom: 8 }}>Why Oga<span style={{ fontWeight: 400 }}>Landlord</span></h2>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 48, maxWidth: 360 }}>We remove the guesswork from house hunting by verifying agents and protecting tenants at every step.</p>
          <div className="home-why-cards" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[
              { icon: "/assets/icons/icon2.png", title: "Verified Agents", desc: "Every agent is checked for identity, location, and rental history before approval." },
              { icon: "/assets/icons/icon1.png", title: "Trust Scores", desc: "Agents earn trust scores based on verification status and tenant feedback." },
              { icon: "/assets/icons/icon3.png", title: "Community Reporting", desc: "Real reports from tenants help flag fake agents and risky listings early." },
            ].map((item, i) => (
              <div className="home-why-card" key={i} style={{ flex: "1 1 280px", background: "#ffffff", borderRadius: 16, padding: "28px 28px", border: "1px solid #e5e7eb", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 240 }}>
                <img src={item.icon} alt={item.title} style={{ width: 48, height: 48, marginBottom: 20 }} />
                <div>
                  <h4 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{item.title}</h4>
                  <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="home-howitworks-section" style={{ padding: "80px 70px", background: "#f0faf4" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: "#111827", marginBottom: 8 }}>How It Works</h2>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 48, maxWidth: 365 }}>Follow a clear step-by-step process from agent selection to inspection.</p>
          <div className="home-howitworks-inner" style={{ display: "flex", gap: 64, flexWrap: "wrap", alignItems: "flex-start" }}>
            <div className="home-howitworks-img" style={{ height: 460, width: 560, borderRadius: 20, overflow: "hidden", position: "relative", background: "#a7f3d0" }}>
              <img src="/assets/how-it-works.png" alt="How OgaLandlord works" style={{ width: "130%", height: "100%", objectFit: "cover" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(176, 176, 176, 0.45)", backdropFilter: "blur(2px)", padding: "20px 24px", margin: 16, borderRadius: 12 }}>
                <p style={{ color: "#fff", fontSize: 14, lineHeight: 1.6, margin: 0 }}>Tour properties with verified agents and avoid the risks that come with unverified listings.</p>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 280 }}>
              {[
                { num: "01", title: "Agent Verification", desc: "Agents earn trust scores based on verification status and tenant feedback." },
                { num: "02", title: "Listings Upload", desc: "Verified agents upload and manage their rental listings on the platform." },
                { num: "03", title: "Safe Contact", desc: "Tenants connect with verified agents and inspect properties before any payment." },
              ].map((step) => (
                <div key={step.num} style={{ paddingBottom: 32, marginBottom: 32, borderBottom: "1px solid #d1fae5" }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: "#6b7280", margin: "0 0 10px 0" }}>{step.num}</p>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "#014421", margin: "0 0 8px 0" }}>{step.title}</h3>
                  <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HAVE A PROPERTY */}
      <section className="home-property-section" style={{ padding: "70px 50px", background: "#f2fdf5" }}>
        <div className="home-property-inner" style={{ padding: "90px 50px", maxWidth: 1200, margin: "0 auto", display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap", background: "#ffffff", position: "relative" }}>
          <div className="home-property-text" style={{ flex: 1, minWidth: 280 }}>
            <h2 className="home-property-h2" style={{ fontSize: 28, fontWeight: 700, color: "#014421", marginBottom: 12, lineHeight: 1.25 }}>Have a Property to Rent?<br />Let Verified Agents Handle It.</h2>
            <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 20, lineHeight: 1.7, width: "90%" }}>Connect with verified rental agents who can manage inspections, tenant sourcing, and negotiations—without the stress or uncertainty.</p>
            <ul style={{ paddingLeft: 0, listStyle: "none", marginBottom: 28 }}>
              {["Verified and accountable agents", "Transparent rental process", "Reduced risk of disputes and scams"].map((item) => (
                <li key={item} style={{ fontSize: 13, color: "#374151", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "#014421", fontSize: 16 }}>•</span> {item}
                </li>
              ))}
            </ul>
            <button onClick={() => navigate("/AgentList")} style={{ padding: "12px 43px", background: "#014421", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", width: "100%", maxWidth: 240 }}>
              Find a Verified Agent
            </button>
          </div>
          <div className="home-property-img" style={{ flex: "0 0 600px", height: 370, width: 700, borderRadius: 20, overflow: "hidden", position: "relative", background: "#a7f3d0" }}>
            <img src="/assets/verifiedagents.png" alt="Property" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
          </div>
        </div>
      </section>

      {/* ARE YOU AN AGENT */}
      <section className="home-agent-section" style={{ padding: "80px 40px", background: "#f2fdf5" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 33, fontWeight: 630, color: "#014421", marginBottom: 8, textAlign: "center" }}>Are You a Real Estate Agent?</h2>
          <div className="home-agent-cards" style={{ display: "flex", gap: 24, flexWrap: "wrap", marginTop: 50 }}>
            <div className="home-agent-card1" style={{ flex: "0 0 430px", borderRadius: 16, height: 310, width: 800, overflow: "hidden", position: "relative", background: "#fff" }}>
              <img src="/assets/agent1.png" alt="Agent" style={{ width: "120%", height: "110%", objectFit: "contain", display: "block", marginTop: "-80px", marginBottom: "-16px" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
              <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.40, marginLeft: "5px" }}>Join thousands of verified agents building trust with clients. Create your professional profile and showase your expertise today.</p>
            </div>
            <div className="home-agent-card2" style={{ flex: 1, minWidth: 200, background: "#fff", borderRadius: 16, padding: "28px 20px", height: 310, border: "1px solid #e5e7eb" }}>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "#014421", marginBottom: 40, width: "200px" }}>Increase Your Visibility</h3>
              <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.65, marginTop: 150 }}>Show up where serious buyers and sellers are actively searching for trusted agents.</p>
            </div>
            <div className="home-agent-card3" style={{ flex: 1, minWidth: 200, background: "#014421", borderRadius: 16, padding: "28px 24px", height: 310 }}>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 40, width: "180px" }}>Build Instant Trust</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.65, marginTop: 150 }}>Stand out with a verified, credible profile that reassures clients before the first conversation.</p>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <button onClick={() => navigate("/agent")} style={{ padding: "12px 44px", background: "#014421", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 16px rgba(1,68,33,0.25)" }}>
              Register as an Agent
            </button>
          </div>
        </div>
      </section>

      <TestimonialCarousel />
      <FAQSection />
      <Footer navigate={navigate} />
    </div>
  );
}