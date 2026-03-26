import TenantSignup from "./pages/tenant/auth/tenantSignup";
import { RoleSelect, CreateAccount, VerifyPhone2 } from "./pages/tenant/auth/tenantSignup";
import AgentSignup from "./pages/agent/auth/Signup"; // your existing agent signup
import Welcome from "./pages/agent/onboarding/Welcome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/agent/auth/Signup";
import ScrollToTop from "./components/shared/ScrollToTop";
import VerifyPhone1 from "./pages/agent/onboarding/VerifyPhone";
import Login from "./pages/agent/auth/Login";
import Login1 from "./pages/tenant/auth/Login1";
import StepForm from "./pages/agent/onboarding/StepForm";
import Summary from "./pages/agent/onboarding/Summary";
import DashboardLayout from "./layouts/agent/DashboardLayout";
import Dashboard from "./pages/agent/dashboard/Dashboard";
import Listings from "./pages/agent/dashboard/Listings";
import Listings1 from "./pages/tenant/public/Listings";
import ListingsProperty from "./pages/tenant/public/ListingProperty";
import Privacy from "./pages/tenant/public/Privacy";
import TermsOfUse from "./pages/tenant/public/TermsOfUse";
import Home from "./pages/tenant/public/Home";
import AboutUs from "./pages/tenant/public/AboutUs";
import AgentProfile from "./pages/tenant/public/AgentProfile";
import AgentList from "./pages/tenant/public/AgentList";
import Contact from "./pages/tenant/public/Contact";
import FAQ from "./pages/tenant/public/FAQ";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Root now loads the tenant signup */}
        <Route path="/" element={<TenantSignup />} />
        <Route path="/tenant/signup"         element={<RoleSelect />} />
      <Route path="/tenant/signup/create"  element={<CreateAccount />} />
      <Route path="/tenant/signup/verify"  element={<VerifyPhone2 />} />
      <Route path="/Home"  element={<Home />} />
      <Route path="/AboutUs"  element={<AboutUs />} />
      <Route path="/Contact"  element={<Contact />} />
      <Route path="/login1" element={<Login1 />} />
      <Route path="/Listings1"  element={<Listings1 />} />
      <Route path="/ListingProperty"  element={<ListingsProperty />} />
      <Route path="/AgentProfile"  element={<AgentProfile />} />
      <Route path="/AgentList"  element={<AgentList />} />
      <Route path="/FAQ"  element={<FAQ />} />

      <Route path="/agent/signup"          element={<AgentSignup />} />

        {/* Agent onboarding — moved to /agent */}
        <Route path="/agent" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-phone" element={<VerifyPhone1 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/stepform" element={<StepForm />} />
        <Route path="/summary" element={<Summary />} />

        {/* Protected agent dashboard routes */}
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/privacy" element={<Privacy/>} />
          <Route path="/terms" element={<TermsOfUse/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;