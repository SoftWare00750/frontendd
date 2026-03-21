// AgentProfile.tsx — OgaLandlord Agent Profile Page
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AGENT_LISTINGS = [
  { id: 1, price: "₦800,000", period: "/yr", location: "Lekki Phase 1, Lagos", beds: 2, baths: 2, status: "Rented",    img: "./../../assets/lisiings/prop1.png", time: "Listed 2 hours ago" },
  { id: 2, price: "₦800,000", period: "/yr", location: "Lekki Phase 1, Lagos", beds: 2, baths: 2, status: "Available", img: "./../../assets/lisiings/prop1.png", time: "Listed 2 hours ago" },
  { id: 3, price: "₦800,000", period: "/yr", location: "Lekki Phase 1, Lagos", beds: 2, baths: 2, status: "Rented",    img: "./../../assets/lisiings/prop2.png", time: "Listed 2 hours ago" },
  { id: 4, price: "₦800,000", period: "/yr", location: "Lekki Phase 1, Lagos", beds: 2, baths: 2, status: "Available", img: "./../../assets/lisiings/prop1.png", time: "Listed 2 hours ago" },
];

const TRUST_SCORES = [
  { label: "Response Time",       value: 95 },
  { label: "Transaction Success", value: 92 },
  { label: "Client Satisfaction", value: 98 },
];

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <img src="./../../assets/logo.png" alt="OgaLandlord" style={{ height: 32, objectFit: "contain" }}
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

function ProgressBar({ value }: { value: number }) {
  return (
    <div style={{ height: 6, background: "#e5e7eb", borderRadius: 3, overflow: "hidden", marginTop: 6 }}>
      <div style={{
        height: "100%", width: `${value}%`,
        background: "linear-gradient(90deg,#1a4d2e,#2d7a4f)",
        borderRadius: 3,
      }} />
    </div>
  );
}

// ─── Report Modal ─────────────────────────────────────────────────────────────

const REPORT_REASONS = [
  "Misleading information",
  "Unprofessional behavior",
  "Suspected fraud",
  "Harassment or discrimination",
  "Other",
];

function ReportModal({ agentName, onClose }: { agentName: string; onClose: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setSelected(null);
      setDetails("");
    }, 1800);
  };

  return (
    <>
      {/* Dark overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
        }}
      />

      {/* Modal box */}
      <div style={{
        position: "fixed", zIndex: 201,
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#fff", borderRadius: 16,
        padding: "36px 36px 32px",
        width: "min(520px, 92vw)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
        fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif",
      }}>

        {/* Close ×  */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 16,
            width: 32, height: 32, borderRadius: "50%",
            border: "none", background: "#f3f4f6",
            cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center",
            color: "#6b7280", fontSize: 18, lineHeight: 1,
          }}
        >×</button>

        {/* Header */}
        <h2 style={{ fontSize: 22, fontWeight: 900, color: "#1a4d2e", margin: "0 0 8px" }}>
          Report {agentName}
        </h2>
        <p style={{ fontSize: 14, color: "#6b7280", margin: "0 0 28px", lineHeight: 1.55 }}>
          Help us maintain a safe community by reporting any concerns about this agent.
        </p>

        {/* Reasons */}
        <p style={{ fontSize: 14, fontWeight: 700, color: "#111827", margin: "0 0 14px" }}>
          Reasons for report
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
          {REPORT_REASONS.map((reason) => {
            const isChosen = selected === reason;
            return (
              <label
                key={reason}
                onClick={() => setSelected(reason)}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  cursor: "pointer", fontSize: 14, color: "#374151",
                }}
              >
                {/* Custom radio circle */}
                <div style={{
                  width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                  border: `2px solid ${isChosen ? "#1a4d2e" : "#d1d5db"}`,
                  background: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "border-color 0.15s",
                }}>
                  {isChosen && (
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#1a4d2e" }} />
                  )}
                </div>
                {reason}
              </label>
            );
          })}
        </div>

        {/* Additional details */}
        <p style={{ fontSize: 14, fontWeight: 700, color: "#111827", margin: "0 0 10px" }}>
          Additional details (optional)
        </p>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Please provide any additional context..."
          rows={5}
          style={{
            width: "100%", boxSizing: "border-box",
            padding: "12px 14px",
            border: "1.5px solid #e5e7eb", borderRadius: 10,
            fontSize: 14, color: "#374151", fontFamily: "inherit",
            resize: "vertical", outline: "none",
            lineHeight: 1.6, marginBottom: 28,
            transition: "border-color 0.15s",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#1a4d2e")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
        />

        {/* Buttons */}
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: "13px",
              background: "#fff", color: "#374151",
              border: "1.5px solid #e5e7eb", borderRadius: 10,
              fontSize: 14, fontWeight: 600, cursor: "pointer",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selected || submitted}
            style={{
              flex: 2, padding: "13px",
              background: submitted ? "#b91c1c" : !selected ? "#fca5a5" : "#dc2626",
              color: "#fff", border: "none", borderRadius: 10,
              fontSize: 14, fontWeight: 700,
              cursor: !selected || submitted ? "not-allowed" : "pointer",
              fontFamily: "inherit", transition: "background 0.15s",
            }}
          >
            {submitted ? "Report Submitted ✓" : "Submit Report"}
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AgentProfile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showReport, setShowReport] = useState(false);

  return (
    <div style={{ fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif", color: "#111827", background: "#f9fafb" }}>

      {/* ── Report Modal ── */}
      {showReport && (
        <ReportModal agentName="Gbenga Yinka" onClose={() => setShowReport(false)} />
      )}

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
                background: "none", border: "none", cursor: "pointer",
                fontSize: 14, fontWeight: 500, color: "#374151",
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

      {/* ── Profile hero card ── */}
      <section style={{ padding: "32px 40px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            background: "#fff", borderRadius: 20,
            border: "1px solid #e5e7eb", overflow: "hidden",
          }}>
            {/* Top tinted strip */}
            <div style={{
              height: 80,
              background: "linear-gradient(135deg,#f0faf4 0%,#d1fae5 100%)",
            }} />

            <div style={{ padding: "0 28px 24px", marginTop: -40 }}>
              <div style={{ display: "flex", gap: 20, alignItems: "flex-end", flexWrap: "wrap" }}>
                {/* Avatar */}
                <div style={{
                  width: 88, height: 88, borderRadius: 20,
                  border: "4px solid #fff",
                  background: "linear-gradient(135deg,#d1fae5,#a7f3d0)",
                  overflow: "hidden", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 36, boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                }}>
                  <img src="./../../assets/agents/agent1.png" alt="Agent"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { e.currentTarget.style.display = "none"; }} />
                  👤
                </div>

                {/* Name + meta */}
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{
                      background: "#d1fae5", color: "#065f46",
                      fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20,
                    }}>Verified</span>
                  </div>
                  <h1 style={{ fontSize: 22, fontWeight: 900, color: "#111827", margin: "0 0 2px" }}>Gbenga Yinka</h1>
                  <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 6px" }}>gbengayinka@gmail.com</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ color: "#f59e0b", fontSize: 14 }}>★</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>4.9</span>
                    <span style={{ fontSize: 12, color: "#9ca3af" }}>(183 reviews)</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 16 }}>
                  <button
                    style={{
                      padding: "10px 20px", background: "#1a4d2e", color: "#fff",
                      border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700,
                      cursor: "pointer", display: "flex", alignItems: "center", gap: 7,
                      fontFamily: "inherit",
                    }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.49 11.4 19.79 19.79 0 011.42 2.82 2 2 0 013.41 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0121 16l.92.92z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Contact
                  </button>
                  <button style={{
                    padding: "10px 20px", background: "#fff", color: "#374151",
                    border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: 13, fontWeight: 600,
                    cursor: "pointer", display: "flex", alignItems: "center", gap: 7,
                    fontFamily: "inherit",
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="22,6 12,13 2,6" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Message
                  </button>
                </div>
              </div>

              {/* Stats row */}
              <div style={{
                display: "flex", gap: 0, marginTop: 24,
                borderTop: "1px solid #f3f4f6", paddingTop: 20,
                flexWrap: "wrap",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 150 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8, background: "#f0faf4",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="4" width="18" height="18" rx="2" stroke="#1a4d2e" strokeWidth="2"/>
                      <line x1="16" y1="2" x2="16" y2="6" stroke="#1a4d2e" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="8" y1="2" x2="8" y2="6" stroke="#1a4d2e" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="3" y1="10" x2="21" y2="10" stroke="#1a4d2e" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontSize: 16, fontWeight: 900, color: "#111827", margin: 0 }}>5+</p>
                    <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>Years Of Experience</p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 150 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8, background: "#f0faf4",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="#1a4d2e" strokeWidth="2"/>
                      <path d="M12 6v6l4 2" stroke="#1a4d2e" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontSize: 16, fontWeight: 900, color: "#111827", margin: 0 }}>100+</p>
                    <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>Deals closed</p>
                  </div>
                </div>

                {/* Report button — far right */}
                <div style={{ marginLeft: "auto" }}>
                  <button
                    onClick={() => setShowReport(true)}
                    style={{
                      padding: "10px 16px", background: "#fff", color: "#ef4444",
                      border: "1.5px solid #fee2e2", borderRadius: 8, fontSize: 12, fontWeight: 600,
                      cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                      fontFamily: "inherit", transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#fff5f5")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="4" y1="22" x2="4" y2="15" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
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
      <section style={{ padding: "28px 40px 60px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>

          {/* Left column: trust score + areas */}
          <div style={{ flex: "0 0 260px", display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Trust Score card */}
            <div style={{ background: "#fff", borderRadius: 16, padding: "24px", border: "1px solid #e5e7eb" }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "#111827", marginBottom: 20 }}>Trust Score</h3>

              {/* Circular score */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <div style={{ position: "relative", width: 80, height: 80 }}>
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="32" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
                    <circle cx="40" cy="40" r="32" fill="none" stroke="#1a4d2e" strokeWidth="8"
                      strokeDasharray={`${(95 / 100) * 2 * Math.PI * 32} ${2 * Math.PI * 32}`}
                      strokeDashoffset={2 * Math.PI * 32 * 0.25}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexDirection: "column",
                  }}>
                    <span style={{ fontSize: 18, fontWeight: 900, color: "#111827", lineHeight: 1 }}>95</span>
                    <span style={{ fontSize: 9, color: "#9ca3af" }}>/100</span>
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#1a4d2e", margin: "0 0 2px" }}>Excellent</p>
                  <p style={{ fontSize: 11, color: "#9ca3af" }}>Based on 3 factors</p>
                </div>
              </div>

              {TRUST_SCORES.map(ts => (
                <div key={ts.label} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: "#374151" }}>{ts.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{ts.value}/100</span>
                  </div>
                  <ProgressBar value={ts.value} />
                </div>
              ))}
            </div>

            {/* Areas of Operation */}
            <div style={{ background: "#fff", borderRadius: 16, padding: "20px 24px", border: "1px solid #e5e7eb" }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: "#111827", marginBottom: 16 }}>Areas of Operation</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {["Challenge, IB", "Akobo, IB"].map(area => (
                  <div key={area} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C8 2 5 5.5 5 9c0 6 7 13 7 13s7-7 7-13c0-3.5-3-7-7-7z" stroke="#9ca3af" strokeWidth="2"/>
                      <circle cx="12" cy="9" r="2.5" stroke="#9ca3af" strokeWidth="2"/>
                    </svg>
                    <span style={{ fontSize: 12, color: "#6b7280" }}>{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: Active listings */}
          <div style={{ flex: 1, minWidth: 300 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: "#1a4d2e", margin: 0 }}>Active listings</h2>
              <span style={{ fontSize: 13, color: "#9ca3af" }}>4 properties</span>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 16,
            }}>
              {AGENT_LISTINGS.map(listing => (
                <div key={listing.id}
                  onClick={() => navigate(`/listings/${listing.id}`)}
                  style={{
                    background: "#fff", borderRadius: 14,
                    border: "1px solid #e5e7eb", overflow: "hidden",
                    cursor: "pointer", transition: "box-shadow 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.1)"}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "none"}
                >
                  {/* Image */}
                  <div style={{
                    width: "100%", height: 160,
                    background: "linear-gradient(135deg,#d1fae5,#6ee7b7)",
                    position: "relative", overflow: "hidden",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36,
                  }}>
                    <img src={listing.img} alt="Listing"
                      style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
                      onError={(e) => { e.currentTarget.style.display = "none"; }} />
                    🏘️
                    <div style={{
                      position: "absolute", top: 10, left: 10,
                      background: "rgba(0,0,0,0.55)", color: "#fff",
                      fontSize: 9, padding: "3px 8px", borderRadius: 20,
                    }}>{listing.time}</div>
                  </div>

                  <div style={{ padding: "12px 14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ fontSize: 15, fontWeight: 800, color: "#111827" }}>
                        {listing.price}<span style={{ fontSize: 11, fontWeight: 400, color: "#9ca3af" }}>{listing.period}</span>
                      </span>
                      <StatusBadge status={listing.status} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C8 2 5 5.5 5 9c0 6 7 13 7 13s7-7 7-13c0-3.5-3-7-7-7z" stroke="#9ca3af" strokeWidth="2"/>
                        <circle cx="12" cy="9" r="2.5" stroke="#9ca3af" strokeWidth="2"/>
                      </svg>
                      <span style={{ fontSize: 11, color: "#6b7280" }}>{listing.location}</span>
                    </div>
                    <div style={{ display: "flex", gap: 12 }}>
                      <span style={{ fontSize: 11, color: "#6b7280", display: "flex", alignItems: "center", gap: 3 }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/><path d="M4 10V6a2 2 0 012-2h12a2 2 0 012 2v4" stroke="#9ca3af" strokeWidth="2"/></svg>
                        {listing.beds} Beds
                      </span>
                      <span style={{ fontSize: 11, color: "#6b7280", display: "flex", alignItems: "center", gap: 3 }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M4 12h16M4 12a4 4 0 018-8M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/></svg>
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