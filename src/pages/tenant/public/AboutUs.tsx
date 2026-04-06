// AboutUs.tsx — OgaLandlord About Us Page
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Logo ─────────────────────────────────────────────────────────────────────
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
      <div
        style={{
          display: "none",
          alignItems: "center",
          gap: 4,
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "#014421",
          justifyContent: "center",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="9" r="6" stroke="white" strokeWidth="2" />
          <path d="M13 13l5 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        padding: "0 40px",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div onClick={() => navigate("/Home")} style={{ cursor: "pointer" }}>
        <Logo />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {[
          { label: "About Us", path: "/AboutUs" },
          { label: "Listings", path: "/Listings1" },
          { label: "Contact", path: "/Contact" },
        ].map(({ label, path }) => (
          <button
            key={label}
            onClick={() => navigate(path)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500,
              color: "#374151",
              fontFamily: "inherit",
              padding: 0,
            }}
          >
            {label}
          </button>
        ))}
        <button
          onClick={() => navigate("/RoleSelect")}
          style={{
            background: "#014421",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 20px",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  const [email, setEmail] = useState("");

  return (
    <footer style={{ background: "#fff", color: "#111827", borderTop: "1px solid #e5e7eb" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 40px 0" }}>

        {/* Top row: Logo | Newsletter */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 48,
            flexWrap: "wrap",
            gap: 32,
          }}
        >
          <Logo />
          <div>
            <p style={{ fontSize: 15, color: "#111827", marginBottom: 10 }}>
              Subscribe to our newsletter
            </p>
            <div style={{ display: "flex" }}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  padding: "11px 9px",
                  borderRadius: "20px 20px 20px 20px",
                  border: "1px solid #e5e7eb",
                  fontSize: 14,
                  outline: "none",
                  width: 320,
                  background: "#e5e7eb",
                  color: "#00040b",
                  fontFamily: "inherit",
                }}
              />
              <button
                style={{
                  padding: "2px 15px",
                  background: "#014421",
                  border: "none",
                  borderRadius: "25px 25px 25px 25px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "-42px",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Nav link columns */}
        <div style={{ display: "flex", gap: 400, flexWrap: "wrap", marginBottom: 48 }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: "#111827", marginBottom: 14 }}>Pages</p>
            {[
              { label: "About", path: "/AboutUs" },
              { label: "Listings", path: "/Listings1" },
              { label: "Agents", path: "/AgentList" },
            ].map(({ label, path }) => (
              <p key={label} style={{ marginBottom: 8 }}>
                <button
                  onClick={() => navigate(path)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#6b7280",
                    fontSize: 13,
                    cursor: "pointer",
                    padding: 0,
                    fontFamily: "inherit",
                  }}
                >
                  {label}
                </button>
              </p>
            ))}
          </div>

          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: "#111827", marginBottom: 14 }}>Support</p>
            {[
              { label: "FAQ", path: "/FAQ" },
              { label: "Contact Us", path: "/Contact" },
            ].map(({ label, path }) => (
              <p key={label} style={{ marginBottom: 8 }}>
                <button
                  onClick={() => navigate(path)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#6b7280",
                    fontSize: 13,
                    cursor: "pointer",
                    padding: 0,
                    fontFamily: "inherit",
                  }}
                >
                  {label}
                </button>
              </p>
            ))}
          </div>

          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: "#111827", marginBottom: 14 }}>Legal</p>
            {[
              { label: "Privacy Policy", path: "/privacy" },
              { label: "Terms of Use", path: "/terms" },
            ].map(({ label, path }) => (
              <p key={label} style={{ marginBottom: 8 }}>
                <button
                  onClick={() => navigate(path)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#6b7280",
                    fontSize: 13,
                    cursor: "pointer",
                    padding: 0,
                    fontFamily: "inherit",
                  }}
                >
                  {label}
                </button>
              </p>
            ))}
          </div>
        </div>

        {/* Divider + copyright */}
        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 20, paddingBottom: 8 }}>
          <p style={{ fontSize: 12, color: "#9ca3af" }}>
            © COPYRIGHT 2026 OGALANDLORD
          </p>
        </div>

        {/* Watermark */}
        <div
          style={{
            fontSize: "clamp(60px, 12vw, 160px)",
            fontWeight: 700,
            textAlign: "center",
            color: "rgba(0,0,0,0.04)",
            letterSpacing: "-3px",
            userSelect: "none",
            lineHeight: 1,
            marginTop: 8,
            paddingTop: 16,
            overflow: "hidden",
          }}
        >
          Ogalandlord
        </div>
      </div>
    </footer>
  );
}

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'What does "Verified Agent" mean?',
    a: "A verified agent has passed our identity checks, location confirmation, and activity review. Only agents who meet our verification standards are allowed to list properties on the platform.",
  },
  {
    q: "Are all properties on this platform real?",
    a: "Yes. All listings are submitted by verified agents who have undergone our thorough verification process.",
  },
  {
    q: "Do I need to pay before inspection?",
    a: "No. We advise against paying any money before physically inspecting a property.",
  },
  {
    q: "Can I report a suspicious agent or listing?",
    a: "Yes. Use the report button on any agent profile or listing page to flag suspicious activity.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section style={{ background: "#f9fafb", padding: "80px 40px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 80, flexWrap: "wrap" }}>
        {/* Left label */}
        <div style={{ flex: "0 0 320px" }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: "#014421", lineHeight: 1.2, marginBottom: 16, maxWidth: 500 }}>
            Frequently Asked
            <br />Questions
          </h2>
          <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.65, width: 500 }}>
            If there are question you want to ask. We will answer all your question.
          </p>
        </div>

        {/* Right accordion */}
        <div style={{ flex: 1, maxWidth: 4000, marginLeft: 15 }}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: 12,
                marginBottom: 12,
                border: "1px solid #e5e7eb",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  padding: "18px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 19,
                  fontWeight: 600,
                  color: "#111827",
                  textAlign: "left",
                  fontFamily: "inherit",
                }}
              >
                {faq.q}
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    border: "1.5px solid #e5e7eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: 26,
                  }}
                >
                  {open === i ? "−" : "+"}
                </span>
              </button>
              {open === i && (
                <div style={{ padding: "0 20px 18px", fontSize: 14, color: "#6b7280", lineHeight: 1.65 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif", color: "#111827", background: "#fff" }}>
      <Navbar navigate={navigate} />

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — Hero: Headline + Image + Stats
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#f9fafb", padding: "48px 40px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 46px)",
              fontWeight: 700,
              color: "#014421",
              lineHeight: 1.15,
              marginBottom: 28,
              maxWidth: 700,
            }}
          >
            Trusted Experts in Real
            <br />Estate Excellence
          </h1>

          {/* Hero image placeholder */}
          <div
            style={{
              width: "100%",
              height: 520,
              borderRadius: 16,
              overflow: "hidden",
              background: "#d1fae5",
              marginBottom: 36,
              position: "relative",
            }}
          >
            <img
              src="/assets/about-hero.png"
              /* PLACEHOLDER: Replace with your hero image, e.g. /assets/about-hero.jpg
                 Recommended: real-estate agent at desk photo */
              alt="Real estate agents at work"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                (e.currentTarget.nextSibling as HTMLElement).style.display = "flex";
              }}
            />
            {/* Fallback shown when image is missing */}
            <div
              style={{
                display: "none",
                position: "absolute",
                inset: 0,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 8,
                background: "#d1fae5",
              }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="3" stroke="#014421" strokeWidth="1.5" />
                <circle cx="8.5" cy="8.5" r="1.5" stroke="#014421" strokeWidth="1.5" />
                <path d="M21 15l-5-5L5 21" stroke="#014421" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <p style={{ fontSize: 13, color: "#014421", margin: 0 }}>
                Replace with: <code>/assets/about-hero.png</code>
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "grid",
              height: 136,
              width: 1128,
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 20,
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              overflow: "hidden",
              marginBottom: 0,
              marginLeft: -21,
            }}
          >
            {[
              { value: "100+", label: "Inspections Completed" },
              { value: "200+", label: "Verified Listings" },
              { value: "1000+", label: "Tenants Assisted" },
              { value: "95%", label: "Positive Feedback" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "#fff",
                  padding: "15px 25px",
                  textAlign: "left",
                }}
              >
                <p
                  style={{
                    fontSize: "clamp(28px, 3vw, 56px)",
                    fontWeight: 600,
                    color: "#111827",
                    margin: "0 0 6px 0",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </p>
                <p style={{ fontSize: 20, color: "#111827", marginTop: "18px" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — Our Mission & Our Vision
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#f9fafb", padding: "80px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Our Mission */}
          <div
            style={{
              display: "flex",
              gap: 80,
              alignItems: "flex-start",
              flexWrap: "wrap",
              paddingBottom: 48,
              borderBottom: "1px solid #e5e7eb",
              marginBottom: 48,
            }}
          >
            <h2
              style={{
                flex: "0 0 220px",
                fontSize: 29,
                fontWeight: 700,
                color: "#014421",
                margin: 0,
                marginTop: "35px"
              }}
            >
              Our Mission
            </h2>
            <p
              style={{
                flex: 1,
                maxWidth: 3300,
                fontSize: 15,
                color: "#3d3d3d",
                lineHeight: 1.75,
                margin: 0,
                marginLeft: "320px"
              }}
            >
              Our mission is to make renting safer and more transparent by connecting tenants
              with verified agents and reliable property listings. We work to reduce rental scams
              through verification, community reporting, and clear guidance, helping people find
              homes with confidence and peace of mind.
            </p>
          </div>

          {/* Our Vision */}
          <div
            style={{
              display: "flex",
              gap: 80,
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <h2
              style={{
                flex: "0 0 220px",
                fontSize: 29,
                fontWeight: 700,
                color: "#014421",
                margin: 0,
                marginTop: "38px"
              }}
            >
              Our Vision
            </h2>
            <p
              style={{
                flex: 1,
                maxWidth: 3300,
                fontSize: 15,
                color: "#3d3d3d",
                lineHeight: 1.75,
                margin: 0,
                marginLeft: "318px"
              }}
            >
              Our vision is to create a trusted rental ecosystem where finding a home is
              transparent, secure, and stress-free. We aim to become the go-to platform for
              verified rental listings, empowering tenants to make informed decisions while
              holding agents accountable through trust, technology, and community collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — Leading the Way in Safer Rentals
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#f9fafb", padding: "80px 40px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            gap: 64,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Left: text content */}
          <div style={{ flex: 1, minWidth: 280 }}>
            <h2
              style={{
                fontSize: "clamp(22px, 3vw, 32px)",
                fontWeight: 700,
                color: "#014421",
                lineHeight: 1.2,
                marginBottom: 36,
              }}
            >
              Leading the Way in Safer
              <br />Rentals
            </h2>

            <h4 style={{ fontSize: 24, fontWeight: 600, color: "#014421", marginBottom: 8, marginTop: 0 }}>
              Verified Agents
            </h4>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65, marginBottom: 28, marginTop: 0 }}>
              Only agents who pass our identity, location, and activity checks are allowed to list properties.
              This helps tenants engage with confidence and reduces the risk of rental scams.
            </p>

            <h4 style={{ fontSize: 24, fontWeight: 600, color: "#014421", marginBottom: 8, marginTop: 0 }}>
              Transparent Renting
            </h4>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65, marginBottom: 36, marginTop: 0 }}>
              We provide clear property details, upfront charges, and inspection guidance so tenants
              understand what they're paying for—before making any commitment.
            </p>

            <button
              onClick={() => navigate("/Listings1")}
              style={{
                padding: "13px 65px",
                background: "#014421",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              View Listings
            </button>
          </div>

          {/* Right: image placeholder */}
          <div
            style={{
              flex: "0 0 516px",
              height: 400,
              borderRadius: 16,
              overflow: "hidden",
              background: "#d1fae5",
              position: "relative",
            }}
          >
            <img
              src="/assets/about-rentals.png"
              /* PLACEHOLDER: Replace with your property interior photo
                 e.g. /assets/about-rentals.jpg — empty room / interior shot */
              alt="Property interior"
              style={{ width: "108%", height: "103%", objectFit: "contain", display: "block" }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                (e.currentTarget.nextSibling as HTMLElement).style.display = "flex";
              }}
            />
            {/* Fallback */}
            <div
              style={{
                display: "none",
                position: "absolute",
                inset: 0,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 8,
                background: "#d1fae5",
              }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="3" stroke="#014421" strokeWidth="1.5" />
                <circle cx="8.5" cy="8.5" r="1.5" stroke="#014421" strokeWidth="1.5" />
                <path d="M21 15l-5-5L5 21" stroke="#014421" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <p style={{ fontSize: 13, color: "#014421", margin: 0 }}>
                Replace with: <code>/assets/about-rentals.png</code>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — FAQ
      ══════════════════════════════════════════════════════ */}
      <FAQSection />

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — Footer
      ══════════════════════════════════════════════════════ */}
      <Footer navigate={navigate} />
    </div>
  );
}