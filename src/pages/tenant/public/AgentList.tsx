// AgentList.tsx — OgaLandlord Find a Verified Rental Agent Page
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { AGENTS, type Agent } from "../../../data/agents";
import FAQSection from "./FAQS";

// ─── Data ─────────────────────────────────────────────────────────────────────



// ─── Shared small components ──────────────────────────────────────────────────

function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8 2 5 5.5 5 9c0 6 7 13 7 13s7-7 7-13c0-3.5-3-7-7-7z" stroke="#9ca3af" strokeWidth="2" />
      <circle cx="12" cy="9" r="2.5" stroke="#9ca3af" strokeWidth="2" />
    </svg>
  );
}

// ─── Agent Card ───────────────────────────────────────────────────────────────

function AgentCard({
  agent,
  navigate,
}: {
  agent: Agent;
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

      <Navbar />

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
      <section  style={{ padding: "0 40px 72px" }}>
        <div style={{ margin: "0 auto" }}>
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