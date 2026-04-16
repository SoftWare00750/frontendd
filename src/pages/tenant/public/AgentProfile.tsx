// AgentProfile.tsx — OgaLandlord Agent Profile Page
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import Footer from "./Footer";
import ReportModal from "./ReportModal";
import Navbar from "./Navbar";
// import { AGENTS } from "../../../data/agents";

const AGENT_LISTINGS = [
  {
    id: 1,
    price: "₦800,000",
    period: "/yr",
    location: "Lekki Phase 1, Lagos",
    beds: 2,
    baths: 2,
    status: "Rented",
    img: "/assets/lisiings/prop1.png",
    time: "Listed 2 hours ago",
  },
  {
    id: 2,
    price: "₦800,000",
    period: "/yr",
    location: "Lekki Phase 1, Lagos",
    beds: 2,
    baths: 2,
    status: "Available",
    img: "/assets/lisiings/prop1.png",
    time: "Listed 2 hours ago",
  },
  {
    id: 3,
    price: "₦800,000",
    period: "/yr",
    location: "Lekki Phase 1, Lagos",
    beds: 2,
    baths: 2,
    status: "Rented",
    img: "/assets/lisiings/prop2.png",
    time: "Listed 2 hours ago",
  },
  {
    id: 4,
    price: "₦800,000",
    period: "/yr",
    location: "Lekki Phase 1, Lagos",
    beds: 2,
    baths: 2,
    status: "Available",
    img: "/assets/lisiings/prop1.png",
    time: "Listed 2 hours ago",
  },
];

const TRUST_SCORES = [
  { label: "Response Time", value: 95 },
  { label: "Transaction Success", value: 92 },
  { label: "Client Satisfaction", value: 98 },
];
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

function StatusBadge({ status }: { status: string }) {
  const isAvail = status === "Available";
  return (
    <span
      style={{
        background: isAvail ? "#d1fae5" : "#fee2e2",
        color: isAvail ? "#065f46" : "#991b1b",
        fontSize: 10,
        fontWeight: 700,
        padding: "3px 8px",
        borderRadius: 20,
      }}
    >
      {status}
    </span>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div
      style={{
        height: 6,
        background: "#e5e7eb",
        borderRadius: 3,
        overflow: "hidden",
        marginTop: 6,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${value}%`,
          background: "linear-gradient(90deg,#1a4d2e,#2d7a4f)",
          borderRadius: 3,
        }}
      />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AgentProfile() {
  const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  const [showReport, setShowReport] = useState(false);

  return (
    <div className="h-screen bg-[#f9fafb] text-[#111827]"
     
    >
      <style>{mobileStyles}</style>
      <Navbar />
      {/* ── Report Modal ── */}
      {showReport && (
        <ReportModal
          agentName="Gbenga Yinka"
          onClose={() => setShowReport(false)}
        />
      )}


      {/* ── Profile hero card ── */}
      <section className="px-5 mt-5">
        <div style={{ margin: "0 auto" }}>
          <div className="rounded-lg border border-gray-300 ">
            {/* Top tinted strip */}
            <div
              style={{
                height: 80,
                background: "linear-gradient(135deg,#f0faf4 0%,#d1fae5 100%)",
              }}
            />

            <div style={{ padding: "0 28px 24px", marginTop: -40 }}>
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  alignItems: "flex-end",
                  flexWrap: "wrap",
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: 88,
                    height: 88,
                    borderRadius: 20,
                    border: "4px solid #fff",
                    background: "linear-gradient(135deg,#d1fae5,#a7f3d0)",
                    overflow: "hidden",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 36,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src="./../../assets/agents/agent1.png"
                    alt="Agent"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                {/* Name + meta */}
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 4,
                    }}
                  >
                    <span
                      style={{
                        background: "#d1fae5",
                        color: "#065f46",
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "3px 8px",
                        borderRadius: 20,
                      }}
                    >
                      Verified
                    </span>
                  </div>
                  <h1
                    style={{
                      fontSize: 22,
                      fontWeight: 900,
                      color: "#111827",
                      margin: "0 0 2px",
                    }}
                  >
                    Gbenga Yinka
                  </h1>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#6b7280",
                      margin: "0 0 6px",
                    }}
                  >
                    gbengayinka@gmail.com
                  </p>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <span style={{ color: "#f59e0b", fontSize: 14 }}>★</span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#111827",
                      }}
                    >
                      4.9
                    </span>
                    <span style={{ fontSize: 12, color: "#9ca3af" }}>
                      (183 reviews)
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    marginTop: 16,
                  }}
                >
                  <button
                    style={{
                      padding: "10px 20px",
                      background: "#1a4d2e",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      fontFamily: "inherit",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.49 11.4 19.79 19.79 0 011.42 2.82 2 2 0 013.41 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0121 16l.92.92z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Contact
                  </button>
                  <button
                    style={{
                      padding: "10px 20px",
                      background: "#fff",
                      color: "#374151",
                      border: "1.5px solid #e5e7eb",
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      fontFamily: "inherit",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                        stroke="#6b7280"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <polyline
                        points="22,6 12,13 2,6"
                        stroke="#6b7280"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Message
                  </button>
                </div>
              </div>

              {/* Stats row */}
              <div
                style={{
                  display: "flex",
                  gap: 0,
                  marginTop: 24,
                  borderTop: "1px solid #f3f4f6",
                  paddingTop: 20,
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    flex: 1,
                    minWidth: 150,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "#f0faf4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        stroke="#1a4d2e"
                        strokeWidth="2"
                      />
                      <line
                        x1="16"
                        y1="2"
                        x2="16"
                        y2="6"
                        stroke="#1a4d2e"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <line
                        x1="8"
                        y1="2"
                        x2="8"
                        y2="6"
                        stroke="#1a4d2e"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <line
                        x1="3"
                        y1="10"
                        x2="21"
                        y2="10"
                        stroke="#1a4d2e"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 16,
                        fontWeight: 900,
                        color: "#111827",
                        margin: 0,
                      }}
                    >
                      5+
                    </p>
                    <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>
                      Years Of Experience
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    flex: 1,
                    minWidth: 150,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "#f0faf4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#1a4d2e"
                        strokeWidth="2"
                      />
                      <path
                        d="M12 6v6l4 2"
                        stroke="#1a4d2e"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 16,
                        fontWeight: 900,
                        color: "#111827",
                        margin: 0,
                      }}
                    >
                      100+
                    </p>
                    <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>
                      Deals closed
                    </p>
                  </div>
                </div>

                {/* Report button — far right */}
                <div style={{ marginLeft: "auto" }}>
                  <button
                    onClick={() => setShowReport(true)}
                    style={{
                      padding: "10px 16px",
                      background: "#fff",
                      color: "#ef4444",
                      border: "1.5px solid #fee2e2",
                      borderRadius: 8,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontFamily: "inherit",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#fff5f5")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#fff")
                    }
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"
                        stroke="#ef4444"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <line
                        x1="4"
                        y1="22"
                        x2="4"
                        y2="15"
                        stroke="#ef4444"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    Report Agent
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Score + Active Listings ── */}
      <section className="px-5 mt-10 mb-8">
        <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-5 ">
          {/* Left column: trust score + areas */}
          <div
            style={{
              flex: "0 0 260px",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {/* Trust Score card */}
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: "24px",
                border: "1px solid #e5e7eb",
              }}
            >
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#111827",
                  marginBottom: 20,
                }}
              >
                Trust Score
              </h3>

              {/* Circular score */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 24,
                }}
              >
                <div style={{ position: "relative", width: 80, height: 80 }}>
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      fill="none"
                      stroke="#1a4d2e"
                      strokeWidth="8"
                      strokeDasharray={`${(95 / 100) * 2 * Math.PI * 32} ${2 * Math.PI * 32}`}
                      strokeDashoffset={2 * Math.PI * 32 * 0.25}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 18,
                        fontWeight: 900,
                        color: "#111827",
                        lineHeight: 1,
                      }}
                    >
                      95
                    </span>
                    <span style={{ fontSize: 9, color: "#9ca3af" }}>/100</span>
                  </div>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#1a4d2e",
                      margin: "0 0 2px",
                    }}
                  >
                    Excellent
                  </p>
                  <p style={{ fontSize: 11, color: "#9ca3af" }}>
                    Based on 3 factors
                  </p>
                </div>
              </div>

              {TRUST_SCORES.map((ts) => (
                <div key={ts.label} style={{ marginBottom: 16 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ fontSize: 12, color: "#374151" }}>
                      {ts.label}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#374151",
                      }}
                    >
                      {ts.value}/100
                    </span>
                  </div>
                  <ProgressBar value={ts.value} />
                </div>
              ))}
            </div>

            {/* Areas of Operation */}
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: "20px 24px",
                border: "1px solid #e5e7eb",
              }}
            >
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#111827",
                  marginBottom: 16,
                }}
              >
                Areas of Operation
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {["Challenge, IB", "Akobo, IB"].map((area) => (
                  <div
                    key={area}
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 2C8 2 5 5.5 5 9c0 6 7 13 7 13s7-7 7-13c0-3.5-3-7-7-7z"
                        stroke="#9ca3af"
                        strokeWidth="2"
                      />
                      <circle
                        cx="12"
                        cy="9"
                        r="2.5"
                        stroke="#9ca3af"
                        strokeWidth="2"
                      />
                    </svg>
                    <span style={{ fontSize: 12, color: "#6b7280" }}>
                      {area}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: Active listings */}
          <div style={{ flex: 1, minWidth: 300 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: "#1a4d2e",
                  margin: 0,
                }}
              >
                Active listings
              </h2>
              <span style={{ fontSize: 13, color: "#9ca3af" }}>
                4 properties
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 16,
              }}
            >
              {AGENT_LISTINGS.map((listing) => (
                <div
                  key={listing.id}
                  onClick={() => navigate(`/listings/${listing.id}`)}
                  style={{
                    background: "#fff",
                    borderRadius: 14,
                    border: "1px solid #e5e7eb",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 8px 28px rgba(0,0,0,0.1)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.boxShadow =
                      "none")
                  }
                >
                  {/* Image */}
                  <div
                    style={{
                      width: "100%",
                      height: 160,
                      background: "linear-gradient(135deg,#d1fae5,#6ee7b7)",
                      position: "relative",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 36,
                    }}
                  >
                    <img
                      src={listing.img}
                      alt="Listing"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        position: "absolute",
                        inset: 0,
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />

                    <div
                      style={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        background: "rgba(0,0,0,0.55)",
                        color: "#fff",
                        fontSize: 9,
                        padding: "3px 8px",
                        borderRadius: 20,
                      }}
                    >
                      {listing.time}
                    </div>
                  </div>

                  <div style={{ padding: "12px 14px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 6,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 15,
                          fontWeight: 800,
                          color: "#111827",
                        }}
                      >
                        {listing.price}
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 400,
                            color: "#9ca3af",
                          }}
                        >
                          {listing.period}
                        </span>
                      </span>
                      <StatusBadge status={listing.status} />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        marginBottom: 8,
                      }}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 2C8 2 5 5.5 5 9c0 6 7 13 7 13s7-7 7-13c0-3.5-3-7-7-7z"
                          stroke="#9ca3af"
                          strokeWidth="2"
                        />
                        <circle
                          cx="12"
                          cy="9"
                          r="2.5"
                          stroke="#9ca3af"
                          strokeWidth="2"
                        />
                      </svg>
                      <span style={{ fontSize: 11, color: "#6b7280" }}>
                        {listing.location}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 12 }}>
                      <span
                        style={{
                          fontSize: 11,
                          color: "#6b7280",
                          display: "flex",
                          alignItems: "center",
                          gap: 3,
                        }}
                      >
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8"
                            stroke="#9ca3af"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M4 10V6a2 2 0 012-2h12a2 2 0 012 2v4"
                            stroke="#9ca3af"
                            strokeWidth="2"
                          />
                        </svg>
                        {listing.beds} Beds
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: "#6b7280",
                          display: "flex",
                          alignItems: "center",
                          gap: 3,
                        }}
                      >
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M4 12h16M4 12a4 4 0 018-8M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6"
                            stroke="#9ca3af"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        {listing.baths} Baths
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer navigate={navigate} />
    </div>
  );
}
