// Listings.tsx — OgaLandlord Verified Rental Listings Page
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const FAQS = [
  { q: 'What does "Verified Agent" mean?', a: 'A verified agent has passed our identity checks, location confirmation, and activity review. Only agents who meet our verification standards are allowed to list properties on the platform.' },
  { q: "Are all properties on this platform real?", a: "Yes. All listings are submitted by verified agents." },
  { q: "Do I need to pay before inspection?", a: "No. We advise against paying any money before physically inspecting a property." },
  { q: "Can I report a suspicious agent or listing?", a: "Yes. Use the report button on any listing or agent profile." },
];

// ── Shared ────────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <img src="/./../../assets/logo.svg" alt="OgaLandlord" style={{ height: 32, objectFit: "contain" }}
        onError={(e) => { e.currentTarget.style.display = "none"; }} />
      <span style={{ fontWeight: 900, fontSize: 17, color: "#1a4d2e" }}>OGA</span>
      <span style={{ fontWeight: 400, fontSize: 13, color: "#374151" }}>Landlord</span>
    </div>
  );
}

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

export default function Listings() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [featPage, setFeatPage] = useState(0);

  return (
    <div style={{ fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif", color: "#111827", background: "#f9fafb" }}>

      {/* ── Navbar ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "#fff", borderBottom: "1px solid #e5e7eb",
        padding: "0 40px", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}><Logo /></div>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {[{ label: "About Us", path: "/about" }, { label: "Listings", path: "/listings" }, { label: "Contact", path: "/contact" }].map(({ label, path }) => (
            <button key={label} onClick={() => navigate(path)}
              style={{
                background: "none", border: "none", cursor: "pointer", fontSize: 14,
                fontWeight: path === "/listings" ? 700 : 500,
                color: path === "/listings" ? "#1a4d2e" : "#374151",
                fontFamily: "inherit", padding: 0,
              }}>{label}</button>
          ))}
          <button onClick={() => navigate("/listings")}
            style={{
              background: "#1a4d2e", color: "#fff",
              border: "none", borderRadius: 8, padding: "10px 20px",
              fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
            }}>Get Started</button>
        </div>
      </nav>

      {/* ── Page header ── */}
      <section style={{ background: "#fff", padding: "48px 40px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(22px,3vw,36px)", fontWeight: 900, color: "#1a4d2e", marginBottom: 6 }}>
            Verified Rental Listings
          </h1>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 28 }}>
            All listings are managed by verified agents to help reduce scams.
          </p>
          {/* Hero image */}
          <div style={{
            width: "100%", height: 260, borderRadius: 16,
            background: "linear-gradient(135deg,#f0fdf4,#d1fae5)",
            overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 72, marginBottom: 32,
          }}>
            <img src="./../../assets/listings/listings-hero.png" alt="Listings hero"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }} />
            🛋️
          </div>
        </div>
      </section>

      {/* ── Search / Filter bar ── */}
      <section style={{ background: "#fff", padding: "0 40px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center",
            background: "#f9fafb", borderRadius: 12, padding: "12px 16px",
            border: "1px solid #e5e7eb",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 200 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="10" cy="10" r="7" stroke="#9ca3af" strokeWidth="2"/>
                <path d="M15 15l5 5" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="search location..."
                style={{ border: "none", background: "none", outline: "none", fontSize: 14, fontFamily: "inherit", flex: 1 }}
              />
            </div>
            <button style={{
              padding: "8px 18px", background: "#1a4d2e", color: "#fff",
              border: "none", borderRadius: 7, fontSize: 13, fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit",
            }}>Submit</button>
            {["All Types", "Price", "Bedroom", "Bathroom"].map(f => (
              <button key={f} style={{
                padding: "8px 14px", background: "#fff", border: "1px solid #e5e7eb",
                borderRadius: 7, fontSize: 13, color: "#374151", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit",
              }}>
                {f}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Listings grid ── */}
      <section style={{ padding: "0 40px 60px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 20,
          }}>
            {LISTINGS.map(listing => (
              <div key={listing.id}
                onClick={() => navigate(`/listings/${listing.id}`)}
                style={{
                  background: "#fff", borderRadius: 16,
                  border: "1px solid #e5e7eb", overflow: "hidden",
                  cursor: "pointer", transition: "box-shadow 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.1)"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "none"}
              >
                {/* Listing image */}
                <div style={{
                  width: "100%", height: 180, background: "linear-gradient(135deg,#d1fae5,#6ee7b7)",
                  position: "relative", overflow: "hidden",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40,
                }}>
                  <img src={listing.img} alt="Property"
                    style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
                    onError={(e) => { e.currentTarget.style.display = "none"; }} />
                  🏘️
                  <div style={{
                    position: "absolute", top: 10, left: 10,
                    background: "rgba(0,0,0,0.55)", color: "#fff",
                    fontSize: 10, padding: "3px 8px", borderRadius: 20,
                  }}>
                    {listing.time}
                  </div>
                </div>

                <div style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 16, fontWeight: 800, color: "#111827" }}>
                      {listing.price}<span style={{ fontSize: 12, fontWeight: 400, color: "#9ca3af" }}>{listing.period}</span>
                    </span>
                    <StatusBadge status={listing.status} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C8 2 5 5.5 5 9c0 6 7 13 7 13s7-7 7-13c0-3.5-3-7-7-7z" stroke="#9ca3af" strokeWidth="2"/>
                      <circle cx="12" cy="9" r="2.5" stroke="#9ca3af" strokeWidth="2"/>
                    </svg>
                    <span style={{ fontSize: 12, color: "#6b7280" }}>{listing.location}</span>
                  </div>
                  <BedBath beds={listing.beds} baths={listing.baths} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Properties ── */}
      <section style={{ padding: "60px 40px", background: "#f9fafb" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: "#111827", marginBottom: 24 }}>Featured Properties</h2>

          {FEATURED.map(feat => (
            <div key={feat.id} style={{
              background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb",
              overflow: "hidden", display: "flex", gap: 0, flexWrap: "wrap",
            }}>
              {/* Left images */}
              <div style={{ flex: "0 0 220px", display: "flex", flexDirection: "column", gap: 2 }}>
                <div style={{
                  flex: 1, background: "linear-gradient(135deg,#d1fae5,#a7f3d0)",
                  minHeight: 160,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40,
                }}>
                  <img src={feat.img1} alt="Featured"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { e.currentTarget.style.display = "none"; }} />
                  🏡
                </div>
              </div>

              {/* Details */}
              <div style={{ flex: 1, padding: "24px", minWidth: 200 }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#111827", marginBottom: 8 }}>{feat.title}</h3>
                <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.65, marginBottom: 20 }}>{feat.desc}</p>
                <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12, color: "#374151" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: "middle", marginRight: 4 }}><path d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/><path d="M4 10V6a2 2 0 012-2h12a2 2 0 012 2v4" stroke="#6b7280" strokeWidth="2"/></svg>
                    {feat.beds}-Bedroom
                  </span>
                  <span style={{ fontSize: 12, color: "#374151" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: "middle", marginRight: 4 }}><path d="M4 12h16M4 12a4 4 0 018-8M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/></svg>
                    {feat.baths}-Bathroom
                  </span>
                  <span style={{ fontSize: 12, color: "#374151" }}>🏠 {feat.type}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <div>
                    <p style={{ fontSize: 10, color: "#9ca3af", margin: 0 }}>Price</p>
                    <p style={{ fontSize: 16, fontWeight: 800, color: "#111827" }}>
                      {feat.price}<span style={{ fontSize: 12, fontWeight: 400, color: "#9ca3af" }}>{feat.period}</span>
                    </p>
                  </div>
                  <button onClick={() => navigate(`/listings/${feat.id}`)}
                    style={{
                      padding: "10px 18px", background: "#1a4d2e", color: "#fff",
                      border: "none", borderRadius: 7, fontSize: 12, fontWeight: 700,
                      cursor: "pointer", fontFamily: "inherit",
                    }}>View Property Details</button>
                </div>
              </div>

              {/* Right image */}
              <div style={{
                flex: "0 0 240px",
                background: "linear-gradient(135deg,#1a4d2e,#2d7a4f)",
                minHeight: 200,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40,
              }}>
                <img src={feat.img2} alt="Featured 2"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => { e.currentTarget.style.display = "none"; }} />
                🏢
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
            <span style={{ fontSize: 13, color: "#6b7280" }}>01 of 10</span>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setFeatPage(Math.max(0, featPage - 1))}
                style={{
                  width: 36, height: 36, borderRadius: "50%", border: "1.5px solid #e5e7eb",
                  background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                }}>←</button>
              <button onClick={() => setFeatPage(featPage + 1)}
                style={{
                  width: 36, height: 36, borderRadius: "50%", border: "none",
                  background: "#1a4d2e", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                }}>→</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "#fff", padding: "80px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 80, flexWrap: "wrap" }}>
          <div style={{ flex: "0 0 260px" }}>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: "#111827", marginBottom: 12 }}>Frequently Asked Questions</h2>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65 }}>If there are question you want to ask. We will answer all your question.</p>
          </div>
          <div style={{ flex: 1, minWidth: 280 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 12, marginBottom: 12, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%", padding: "18px 20px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: 14, fontWeight: 600, color: "#111827", textAlign: "left",
                    fontFamily: "inherit",
                  }}>
                  {faq.q}
                  <span style={{ width: 22, height: 22, borderRadius: "50%", border: "1.5px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#6b7280", fontSize: 16 }}>
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && <div style={{ padding: "0 20px 18px", fontSize: 13, color: "#6b7280", lineHeight: 1.65 }}>{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: "#fff", borderTop: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 40px 32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40, marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: "#1a4d2e", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="9" r="6" stroke="white" strokeWidth="2"/><path d="M13 13l5 5" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <span style={{ fontWeight: 900, fontSize: 15, color: "#1a4d2e" }}>OGA</span>
              <span style={{ fontWeight: 400, fontSize: 13, color: "#374151" }}>Landlord</span>
            </div>
            <div>
              <p style={{ fontSize: 14, color: "#374151", marginBottom: 10, fontWeight: 500 }}>Subscribe to our newsletter</p>
              <div style={{ display: "flex" }}>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email"
                  style={{ padding: "10px 16px", borderRadius: "8px 0 0 8px", border: "1px solid #e5e7eb", borderRight: "none", fontSize: 13, outline: "none", width: 220, fontFamily: "inherit" }} />
                <button style={{ padding: "10px 14px", background: "#1a4d2e", border: "none", borderRadius: "0 8px 8px 0", cursor: "pointer" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 80, flexWrap: "wrap", marginBottom: 40 }}>
            <div>
              <p style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 14 }}>Pages</p>
              {[{ label: "About", path: "/about" }, { label: "Listings", path: "/listings" }, { label: "Agents", path: "/signup" }].map(({ label, path }) => (
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
          <div style={{ textAlign: "center", marginTop: 12, fontSize: "clamp(36px,7vw,88px)", fontWeight: 900, color: "rgba(26,77,46,0.04)", letterSpacing: "-2px", userSelect: "none", lineHeight: 1 }}>
            Ogalandlord
          </div>
        </div>
      </footer>
    </div>
  );
}