import { LeftSection } from "./../../../components/shared/LeftSection";
import LoginForm from "./../../../components/agent/LoginForm";

export default function Login() {
  return (
    <div style={{ height: "100vh", display: "flex", overflow: "hidden" }}>
      {/* LEFT PANEL */}
      <div style={{ width: "45%", flexShrink: 0, overflow: "hidden" }}>
        <LeftSection />
      </div>

      {/* RIGHT PANEL */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", width: "20%" }}>
        <LoginForm />
      </div>
    </div>
  );
}