import { useState } from "react";


const FAQS = [
  {
    q: 'What does "Verified Agent" mean?',
    a: "A verified agent has passed our identity checks, location confirmation, and activity review. Only agents who meet our verification standards are allowed to list properties on the platform.",
  },
  {
    q: "Are all properties on this platform real?",
    a: "Yes. All listings are submitted by verified agents who have undergone our thorough verification process.",
  },
  {
    q: "Do I need to pay before inspection?",
    a: "No. We advise against paying any money before physically inspecting a property.",
  },
  {
    q: "Can I report a suspicious agent or listing?",
    a: "Yes. Use the report button on any agent profile or listing page to flag suspicious activity.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="about-faq-section" style={{ background: "#f9fafb", padding: "80px 40px" }}>
      <div className="about-faq-inner" style={{ margin: "0 auto", display: "flex", gap: 80, flexWrap: "wrap" }}>
        <div className="about-faq-left" style={{ flex: "0 0 320px" }}>
          <h2 className="about-faq-h2 text-green-700" style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.2, marginBottom: 16, maxWidth: 500 }}>
            Frequently Asked<br />Questions
          </h2>
          <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.65 }}>
            If there are question you want to ask. We will answer all your question.
          </p>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 12, marginBottom: 12, border: "1px solid #e5e7eb", overflow: "hidden" }}>
              <button
                className="about-faq-btn"
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", fontSize: 16, fontWeight: 600, color: "#111827", textAlign: "left", fontFamily: "inherit" }}
              >
                {faq.q}
                <span style={{ width: 24, height: 24, borderRadius: "50%", border: "1.5px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#6b7280", fontSize: 18, minWidth: 24 }}>
                  {open === i ? "−" : "+"}
                </span>
              </button>
              {open === i && (
                <div style={{ padding: "0 20px 18px", fontSize: 14, color: "#6b7280", lineHeight: 1.65 }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



