import TenantSignup from "./pages/tenant/auth/tenantSignup";
import Welcome from "./pages/agent/onboarding/Welcome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/agent/auth/Signup";
import ScrollToTop from "./components/shared/ScrollToTop";
import VerifyPhone from "./pages/agent/onboarding/VerifyPhone";
import Login from "./pages/agent/auth/Login";
import StepForm from "./pages/agent/onboarding/StepForm";
import Summary from "./pages/agent/onboarding/Summary";
import DashboardLayout from "./layouts/agent/DashboardLayout";
import Dashboard from "./pages/agent/dashboard/Dashboard";
import Listings from "./pages/agent/dashboard/Listings";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Root now loads the tenant signup */}
        <Route path="/" element={<TenantSignup />} />

        {/* Agent onboarding — moved to /agent */}
        <Route path="/agent" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-phone" element={<VerifyPhone />} />
        <Route path="/login" element={<Login />} />
        <Route path="/stepform" element={<StepForm />} />
        <Route path="/summary" element={<Summary />} />

        {/* Protected agent dashboard routes */}
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/listings" element={<Listings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;