// AboutUs.tsx — OgaLandlord About Us Page — Responsive Mobile
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FAQSection from "./FAQS";

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






export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif", color: "#111827", background: "#fff" }}>
      <style>{mobileStyles}</style>
      <Navbar  />

      {/* SECTION 1 — Hero */}
      <section className="about-hero-section" style={{ background: "#f9fafb", padding: "48px 40px 0" }}>
        <div style={{ margin: "0 auto" }}>
          <h1 className="about-hero-h1 text-green-700" style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 700, lineHeight: 1.15, marginBottom: 28, maxWidth: 700 }}>
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
              <div className="about-stat-item text-green-700" key={stat.label} style={{ background: "#fff", padding: "15px 20px", textAlign: "left", borderRight: "1px solid #f3f4f6" }}>
                <p className="about-stat-value" style={{ fontSize: "clamp(24px, 3vw, 44px)", fontWeight: 600, margin: "0 0 6px 0", lineHeight: 1 }}>{stat.value}</p>
                <p className="about-stat-label" style={{ fontSize: 16, marginTop: "8px" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — Mission & Vision */}
      <section className="about-mission-section" style={{ background: "#f9fafb", padding: "80px 40px" }}>
        <div style={{ margin: "0 auto" }}>
          <div className="about-mission-row" style={{ display: "flex", gap: 48, alignItems: "flex-start", flexWrap: "wrap", paddingBottom: 48, borderBottom: "1px solid #e5e7eb", marginBottom: 48 }}>
            <h2 className="about-mission-title text-green-700" style={{ flex: "0 0 220px", fontSize: 26, fontWeight: 700,  margin: 0, marginTop: "10px" }}>Our Mission</h2>
            <p className="about-mission-text" style={{ flex: 1, fontSize: 16, lineHeight: 1.75, margin: 0 }}>
              Our mission is to make renting safer and more transparent by connecting tenants with verified agents and reliable property listings. We work to reduce rental scams through verification, community reporting, and clear guidance, helping people find homes with confidence and peace of mind.
            </p>
          </div>
          <div className="about-mission-row" style={{ display: "flex", gap: 48, alignItems: "flex-start", flexWrap: "wrap" }}>
            <h2 className="about-mission-title text-green-700" style={{ flex: "0 0 220px", fontSize: 26, fontWeight: 700, margin: 0, marginTop: "10px" }}>Our Vision</h2>
            <p className="about-mission-text" style={{ flex: 1, fontSize: 16,  lineHeight: 1.75, margin: 0 }}>
              Our vision is to create a trusted rental ecosystem where finding a home is transparent, secure, and stress-free. We aim to become the go-to platform for verified rental listings, empowering tenants to make informed decisions while holding agents accountable through trust, technology, and community collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Safer Rentals */}
      <section className="about-safer-section" style={{ background: "#f9fafb", padding: "80px 40px" }}>
        <div className="about-safer-inner grid grid-cols-1 md:grid-cols-2 gap-4 items-center" style={{ margin: "0 auto",  }}>
          <div className="about-safer-text" style={{ flex: 1, minWidth: 280 }}>
            <h2 className="about-safer-h2 text-green-700" style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, lineHeight: 1.2, marginBottom: 36 }}>
              Leading the Way in Safer<br />Rentals
            </h2>
            <h4 className="text-green-700" style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, marginTop: 0 }}>Verified Agents</h4>
            <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.65, marginBottom: 28, marginTop: 0 }}>
              Only agents who pass our identity, location, and activity checks are allowed to list properties. This helps tenants engage with confidence and reduces the risk of rental scams.
            </p>
            <h4 className="text-green-700" style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, marginTop: 0 }}>Transparent Renting</h4>
            <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.65, marginBottom: 36, marginTop: 0 }}>
              We provide clear property details, upfront charges, and inspection guidance so tenants understand what they're paying for—before making any commitment.
            </p>
            <button className="about-safer-btn" onClick={() => navigate("/Listings1")}
              style={{ padding: "13px 48px", background: "#014421", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              View Listings
            </button>
          </div>
          <div className="about-safer-image" style={{ borderRadius: 16, overflow: "hidden", background: "#d1fae5", position: "relative" }}>
            <img src="/assets/about-rentals.png" alt="Property interior"
              style={{  objectFit: "cover", display: "block" }}
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