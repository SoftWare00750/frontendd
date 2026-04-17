import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LeftSection } from "../../../components/shared/LeftSection";
import VerifyComponent from "../../../components/agent/VerifyComponent";
import { getSession } from "../../../data/user.ts";

// ─── Generate a random 6-digit verification code ──────────────────────────────
function generateVerificationCode(): string {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return String(100000 + (array[0] % 900000));
}

// ─── Email sender helper ───────────────────────────────────────────────────────
async function sendVerificationCode(email: string, code: string): Promise<void> {
  await fetch("/api/send-verification", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
  console.log(`[dev] Verification code sent to: ${email} — Code: ${code}`);
}

// ─── Mask email for display: e.g. jo***@gmail.com ─────────────────────────────
function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  const visible = local.slice(0, 2);
  return `${visible}${"*".repeat(Math.max(local.length - 2, 3))}@${domain}`;
}

// ─── Auto-fill OTP inputs inside a container (with retry until inputs mount) ──
function autoFillOtpInputs(container: HTMLElement, code: string, attempt = 0) {
  const inputs = Array.from(
    container.querySelectorAll<HTMLInputElement>(
      'input[type="text"], input[type="number"], input:not([type])'
    )
  ).slice(0, 6);

  // Retry up to 10 times (every 100ms) until all 6 inputs are in the DOM
  if (inputs.length < 6 && attempt < 10) {
    setTimeout(() => autoFillOtpInputs(container, code, attempt + 1), 100);
    return;
  }

  const nativeSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  )?.set;

  inputs.forEach((input, i) => {
    const digit = code[i] ?? "";
    nativeSetter?.call(input, digit);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });
}

// ─── CardBody — defined OUTSIDE to prevent remounting on every render ─────────
interface CardBodyProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  sent: boolean;
  error: string | null;
  devCode: string;
  emailLabel: string;
  sending: boolean;
  cooldown: number;
  onResend: () => void;
}

function CardBody({
  containerRef,
  sent,
  error,
  devCode,
  emailLabel,
  sending,
  cooldown,
  onResend,
}: CardBodyProps) {
  return (
    <div ref={containerRef} className="w-full">
      <VerifyComponent />

      <div className="mt-5 text-center space-y-2">
        {sent && !error && (
          <p className="text-xs text-gray-500">
            A verification code was sent to{" "}
            <span className="font-semibold text-gray-700">{emailLabel}</span>
          </p>
        )}

        {/* DEV ONLY — remove before production */}
        {devCode && (
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5">
            <span className="text-[11px] text-amber-600 font-medium">Dev code:</span>
            <span className="font-mono font-bold tracking-[0.2em] text-[#1a5c37] text-sm">
              {devCode}
            </span>
          </div>
        )}

        {error && <p className="text-xs text-red-500">{error}</p>}

        <div>
          <button
            onClick={onResend}
            disabled={sending || cooldown > 0}
            className="text-xs font-semibold text-[#1a5c37] disabled:text-gray-400 disabled:cursor-not-allowed hover:underline transition-colors"
          >
            {sending
              ? "Sending…"
              : cooldown > 0
              ? `Resend code in ${cooldown}s`
              : "Resend code"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface Props {
  prev?: () => void;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function VerifyPhone({ prev }: Props) {
  const navigate = useNavigate();

  // Pull email directly from the session saved during signup (registerUser → saveSession → getSession)
  const session = getSession();
  const email = session?.email ?? "";
  const fullName = session?.fullName ?? "";

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [devCode, setDevCode] = useState<string>("");

  const verificationCodeRef = useRef<string>("");
  const mobileCardRef = useRef<HTMLDivElement>(null);
  const desktopCardRef = useRef<HTMLDivElement>(null);
  const hasSentRef = useRef(false);

  // Auto-fill both layouts whenever a new code is generated
  // No fixed delay — autoFillOtpInputs retries every 100ms until inputs mount
  useEffect(() => {
    if (!devCode) return;
    const fill = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (ref.current) autoFillOtpInputs(ref.current, devCode);
    };
    fill(mobileCardRef);
    fill(desktopCardRef);
  }, [devCode]);

  const triggerSend = useCallback(async () => {
    if (!email) {
      setError("No email address found. Please go back and complete signup.");
      return;
    }
    setSending(true);
    setError(null);
    try {
      const code = generateVerificationCode();
      verificationCodeRef.current = code;
      setDevCode(code);
      await sendVerificationCode(email, code);
      setSent(true);
      setCooldown(60);
    } catch {
      setError("Failed to send the code. Please try again.");
    } finally {
      setSending(false);
    }
  }, [email]);

  // Fire once on mount — hasSentRef guards against React StrictMode double-invoke
  useEffect(() => {
    if (hasSentRef.current) return;
    hasSentRef.current = true;
    triggerSend();
  }, [triggerSend]);

  // Countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  const handleBack = () => {
    if (prev) prev();
    else navigate(-1);
  };

  // Show masked email or fallback to name if no email
  const emailLabel = email
    ? maskEmail(email)
    : fullName
    ? `${fullName}'s registered contact`
    : "your registered contact";

  const sharedCardBodyProps = {
    sent,
    error,
    devCode,
    emailLabel,
    sending,
    cooldown,
    onResend: triggerSend,
  };

  return (
    <div className="h-screen overflow-hidden bg-[rgb(242,253,245)] lg:h-auto lg:min-h-screen lg:overflow-auto">

      {/* ── MOBILE LAYOUT (< lg) ── */}
      <div className="flex flex-col h-screen lg:hidden">

        {/* Top bar — back button only, no step/progress bar */}
        <div className="flex-shrink-0 h-14 flex items-center px-5">
          <button
            onClick={handleBack}
            className="text-[#1a5c37] p-1 -ml-1"
            aria-label="Go back"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
        </div>

        {/* Card */}
        <div className="flex-1 px-4 pt-2 pb-4 min-h-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full h-full px-6 py-8 flex flex-col items-center justify-center">
            <CardBody containerRef={mobileCardRef} {...sharedCardBodyProps} />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex-shrink-0 px-4 pb-10 pt-3 bg-[rgb(242,253,245)]">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-[#1a5c37] hover:bg-[#154d2e] active:scale-[0.98] transition-all duration-150 text-white text-sm font-semibold py-4 rounded-xl"
          >
            Go to Dashboard
          </button>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT (lg+) ── */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-2 gap-5 max-w-7xl mx-auto p-5">

          <div className="w-full rounded-xl overflow-hidden">
            <LeftSection />
          </div>

          <div className="w-full rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 mb-12 border-b border-b-gray-300">
              <img
                src="/public/assets/logo.svg"
                alt="OgaLandlord Logo"
                className="pb-5 md:px-10 md:w-[35%] w-[40%]"
              />
            </div>

            <div className="flex items-center gap-2 mb-12">
              <img
                src="/public/assets/icons.svg"
                alt="OgaLandlord Logo"
                className="pb-5 px-10 w-full"
              />
            </div>

            <CardBody containerRef={desktopCardRef} {...sharedCardBodyProps} />

            <div className="flex justify-between text-xs md:px-10 px-5 text-gray-500 mt-12 border-t border-gray-300 pt-5">
              <span>© {new Date().getFullYear()} OgaLandlord</span>
              <div className="flex gap-5">
                <span className="hover:underline cursor-pointer">Privacy</span>
                <span className="hover:underline cursor-pointer">Terms</span>
                <span className="hover:underline cursor-pointer">Get help</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}