import { useNavigate } from "react-router-dom";
import { LeftSection } from "./../../../components/shared/LeftSection";

interface Props {
  prev?: () => void;
}

export const Verification = ({ prev }: Props) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (prev) prev();
    else navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f0faf0]">
      {/* Left Section - hidden on mobile */}
      <div className="hidden md:flex md:w-1/2">
        <LeftSection />
      </div>

      {/* Right Section */}
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Header - desktop only */}
        <header className="hidden md:flex items-center px-10 py-5 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-2">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="9" stroke="#1a5c37" strokeWidth="2.2" fill="none" />
              <circle cx="12" cy="12" r="4" fill="#1a5c37" />
              <circle cx="20" cy="20" r="5" fill="#1a5c37" />
              <path d="M17.5 20h5M20 17.5v5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className="text-[#1a5c37] font-bold text-xl tracking-tight">
              OGA<span className="font-normal text-gray-700">Landlord</span>
            </span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 items-center justify-center px-4 py-10 md:py-0">
          {/* Card */}
          <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10 flex flex-col items-center gap-6">
            {/* Clock Icon */}
            <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="16" cy="16" r="12" stroke="#d97706" strokeWidth="2" fill="none" />
                <path
                  d="M16 9v7l4 2.5"
                  stroke="#d97706"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Title & Description */}
            <div className="text-center">
              <h2 className="text-[1.35rem] font-bold text-gray-900 mb-2">
                Verification Pending
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Your documents are being reviewed by our team.
                <br />
                This typically takes 24–48 hours.
              </p>
            </div>

            {/* Status Badge */}
            <div className="w-full border border-gray-100 rounded-xl px-4 py-4 flex items-center gap-3 bg-gray-50">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-800">Under Review</p>
                <p className="text-xs text-gray-400 mt-0.5">Submitted 2 hours ago</p>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-[#1a5c37] hover:bg-[#154d2e] active:scale-[0.98] transition-all duration-150 text-white text-sm font-semibold py-4 rounded-xl"
            >
              Go to Dashboard
            </button>
          </div>
        </main>

        {/* Footer - desktop only */}
        <footer className="hidden md:flex items-center justify-between px-10 py-4 border-t border-gray-100 bg-white text-xs text-gray-400">
          <span>© 2026 OgaLandLord. All right reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-gray-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Get help</a>
          </div>
        </footer>
      </div>

      {/* Mobile: Step Progress Bar + back button */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#f0faf0] z-10 px-4 pt-3 pb-2">
        <button
          onClick={handleBack}
          aria-label="Go back"
          className="mb-2 text-[#1a5c37] p-1 -ml-1"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
          <span className="font-medium text-gray-700">Step 5 of 5</span>
          <span className="font-semibold text-[#1a5c37]">100%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full w-full bg-[#1a5c37] rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Verification;