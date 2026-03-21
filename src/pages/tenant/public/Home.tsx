// Home.tsx — OgaLandlord Homepage
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TestimonialCarousel from "./../../../components/shared/TestimonialCarousel.tsx";

// ─── Shared sub-components ────────────────────────────────────────────────────

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
      {/* Placeholder for /assets/logo.png */}
      <img src="/./../../assets/logo.svg" alt="OgaLandlord"
        style={{ height: 32, objectFit: "contain" }}
        onError={(e) => {
          e.currentTarget.style.display = "none";
          (e.currentTarget.nextSibling as HTMLElement).style.display = "flex";
        }}
      />
      <div style={{
        display: "none", alignItems: "center", gap: 4,
        width: 32, height: 32, borderRadius: 8,
        background: "#1a4d2e", justifyContent: "center",
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="9" r="6" stroke="white" strokeWidth="2"/>
          <path d="M13 13l5 5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <span style={{ fontWeight: 900, fontSize: 17, color: "#1a4d2e", letterSpacing: "-0.3px" }}>OGA</span>
      <span style={{ fontWeight: 400, fontSize: 13, color: "#374151" }}>Landlord</span>
    </div>
  );
}

function Navbar({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "#fff", borderBottom: "1px solid #e5e7eb",
      padding: "0 40px", height: 60,
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <div onClick={() => navigate("/")}><Logo /></div>
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {[
          { label: "About Us", path: "/about" },
          { label: "Listings", path: "/listings" },
          { label: "Contact", path: "/contact" },
        ].map(({ label, path }) => (
          <button key={label} onClick={() => navigate(path)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 14, fontWeight: 500, color: "#374151",
              fontFamily: "inherit", padding: 0,
            }}
          >
            {label}
          </button>
        ))}
        <button onClick={() => navigate("/listings")}
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

function Footer({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  const [email, setEmail] = useState("");
  return (
    <footer style={{ background: "#1a4d2e", color: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 40px 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40, marginBottom: 48 }}>
          {/* Logo */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 7,
                background: "rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="9" cy="9" r="6" stroke="white" strokeWidth="2"/>
                  <path d="M13 13l5 5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span style={{ fontWeight: 900, fontSize: 15, color: "#fff" }}>OGA</span>
              <span style={{ fontWeight: 400, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>Landlord</span>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginBottom: 10 }}>Subscribe to our newsletter</p>
            <div style={{ display: "flex", gap: 0 }}>
              <input value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  padding: "10px 16px", borderRadius: "8px 0 0 8px",
                  border: "none", fontSize: 14, outline: "none",
                  width: 220, background: "#fff", fontFamily: "inherit",
                }}
              />
              <button style={{
                padding: "10px 14px", background: "#2d7a4f",
                border: "none", borderRadius: "0 8px 8px 0", cursor: "pointer",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 80, flexWrap: "wrap", marginBottom: 40 }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Pages</p>
            {[
              { label: "Home", path: "/" },
              { label: "About us", path: "/about" },
              { label: "Listings", path: "/listings" },
              { label: "Agents", path: "/signup" },
            ].map(({ label, path }) => (
              <p key={label}>
                <button onClick={() => navigate(path)}
                  style={{ background: "none", border: "none", color: "rgba(255,255,255,0.65)", fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 8, fontFamily: "inherit" }}>
                  {label}
                </button>
              </p>
            ))}
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Support</p>
            {[
              { label: "FAQ", path: "/faq" },
              { label: "Help", path: "/support" },
              { label: "Contact Us", path: "/contact" },
            ].map(({ label, path }) => (
              <p key={label}>
                <button onClick={() => navigate(path)}
                  style={{ background: "none", border: "none", color: "rgba(255,255,255,0.65)", fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 8, fontFamily: "inherit" }}>
                  {label}
                </button>
              </p>
            ))}
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Legal</p>
            {[
              { label: "Legal", path: "/legal" },
              { label: "Privacy Policy", path: "/privacy" },
              { label: "Terms of Use", path: "/terms" },
            ].map(({ label, path }) => (
              <p key={label}>
                <button onClick={() => navigate(path)}
                  style={{ background: "none", border: "none", color: "rgba(255,255,255,0.65)", fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 8, fontFamily: "inherit" }}>
                  {label}
                </button>
              </p>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 24 }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", textAlign: "center" }}>
            © COPYRIGHT 2026 OGA LANDLORD
          </p>
        </div>

        {/* Watermark */}
        <div style={{
          textAlign: "center", marginTop: 8,
          fontSize: "clamp(40px,8vw,96px)", fontWeight: 900,
          color: "rgba(255,255,255,0.04)", letterSpacing: "-2px",
          userSelect: "none", lineHeight: 1,
        }}>
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
    a: 'A verified agent has passed our identity checks, location confirmation, and activity review. Only agents who meet our verification standards are allowed to list properties on the platform.',
  },
  { q: "Are all properties on this platform real?", a: "Yes. All listings are submitted by verified agents who have undergone our thorough verification process." },
  { q: "Do I need to pay before inspection?", a: "No. We advise against paying any money before physically inspecting a property." },
  { q: "Can I report a suspicious agent or listing?", a: "Yes. Use the report button on any agent profile or listing page to flag suspicious activity." },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section style={{ background: "#f9fafb", padding: "80px 40px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 80, flexWrap: "wrap" }}>
        <div style={{ flex: "0 0 280px" }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "#111827", marginBottom: 12 }}>Frequently Asked Questions</h2>
          <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65 }}>If there are question you want to ask. We will answer all your question.</p>
        </div>
        <div style={{ flex: 1, minWidth: 300 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: 12, marginBottom: 12,
              border: "1px solid #e5e7eb", overflow: "hidden",
            }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", padding: "18px 20px",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: 14, fontWeight: 600, color: "#111827", textAlign: "left",
                  fontFamily: "inherit",
                }}>
                {faq.q}
                <span style={{
                  width: 22, height: 22, borderRadius: "50%",
                  border: "1.5px solid #e5e7eb",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, color: "#6b7280", fontSize: 16,
                }}>
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

      {/* ── Hero ── */}
      <section style={{ background: "#f0faf4", padding: "64px 40px 0", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: "#1a4d2e", lineHeight: 1.2, marginBottom: 16 }}>
            Find Verified Rental Agents.<br />Avoid House Scams.
          </h1>
          <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 32 }}>
            Connecting tenants with trusted agents in Ibadan, Abuja, Lagos and Port Harcourt.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 48 }}>
            <button onClick={() => navigate("/listings")}
              style={{
                padding: "13px 28px", background: "#1a4d2e", color: "#fff",
                border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700,
                cursor: "pointer", fontFamily: "inherit",
                boxShadow: "0 4px 16px rgba(26,77,46,0.3)",
              }}>
              Find a House
            </button>
            <button onClick={() => navigate("/signup")}
              style={{
                padding: "13px 28px", background: "transparent", color: "#1a4d2e",
                border: "2px solid #1a4d2e", borderRadius: 8, fontSize: 14, fontWeight: 700,
                cursor: "pointer", fontFamily: "inherit",
              }}>
              Join as an Agent
            </button>
          </div>
        </div>

        {/* Hero image composite */}
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 16, alignItems: "flex-end" }}>
          {/* Left - house photo */}
          <div style={{
            flex: "0 0 42%", height: 280, borderRadius: "16px 16px 0 0",
            background: "#d1fae5", overflow: "hidden",
            border: "2px solid #bbf7d0",
          }}>
            {/* Placeholder for hero house image */}
            <img src="/./../../assets/hero-house.png" alt="House"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <div style={{
              width: "100%", height: "100%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(135deg,#d1fae5,#a7f3d0)",
            }}>
              <span style={{ fontSize: 48 }}>🏠</span>
            </div>
          </div>

          {/* Center - UI mockup cards */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, paddingBottom: 16 }}>
            {/* Agent verified card */}
            <div style={{
              background: "#fff", borderRadius: 12, padding: "14px 18px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              border: "1px solid #e5e7eb",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {/* Placeholder avatar */}
                <div style={{
                  width: 38, height: 38, borderRadius: "50%",
                  background: "#d1fae5", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18,
                }}>👤</div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#111827" }}>Agent verified in Ibadan</span>
                    <span style={{
                      background: "#d1fae5", color: "#065f46",
                      fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 20,
                    }}>Verified</span>
                  </div>
                  <span style={{ fontSize: 11, color: "#9ca3af" }}>Inspection confirmed in Abeoku ···</span>
                </div>
              </div>
            </div>

            {/* Upload ID card */}
            <div style={{
              background: "#1a4d2e", borderRadius: 12, padding: "14px 18px",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: "rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18,
              }}>🪪</div>
              <div>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", margin: 0 }}>Upload Government ID</p>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#fff", margin: 0 }}>Identity verification</p>
              </div>
            </div>
          </div>

          {/* Right - second photo */}
          <div style={{
            flex: "0 0 28%", height: 220, borderRadius: "16px 16px 0 0",
            background: "#1a4d2e", overflow: "hidden",
          }}>
            <img src="/./../../assets/hero-house.png" alt="Search"
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <div style={{
              width: "100%", height: "100%",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 48 }}>🔍</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why OgaLandlord ── */}
      <section style={{ padding: "80px 40px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: "#1a4d2e", marginBottom: 8 }}>Why Oga<span style={{ fontWeight: 400 }}>Landlord</span></h2>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 48, maxWidth: 360 }}>
            We remove the guesswork from house hunting by verifying agents and protecting tenants at every step.
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[
              {
                icon: "/./../../assets/icons/report-list.png",
                title: "Verified Agents",
                desc: "Every agent is checked for identity, location, and rental history before approval.",
              },
              {
                icon: "/./../../assets/icons/report-list.png",
                title: "Trust Scores",
                desc: "Agents earn trust scores based on verification status and tenant feedback.",
              },
              {
                icon: "/./../../assets/icons/report-list.png",
                title: "Community Reporting",
                desc: "Real reports from tenants help flag fake agents and risky listings early.",
              },

              
            ].map((item) => (
              <div key={item.title} style={{
                flex: "1 1 280px",
                background: "#f9fafb", borderRadius: 16, padding: "28px 24px",
                border: "1px solid #e5e7eb",
              }}>
                {/* Icon placeholder */}
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: "#d1fae5",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, marginBottom: 20,
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={{ padding: "80px 40px", background: "#f0faf4" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: "#111827", marginBottom: 8 }}>How It Works</h2>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 48, maxWidth: 360 }}>
            Follow a clear step-by-step process from agent selection to inspection.
          </p>
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap", alignItems: "flex-start" }}>
            {/* Image placeholder */}
            <div style={{
              flex: "0 0 340px", height: 340, borderRadius: 20,
              background: "linear-gradient(135deg,#d1fae5,#6ee7b7)",
              overflow: "hidden",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 64,
            }}>
              {/* Placeholder for how-it-works image */}
              <img src="/./../../assets/how-it-works.png" alt="How it works"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              🏘️
            </div>

            {/* Steps */}
            <div style={{ flex: 1, minWidth: 280 }}>
              {[
                { num: "01", title: "Agent Verification", desc: "Agents earn trust scores based on verification status and tenant feedback." },
                { num: "02", title: "Listings Upload", desc: "Agents must score based on verification status and tenant feedback." },
                { num: "03", title: "Safe Contact", desc: "Agents earn trust scores based on verification status and tenant feedback." },
              ].map((step, i) => (
                <div key={step.num} style={{
                  display: "flex", gap: 20, marginBottom: i < 2 ? 32 : 0,
                  paddingBottom: i < 2 ? 32 : 0,
                  borderBottom: i < 2 ? "1px solid #d1fae5" : "none",
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "#1a4d2e", color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 700, flexShrink: 0,
                  }}>{step.num}</div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 6 }}>{step.title}</h3>
                    <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Have a property to rent ── */}
      <section style={{ padding: "80px 40px", background: "#fff" }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap",
        }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: "#1a4d2e", marginBottom: 12, lineHeight: 1.25 }}>
              Have a Property to Rent?<br />Let Verified Agents Handle It.
            </h2>
            <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 20, lineHeight: 1.7 }}>
              Connect with verified rental agents who can manage inspections, tenant sourcing, and negotiations—without the stress or uncertainty.
            </p>
            <ul style={{ paddingLeft: 0, listStyle: "none", marginBottom: 28 }}>
              {["Verified and accountable agents", "Transparent rental process", "Reduced risk of disputes and scams"].map((item) => (
                <li key={item} style={{ fontSize: 13, color: "#374151", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "#1a4d2e", fontSize: 16 }}>•</span> {item}
                </li>
              ))}
            </ul>
            <button onClick={() => navigate("/listings")}
              style={{
                padding: "12px 24px", background: "#1a4d2e", color: "#fff",
                border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700,
                cursor: "pointer", fontFamily: "inherit",
              }}>
              Find a Verified Agent
            </button>
          </div>
          {/* Image */}
          <div style={{
            flex: "0 0 380px", height: 280, borderRadius: 20,
            background: "linear-gradient(135deg,#1a4d2e,#2d7a4f)",
            overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 64,
          }}>
            <img src="/./../../assets/property-section.png" alt="Property"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            🏢
          </div>
        </div>
      </section>

      {/* ── Are You a Real Estate Agent? ── */}
      <section style={{ padding: "80px 40px", background: "#f9fafb" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: "#111827", marginBottom: 8, textAlign: "center" }}>Are You a Real Estate Agent?</h2>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 48, textAlign: "center" }}>
            Join thousands of verified agents building trust with clients.
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {/* Left large card */}
            <div style={{
              flex: "0 0 220px", borderRadius: 16,
              background: "linear-gradient(135deg,#d1fae5,#a7f3d0)",
              height: 220, overflow: "hidden",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 64, position: "relative",
            }}>
              <img src="/./../../assets/agent-card.png" alt="Agent"
                style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              👨‍💼
            </div>

            <div style={{ flex: 1, minWidth: 200, background: "#fff", borderRadius: 16, padding: "28px 24px", border: "1px solid #e5e7eb" }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "#111827", marginBottom: 8 }}>Increase Your Visibility</h3>
              <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.65 }}>
                Show up where serious buyers and sellers are actively searching for trusted agents.
              </p>
            </div>

            <div style={{ flex: 1, minWidth: 200, background: "#1a4d2e", borderRadius: 16, padding: "28px 24px" }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Build Instant Trust</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.65 }}>
                Stand out with a verified, credible profile that reassures clients before the first conversation.
              </p>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 36 }}>
            <button onClick={() => navigate("/signup")}
              style={{
                padding: "13px 32px", background: "#1a4d2e", color: "#fff",
                border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700,
                cursor: "pointer", fontFamily: "inherit",
                boxShadow: "0 4px 16px rgba(26,77,46,0.25)",
              }}>
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