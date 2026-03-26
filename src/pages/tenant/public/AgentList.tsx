// AgentList.tsx — OgaLandlord Find a Verified Rental Agent Page
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Data ─────────────────────────────────────────────────────────────────────

const AGENTS = [
  { id: 1, name: "Gbenga Yinka", email: "gbengayinka@gmail.com", rating: 4.9, reviews: 183, verified: true, areas: ["Challenge, IB", "Akobo, IB"], img: "/assets/agents/agent1.png" },
  { id: 2, name: "Gbenga Yinka", email: "gbengayinka@gmail.com", rating: 4.9, reviews: 183, verified: true, areas: ["Challenge, IB", "Akobo, IB"], img: "/assets/agents/agent1.png" },
  { id: 3, name: "Gbenga Yinka", email: "gbengayinka@gmail.com", rating: 4.9, reviews: 183, verified: true, areas: ["Challenge, IB", "Akobo, IB"], img: "/assets/agents/agent1.png" },
  { id: 4, name: "Gbenga Yinka", email: "gbengayinka@gmail.com", rating: 4.9, reviews: 183, verified: true, areas: ["Challenge, IB", "Akobo, IB"], img: "/assets/agents/agent1.png" },
  { id: 5, name: "Gbenga Yinka", email: "gbengayinka@gmail.com", rating: 4.9, reviews: 183, verified: true, areas: ["Challenge, IB", "Akobo, IB"], img: "/assets/agents/agent1.png" },
  { id: 6, name: "Gbenga Yinka", email: "gbengayinka@gmail.com", rating: 4.9, reviews: 183, verified: true, areas: ["Challenge, IB", "Akobo, IB"], img: "/assets/agents/agent1.png" },
];

const FAQS = [
  { q: 'What does "Verified Agent" mean?', a: "A verified agent has passed our identity checks, location confirmation, and activity review. Only agents who meet our verification standards are allowed to list properties on the platform." },
  { q: "Are all properties on this platform real?", a: "Yes. All listings are submitted by verified agents who have undergone our thorough verification process." },
  { q: "Do I need to pay before inspection?", a: "No. We advise against paying any money before physically inspecting a property." },
  { q: "Can I report a suspicious agent or listing?", a: "Yes. Use the report button on any agent profile or listing page to flag suspicious activity." },
];

// ─── Shared small components ──────────────────────────────────────────────────

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <img
        src="/assets/logo2.png"
        alt="OgaLandlord"
        style={{ height: 32, objectFit: "contain" }}
        onError={(e) => { e.currentTarget.style.display = "none"; }}
      />
      <span style={{ fontWeight: 900, fontSize: 17, color: "#1a4d2e" }}>OGA</span>
      <span style={{ fontWeight: 400, fontSize: 13, color: "#374151" }}>Landlord</span>
    </div>
  );
}

function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8 2 5 5.5 5 9c0 6 7 13 7 13s7-7 7-13c0-3.5-3-7-7-7z" stroke="#9ca3af" strokeWidth="2" />
      <circle cx="12" cy="9" r="2.5" stroke="#9ca3af" strokeWidth="2" />
    </svg>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "#fff", borderBottom: "1px solid #e5e7eb",
      padding: "0 40px", height: 60,
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <Logo />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {[
          { label: "About Us", path: "/about" },
          { label: "Listings", path: "/listings" },
          { label: "Contact", path: "/contact" },
        ].map(({ label, path }) => (
          <button
            key={label}
            onClick={() => navigate(path)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 14, fontWeight: 500, color: "#374151",
              fontFamily: "inherit", padding: 0,
            }}
          >
            {label}
          </button>
        ))}
        <button
          onClick={() => navigate("/listings")}
          style={{
            background: "#1a4d2e", color: "#fff",
            border: "none", borderRadius: 8, padding: "10px 20px",
            fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
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
    <footer style={{ background: "#fff", borderTop: "1px solid #e5e7eb" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 40px 32px" }}>

        {/* Top row */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          flexWrap: "wrap", gap: 40, marginBottom: 48,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 7, background: "#1a4d2e",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="9" cy="9" r="6" stroke="white" strokeWidth="2" />
                <path d="M13 13l5 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <span style={{ fontWeight: 900, fontSize: 15, color: "#1a4d2e" }}>OGA</span>
            <span style={{ fontWeight: 400, fontSize: 13, color: "#374151" }}>Landlord</span>
          </div>

          <div>
            <p style={{ fontSize: 14, color: "#374151", marginBottom: 10, fontWeight: 500 }}>
              Subscribe to our newsletter
            </p>
            <div style={{ display: "flex" }}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  padding: "10px 16px",
                  borderRadius: "8px 0 0 8px",
                  border: "1px solid #e5e7eb",
                  borderRight: "none",
                  fontSize: 13, outline: "none", width: 220,
                  fontFamily: "inherit",
                }}
              />
              <button style={{
                padding: "10px 14px", background: "#1a4d2e",
                border: "none", borderRadius: "0 8px 8px 0", cursor: "pointer",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div style={{ display: "flex", gap: 80, flexWrap: "wrap", marginBottom: 40 }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 14 }}>Pages</p>
            {[
              { label: "About", path: "/about" },
              { label: "Listings", path: "/listings" },
              { label: "Agents", path: "/agents" },
            ].map(({ label, path }) => (
              <p key={label}>
                <button
                  onClick={() => navigate(path)}
                  style={{
                    background: "none", border: "none", color: "#6b7280",
                    fontSize: 13, cursor: "pointer", padding: 0,
                    marginBottom: 8, fontFamily: "inherit",
                  }}
                >
                  {label}
                </button>
              </p>
            ))}
          </div>

          <div>
            <p style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 14 }}>Support</p>
            {[
              { label: "FAQ", path: "/faq" },
              { label: "Contact Us", path: "/contact" },
            ].map(({ label, path }) => (
              <p key={label}>
                <button
                  onClick={() => navigate(path)}
                  style={{
                    background: "none", border: "none", color: "#6b7280",
                    fontSize: 13, cursor: "pointer", padding: 0,
                    marginBottom: 8, fontFamily: "inherit",
                  }}
                >
                  {label}
                </button>
              </p>
            ))}
          </div>

          <div>
            <p style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 14 }}>Legal</p>
            {[
              { label: "Privacy Policy", path: "/privacy" },
              { label: "Terms of Use", path: "/terms" },
            ].map(({ label, path }) => (
              <p key={label}>
                <button
                  onClick={() => navigate(path)}
                  style={{
                    background: "none", border: "none", color: "#6b7280",
                    fontSize: 13, cursor: "pointer", padding: 0,
                    marginBottom: 8, fontFamily: "inherit",
                  }}
                >
                  {label}
                </button>
              </p>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 24 }}>
          <p style={{ fontSize: 12, color: "#9ca3af" }}>© COPYRIGHT 2026 OGALANDLORD</p>
        </div>

        {/* Watermark */}
        <div style={{
          display: "flex", gap: 0, marginTop: 12, overflow: "hidden",
          opacity: 0.04,
        }}>
          {["O", "g", "a", "l", "a", "n", "d", "l", "o", "r", "d"].map((ch, i) => (
            <span key={i} style={{
              fontSize: "clamp(40px,7vw,90px)", fontWeight: 900,
              color: "#1a4d2e", letterSpacing: "-2px", lineHeight: 1,
              userSelect: "none",
            }}>
              {ch}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── Agent Card ───────────────────────────────────────────────────────────────

function AgentCard({
  agent,
  navigate,
}: {
  agent: typeof AGENTS[0];
  navigate: ReturnType<typeof useNavigate>;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: `1.5px solid ${hovered ? "#1a4d2e" : "#e5e7eb"}`,
        borderRadius: 16,
        padding: "20px 20px 18px",
        transition: "all 0.2s ease",
        boxShadow: hovered ? "0 8px 28px rgba(26,77,46,0.1)" : "0 2px 8px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-3px)" : "none",
        cursor: "default",
      }}
    >
      {/* Top row: avatar + info + verified badge */}
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 20 }}>

        {/* Avatar placeholder */}
        <div style={{
          width: 68, height: 68, borderRadius: 12,
          background: "linear-gradient(135deg,#d1fae5,#a7f3d0)",
          flexShrink: 0, overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28,
        }}>
          <img
            src={agent.img}
            alt={agent.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
          👤
        </div>

        {/* Name / email / stars */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {agent.verified && (
            <span style={{
              display: "inline-block",
              background: "#1a4d2e", color: "#fff",
              fontSize: 10, fontWeight: 700,
              padding: "3px 10px", borderRadius: 20,
              marginBottom: 6,
            }}>
              Verified
            </span>
          )}
          <p style={{ fontSize: 15, fontWeight: 800, color: "#111827", margin: "0 0 3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {agent.name}
          </p>
          <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 6px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {agent.email}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ color: "#f59e0b", fontSize: 13 }}>★</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>{agent.rating}</span>
            <span style={{ fontSize: 11, color: "#9ca3af" }}>({agent.reviews} reviews)</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "#f3f4f6", marginBottom: 16 }} />

      {/* Areas of operation */}
      <div style={{ marginBottom: 18 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#111827", marginBottom: 10 }}>
          Areas of Operation
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {agent.areas.map((area) => (
            <div key={area} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <PinIcon />
              <span style={{ fontSize: 12, color: "#6b7280" }}>{area}</span>
            </div>
          ))}
        </div>
      </div>

      {/* View Profile button */}
      <button
        onClick={() => navigate(`/agent/${agent.id}`)}
        style={{
          padding: "9px 20px",
          background: "#1a4d2e", color: "#fff",
          border: "none", borderRadius: 7,
          fontSize: 13, fontWeight: 700,
          cursor: "pointer", fontFamily: "inherit",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#155d38")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#1a4d2e")}
      >
        View Profile
      </button>
    </div>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section style={{ background: "#f9fafb", padding: "80px 40px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 80, flexWrap: "wrap" }}>

        {/* Left */}
        <div style={{ flex: "0 0 280px" }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: "#111827", lineHeight: 1.2, marginBottom: 14 }}>
            Frequently Asked Questions
          </h2>
          <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65 }}>
            If there are question you want to ask. We will answer all your question.
          </p>
        </div>

        {/* Right: accordion */}
        <div style={{ flex: 1, minWidth: 300 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: 12, marginBottom: 12,
              border: "1px solid #e5e7eb", overflow: "hidden",
            }}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                style={{
                  width: "100%", padding: "18px 20px",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: 14, fontWeight: 600, color: "#111827",
                  textAlign: "left", fontFamily: "inherit",
                }}
              >
                {faq.q}
                <span style={{
                  width: 22, height: 22, borderRadius: "50%",
                  border: "1.5px solid #e5e7eb",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, color: "#6b7280", fontSize: 16,
                }}>
                  {openIdx === i ? "−" : "+"}
                </span>
              </button>
              {openIdx === i && (
                <div style={{ padding: "0 20px 18px", fontSize: 13, color: "#6b7280", lineHeight: 1.7 }}>
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

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AgentList() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const scoreFilter = "All Scores";
  const levelFilter = "All Levels";
  const [verifiedOnly, setVerifiedOnly] = useState(true);

  // Filter agents
  const filtered = AGENTS.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.areas.some((ar) => ar.toLowerCase().includes(search.toLowerCase()));
    const matchVerified = verifiedOnly ? a.verified : true;
    return matchSearch && matchVerified;
  });

  return (
    <div style={{
      fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif",
      color: "#111827", background: "#f9fafb", minHeight: "100vh",
    }}>

      <Navbar navigate={navigate} />

      {/* ── Hero text ── */}
      <section style={{ background: "#f9fafb", padding: "60px 40px 0", textAlign: "center" }}>
        <h1 style={{
          fontSize: "clamp(26px,4vw,46px)", fontWeight: 900,
          color: "#1a4d2e", marginBottom: 12,
        }}>
          Find a Verified Rental Agent
        </h1>
        <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 36 }}>
          Connect with agents who have been verified to help you rent safely and avoid scams.
        </p>

        {/* ── Search + filter bar ── */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          flexWrap: "wrap", justifyContent: "center",
          background: "#fff", borderRadius: 12,
          border: "1px solid #e5e7eb",
          padding: "10px 14px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          marginBottom: 52,
        }}>
          {/* Search input */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 200 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <circle cx="10" cy="10" r="7" stroke="#9ca3af" strokeWidth="2" />
              <path d="M15 15l5 5" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="search location...."
              style={{
                border: "none", background: "none", outline: "none",
                fontSize: 14, color: "#374151", fontFamily: "inherit", width: 180,
              }}
            />
          </div>

          {/* Submit */}
          <button
            style={{
              padding: "9px 20px", background: "#1a4d2e", color: "#fff",
              border: "none", borderRadius: 7, fontSize: 13, fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit",
            }}
          >
            Submit
          </button>

          {/* Divider */}
          <div style={{ width: 1, height: 28, background: "#e5e7eb" }} />

          {/* All Scores dropdown */}
          <button
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "9px 14px", background: "#fff",
              border: "1px solid #e5e7eb", borderRadius: 7,
              fontSize: 13, color: "#374151", cursor: "pointer", fontFamily: "inherit",
            }}
          >
            {scoreFilter}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* All Levels dropdown */}
          <button
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "9px 14px", background: "#fff",
              border: "1px solid #e5e7eb", borderRadius: 7,
              fontSize: 13, color: "#374151", cursor: "pointer", fontFamily: "inherit",
            }}
          >
            {levelFilter}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Divider */}
          <div style={{ width: 1, height: 28, background: "#e5e7eb" }} />

          {/* Verified Agent toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={() => setVerifiedOnly((v) => !v)}
              style={{
                width: 44, height: 24, borderRadius: 12, border: "none",
                background: verifiedOnly ? "#1a4d2e" : "#d1d5db",
                cursor: "pointer", position: "relative", flexShrink: 0,
                transition: "background 0.2s",
                padding: 0,
              }}
            >
              <div style={{
                width: 18, height: 18, borderRadius: "50%", background: "#fff",
                position: "absolute", top: 3,
                left: verifiedOnly ? 23 : 3,
                transition: "left 0.2s",
                boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
              }} />
            </button>
            <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>Verified Agent</span>
          </div>
        </div>
      </section>

      {/* ── Agent grid ── */}
      <section style={{ padding: "0 40px 72px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {filtered.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "60px 0", color: "#9ca3af", fontSize: 15,
            }}>
              No agents found matching your search.
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 20,
            }}>
              {filtered.map((agent) => (
                <AgentCard key={agent.id} agent={agent} navigate={navigate} />
              ))}
            </div>
          )}
        </div>
      </section>

      <FAQSection />
      <Footer navigate={navigate} />
    </div>
  );
}