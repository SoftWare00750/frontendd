// ListingsProperty.tsx — OgaLandlord Property Detail Page
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FAQS = [
  { q: 'What does "Verified Agent" mean?', a: 'A verified agent has passed our identity checks, location confirmation, and activity review. Only agents who meet our verification standards are allowed to list properties on the platform.' },
  { q: "Are all properties on this platform real?", a: "Yes. All listings are submitted by verified agents." },
  { q: "Do I need to pay before inspection?", a: "No. We advise against paying any money before physically inspecting a property." },
  { q: "Can I report a suspicious agent or listing?", a: "Yes. Use the report button on any listing or agent profile." },
];

const GALLERY_IMGS = [
  "/./../../assets/gallery/g1.png",
  "/./../../assets/gallery/g2.png",
  "/./../../assets/gallery/g3.png",
];

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <img src="/./../../assets/logo.png" alt="OgaLandlord" style={{ height: 32, objectFit: "contain" }}
        onError={(e) => { e.currentTarget.style.display = "none"; }} />
      <span style={{ fontWeight: 900, fontSize: 17, color: "#1a4d2e" }}>OGA</span>
      <span style={{ fontWeight: 400, fontSize: 13, color: "#374151" }}>Landlord</span>
    </div>
  );
}

export default function ListingsProperty() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [email, setEmail] = useState("");
  const [galleryIdx, setGalleryIdx] = useState(0);

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
                background: "none", border: "none", cursor: "pointer",
                fontSize: 14, fontWeight: path === "/listings" ? 700 : 500,
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

      {/* ── Property title ── */}
      <section style={{ background: "#f9fafb", padding: "40px 40px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(22px,3vw,36px)", fontWeight: 900, color: "#1a4d2e", marginBottom: 24, lineHeight: 1.2 }}>
            Central Park Estate Lekki<br />Phase 1, Lagos City
          </h1>

          {/* Image gallery */}
          <div style={{ display: "flex", gap: 12, height: 320 }}>
            {/* Main image */}
            <div style={{
              flex: "0 0 56%", borderRadius: 16, overflow: "hidden",
              background: "linear-gradient(135deg,#d1fae5,#a7f3d0)",
              position: "relative",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56,
            }}>
              <img src="/./../../assets/property-main.png" alt="Property main"
                style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
                onError={(e) => { e.currentTarget.style.display = "none"; }} />
              🏠

              {/* Info card overlay */}
              <div style={{
                position: "absolute", bottom: 20, left: 20,
                background: "#fff", borderRadius: 12, padding: "16px 20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                minWidth: 180,
              }}>
                <span style={{
                  background: "#d1fae5", color: "#065f46",
                  fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20, marginBottom: 10, display: "inline-block",
                }}>Available</span>
                <p style={{ fontSize: 18, fontWeight: 900, color: "#111827", margin: "6px 0 2px" }}>₦1,000,000<span style={{ fontSize: 12, fontWeight: 400, color: "#9ca3af" }}>/yr</span></p>
                <p style={{ fontSize: 10, color: "#9ca3af", margin: 0 }}>Price</p>
                <div style={{ borderTop: "1px solid #f3f4f6", marginTop: 12, paddingTop: 12 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#111827", margin: "0 0 2px" }}>Gbenga Yinka</p>
                  <p style={{ fontSize: 10, color: "#9ca3af", margin: "0 0 8px" }}>Agent</p>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#111827", margin: "0 0 2px" }}>January 23, 2026</p>
                  <p style={{ fontSize: 10, color: "#9ca3af", margin: 0 }}>Date Posted</p>
                </div>
              </div>
            </div>

            {/* Secondary image */}
            <div style={{
              flex: 1, borderRadius: 16, overflow: "hidden",
              background: "linear-gradient(135deg,#fef3c7,#fde68a)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56,
            }}>
              <img src="/./../../assets/property-main.png" alt="Property"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { e.currentTarget.style.display = "none"; }} />
              🚪
            </div>
          </div>
        </div>
      </section>

      {/* ── Property Info ── */}
      <section style={{ padding: "40px 40px", background: "#f9fafb" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: "#111827", marginBottom: 20 }}>Property Info</h2>

          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {/* Left: description */}
            <div style={{ flex: 2, minWidth: 300 }}>
              <div style={{
                background: "#fff", borderRadius: 16, padding: "24px",
                border: "1px solid #e5e7eb",
              }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 12 }}>Property Description</h3>
                <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
                  A well-finished 3-bedroom apartment with 2 bathrooms, featuring built-in wardrobes, fully tiled floors, and a modern POP ceiling design. The property is conveniently located close to the main road for easy access.
                </p>
                <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
                  The apartment offers a practical layout suitable for families or professionals, with good ventilation and a comfortable living space designed for everyday convenience and easy maintenance.
                </p>
                <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.8, marginBottom: 24 }}>
                  Located within Central Park Estate, Lekki Phase 1, the property sits in a secure and well-developed residential area with easy access to major roads, shopping centers, and everyday amenities.
                </p>

                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 12 }}>Special Requirement</h3>
                <div style={{ display: "flex", gap: 40 }}>
                  <div>
                    <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>Religion</p>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>Islamic</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>Marital Status</p>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>Married</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: price breakdown */}
            <div style={{ flex: 1, minWidth: 240, display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Charges card */}
              <div style={{ background: "#fff", borderRadius: 16, padding: "24px", border: "1px solid #e5e7eb" }}>
                {[
                  { label: "Rent Amount", value: "₦1,000,000/year" },
                  { label: "Service Charge", value: "₦100,000" },
                  { label: "Damage Charge", value: "₦200,000" },
                  { label: "Agent Fees", value: "₦200,000" },
                  { label: "Total Package", value: "₦1,500,000" },
                ].map(({ label, value }) => (
                  <div key={label} style={{ marginBottom: 14 }}>
                    <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 3px" }}>{label}</p>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#111827", margin: 0 }}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Inspection + CTA */}
              <div style={{ background: "#fff", borderRadius: 16, padding: "20px 24px", border: "1px solid #e5e7eb" }}>
                <p style={{ fontSize: 11, color: "#9ca3af", marginBottom: 3 }}>Inspection fee</p>
                <p style={{ fontSize: 18, fontWeight: 900, color: "#111827", marginBottom: 6 }}>₦10,000</p>
                <p style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.55, marginBottom: 16 }}>
                  A one-time fee required to inspect the property. This fee is non-refundable and does not count toward rent or other charges.
                </p>
                <button style={{
                  width: "100%", padding: "13px",
                  background: "#1a4d2e", color: "#fff",
                  border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700,
                  cursor: "pointer", fontFamily: "inherit",
                }}>Contact Agent</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section style={{ padding: "0 40px 60px", background: "#f9fafb" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: "#111827", marginBottom: 20 }}>Gallery</h2>
          <div style={{ display: "flex", gap: 16 }}>
            {/* Main gallery image */}
            <div style={{
              flex: 1, height: 280, borderRadius: 16,
              background: "linear-gradient(135deg,#d1fae5,#6ee7b7)",
              overflow: "hidden", position: "relative",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56,
            }}>
              <img src={GALLERY_IMGS[galleryIdx]} alt="Gallery"
                style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
                onError={(e) => { e.currentTarget.style.display = "none"; }} />
              🏠
              {/* Dot controls */}
              <div style={{ position: "absolute", bottom: 16, left: 16, display: "flex", gap: 6 }}>
                {GALLERY_IMGS.map((_, i) => (
                  <button key={i} onClick={() => setGalleryIdx(i)}
                    style={{
                      width: i === galleryIdx ? 20 : 7, height: 7, borderRadius: 4,
                      background: i === galleryIdx ? "#fff" : "rgba(255,255,255,0.5)",
                      border: "none", cursor: "pointer", padding: 0,
                    }} />
                ))}
              </div>
            </div>

            {/* Secondary gallery image */}
            <div style={{
              flex: 1, height: 280, borderRadius: 16,
              background: "linear-gradient(135deg,#fef3c7,#fde68a)",
              overflow: "hidden", position: "relative",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56,
            }}>
              <img src="/./../../assets/gallery/g2.png" alt="Gallery 2"
                style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
                onError={(e) => { e.currentTarget.style.display = "none"; }} />
              🚪
              {/* Play/more indicator */}
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                width: 44, height: 44, borderRadius: "50%",
                background: "rgba(0,0,0,0.45)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, color: "#fff",
              }}>▶</div>
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