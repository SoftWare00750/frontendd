import { LeftSection } from "../../../components/shared/LeftSection";
import SignupForm from "../../../components/agent/SignupForm";

export default function Signup() {
  return (
    <div style={{ height: "100vh", display: "flex", overflow: "hidden" }}>
      {/* LEFT PANEL */}
      <div style={{ width: "45%", flexShrink: 0, overflow: "hidden" }}>
        <LeftSection />
      </div>

      {/* RIGHT PANEL */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <SignupForm />
      </div>
    </div>
  );
}