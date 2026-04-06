import { LeftSection2 } from "../../../components/shared/LeftSection2";
import LoginForm from "../../../components/tenant/LoginForm1";

export default function Login1() {
  return (
    <div style={{ height: "100vh", display: "flex", overflow: "hidden" }}>
      {/* LEFT PANEL */}
      <div style={{ width: "45%", flexShrink: 0, overflow: "hidden" }}>
        <LeftSection2 />
      </div>

      {/* RIGHT PANEL */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", width: "20%" }}>
        <LoginForm />
      </div>
    </div>
  );
}