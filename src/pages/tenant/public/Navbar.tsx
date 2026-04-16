import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "About Us", path: "/AboutUs" },
    { label: "Listings", path: "/Listings1" },
    { label: "Contact", path: "/Contact" },
    { label: "Agents", path: "/Agentlist" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 h-[60px] flex items-center justify-between px-6 md:px-10 lg:p-10 p-5 ">
        {/* Logo */}
        <div onClick={() => navigate("/Home")} className="cursor-pointer">
          <img src="/assets/logo.svg" alt="logo" />
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ label, path }) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className="text-sm font-medium text-gray-700 hover:text-black cursor-pointer"
            >
              {label}
            </button>
          ))}

          <button
            onClick={() => navigate("/tenant/signup")}
            className="bg-[#014421] text-white px-5 py-2 rounded-lg text-sm font-bold"
          >
            Get Started
          </button>
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1"
        >
          <span
            className={`block w-6 h-[2px] bg-gray-700 transition ${
              menuOpen ? "rotate-45 translate-y-[6px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-gray-700 transition ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-gray-700 transition ${
              menuOpen ? "-rotate-45 -translate-y-[6px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed top-[60px] left-0 w-full bg-white border-b border-gray-200 p-4 flex flex-col gap-3 z-40 md:hidden">
          {links.map(({ label, path }) => (
            <button
              key={label}
              onClick={() => {
                navigate(path);
                setMenuOpen(false);
              }}
              className="text-left text-gray-700 text-sm font-medium py-2"
            >
              {label}
            </button>
          ))}

          <button
            onClick={() => {
              navigate("/tenant/signup");
              setMenuOpen(false);
            }}
            className="bg-[#014421] text-white px-5 py-3 rounded-lg text-sm font-bold mt-2"
          >
            Get Started
          </button>
        </div>
      )}
    </>
  );
}
