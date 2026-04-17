// Listings.tsx — OgaLandlord Verified Rental Listings Page
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GRID_LISTINGS, FEATURED_LISTINGS } from "../../../data/Propertydata";

const FAQS = [
  { q: 'What does "Verified Agent" mean?', a: 'A verified agent has passed our identity checks, location confirmation, and activity review. Only agents who meet our verification standards are allowed to list properties on the platform.' },
  { q: "Are all properties on this platform real?", a: "Yes. All listings are submitted by verified agents who have gone through our rigorous vetting process." },
  { q: "Do I need to pay before inspection?", a: "No. We strongly advise against paying any money before physically inspecting a property. Always visit the property first." },
  { q: "Can I report a suspicious agent or listing?", a: "Yes. Use the report button on any listing or agent profile to flag suspicious activity. Our team reviews all reports within 24 hours." },
];

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <img
        src="/./../../assets/logo.svg"
        alt="OgaLandlord"
        style={{ height: 32, objectFit: "contain" }}
        onError={(e) => { e.currentTarget.style.display = "none"; }}
      />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isAvail = status === "Available";
  return (
    <span style={{
      background: isAvail ? "#d1fae5" : "#fee2e2",
      color: isAvail ? "#065f46" : "#991b1b",
      fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20,
    }}>{status}</span>
  );
}

function BedBath({ beds, baths }: { beds: number; baths: number }) {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#6b7280" }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 10V6a2 2 0 012-2h12a2 2 0 012 2v4" stroke="#9ca3af" strokeWidth="2"/>
        </svg>
        {beds} Beds
      </span>
      <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#6b7280" }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path d="M4 12h16M4 12a4 4 0 018-8M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        {baths} Baths
      </span>
    </div>
  );
}

function PropImage({ src, time, height = 200 }: { src: string; time: string; height?: number }) {
  const [failed, setFailed] = useState(false);
  return (
    <div style={{ width: "100%", height, position: "relative", overflow: "hidden", background: "#e5e7eb" }}>
      {!failed && (
        <img
          src={src}
          alt="Property"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <div style={{
          width: "100%", height: "100%",
          background: "linear-gradient(135deg, #c8d8c8 0%, #a0bba0 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 40, color: "#fff",
        }}>🏘️</div>
      )}
      <div style={{
        position: "absolute", top: 10, left: 10,
        background: "rgba(0,0,0,0.50)", color: "#fff",
        fontSize: 10, padding: "3px 9px", borderRadius: 20, fontWeight: 500,
      }}>{time}</div>
    </div>
  );
}

export default function Listings() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [featPage, setFeatPage] = useState(0);
  const [heroFailed, setHeroFailed] = useState(false);
  // Use separate keys for left-col and right-col images to avoid collision
  const [featImgFailed, setFeatImgFailed] = useState<Record<string, boolean>>({});

  const totalFeatured = FEATURED_LISTINGS.length;
  const currentFeat = FEATURED_LISTINGS[featPage];

  // ── Helper to navigate to a property detail page ──────────────────────────
  // Converts id to string explicitly so the URL is always clean (e.g. /listings/3)
  const goToProperty = (id: number | string) => {
    navigate(`/ListingProperty/${id}`);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif", color: "#111827", background: "#f9fafb" }}>

      {/* ── Navbar ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "#fff", borderBottom: "1px solid #e5e7eb",
        padding: "0 48px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}><Logo /></div>
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {[
            { label: "About Us", path: "/AboutUs" },
            { label: "Listings", path: "/listings1" },
            { label: "Contact", path: "/Contact" },
          ].map(({ label, path }) => (
            <button key={label} onClick={() => navigate(path)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 14, fontWeight: path === "/listings" ? 700 : 500,
              color: path === "/listings" ? "#1a4d2e" : "#374151",
              fontFamily: "inherit", padding: 0,
            }}>{label}</button>
          ))}
          <button onClick={() => navigate("/Onboarding")} style={{
            background: "#1a4d2e", color: "#fff",
            border: "none", borderRadius: 8, padding: "10px 22px",
            fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          }}>Get Started</button>
        </div>
      </nav>

      {/* ── Page header + Hero ── */}
      <section style={{ background: "#fff", padding: "48px 48px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 900, color: "#1a4d2e", marginBottom: 6 }}>
            Verified Rental Listings
          </h1>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 28, marginTop: 0 }}>
            All listings are managed by verified agents to help reduce scams.
          </p>

          <div style={{
            width: "100%", height: 320, borderRadius: 16,
            overflow: "hidden", position: "relative",
            background: "linear-gradient(135deg,#dce8dc,#b6d4b6)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {!heroFailed ? (
              <img
                src="./../../assets/listings/listings-hero.png"
                alt="Listings hero"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={() => setHeroFailed(true)}
              />
            ) : (
              <span style={{ fontSize: 72 }}>🛋️</span>
            )}
          </div>
        </div>
      </section>

      {/* ── Search / Filter bar ── */}
      <section style={{ background: "#f9fafb", padding: "28px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center",
            background: "#fff", borderRadius: 12, padding: "10px 14px",
            border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 200 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="10" cy="10" r="7" stroke="#9ca3af" strokeWidth="2"/>
                <path d="M15 15l5 5" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="search location....."
                style={{
                  border: "none", background: "none", outline: "none",
                  fontSize: 14, fontFamily: "inherit", flex: 1, color: "#374151",
                }}
              />
            </div>
            <button style={{
              padding: "9px 20px", background: "#1a4d2e", color: "#fff",
              border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit",
            }}>Submit</button>
            {["All Types", "Price", "Bedroom", "Bathroom"].map(f => (
              <button key={f} style={{
                padding: "9px 14px", background: "#fff", border: "1px solid #e5e7eb",
                borderRadius: 8, fontSize: 13, color: "#374151", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 5, fontFamily: "inherit",
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
      <section style={{ padding: "0 48px 60px", background: "#f9fafb" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {GRID_LISTINGS.map(listing => (
              <div
                key={listing.id}
                // FIX: use the goToProperty helper so navigation is consistent
                onClick={() => goToProperty(listing.id)}
                style={{
                  background: "#fff", borderRadius: 16,
                  border: "1px solid #e5e7eb", overflow: "hidden",
                  cursor: "pointer", transition: "box-shadow 0.2s",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.10)"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"}
              >
                <PropImage src={listing.img} time={listing.time} height={185} />
                <div style={{ padding: "14px 16px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 17, fontWeight: 800, color: "#111827" }}>
                      {listing.price}
                      <span style={{ fontSize: 12, fontWeight: 400, color: "#9ca3af" }}>{listing.period}</span>
                    </span>
                    <StatusBadge status={listing.status} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 12 }}>
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
      <section style={{ padding: "60px 48px", background: "#f9fafb" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: "#111827", marginBottom: 24, marginTop: 0 }}>
            Featured Properties
          </h2>

          <div style={{
            background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb",
            overflow: "hidden", display: "flex",
          }}>
            {/* Left column */}
            <div style={{ flex: "0 0 300px", display: "flex", flexDirection: "column", padding: 20, gap: 16, borderRight: "1px solid #f3f4f6" }}>
              <div style={{ width: "100%", height: 180, borderRadius: 12, overflow: "hidden", position: "relative", background: "#d9e8d9", flexShrink: 0 }}>
                {/* FIX: use distinct key "left-{id}" to avoid collision with right-col key */}
                {!featImgFailed[`left-${currentFeat.id}`] ? (
                  <img
                    src={currentFeat.img}
                    alt={currentFeat.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={() => setFeatImgFailed(prev => ({ ...prev, [`left-${currentFeat.id}`]: true }))}
                  />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>🏡</div>
                )}
              </div>

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, color: "#374151", display: "flex", alignItems: "center", gap: 4 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/><path d="M4 10V6a2 2 0 012-2h12a2 2 0 012 2v4" stroke="#6b7280" strokeWidth="2"/></svg>
                  {currentFeat.beds}-Bedroom
                </span>
                <span style={{ fontSize: 12, color: "#374151", display: "flex", alignItems: "center", gap: 4 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M4 12h16M4 12a4 4 0 018-8M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/></svg>
                  {currentFeat.baths}-Bathroom
                </span>
                <span style={{ fontSize: 12, color: "#374151", display: "flex", alignItems: "center", gap: 4 }}>
                  🏠 {currentFeat.type}
                </span>
              </div>

              <div>
                <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 3px" }}>Price</p>
                <p style={{ fontSize: 18, fontWeight: 800, color: "#111827", margin: "0 0 14px" }}>
                  {currentFeat.price}
                  <span style={{ fontSize: 12, fontWeight: 400, color: "#9ca3af" }}>/yr</span>
                </p>
                {/* FIX: use goToProperty helper */}
                <button
                  onClick={() => goToProperty(currentFeat.id)}
                  style={{
                    padding: "11px 18px", background: "#111827", color: "#fff",
                    border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700,
                    cursor: "pointer", fontFamily: "inherit",
                  }}>View Property Details</button>
              </div>
            </div>

            {/* Right column */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px 20px 20px 24px", gap: 12 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "#1a4d2e", margin: 0 }}>
                {currentFeat.title}
              </h3>
              <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>
                {currentFeat.description[0]}
              </p>
              <div style={{ flex: 1, minHeight: 180, borderRadius: 12, overflow: "hidden", position: "relative", background: "#1a3d2e" }}>
                {/* FIX: use distinct key "right-{id}" */}
                {!featImgFailed[`right-${currentFeat.id}`] ? (
                  <img
                    src={currentFeat.img}
                    alt={currentFeat.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", position: "absolute", inset: 0 }}
                    onError={() => setFeatImgFailed(prev => ({ ...prev, [`right-${currentFeat.id}`]: true }))}
                  />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52, position: "absolute", inset: 0 }}>🏢</div>
                )}
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
            <span style={{ fontSize: 13, color: "#6b7280", fontWeight: 500 }}>
              {String(featPage + 1).padStart(2, "0")} of {String(totalFeatured).padStart(2, "0")}
            </span>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setFeatPage(p => Math.max(0, p - 1))}
                disabled={featPage === 0}
                style={{
                  width: 38, height: 38, borderRadius: "50%",
                  border: "1.5px solid #e5e7eb", background: "#fff",
                  cursor: featPage === 0 ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: featPage === 0 ? "#d1d5db" : "#374151", fontSize: 16,
                }}>←</button>
              <button
                onClick={() => setFeatPage(p => Math.min(totalFeatured - 1, p + 1))}
                disabled={featPage === totalFeatured - 1}
                style={{
                  width: 38, height: 38, borderRadius: "50%",
                  border: "none",
                  background: featPage === totalFeatured - 1 ? "#d1fae5" : "#1a4d2e",
                  color: featPage === totalFeatured - 1 ? "#6b7280" : "#fff",
                  cursor: featPage === totalFeatured - 1 ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
                }}>→</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "#fff", padding: "80px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 80, flexWrap: "wrap" }}>
          <div style={{ flex: "0 0 240px" }}>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: "#1a4d2e", marginBottom: 14, marginTop: 0, lineHeight: 1.2 }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>
              If there are questions you want to ask, we will answer all your questions.
            </p>
          </div>
          <div style={{ flex: 1, minWidth: 280 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 12, marginBottom: 10, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%", padding: "18px 22px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: 14, fontWeight: 600, color: "#111827", textAlign: "left",
                    fontFamily: "inherit",
                  }}>
                  {faq.q}
                  <span style={{
                    width: 24, height: 24, borderRadius: "50%", border: "1.5px solid #e5e7eb",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, color: "#6b7280", fontSize: 18, fontWeight: 300,
                  }}>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 22px 18px", fontSize: 13, color: "#6b7280", lineHeight: 1.7 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: "#fff", borderTop: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 48px 28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32, marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src="/./../../assets/logo.svg" alt="OgaLandlord" style={{ height: 32, objectFit: "contain" }}
                onError={(e) => { e.currentTarget.style.display = "none"; }} />
            </div>
            <div>
              <p style={{ fontSize: 14, color: "#374151", marginBottom: 10, marginTop: 0, fontWeight: 500 }}>Subscribe to our newsletter</p>
              <div style={{ display: "flex" }}>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email"
                  style={{ padding: "10px 16px", borderRadius: "8px 0 0 8px", border: "1px solid #e5e7eb", borderRight: "none", fontSize: 13, outline: "none", width: 240, fontFamily: "inherit", color: "#374151" }} />
                <button style={{ padding: "10px 14px", background: "#1a4d2e", border: "none", borderRadius: "0 8px 8px 0", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 370, flexWrap: "wrap", marginBottom: 40 }}>
            <div>
              <p style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 14, marginTop: 0 }}>Pages</p>
              {[{ label: "About", path: "/about" }, { label: "Listings", path: "/listings" }, { label: "Agents", path: "/signup" }].map(({ label, path }) => (
                <p key={label} style={{ margin: "0 0 8px" }}>
                  <button onClick={() => navigate(path)} style={{ background: "none", border: "none", color: "#6b7280", fontSize: 13, cursor: "pointer", padding: 0, fontFamily: "inherit" }}>{label}</button>
                </p>
              ))}
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 14, marginTop: 0 }}>Support</p>
              {[{ label: "FAQ", path: "/faq" }, { label: "Contact Us", path: "/contact" }].map(({ label, path }) => (
                <p key={label} style={{ margin: "0 0 8px" }}>
                  <button onClick={() => navigate(path)} style={{ background: "none", border: "none", color: "#6b7280", fontSize: 13, cursor: "pointer", padding: 0, fontFamily: "inherit" }}>{label}</button>
                </p>
              ))}
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 14, marginTop: 0 }}>Legal</p>
              {[{ label: "Privacy Policy", path: "/privacy" }, { label: "Terms of Use", path: "/terms" }].map(({ label, path }) => (
                <p key={label} style={{ margin: "0 0 8px" }}>
                  <button onClick={() => navigate(path)} style={{ background: "none", border: "none", color: "#6b7280", fontSize: 13, cursor: "pointer", padding: 0, fontFamily: "inherit" }}>{label}</button>
                </p>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 24 }}>
            <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>© COPYRIGHT 2026 OGALANDLORD</p>
          </div>
          <div style={{ fontSize: "170px", fontWeight: 700, textAlign: "center", color: "rgba(246,246,246,0.92)", letterSpacing: "-3px", userSelect: "none", lineHeight: 1, marginTop: 60, paddingTop: "70px", overflow: "hidden" }}>
            Ogalandlord
          </div>
        </div>
      </footer>
    </div>
  );
}