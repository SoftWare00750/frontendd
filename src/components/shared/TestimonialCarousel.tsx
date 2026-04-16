// src/components/shared/TestimonialCarousel.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials1 } from "../../data/Testimonial1";

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (next: number, dir: number) => {
    setDirection(dir);
    setIndex(next);
  };

  const handleDot = (i: number) => {
    goTo(i, i > index ? 1 : -1);
  };

  const total = testimonials1.length;
  const current = testimonials1[index];

  // ── Auto-advance every 3 seconds ──────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => {
      const next = (index + 1) % total;
      goTo(next, 1);
    }, 3000);

    return () => clearInterval(timer); // cleanup on unmount or index change
  }, [index, total]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <section className="p-4" style={{ background: "#f0faf4" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h2 className="text-green-700"
          style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 900,
            marginBottom: 14,
            letterSpacing: "-0.5px",
          }}
        >
          Testimonials
        </h2>
        <p
          style={{
            fontSize: 16,
            color: "#4b5563",
            lineHeight: 1.65,
            maxWidth: 360,
            margin: "0 auto",
          }}
        >
          Real experiences from tenants who avoided scams and rented with confidence.
        </p>
      </div>

      <div
        style={{
         
          margin: "0 auto",
          background: "#014421",
          borderRadius: 24,
          padding: "56px 32px 48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 36,
          minHeight: 380,
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%", position: "relative", overflow: "hidden" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <div
                style={{
                  background: "#F9FFE3",
                  borderRadius: 20,
                  padding: "36px 40px",
                  display: "flex",
                  gap: 28,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    overflow: "hidden",
                    background: "#fde8d0",
                    position: "relative",
                    marginTop: 4,
                  }}
                >
                  <img
                    src={current.avatarPlaceholder}
                    alt={current.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <p className="text-green-700 text-[20px]"
                    style={{
                      fontSize: "clamp(16px, 2.2vw, 20px)",
                      fontWeight: 800,
                      marginBottom: 14,
                      lineHeight: 1.35,
                      letterSpacing: "-0.2px",
                    }}
                  >
                    {current.quote}
                  </p>
                  <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.72, marginBottom: 22 }}>
                    {current.body}
                  </p>
                  <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 3 }}>
                    {current.name}
                  </p>
                  <p style={{ fontSize: 13, color: "#9ca3af", fontWeight: 400 }}>
                    {current.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Dot indicators ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {Array.from({ length: total }).map((_, i) => (
  <button
    key={i}
    onClick={() => handleDot(i)}
    aria-label={`Go to testimonial ${i + 1}`}
    style={{
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: i === index ? "#F9FFE3" : "rgba(255,255,255,0.3)",
      border: "none",
      cursor: "pointer",
      padding: 0,
      transition: "background 0.25s ease",
    }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}