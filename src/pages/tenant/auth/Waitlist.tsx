// Waitlist.tsx — OgaLandlord Waitlist Page — Responsive Mobile
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"
import { ArrowRight } from "lucide-react";

const mobileStyles = `
  @media (max-width: 768px) {
    .wl-header {
      height: 52px !important;
      padding: 0 16px !important;
      justify-content: center !important;
    }

    .wl-hero-section {
      padding: 32px 16px 0 !important;
      text-align: left !important;
    }
    .wl-hero-h1 {
      font-size: 26px !important;
      margin-bottom: 12px !important;
    }
    .wl-hero-p {
      font-size: 14px !important;
      margin-bottom: 24px !important;
    }
    .wl-waitlist-input-row {
      max-width: 100% !important;
      margin: 0 0 16px !important;
      flex-direction: row !important;
    }
    .wl-waitlist-input {
      flex: 1 !important;
      font-size: 13px !important;
      padding: 12px 20px !important;
    }
    .wl-waitlist-btn {
      padding: 12px 16px !important;
      font-size: 13px !important;
      white-space: nowrap !important;
    }
    .wl-hero-count {
      font-size: 12px !important;
      margin-bottom: 32px !important;
    }
    .wl-hero-grid {
      grid-template-columns: 1fr !important;
      grid-template-rows: auto !important;
      gap: 10px !important;
    }
    .wl-grid-panel1 {
      grid-column: 1/2 !important;
      grid-row: 1/2 !important;
      min-height: 200px !important;
      border-radius: 12px !important;
    }
    .wl-grid-panel2 {
      grid-column: 1/2 !important;
      grid-row: 2/3 !important;
      width: 100% !important;
      height: 140px !important;
      margin: 0 !important;
    }
    .wl-grid-panel3 { display: none !important; }
    .wl-grid-panel4 {
      grid-column: 1/2 !important;
      grid-row: 3/4 !important;
      height: 140px !important;
      border-radius: 12px !important;
      padding: 12px 12px 0 !important;
    }

    .wl-why-section {
      padding: 40px 16px !important;
    }
    .wl-why-h2 { font-size: 22px !important; }
    .wl-why-cards {
      flex-direction: column !important;
      gap: 16px !important;
    }
    .wl-why-card {
      flex: none !important;
      min-height: unset !important;
      padding: 20px !important;
    }

    .wl-howitworks-section {
      padding: 40px 16px !important;
    }
    .wl-howitworks-inner {
      flex-direction: column !important;
      gap: 24px !important;
    }
    .wl-howitworks-img {
      height: 220px !important;
      width: 100% !important;
      border-radius: 12px !important;
    }

    .wl-property-section {
      padding: 32px 16px !important;
    }
    .wl-property-inner {
      padding: 24px 16px !important;
      flex-direction: column !important;
      gap: 24px !important;
    }
    .wl-property-h2 { font-size: 22px !important; }
    .wl-property-img {
      flex: none !important;
      width: 100% !important;
      height: 200px !important;
    }
    .wl-property-btn { width: 100% !important; }

    .wl-agent-section {
      padding: 40px 16px !important;
    }
    .wl-agent-cards {
      flex-direction: column !important;
      gap: 16px !important;
    }
    .wl-agent-card {
      flex: none !important;
      width: 100% !important;
      height: auto !important;
      min-height: 160px !important;
    }
    .wl-agent-btn-row {
      text-align: center !important;
    }
    .wl-agent-btn {
      width: 100% !important;
      max-width: 280px !important;
    }

    .wl-faq-section {
      padding: 40px 16px !important;
    }
    .wl-faq-inner {
      flex-direction: column !important;
      gap: 24px !important;
    }
    .wl-faq-left { flex: none !important; width: 100% !important; }

    .wl-footer-inner {
      padding: 32px 16px 0 !important;
    }
    .wl-footer-top {
      flex-direction: column !important;
      gap: 24px !important;
      margin-bottom: 32px !important;
    }
    .wl-footer-newsletter input {
      width: 200px !important;
    }
    .wl-footer-watermark {
      font-size: clamp(36px, 12vw, 80px) !important;
    }
  }
`;

function Logo() {
  return (
    <div className="" style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
      <img src="/assets/logo.svg" alt="OgaLandlord" style={{ height: 40, objectFit: "contain" }}
        onError={(e) => { e.currentTarget.style.display = "none"; (e.currentTarget.nextSibling as HTMLElement).style.display = "flex"; }} />
      <div style={{ display: "none", alignItems: "center", gap: 4, width: 34, height: 34, borderRadius: 8, background: "#014421", justifyContent: "center" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="9" r="6" stroke="white" strokeWidth="2" />
          <path d="M13 13l5 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer style={{ background: "#014421", color: "#fff" }}>
      <div className="wl-footer-inner px-4" style={{ margin: "0 auto" }}>
        <div
          className="wl-footer-top py-10"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 56,
            flexWrap: "wrap",
            gap: 32,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img
              src="/assets/logo3.png"
              alt="OgaLandlord logo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                maxWidth: 180,
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <div className="wl-footer-newsletter">
            <p
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.8)",
                marginBottom: 12,
              }}
            >
              Subscribe to our newsletter
            </p>
            <div style={{ display: "flex" }}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  padding: "11px 18px",
                  borderRadius: "50px 50px 50px 50px",
                  border: "none",
                  fontSize: 14,
                  outline: "none",
                  width: 280,
                  background: "#fff",
                  color: "#111827",
                  fontFamily: "inherit",
                }}
              />
              <button
                style={{
                  padding: "3px 13px",
                  background: "#014421",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderLeft: "none",
                  borderRadius: "50px 50px 50px 50px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "-44px",
                  transform: "scale(0.9)",
                  transformOrigin: "center",
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
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.93)",
            paddingTop: 24,
            paddingBottom: 8,
          }}
        >
          <p
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.4)",
              textAlign: "left",
            }}
          >
            © COPYRIGHT 2026 OGALANDLORD
          </p>
        </div>
        <div
          className="wl-footer-watermark"
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

const FAQS = [
  { q: 'What does "Verified Agent" mean?', a: "A verified agent has passed our identity checks, location confirmation, and activity review. Only agents who meet our verification standards are allowed to list properties on the platform." },
  { q: "Are all properties on this platform real?", a: "Yes. All listings are submitted by verified agents who have undergone our thorough verification process." },
  { q: "Do I need to pay before inspection?", a: "No. We advise against paying any money before physically inspecting a property." },
  { q: "Can I report a suspicious agent or listing?", a: "Yes. Use the report button on any agent profile or listing page to flag suspicious activity." },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="wl-faq-section px-4 py-20" style={{ background: "#f2fdf5", padding: "" }}>
      <div className="wl-faq-inner" style={{ margin: "0 auto", display: "flex", gap: 80, flexWrap: "wrap" }}>
        <div className="wl-faq-left" style={{ flex: "0 0 280px" }}>
          <h2 className="text-green-700" style={{ fontSize: 28, fontWeight: 900, marginBottom: 12 }}>Frequently Asked Questions</h2>
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

function WaitlistHero() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoin = () => { if (email.trim()) setJoined(true); };

  return (
    <section className=" px-4 text-center bg-[#f0faf4]">
      <div className="">
        <h1
          className="font-bold lg:pt-38 pt-26"
          style={{
            fontSize: "clamp(28px,4vw,48px)",
            fontWeight: 600,
            color: "#014421",
            lineHeight: 1.2,
            marginBottom: 16,
          }}
        >
          A Safer Way to Rent Is
          <br />
          Launching Soon
        </h1>
        <p
          className="font-medium"
          style={{ fontSize: 15, color: "#6b7280", marginBottom: 32 }}
        >
          Be the first to access verified listings, trusted agents, and tools
          designed to help you avoid rental scams.
        </p>

        {joined ? (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#014421",
              color: "#fff",
              borderRadius: 10,
              padding: "14px 28px",
              fontSize: 20,
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13l4 4L19 7"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            You're on the list!
          </div>
        ) : (
          <div
            className="wl-waitlist-input-row"
            style={{
              display: "flex",
              gap: 0,
              justifyContent: "center",
              marginBottom: 16,
              maxWidth: 460,
              margin: "0 auto 16px",
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleJoin()}
              placeholder="Enter Your Email"
              className=" border border-gray-300 p-2 px-6 rounded-full w-full text-[16px] bg-white  "
            />
            <button
              onClick={handleJoin}
              className="wl-waitlist-btn"
              style={{
                padding: "13px 22px",
                background: "#014421",
                color: "#fff",
                border: "none",
                borderRadius: "50px 50px 50px 50px",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                gap: 8,
                whiteSpace: "nowrap",
                marginLeft: "-90px",
              }}
            >
              Join Waitlist
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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
        )}

        <p
          className="wl-hero-count"
          style={{ fontSize: 13, color: "#9ca3af", marginBottom: 48 }}
        >
          80 People Joined
        </p>

        <Link to="/Home">
          <button
            onClick={handleJoin}
            className=" m-auto bg-green-700 p-2 flex gap-2 mb-2 items-center text-white font-medium rounded-lg"
          >
            Home
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M12 5l7 7-7 7"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Link>
      </div>

      {/* Hero grid */}
      <div
        className=" wl-hero-grid "
        style={{
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "42fr 33fr 25fr",
          gridTemplateRows: "auto auto",
          gap: 12,
        }}
      >
        <div
          className="wl-grid-panel1"
          style={{
            gridColumn: "1 / 2",
            gridRow: "1 / 3",
            borderRadius: 16,
            overflow: "hidden",
            minHeight: 440,
            position: "relative",
            background: "#b6dfc4",
          }}
        >
          <img
            src="/assets/hero-house.png"
            alt="Nigerian house exterior"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
        <div
          className="wl-grid-panel2"
          style={{
            gridColumn: "2 / 3",
            gridRow: "1 / 2",
            background: "#014421",
            borderRadius: 13,
            height: "96%",
            width: "92%",
            marginTop: "6px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 11,
          }}
        >
          <img
            src="/assets/frame2.png"
            alt="Agent verification notifications"
            style={{
              width: "100%",
              height: "110%",
              objectFit: "contain",
              display: "block",
            }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
        <div
          className="wl-grid-panel3"
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
            alt="OgaLandlord icon"
            style={{ width: 80, height: 80, objectFit: "contain" }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
        <div
          className="wl-grid-panel4"
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
          <img
            src="/assets/frame1.png"
            style={{ width: "100%", height: "95%", display: "block" }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default function Waitlist() {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen"
      style={{
        fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif",
        color: "#111827",
      }}
    >
      <style>{mobileStyles}</style>

      {/* Header */}
      <header
        className="border-b border-gray-300 lg:p-10 p-5 bg-[#f2fdf5] flex justify-center fixed top-0 z-50 w-full "
       
      >
        <div onClick={() => navigate("/Home")} style={{ cursor: "pointer" }}>
          <Logo />
        </div>
      </header>

      <WaitlistHero />

      {/* WHY */}
      <section className="px-4 bg-[#f0faf4] ">
        <div className=" pt-20">
          <h2
            className="wl-why-h2"
            style={{
              fontSize: 30,
              fontWeight: 900,
              color: "#014421",
              marginBottom: 8,
            }}
          >
            Why Oga<span style={{ fontWeight: 400 }}>Landlord</span>
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#6b7280",
              marginBottom: 48,
              maxWidth: 360,
            }}
          >
            We remove the guesswork from house hunting by verifying agents and
            protecting tenants at every step.
          </p>
          <div
            className="wl-why-cards gap-3"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
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
            ].map((item, i) => (
              <div
                className="wl-why-card"
                key={i}
                style={{
                  flex: "1 1 280px",
                  background: "#ffffff",
                  borderRadius: 16,
                  padding: "28px 28px",
                  border: "1px solid #e5e7eb",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 240,
                }}
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  style={{ width: 48, height: 48 }}
                />
                <div>
                  <h4 className="text-green-700"
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      marginBottom: 8,
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.65 }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className=" p-4 pt-20" style={{ background: "#f0faf4" }}>
        <div className="">
          <h2 className="text-green-700 mb-4 text-[28px] font-bold ">
            How It Works
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "#6b7280",
              marginBottom: 48,
              maxWidth: 365,
            }}
          >
            Follow a clear step-by-step process from agent selection to
            inspection.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 ">
            <div className="overflow-hidden rounded-lg overflow-hidden relative ">
              <img
                src="/assets/how-it-works.png"
                alt="How OgaLandlord works"
                style={{ width: "130%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
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
                <p
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  Tour properties with verified agents and avoid the risks that
                  come with unverified listings.
                </p>
              </div>
            </div>
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
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#6b7280",
                      margin: "0 0 10px 0",
                    }}
                  >
                    {step.num}
                  </p>
                  <h3
                    className="mt-10 text-green-700"
                    style={{
                      fontSize: 20,
                      fontWeight: 500,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-5"
                    style={{
                      fontSize: 16,
                      color: "#6b7280",
                      lineHeight: 1.65,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HAVE A PROPERTY */}
      <section className=" bg-[#f2fdf5] px-4 pt-20">
        <div className="  bg-[#fff] rounded-lg p-4 grid lg:grid-cols-2 gap-5  grid-cols-1 items-center ">
          <div className="  flex flex-col ">
            <h2
              className="text-green-700"
              style={{
                fontSize: 28,
                fontWeight: 700,
                marginBottom: 12,
                lineHeight: 1.25,
              }}
            >
              Have a Property to Rent?
              <br />
              Let Verified Agents Handle It.
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "#6b7280",
                marginBottom: 20,
                lineHeight: 1.7,
                width: "90%",
              }}
            >
              Connect with verified rental agents who can manage inspections,
              tenant sourcing, and negotiations—without the stress or
              uncertainty.
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
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ color: "#014421", fontSize: 16 }}>•</span>{" "}
                  {item}
                </li>
              ))}
            </ul>
            <button
              className="flex items-center gap-3 bg-green-900 px-10 py-2 rounded-lg text-white w-fit text-md text-center"
              onClick={() => navigate("/Waitlist")}
            >
              Join Waitlist
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="wl-property-img  rounded-lg relative bg-[#a7f3d0] overflow-hidden ">
            <img
              src="/assets/verifiedagents.png"
              alt="Property"
              className=" w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>
      </section>

      {/* ARE YOU AN AGENT */}
      <section className="bg-[#f2fdf5] px-4 pt-20 text-green-700">
        <div>
          <h2
            style={{
              fontSize: 33,
              fontWeight: 630,
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            Are You a Real Estate Agent?
          </h2>
          <div
            className="wl-agent-cards"
            style={{
              display: "flex",
              gap: 24,
              flexWrap: "wrap",
              marginTop: 50,
            }}
          >
            <div
              className="wl-agent-card"
              style={{
                flex: "0 0 430px",
                borderRadius: 16,
                height: 310,
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
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <p
                className="px-2 pb-3"
                style={{
                  fontSize: 16,
                  color: "#6b7280",
                }}
              >
                Join thousands of verified agents building trust with clients
                Create your professional profile and showcase your expertise
                today.
              </p>
            </div>
            <div
              className="flex  justify-between flex-col "
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
              <h3
                className="text-green-700"
                style={{
                  fontSize: 30,
                  fontWeight: 500,
                  marginBottom: 40,
                }}
              >
                Increase Your <br /> Visibility
              </h3>
              <p className="text-gray-500 text-[16px]">
                Show up where serious buyers and sellers are actively searching
                for trusted agents.
              </p>
            </div>
            <div
              className="flex  justify-between flex-col"
              style={{
                flex: 1,
                minWidth: 200,
                background: "#014421",
                borderRadius: 16,
                padding: "28px 24px",
                height: 310,
              }}
            >
              <h3
                style={{
                  fontSize: 30,
                  fontWeight: 500,
                  color: "#fff",
                  marginBottom: 40,
                }}
              >
                Build Instant Trust
              </h3>
              <p
                style={{
                  fontSize: 16,
                  color: "rgb(255, 255, 255)",
                  lineHeight: 1.65,
                }}
              >
                Stand out with a verified, credible profile that reassures
                clients before the first conversation.
              </p>
            </div>
          </div>
          <div
            className="wl-agent-btn-row"
            style={{ textAlign: "center", marginTop: 36 }}
          >
            <button
              className="wl-agent-btn flex items-center justify-center m-auto px-10 py-2"
              onClick={() => navigate("/Waitlist")}
              style={{
                background: "#014421",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: "0 4px 16px rgba(1,68,33,0.25)",
                gap: 8,
              }}
            >
              Join Waitlist
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <FAQSection />
      <Footer />
    </div>
  );
}