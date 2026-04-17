// ListingsProperty.tsx — OgaLandlord Property Detail Page
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPropertyById } from "../../../data/Propertydata";

const FAQS = [
  { q: 'What does "Verified Agent" mean?', a: 'A verified agent has passed our identity checks, location confirmation, and activity review. Only agents who meet our verification standards are allowed to list properties on the platform.' },
  { q: "Are all properties on this platform real?", a: "Yes. All listings are submitted by verified agents who have gone through our rigorous vetting process." },
  { q: "Do I need to pay before inspection?", a: "No. We strongly advise against paying any money before physically inspecting a property. Always visit the property first." },
  { q: "Can I report a suspicious agent or listing?", a: "Yes. Use the report button on any listing or agent profile to flag suspicious activity. Our team reviews all reports within 24 hours." },
];

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <img
        src="/./../../assets/logo.svg"
        alt="OgaLandlord"
        style={{ height: 32, objectFit: "contain" }}
        onError={(e) => { e.currentTarget.style.display = "none"; }}
      />

    </div>
  );
}

export default function ListingsProperty() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const numericId = parseInt(id ?? "", 10);
  const property = !isNaN(numericId) ? getPropertyById(numericId) : undefined;

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [email, setEmail] = useState("");
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [mainImgFailed, setMainImgFailed] = useState(false);
  const [secondImgFailed, setSecondImgFailed] = useState(false);
  const [galleryMainFailed, setGalleryMainFailed] = useState(false);
  const [gallerySecFailed, setGallerySecFailed] = useState(false);

  // ── 404 fallback ──────────────────────────────────────────────────────────
  if (!property) {
    return (
      <div style={{
        fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif",
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 16,
        background: "#f9fafb", color: "#111827",
      }}>
        <span style={{ fontSize: 64 }}>🏚️</span>
        <h2 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Property not found</h2>
        <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>
          The listing you're looking for doesn't exist or has been removed.
        </p>
        {id && (
          <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>
            Requested ID: <code>{id}</code>
          </p>
        )}
        <button
          onClick={() => navigate("/listings")}
          style={{
            marginTop: 8, padding: "12px 28px", background: "#1a4d2e", color: "#fff",
            border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
          }}>Back to Listings</button>
      </div>
    );
  }

  const isAvailable = property.status === "Available";
  const galleryImgs = property.galleryImgs;

  return (
    <div style={{ fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif", color: "#111827", background: "#f9fafb" }}>

      {/* ══ NAVBAR ══════════════════════════════════════════════════════════ */}
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
            <button key={label} onClick={() => navigate(path)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 14, fontWeight: path === "/listings" ? 700 : 400,
              color: "#374151", fontFamily: "inherit", padding: 0,
            }}>{label}</button>
          ))}
          <button onClick={() => navigate("/listings")} style={{
            background: "#1a4d2e", color: "#fff", border: "none",
            borderRadius: 8, padding: "10px 20px",
            fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          }}>Get Started</button>
        </div>
      </nav>

      {/* ══ SECTION 1 — PROPERTY TITLE + HERO IMAGES ════════════════════════
          Image 2: Title above, then one wide rounded container holding both
          images side-by-side with NO gap between them (seamless). The info
          card overlays the left portion. Right image is cropped by the same
          rounded rect border.                                               */}
      <section style={{ background: "#f9fafb", padding: "36px 40px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          <h1 style={{
            fontSize: "clamp(24px,3vw,36px)", fontWeight: 900,
            color: "#1a4d2e", margin: "0 0 24px", lineHeight: 1.15,
          }}>
            {property.title}
          </h1>

          {/* Single rounded container — two images inside, no gap */}
          <div style={{
            display: "flex", height: 340, borderRadius: 16, overflow: "hidden",
            position: "relative",
          }}>

            {/* Main image — left ~60% */}
            <div style={{
              flex: "0 0 60%", position: "relative", background: "#c8d8c8",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52,
            }}>
              {!mainImgFailed ? (
                <img
                  src={property.img}
                  alt="Property main"
                  style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
                  onError={() => setMainImgFailed(true)}
                />
              ) : "🏠"}

              {/* Info card overlay — bottom-left */}
              <div style={{
                position: "absolute", bottom: 20, left: 20,
                background: "#fff", borderRadius: 14, padding: "16px 20px",
                boxShadow: "0 6px 24px rgba(0,0,0,0.13)", minWidth: 190, zIndex: 2,
              }}>
                <span style={{
                  display: "inline-block",
                  background: isAvailable ? "#d1fae5" : "#fee2e2",
                  color: isAvailable ? "#065f46" : "#991b1b",
                  fontSize: 10, fontWeight: 700, padding: "3px 10px",
                  borderRadius: 20, marginBottom: 10,
                }}>{property.status}</span>

                <p style={{ fontSize: 18, fontWeight: 900, color: "#111827", margin: "0 0 1px" }}>
                  {property.price}
                  <span style={{ fontSize: 12, fontWeight: 400, color: "#9ca3af" }}>{property.period}</span>
                </p>
                <p style={{ fontSize: 10, color: "#9ca3af", margin: "0 0 14px" }}>Price</p>

                <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 12 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#111827", margin: "0 0 2px" }}>{property.agentName}</p>
                  <p style={{ fontSize: 10, color: "#9ca3af", margin: "0 0 12px" }}>Agent</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#111827", margin: "0 0 2px" }}>{property.datePosted}</p>
                  <p style={{ fontSize: 10, color: "#9ca3af", margin: 0 }}>Date Posted</p>
                </div>
              </div>
            </div>

            {/* Thin divider gap */}
            <div style={{ width: 6, background: "#f9fafb", flexShrink: 0 }} />

            {/* Secondary image — right ~40% */}
            <div style={{
              flex: 1, position: "relative", background: "#d8d0c4",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52,
            }}>
              {!secondImgFailed ? (
                <img
                  src={property.img}
                  alt="Property secondary"
                  style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
                  onError={() => setSecondImgFailed(true)}
                />
              ) : "🚪"}
            </div>

          </div>
        </div>
      </section>

      {/* ══ SECTION 2 — PROPERTY INFO ════════════════════════════════════════
          Image 4: Left card: description paragraphs + Special Requirement.
          Right: top charges card (label gray small / value bold black, NO
          dividers, just vertical spacing). Bottom card: Inspection Fee + CTA
          button dark green (#1a4d2e).                                        */}
      <section style={{ padding: "44px 40px 40px", background: "#f9fafb" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: "#1a4d2e", margin: "0 0 20px" }}>
            Property Info
          </h2>

          <div style={{ display: "flex", gap: 18, alignItems: "flex-start", flexWrap: "wrap" }}>

            {/* Left: description + special requirements */}
            <div style={{ flex: "2 1 300px" }}>
              <div style={{
                background: "#fff", borderRadius: 16,
                padding: "26px 26px 26px", border: "1px solid #e5e7eb",
              }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: "0 0 14px" }}>
                  Property Description
                </h3>
                {property.description.map((para: string, i: number) => (
                  <p key={i} style={{
                    fontSize: 13, color: "#6b7280", lineHeight: 1.8,
                    margin: i < property.description.length - 1 ? "0 0 12px" : "0 0 28px",
                  }}>
                    {para}
                  </p>
                ))}

                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: "0 0 14px" }}>
                  Special Requirement
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div>
                    <p style={{ fontSize: 12, color: "#9ca3af", margin: "0 0 3px" }}>Religion</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#111827", margin: 0 }}>
                      {property.specialRequirements.religion}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: 12, color: "#9ca3af", margin: "0 0 3px" }}>Marital Status</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#111827", margin: 0 }}>
                      {property.specialRequirements.maritalStatus}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: charges + inspection/CTA */}
            <div style={{ flex: "1 1 240px", display: "flex", flexDirection: "column", gap: 14 }}>

              {/* Charges card — no internal dividers, label small gray, value bold */}
              <div style={{
                background: "#fff", borderRadius: 16,
                padding: "22px 24px", border: "1px solid #e5e7eb",
              }}>
                {property.charges.map(({ label, value }: { label: string; value: string }, i: number) => (
                  <div key={label} style={{ marginBottom: i < property.charges.length - 1 ? 14 : 0 }}>
                    <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 2px" }}>{label}</p>
                    <p style={{
                      fontSize: 13,
                      fontWeight: label === "Total Package" ? 900 : 700,
                      color: "#111827", margin: 0,
                    }}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Inspection fee + Contact Agent — button is dark green */}
              <div style={{
                background: "#fff", borderRadius: 16,
                padding: "20px 24px", border: "1px solid #e5e7eb",
              }}>
                <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 2px" }}>Inspection Fee</p>
                <p style={{ fontSize: 19, fontWeight: 900, color: "#111827", margin: "0 0 10px" }}>
                  {property.inspectionFee}
                </p>
                <p style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.65, margin: "0 0 16px" }}>
                  A one-time fee required to inspect the property. This fee is non-refundable and does not count
                  toward rent or other charges.
                </p>
                <button
                  disabled={!isAvailable}
                  style={{
                    width: "100%", padding: "14px",
                    background: isAvailable ? "#1a4d2e" : "#9ca3af",
                    color: "#fff", border: "none", borderRadius: 8,
                    fontSize: 14, fontWeight: 700,
                    cursor: isAvailable ? "pointer" : "not-allowed",
                    fontFamily: "inherit",
                  }}>
                  {isAvailable ? "Contact Agent" : "Property Rented"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 3 — GALLERY ══════════════════════════════════════════════
          Image 3: Two equal images, taller (~290px), left has dot nav at
          bottom-center, right has frosted pause icon centered.              */}
      <section style={{ padding: "0 40px 60px", background: "#f9fafb" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: "#1a4d2e", margin: "0 0 20px" }}>
            Gallery
          </h2>

          <div style={{ display: "flex", gap: 14 }}>

            {/* Left gallery image + dot pagination */}
            <div style={{
              flex: 1, height: 300, borderRadius: 16, overflow: "hidden",
              position: "relative", background: "#c8d8c8",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52,
            }}>
              {!galleryMainFailed ? (
                <img
                  src={galleryImgs[galleryIdx]}
                  alt={`Gallery ${galleryIdx + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
                  onError={() => setGalleryMainFailed(true)}
                />
              ) : "🏠"}

              {/* Dot pagination */}
              <div style={{
                position: "absolute", bottom: 16, left: "50%",
                transform: "translateX(-50%)",
                display: "flex", gap: 6, alignItems: "center",
              }}>
                {galleryImgs.map((_: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setGalleryIdx(i)}
                    style={{
                      width: 8, height: 8, borderRadius: "50%",
                      padding: 0, border: "none",
                      background: i === galleryIdx ? "#fff" : "rgba(255,255,255,0.5)",
                      boxShadow: i === galleryIdx ? "0 0 0 2px rgba(255,255,255,0.4)" : "none",
                      cursor: "pointer", transition: "background 0.2s",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right gallery image + pause overlay */}
            <div style={{
              flex: 1, height: 300, borderRadius: 16, overflow: "hidden",
              position: "relative", background: "#d8d0c4",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52,
            }}>
              {!gallerySecFailed ? (
                <img
                  src={galleryImgs[1] ?? galleryImgs[0]}
                  alt="Gallery secondary"
                  style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
                  onError={() => setGallerySecFailed(true)}
                />
              ) : "🚪"}

              {/* Frosted pause button */}
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: 46, height: 46, borderRadius: "50%",
                background: "rgba(255,255,255,0.28)",
                backdropFilter: "blur(4px)",
                border: "1.5px solid rgba(255,255,255,0.55)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
              }}>
                <div style={{ width: 4, height: 15, background: "#fff", borderRadius: 2 }} />
                <div style={{ width: 4, height: 15, background: "#fff", borderRadius: 2 }} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ SECTION 4 — FAQ ══════════════════════════════════════════════════
          Image 5: background is light gray (#f9fafb), not white.
          Left column: heading + subtitle. Right: accordion items.           */}
      <section style={{ background: "#f9fafb", padding: "80px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 80, flexWrap: "wrap" }}>

          <div style={{ flex: "0 0 240px" }}>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: "#1a4d2e", margin: "0 0 14px", lineHeight: 1.2 }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65, margin: 0 }}>
              If there are question you want to ask. We will answer all your question.
            </p>
          </div>

          <div style={{ flex: 1, minWidth: 280 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{
                background: "#fff", borderRadius: 12, marginBottom: 10,
                border: "1px solid #e5e7eb", overflow: "hidden",
              }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%", padding: "18px 20px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: 14, fontWeight: 600, color: "#111827",
                    textAlign: "left", fontFamily: "inherit",
                  }}>
                  {faq.q}
                  <span style={{
                    width: 24, height: 24, borderRadius: "50%",
                    border: "1.5px solid #d1d5db",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, color: "#6b7280", fontSize: 18, fontWeight: 300,
                    marginLeft: 12,
                  }}>
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 20px 18px", fontSize: 13, color: "#6b7280", lineHeight: 1.7 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 5 — FOOTER ═══════════════════════════════════════════════
          Image 6: white background. Top: logo left, newsletter right.
          Middle: 3 link columns (Pages / Support / Legal) spread wide.
          Bottom: copyright line, then large watermark wordmark.             */}
      <footer style={{ background: "#fff", borderTop: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "52px 40px 0" }}>

          {/* Top row — logo + newsletter */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-start", flexWrap: "wrap", gap: 32, marginBottom: 52,
          }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
             
                  <img
        src="/./../../assets/logo.svg"
        alt="OgaLandlord"
        style={{ height: 32, objectFit: "contain" }}
        onError={(e) => { e.currentTarget.style.display = "none"; }}
      />
            </div>

            {/* Newsletter */}
            <div>
              <p style={{ fontSize: 14, color: "#374151", fontWeight: 500, margin: "0 0 10px" }}>
                Subscribe to our newsletter
              </p>
              <div style={{ display: "flex" }}>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  style={{
                    padding: "11px 16px", borderRadius: "8px 0 0 8px",
                    border: "1px solid #e5e7eb", borderRight: "none",
                    fontSize: 13, outline: "none", width: 240,
                    fontFamily: "inherit", color: "#374151", background: "#fff",
                  }}
                />
                <button style={{
                  padding: "11px 16px", background: "#1a4d2e", border: "none",
                  borderRadius: "0 8px 8px 0", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Link columns — spread across full width */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            flexWrap: "wrap", gap: 32, marginBottom: 48,
          }}>
            <div>
              <p style={{ fontWeight: 700, fontSize: 14, color: "#111827", margin: "0 0 16px" }}>Pages</p>
              {[{ label: "About", path: "/about" }, { label: "Listings", path: "/listings" }, { label: "Agents", path: "/signup" }].map(({ label, path }) => (
                <p key={label} style={{ margin: "0 0 10px" }}>
                  <button onClick={() => navigate(path)} style={{
                    background: "none", border: "none", color: "#6b7280",
                    fontSize: 13, cursor: "pointer", padding: 0, fontFamily: "inherit",
                  }}>{label}</button>
                </p>
              ))}
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: 14, color: "#111827", margin: "0 0 16px" }}>Support</p>
              {[{ label: "FAQ", path: "/faq" }, { label: "Contact Us", path: "/contact" }].map(({ label, path }) => (
                <p key={label} style={{ margin: "0 0 10px" }}>
                  <button onClick={() => navigate(path)} style={{
                    background: "none", border: "none", color: "#6b7280",
                    fontSize: 13, cursor: "pointer", padding: 0, fontFamily: "inherit",
                  }}>{label}</button>
                </p>
              ))}
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: 14, color: "#111827", margin: "0 0 16px" }}>Legal</p>
              {[{ label: "Privacy Policy", path: "/privacy" }, { label: "Terms of Use", path: "/terms" }].map(({ label, path }) => (
                <p key={label} style={{ margin: "0 0 10px" }}>
                  <button onClick={() => navigate(path)} style={{
                    background: "none", border: "none", color: "#6b7280",
                    fontSize: 13, cursor: "pointer", padding: 0, fontFamily: "inherit",
                  }}>{label}</button>
                </p>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 22, marginBottom: 0 }}>
            <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>
              © COPYRIGHT 2026 OGALANDLORD
            </p>
          </div>

          {/* Large watermark wordmark */}
          <div style={{
            fontSize: "clamp(52px,9vw,110px)", fontWeight: 900,
            color: "rgba(17,24,39,0.04)", letterSpacing: "-3px",
            userSelect: "none", lineHeight: 1,
            marginTop: 4, overflow: "hidden", textAlign: "left",
          }}>
            Ogalandlord
          </div>
        </div>
      </footer>

    </div>
  );
}