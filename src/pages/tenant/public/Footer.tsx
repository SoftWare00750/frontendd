import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Footer({
  navigate,
}: {
  navigate: ReturnType<typeof useNavigate>;
}) {
  const [email, setEmail] = useState("");
  return (
    <footer className="bg-white text-[#111827] border-t border-gray-300">
      <div className=" mx-auto p-5 w-full  mt-5   ">
        <div className=" grid md:grid-cols-2 mb-5 ">
          <img src="/assets/logo.svg" alt="" />
          <div className="about-footer-newsletter w-full mt-5 md:mt-0 m-auto ">
            <p style={{ fontSize: 15, color: "#111827", marginBottom: 10 }}>
              Subscribe to our newsletter
            </p>
            <div className="flex">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="rounded-full border border-gray-300 text-14 bg-[#e5e7eb] text-[#00040b] p-2 w-full"
              />
              <button className="p-4 bg-[#014421] rounded-full cursor-pointer flex items-center -ml-10.5 justify-center px-7 text-white "
              >
                <ArrowRight  size={16}/>
              </button>
            </div>
          </div>
        </div>
        <div className="  flex justify-between pt-10">
          {[
            {
              title: "Pages",
              links: [
                { label: "About", path: "/AboutUs" },
                { label: "Listings", path: "/Listings1" },
                { label: "Agents", path: "/AgentList" },
              ],
            },
            {
              title: "Support",
              links: [
                { label: "FAQ", path: "/FAQ" },
                { label: "Contact Us", path: "/Contact" },
              ],
            },
            {
              title: "Legal",
              links: [
                { label: "Privacy Policy", path: "/privacy" },
                { label: "Terms of Use", path: "/terms" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <p
                style={{
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#111827",
                  marginBottom: 14,
                }}
              >
                {col.title}
              </p>
              {col.links.map(({ label, path }) => (
                <p key={label} style={{ marginBottom: 8 }}>
                  <button
                    onClick={() => navigate(path)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#6b7280",
                      fontSize: 13,
                      cursor: "pointer",
                      padding: 0,
                      fontFamily: "inherit",
                    }}
                  >
                    {label}
                  </button>
                </p>
              ))}
            </div>
          ))}
        </div>
        <div
          style={{
            borderTop: "1px solid #e5e7eb",
            paddingTop: 20,
            paddingBottom: 8,
          }}
        >
          <p style={{ fontSize: 12, color: "#9ca3af" }}>
            © COPYRIGHT 2026 OGALANDLORD
          </p>
        </div>
        <div
          className="about-footer-watermark"
          style={{
            fontSize: "clamp(60px, 12vw, 160px)",
            fontWeight: 700,
            textAlign: "center",
            color: "rgba(0,0,0,0.04)",
            letterSpacing: "-3px",
            userSelect: "none",
            lineHeight: 1,
            marginTop: 8,
            paddingTop: 16,
            overflow: "hidden",
          }}
        >
          Ogalandlord
        </div>
      </div>
    </footer>
  );
}
