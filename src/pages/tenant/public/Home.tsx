// Home.tsx — OgaLandlord Homepage
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TestimonialCarousel from "./../../../components/shared/TestimonialCarousel.tsx";

// ─── Shared sub-components ────────────────────────────────────────────────────

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

function Navbar({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "#f2fdf5",
        borderBottom: "1px solid #e5e7eb",
        padding: "0 40px",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div onClick={() => navigate("/Home")}>
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
          onClick={() => navigate("/Onboarding")}
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

function Footer({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  const [email, setEmail] = useState("");

  return (
    <footer style={{ background: "#014421", color: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 60px 0" }}>

        {/* ── Top row: Logo left | Newsletter right ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 56,
            flexWrap: "wrap",
            gap: 32,
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img
              src="/assets/logo3.png"
              /* ↑ PLACEHOLDER 1: house exterior photo, e.g. /assets/hero-house.jpg */
              alt="Nigerian house exterior"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <div
             
            >
              
            </div>
            
          </div>

          {/* Newsletter */}
          <div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginBottom: 12 }}>
              Subscribe to our newsletter
            </p>
            <div style={{ display: "flex" }}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  padding: "11px 18px",
                  borderRadius: "8px 0 0 8px",
                  border: "none",
                  fontSize: 14,
                  outline: "none",
                  width: 240,
                  background: "#fff",
                  color: "#111827",
                  fontFamily: "inherit",
                }}
              />
              <button
                style={{
                  padding: "11px 16px",
                  background: "#014421",
                  border: "2px solid rgba(255,255,255,0.25)",
                  borderLeft: "none",
                  borderRadius: "0 8px 8px 0",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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

        {/* ── Nav link columns ── */}
        <div
          style={{
            display: "flex",
            gap: 400,
            flexWrap: "wrap",
            marginBottom: 48,
          }}
        >
          {/* Pages */}
          <div>
            <p style={{ fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 18 }}>Pages</p>
            {[
              { label: "About us", path: "/AboutUs" },
              { label: "Listings", path: "/Listings1" },
              { label: "Agents", path: "/AgentList" },
            ].map(({ label, path }) => (
              <p key={label} style={{ marginBottom: 10 }}>
                <button
                  onClick={() => navigate(path)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: 13,
                    cursor: "pointer",
                    padding: 0,
                    fontFamily: "inherit",
                    textAlign: "left",
                  }}
                >
                  {label}
                </button>
              </p>
            ))}
          </div>

          {/* Support */}
          <div>
            <p style={{ fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 18 }}>Support</p>
            {[
              { label: "FAQ", path: "/FAQ" },
              { label: "Contact Us", path: "/Contact" },
            ].map(({ label, path }) => (
              <p key={label} style={{ marginBottom: 10 }}>
                <button
                  onClick={() => navigate(path)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: 13,
                    cursor: "pointer",
                    padding: 0,
                    fontFamily: "inherit",
                    textAlign: "left",
                  }}
                >
                  {label}
                </button>
              </p>
            ))}
          </div>

          {/* Legal */}
          <div>
            <p style={{ fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 18 }}>Legal</p>
            {[
              { label: "Privacy Policy", path: "/privacy" },
              { label: "Terms of Use", path: "/terms" },
            ].map(({ label, path }) => (
              <p key={label} style={{ marginBottom: 10 }}>
                <button
                  onClick={() => navigate(path)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: 13,
                    cursor: "pointer",
                    padding: 0,
                    fontFamily: "inherit",
                    textAlign: "left",
                  }}
                >
                  {label}
                </button>
              </p>
            ))}
          </div>
        </div>

        {/* ── Divider + copyright ── */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 24,
            paddingBottom: 8,
          }}
        >
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textAlign: "left" }}>
            © COPYRIGHT 2026 OGALANDLORD
          </p>
        </div>

        {/* ── Large watermark text ── */}
        <div
          style={{
            fontSize: "160px",
            fontWeight: 700,
            textAlign: "center",
            color: "rgba(255,255,255,0.07)",
            letterSpacing: "-3px",
            userSelect: "none",
            lineHeight: 1,
            marginTop: 8,
            paddingTop: "26px",
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
    <section style={{ background: "#f2fdf5", padding: "80px 40px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 80, flexWrap: "wrap" }}>
        <div style={{ flex: "0 0 280px" }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "#111827", marginBottom: 12 }}>
            Frequently Asked Questions
          </h2>
          <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65 }}>
            If there are question you want to ask. We will answer all your question.
          </p>
        </div>
        <div style={{ flex: 1, minWidth: 300 }}>
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
                  fontSize: 14,
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
                    fontSize: 16,
                  }}
                >
                  {open === i ? "−" : "+"}
                </span>
              </button>
              {open === i && (
                <div style={{ padding: "0 20px 18px", fontSize: 13, color: "#6b7280", lineHeight: 1.65 }}>
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
export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif", color: "#111827" }}>
      <Navbar navigate={navigate} />

      {/* ════════════════════════════════════════════════════════════
          HERO SECTION
          Matches hero.PNG layout exactly:

          ┌─────────────────────┬─────────────────┬───────────────┐
          │                     │  PANEL 2        │  PANEL 3      │
          │  PANEL 1            │  Dark green bg  │  Dark green   │
          │  House photo        │  "Agent verif.  │  Key icon     │
          │  (tall, full-height │   in Bodija"    │  centered     │
          │   left column)      │  "Inspection    │               │
          │                     │   confirmed…"   │               │
          │                     ├─────────────────┴───────────────┤
          │                     │  PANEL 4 (spans mid + right)    │
          │                     │  Dark green bg                  │
          │                     │  Left: PANEL 5 person face      │
          │                     │  Right: stacked progress cards  │
          │                     │  + "Upload Government ID"       │
          └─────────────────────┴─────────────────────────────────┘
      ════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#f0faf4", padding: "64px 40px 0", textAlign: "center" }}>

        {/* ── Headline & CTAs ── */}
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h1
            style={{
              fontSize: "clamp(28px,4vw,48px)",
              fontWeight: 900,
              color: "#014421",
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            Find Verified Rental Agents.
            <br />
            Avoid House Scams.
          </h1>
          <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 32 }}>
            Connecting tenants with trusted agents in Ibadan, Abuja, Lagos and Port Harcourt.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 48 }}>
            <button
              onClick={() => navigate("/Listings1")}
              style={{
                padding: "13px 28px",
                background: "#014421",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: "0 4px 16px rgba(1,68,33,0.3)",
              }}
            >
              Find a House
            </button>
            <button
              onClick={() => navigate("/agent")}
              style={{
                padding: "13px 28px",
                background: "transparent",
                color: "#014421",
                border: "2px solid #014421",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Join as an Agent
            </button>
          </div>
        </div>

        {/* ── Hero 3-column grid ── */}
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            /* Col 1 = house photo ~42%, Col 2 = notifications ~33%, Col 3 = icon ~25% */
            gridTemplateColumns: "42fr 33fr 25fr",
            gridTemplateRows: "auto auto",
            gap: 12,
          }}
        >

          {/* ─────────────────────────────────────────────────────────
              PANEL 1 — House photo (spans both rows, left column)
              IMAGE PLACEHOLDER 1:
              Replace the src below with your actual image path.
              e.g.  src="/assets/hero-house.jpg"
              Recommended: tall exterior photo of a Nigerian house.
          ───────────────────────────────────────────────────────── */}
          <div
            style={{
              gridColumn: "1 / 2",
              gridRow: "1 / 3",
              borderRadius: 16,
              overflow: "hidden",
              minHeight: 440,
              position: "relative",
              background: "#b6dfc4", /* visible until image loads */
            }}
          >
            <img
              src="/assets/hero-house.png"
              /* ↑ PLACEHOLDER 1: house exterior photo, e.g. /assets/hero-house.jpg */
              alt="Nigerian house exterior"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>

          {/* ─────────────────────────────────────────────────────────
              PANEL 2 — Notification pills (top-middle, dark green)
              No image needed — built with HTML/CSS.
          ───────────────────────────────────────────────────────── */}
          <div
            style={{
              gridColumn: "2 / 3",
              gridRow: "1 / 2",
              background: "#014421",
              borderRadius: 13,
              
              height: "96%",
              width: "92%",
              bottom: "8px",
              marginTop: "6px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 11,
            }}
          >
            
               <img
              src="/assets/frame2.png"
              /* ↑ PLACEHOLDER 1: house exterior photo, e.g. /assets/hero-house.jpg */
              alt="Nigerian house exterior"
              style={{ width: "100%", height: "110%", objectFit: "contain", display:"block" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            

           
             
            
          </div>

          {/* ─────────────────────────────────────────────────────────
              PANEL 3 — Key icon (top-right, dark green)
              IMAGE PLACEHOLDER 2:
              Replace the src below with your key/logo icon image.
              e.g.  src="/assets/key-icon-white.svg"
                 or src="/assets/logo-white.svg"
              This is the white OgaLandlord key icon on dark green bg.
          ───────────────────────────────────────────────────────── */}
          <div
            style={{
              gridColumn: "3 / 4",
              gridRow: "1 / 2",
              background: "#014421",
              borderRadius: 16,
              display: "flex",
              marginLeft: "-23px",
              alignItems: "center",
              width: "110%",
              justifyContent: "center",
              minHeight: 160,
              position: "relative",
            }}
          >
            <img
              src="/assets/housekey.png"
              /* ↑ PLACEHOLDER 2: white key/logo icon, e.g. /assets/key-icon-white.svg */
              alt="OgaLandlord icon"
              style={{ width: 80, height: 80, objectFit: "contain" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
           
            
          </div>

          {/* ─────────────────────────────────────────────────────────
              PANEL 4 — Bottom-wide dark green panel (spans cols 2–3)
              Contains:
                • Left side: PANEL 5 person portrait photo
                • Right side: stacked progress-bar cards + "Upload Gov ID"

              IMAGE PLACEHOLDER 3:
              Replace the src on the <img> inside this panel with
              the cropped portrait/face photo.
              e.g.  src="/assets/person-face.png"
              The image should be a cropped upper-body / face shot.

              IMAGE PLACEHOLDER 4 (optional):
              If you have a screenshot of the step-form, you can swap the
              stacked card UI below for an <img> instead.
              e.g.  src="/assets/step-form-screenshot.png"
          ───────────────────────────────────────────────────────── */}
        
            
            {/* ── Stacked progress-bar cards (PLACEHOLDER 4 area) ── */}
            {/*
             * PLACEHOLDER 4 (optional image replacement):
             * If you'd prefer to use a screenshot image here instead of
             * the coded cards, replace this entire div with:
             *   <img src="YOUR_IMAGE_PATH_4_HERE" ... />
             * e.g. src="/assets/step-form-screenshot.png"
             */}
            <div
              style={{
                flex: 1,
                gridColumn: "2 / 4",
                gridRow: "2 / 3",
                background: "#014421",
                borderRadius: 16,
                gap: 20,
                display: "flex",
                alignItems: "flex-end",
                padding: "24px 24px 0",
                position: "relative",
                overflow: "hidden",
              }}
            >
                <img src="/assets/frame1.png"
                style={{ width: "100%", height: "95%", display:"block" }}
                />

              </div>
            </div>
            
          

        
        {/* ── END hero grid ── */}

      </section>
      {/* ════════ END HERO SECTION ════════ */}

      {/* ── Why OgaLandlord ── */}
      <section style={{ padding: "80px 40px", background: " #f2fdf5" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: "#014421", marginBottom: 8 }}>
            Why Oga<span style={{ fontWeight: 400 }}>Landlord</span>
          </h2>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 48, maxWidth: 360 }}>
            We remove the guesswork from house hunting by verifying agents and
            protecting tenants at every step.
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[
              {
                icon: "/assets/icons/icon2.png",
                title: "Verified Agents",
                desc: "Every agent is checked for identity, location, and rental history before approval.",
              },
              {
                icon: "/assets/icons/icon1.png",
                title: "Trust Scores",
                desc: "Agents earn trust scores based on verification status and tenant feedback.",
              },
              {
                icon: "/assets/icons/icon3.png",
                title: "Community Reporting",
                desc: "Real reports from tenants help flag fake agents and risky listings early.",
              },
            ].map((item, index) => (
              <div
                key={index}
                style={{
              flex: "1 1 280px",
              background: "#ffffff",
              borderRadius: 16,
              padding: "28px 28px 28px",
              border: "1px solid #e5e7eb",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 240,
                }}
              >
                
                  <img 
        src={item.icon} 
        alt={item.title} // Crucial for accessibility
        style={{ width: 48, height: 48, marginBottom: 20 }} // Added size and spacing
      />
                <div>
                <h4 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 8 }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.65 }}>{item.desc}</p>
              </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
<section style={{ padding: "80px 70px", background: "#f0faf4" }}>
  <div style={{ maxWidth: 1100, margin: "0 auto" }}>
    <h2 style={{ fontSize: 26, fontWeight: 900, color: "#111827", marginBottom: 8 }}>
      How It Works
    </h2>
    <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 48, maxWidth: 365 }}>
      Follow a clear step-by-step process from agent selection to inspection.
    </p>

    <div style={{ display: "flex", gap: 64, flexWrap: "wrap", alignItems: "flex-start" }}>

      {/* Left — Photo with caption overlay */}
      <div
        style={{
          height: 460,
          width: 560,
          borderRadius: 20,
          overflow: "hidden",
          position: "relative",
          background: "#a7f3d0",
        }}
      >
        <img
          src="/assets/how-it-works.png"
          alt="How OgaLandlord works"
          style={{ width: "130%", height: "100%", objectFit: "cover" }}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
        {/* Caption overlay at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "rgba(176, 176, 176, 0.45)",
            backdropFilter: "blur(2px)",
            padding: "20px 24px",
            margin: 16,
            borderRadius: 12,
          }}
        >
          <p style={{ color: "#fff", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            Tour properties with verified agents and avoid the risks that come with
            unverified listings.
          </p>
        </div>
      </div>

      {/* Right — Steps */}
      <div style={{ flex: 1, minWidth: 280 }}>
        {[
          {
            num: "01",
            title: "Agent Verification",
            desc: "Agents earn trust scores based on verification status and tenant feedback.",
          },
          {
            num: "02",
            title: "Listings Upload",
            desc: "Verified agents upload and manage their rental listings on the platform.",
          },
          {
            num: "03",
            title: "Safe Contact",
            desc: "Tenants connect with verified agents and inspect properties before any payment.",
          },
        ].map((step) => (
          <div
            key={step.num}
            style={{
              paddingBottom: 32,
              marginBottom: 32,
              borderBottom: "1px solid #d1fae5",
            }}
          >
            {/* Step number */}
            <p
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#6b7280",
                marginBottom: 12,
                margin: "0 0 10px 0",
              }}
            >
              {step.num}
            </p>
            {/* Title */}
            <h3
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: "#014421",
                marginBottom: 8,
                margin: "0 0 8px 0",
              }}
            >
              {step.title}
            </h3>
            {/* Description */}
            <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.65, margin: 0 }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  </div>
</section>

      {/* ── Have a property to rent ── */}
      <section style={{ padding: "70px 50px", background: "#f2fdf5" }}>
        <div
          style={{
            padding: "90px 50px",
            maxWidth: 1200,
            maxHeight: 2500,
            margin: "0 auto",
            display: "flex",
            gap: 48,
            alignItems: "center",
            flexWrap: "wrap",
            background: "#ffffff",
            position: "relative"
          }}
        >
          <div style={{ flex: 1, minWidth: 280 }}>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: "#014421", marginBottom: 12, lineHeight: 1.25 }}>
              Have a Property to Rent?
              <br />
              Let Verified Agents Handle It.
            </h2>
            <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 20, lineHeight: 1.7, width: "90%" }}>
              Connect with verified rental agents who can manage inspections,
              tenant sourcing, and negotiations—without the stress or uncertainty.
            </p>
            <ul style={{ paddingLeft: 0, listStyle: "none", marginBottom: 28 }}>
              {[
                "Verified and accountable agents",
                "Transparent rental process",
                "Reduced risk of disputes and scams",
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    fontSize: 13,
                    color: "#374151",
                    marginBottom: 8,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ color: "#014421", fontSize: 16 }}>•</span> {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate("/AgentList")}
              style={{
                padding: "12px 43px",
                background: "#014421",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Find a Verified Agent
            </button>
          </div>
          {/* Property image — no numbered placeholder, use any interior/exterior */}
          <div
            style={{
              flex: "0 0 600px",
              height: 370,
              width: 700,
              borderRadius: 20,
              overflow: "hidden",
              position: "relative",
              background: "#a7f3d0",
            }}
          >
            <img
              src="/assets/verifiedagents.png"
              alt="Property"
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>
        </div>
      </section>

      {/* ── Are You a Real Estate Agent? ── */}
       <section style={{ padding: "80px 40px", background: "#f2fdf5" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 33, fontWeight: 630, color: "#014421", marginBottom: 8, textAlign: "center" }}>
            Are You a Real Estate Agent?
          </h2>

          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginTop: 50 }}>
            <div
              style={{
                flex: "0 0 430px",
                borderRadius: 16,
                height: 310,
                width: 800,
                overflow: "hidden",
                position: "relative",
                background: "#fff",
              }}
            >
              <img
                src="/assets/agent1.png"
                alt="Agent"
                style={{
                  width: "120%",
                  height: "110%",
                  objectFit: "contain",
                  display: "block",
                  marginTop: "-80px",
                  marginBottom: "-16px",
                }}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.40, marginLeft: "5px" }}>
                Join thousands of verified agents building trust with clients. Create your professional profile and showcase your expertise today.
              </p>
            </div>

            <div
              style={{
                flex: 1,
                minWidth: 200,
                background: "#fff",
                borderRadius: 16,
                padding: "28px 20px",
                height: 310,
                border: "1px solid #e5e7eb",
              }}
            >
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "#014421", marginBottom: 40, width: "200px" }}>
                Increase Your Visibility
              </h3>
              <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.65, marginTop: 150 }}>
                Show up where serious buyers and sellers are actively searching for trusted agents.
              </p>
            </div>

            <div
              style={{ flex: 1, minWidth: 200, background: "#014421", borderRadius: 16, padding: "28px 24px", height: 310 }}
            >
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 40, width: "180px", }}>
                Build Instant Trust
              </h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.65, marginTop: 150 }}>
                Stand out with a verified, credible profile that reassures clients before the first conversation.
              </p>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <button
              onClick={() => navigate("/agent")}
              style={{
                padding: "12px 44px",
                background: "#014421",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: "0 4px 16px rgba(1,68,33,0.25)",
              }}
            >
              Register as an Agent
            </button>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <TestimonialCarousel />

      {/* ── FAQ ── */}
      <FAQSection />

      <Footer navigate={navigate} />
    </div>
  );
}