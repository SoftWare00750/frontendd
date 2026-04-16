// Listings.tsx — OgaLandlord Verified Rental Listings Page
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FAQSection from "./FAQS";

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

// ── Sample listing data ──────────────────────────────────────────────────────
const LISTINGS = [
  { id: 1, price: "₦800,000", period: "/yr", location: "Lekki Phase 1, Lagos", beds: 2, baths: 2, status: "Available", img: "./../../assets/listings/prop3.png", time: "Listed 2 hours ago" },
  { id: 2, price: "₦800,000", period: "/yr", location: "Lekki Phase 1, Lagos", beds: 3, baths: 2, status: "Rented",    img: "./../../assets/listings/prop4.png", time: "Listed 2 hours ago" },
  { id: 3, price: "₦800,000", period: "/yr", location: "Lekki Phase 1, Lagos", beds: 3, baths: 3, status: "Available", img: "./../../assets/listings/prop5.png", time: "Listed 2 hours ago" },
  { id: 4, price: "₦800,000", period: "/yr", location: "Lekki Phase 1, Lagos", beds: 2, baths: 3, status: "Available", img: "./../../assets/listings/prop6.png", time: "Listed 2 hours ago" },
  { id: 5, price: "₦800,000", period: "/yr", location: "Lekki Phase 1, Lagos", beds: 3, baths: 3, status: "Rented",    img: "./../../assets/listings/prop7.png", time: "Listed 2 hours ago" },
  { id: 6, price: "₦800,000", period: "/yr", location: "Lekki Phase 1, Lagos", beds: 3, baths: 3, status: "Available", img: "./../../assets/listings/prop8.png", time: "Listed 2 hours ago" },
];

const FEATURED = [
  {
    id: 10, title: "Ring road, Ibadan",
    desc: "Located in Harmony Gardens Estate, Ring Road, Ibadan, this modern 2 bedroom apartment offers comfort, accessibility, and a calm neighborhood for everyday living.",
    beds: 4, baths: 3, type: "Villa", price: "₦2,000,000", period: "/yr",
    img1: "./../../assets/featured/feat1.png", img2: "./../../assets/featured/feat1.png",
  },
];


function StatusBadge({ status }: { status: string }) {
  const isAvail = status === "Available";
  return (
    <span style={{
      background: isAvail ? "#d1fae5" : "#fee2e2",
      color: isAvail ? "#065f46" : "#991b1b",
      fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20,
    }}>{status}</span>
  );
}

function BedBath({ beds, baths }: { beds: number; baths: number }) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
      <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#6b7280" }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/><path d="M4 10V6a2 2 0 012-2h12a2 2 0 012 2v4" stroke="#9ca3af" strokeWidth="2"/></svg>
        {beds} Beds
      </span>
      <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#6b7280" }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M4 12h16M4 12a4 4 0 018-8M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/></svg>
        {baths} Baths
      </span>
    </div>
  );
}

export default function Listings1() {
  const navigate = useNavigate();
  // const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [search, setSearch] = useState("");
  // const [email, setEmail] = useState("");
  const [featPage, setFeatPage] = useState(0);

  return (
    <div
      style={{
        fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif",
        color: "#111827",
        background: "#f9fafb",
      }}
    >
      <style>{mobileStyles}</style>
      {/* ── Navbar ── */}
      <Navbar />

      {/* ── Page header ── */}
      <section className="p-4" style={{ background: "#fff" }}>
        <div style={{ margin: "0 auto" }}>
          <h1 className="text-green-700"
            style={{
              fontSize: "clamp(22px,3vw,36px)",
              fontWeight: 900,
              marginBottom: 6,
            }}
          >
            Verified Rental Listings
          </h1>
          <p style={{ fontSize: 16, color: "#6b7280", marginBottom: 28 }}>
            All listings are managed by verified agents to help reduce scams.
          </p>
          {/* Hero image */}
          <div
            style={{
              width: "100%",
              height: 560,
              borderRadius: 16,
              background: "linear-gradient(135deg,#f0fdf4,#d1fae5)",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 72,
              marginBottom: 32,
            }}
          >
            <img
              src="./../../assets/listings/listings-hero.png"
              alt="Listings hero"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Search / Filter bar ── */}
      <section className="p-5" style={{ background: "#fff" }}>
        <div style={{ margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "center",
              background: "#f9fafb",
              borderRadius: 12,
              padding: "12px 16px",
              border: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                flex: 1,
                minWidth: 200,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="10"
                  cy="10"
                  r="7"
                  stroke="#9ca3af"
                  strokeWidth="2"
                />
                <path
                  d="M15 15l5 5"
                  stroke="#9ca3af"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="search location..."
                style={{
                  border: "none",
                  background: "none",
                  outline: "none",
                  fontSize: 14,
                  fontFamily: "inherit",
                  flex: 1,
                }}
              />
            </div>
            <button
              style={{
                padding: "8px 18px",
                background: "#1a4d2e",
                color: "#fff",
                border: "none",
                borderRadius: 7,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Submit
            </button>
            {["All Types", "Price", "Bedroom", "Bathroom"].map((f) => (
              <button
                key={f}
                style={{
                  padding: "8px 14px",
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 7,
                  fontSize: 13,
                  color: "#374151",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "inherit",
                }}
              >
                {f}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="#9ca3af"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Listings grid ── */}
      <section className="p-5" style={{ background: "#fff" }}>
        <div style={{ margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {LISTINGS.map((listing) => (
              <div
                key={listing.id}
                onClick={() => navigate(`/listings/${listing.id}`)}
                style={{
                  background: "#fff",
                  borderRadius: 16,
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
                  ((e.currentTarget as HTMLDivElement).style.boxShadow = "none")
                }
              >
                {/* Listing image */}
                <div
                  style={{
                    width: "100%",
                    height: 180,
                    background: "linear-gradient(135deg,#d1fae5,#6ee7b7)",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 40,
                  }}
                >
                  <img
                    src={listing.img}
                    alt="Property"
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
                      fontSize: 10,
                      padding: "3px 8px",
                      borderRadius: 20,
                    }}
                  >
                    {listing.time}
                  </div>
                </div>

                <div style={{ padding: "14px 16px" }}>
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
                        fontSize: 16,
                        fontWeight: 800,
                        color: "#111827",
                      }}
                    >
                      {listing.price}
                      <span
                        style={{
                          fontSize: 12,
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
                      marginBottom: 10,
                    }}
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
                      {listing.location}
                    </span>
                  </div>
                  <BedBath beds={listing.beds} baths={listing.baths} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Properties ── */}
      <section className="p-5" style={{background: "#f9fafb" }}>
        <div style={{  margin: "0 auto" }}>
          <h2 className="text-green-700"
            style={{
              fontSize: 24,
              fontWeight: 900,
              marginBottom: 24,
            }}
          >
            Featured Properties
          </h2>

          {FEATURED.map((feat) => (
            <div
              key={feat.id}
              className="grid grid-cols-1 gap-3 md:grid-cols-3"
              style={{
                background: "#fff",
                borderRadius: 16,
                border: "1px solid #e5e7eb",
                overflow: "hidden",
              }}
            >
              {/* Left images */}
              <div
                style={{
                  flex: "0 0 220px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    background: "linear-gradient(135deg,#d1fae5,#a7f3d0)",
                    minHeight: 160,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 40,
                  }}
                >
                  <img
                    src={feat.img1}
                    alt="Featured"
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
              </div>

              {/* Details */}
              <div style={{ flex: 1, padding: "24px", minWidth: 200 }}>
                <h3 className="text-green-700"
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                   
                    marginBottom: 8,
                  }}
                >
                  {feat.title}
                </h3>
                <p
                  style={{
                    fontSize: 16,
                    color: "#6b7280",
                    lineHeight: 1.65,
                    marginBottom: 20,
                  }}
                >
                  {feat.desc}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    marginBottom: 20,
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ fontSize: 12, color: "#374151" }}>
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{ verticalAlign: "middle", marginRight: 4 }}
                    >
                      <path
                        d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8"
                        stroke="#6b7280"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M4 10V6a2 2 0 012-2h12a2 2 0 012 2v4"
                        stroke="#6b7280"
                        strokeWidth="2"
                      />
                    </svg>
                    {feat.beds}-Bedroom
                  </span>
                  <span style={{ fontSize: 12, color: "#374151" }}>
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{ verticalAlign: "middle", marginRight: 4 }}
                    >
                      <path
                        d="M4 12h16M4 12a4 4 0 018-8M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6"
                        stroke="#6b7280"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    {feat.baths}-Bathroom
                  </span>
                  <span style={{ fontSize: 12, color: "#374151" }}>
                    🏠 {feat.type}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <div>
                    <p style={{ fontSize: 10, color: "#9ca3af", margin: 0 }}>
                      Price
                    </p>
                    <p
                      style={{
                        fontSize: 16,
                        fontWeight: 800,
                        color: "#111827",
                      }}
                    >
                      {feat.price}
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 400,
                          color: "#9ca3af",
                        }}
                      >
                        {feat.period}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/listings/${feat.id}`)}
                    style={{
                      padding: "10px 18px",
                      background: "#1a4d2e",
                      color: "#fff",
                      border: "none",
                      borderRadius: 7,
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    View Property Details
                  </button>
                </div>
              </div>

              {/* Right image */}
              <div
                style={{
                  flex: "0 0 240px",
                  background: "linear-gradient(135deg,#1a4d2e,#2d7a4f)",
                  minHeight: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 40,
                }}
              >
                <img
                  src={feat.img2}
                  alt="Featured 2"
                  
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <span style={{ fontSize: 13, color: "#6b7280" }}>01 of 10</span>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setFeatPage(Math.max(0, featPage - 1))}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: "1.5px solid #e5e7eb",
                  background: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ←
              </button>
              <button
                onClick={() => setFeatPage(featPage + 1)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: "none",
                  background: "#1a4d2e",
                  color: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      {/* <section style={{ background: "#fff", padding: "80px 40px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            gap: 80,
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "0 0 260px" }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: "#111827",
                marginBottom: 12,
              }}
            >
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65 }}>
              If there are question you want to ask. We will answer all your
              question.
            </p>
          </div>
          <div style={{ flex: 1, minWidth: 280 }}>
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
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
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
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <div
                    style={{
                      padding: "0 20px 18px",
                      fontSize: 13,
                      color: "#6b7280",
                      lineHeight: 1.65,
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section> */}
<FAQSection />
      {/* ── Footer ── */}
      <Footer navigate={navigate} />
    </div>
  );
}