// AboutUs.tsx — OgaLandlord About Us Page
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <img src="./../../assets/logo.png" alt="OgaLandlord"
        style={{ height: 32, objectFit: "contain" }}
        onError={(e) => { e.currentTarget.style.display = "none"; }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 7, background: "#1a4d2e",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="9" cy="9" r="6" stroke="white" strokeWidth="2"/>
            <path d="M13 13l5 5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <span style={{ fontWeight: 900, fontSize: 17, color: "#1a4d2e" }}>OGA</span>
        <span style={{ fontWeight: 400, fontSize: 13, color: "#374151" }}>Landlord</span>
      </div>
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
      <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}><Logo /></div>
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {[
          { label: "About Us", path: "/about" },
          { label: "Listings", path: "/listings" },
          { label: "Contact", path: "/contact" },
        ].map(({ label, path }) => (
          <button key={label} onClick={() => navigate(path)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 14, fontWeight: path === "/about" ? 700 : 500,
              color: path === "/about" ? "#1a4d2e" : "#374151",
              fontFamily: "inherit", padding: 0,
            }}>
            {label}
          </button>
        ))}
        <button onClick={() => navigate("/listings")}
          style={{
            background: "#1a4d2e", color: "#fff",
            border: "none", borderRadius: 8, padding: "10px 20px",
            fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          }}>
          Get Started
        </button>
      </div>
    </nav>
  );
}

function Footer({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  const [email, setEmail] = useState("");
  return (
    <footer style={{ background: "#fff", borderTop: "1px solid #e5e7eb" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 40px 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40, marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 7, background: "#1a4d2e",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="9" cy="9" r="6" stroke="white" strokeWidth="2"/>
                <path d="M13 13l5 5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{ fontWeight: 900, fontSize: 15, color: "#1a4d2e" }}>OGA</span>
            <span style={{ fontWeight: 400, fontSize: 13, color: "#374151" }}>Landlord</span>
          </div>

          <div>
            <p style={{ fontSize: 14, color: "#374151", marginBottom: 10, fontWeight: 500 }}>Subscribe to our newsletter</p>
            <div style={{ display: "flex" }}>
              <input value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  padding: "10px 16px", borderRadius: "8px 0 0 8px",
                  border: "1px solid #e5e7eb", borderRight: "none",
                  fontSize: 13, outline: "none", width: 220, fontFamily: "inherit",
                }}
              />
              <button style={{
                padding: "10px 14px", background: "#1a4d2e",
                border: "none", borderRadius: "0 8px 8px 0", cursor: "pointer",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
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
          <p style={{ fontSize: 12, color: "#9ca3af", textAlign: "left" }}>© COPYRIGHT 2026 OGALANDLORD</p>
        </div>

        {/* Watermark */}
        <div style={{
          textAlign: "center", marginTop: 12,
          fontSize: "clamp(36px,7vw,88px)", fontWeight: 900,
          color: "rgba(26,77,46,0.04)", letterSpacing: "-2px",
          userSelect: "none", lineHeight: 1,
        }}>
          Ogalandlord
        </div>
      </div>
    </footer>
  );
}

const FAQS = [
  { q: 'What does "Verified Agent" mean?', a: 'A verified agent has passed our identity checks, location confirmation, and activity review. Only agents who meet our verification standards are allowed to list properties on the platform.', open: true },
  { q: "Are all properties on this platform real?", a: "Yes. All listings are submitted by verified agents." },
  { q: "Do I need to pay before inspection?", a: "No. We advise against paying any money before physically inspecting a property." },
  { q: "Can I report a suspicious agent or listing?", a: "Yes. Use the report button on any listing or agent profile." },
];

export default function AboutUs() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div style={{ fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif", color: "#111827" }}>
      <Navbar navigate={navigate} />

      {/* ── Hero ── */}
      <section style={{ background: "#f9fafb", padding: "64px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: "#1a4d2e", lineHeight: 1.2, marginBottom: 32 }}>
            Trusted Experts in Real<br />Estate Excellence
          </h1>
          {/* Hero image */}
          <div style={{
            width: "100%", height: 340, borderRadius: 20,
            background: "linear-gradient(135deg,#d1fae5,#a7f3d0)",
            overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 72,
          }}>
            <img src="./../../assets/about-hero.png" alt="About us"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            🏗️
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ background: "#fff", padding: "0 40px" }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "flex", flexWrap: "wrap",
          border: "1px solid #e5e7eb", borderRadius: 16,
          overflow: "hidden",
          transform: "translateY(-24px)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        }}>
          {[
            { value: "100+", label: "Inspections Completed" },
            { value: "200+", label: "Verified Listings" },
            { value: "1000+", label: "Tenants Assisted" },
            { value: "95%", label: "Positive Feedback" },
          ].map((stat, i, arr) => (
            <div key={stat.label} style={{
              flex: "1 1 150px",
              padding: "32px 24px",
              borderRight: i < arr.length - 1 ? "1px solid #e5e7eb" : "none",
              background: "#fff",
            }}>
              <p style={{ fontSize: "clamp(28px,3vw,40px)", fontWeight: 900, color: "#111827", marginBottom: 4 }}>
                {stat.value}
              </p>
              <p style={{ fontSize: 13, color: "#6b7280" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section style={{ padding: "40px 40px 80px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {[
            {
              title: "Our Mission",
              text: "Our mission is to make renting safer and more transparent by connecting tenants with verified agents and reliable property listings. We work to reduce rental scams through verification, community reporting, and clear guidance, helping people find homes with confidence and peace of mind.",
            },
            {
              title: "Our Vision",
              text: "Our vision is to create a trusted rental ecosystem where finding a home is transparent, secure, and stress-free. We aim to become the go-to platform for verified rental listings, empowering tenants to make informed decisions while holding agents accountable through trust, technology, and community collaboration.",
            },
          ].map((section, i) => (
            <div key={section.title} style={{
              display: "flex", gap: 60, flexWrap: "wrap", alignItems: "flex-start",
              paddingBottom: 40, marginBottom: i === 0 ? 40 : 0,
              borderBottom: i === 0 ? "1px solid #e5e7eb" : "none",
            }}>
              <div style={{ flex: "0 0 220px" }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1a4d2e" }}>{section.title}</h2>
              </div>
              <div style={{ flex: 1, minWidth: 240 }}>
                <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.8 }}>{section.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Leading the Way ── */}
      <section style={{ padding: "80px 40px", background: "#f9fafb" }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "flex", gap: 60, flexWrap: "wrap", alignItems: "center",
        }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: "#1a4d2e", marginBottom: 32, lineHeight: 1.25 }}>
              Leading the Way in Safer Rentals
            </h2>

            <div style={{ marginBottom: 28 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "#111827", marginBottom: 8 }}>Verified Agents</h3>
              <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7 }}>
                Only agents who pass our identity, location, and activity checks are allowed to list properties. This helps tenants engage with confidence and reduces the risk of rental scams.
              </p>
            </div>

            <div style={{ marginBottom: 32 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "#111827", marginBottom: 8 }}>Transparent Renting</h3>
              <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7 }}>
                We provide clear property details, upfront charges, and inspection guidance so tenants understand what they're paying for—before making any commitment.
              </p>
            </div>

            <button onClick={() => navigate("/listings")}
              style={{
                padding: "12px 24px", background: "#1a4d2e", color: "#fff",
                border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700,
                cursor: "pointer", fontFamily: "inherit",
              }}>
              View Listings
            </button>
          </div>

          {/* Image */}
          <div style={{
            flex: "0 0 380px", height: 320, borderRadius: 20,
            background: "linear-gradient(135deg,#e0f2fe,#bae6fd)",
            overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 72,
          }}>
            <img src="./../../assets/about-hero.png" alt="Room"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            🪟
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
              <div key={i} style={{
                background: "#fff", borderRadius: 12, marginBottom: 12,
                border: "1px solid #e5e7eb", overflow: "hidden",
              }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
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
                  }}>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 20px 18px", fontSize: 13, color: "#6b7280", lineHeight: 1.65 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  );
}