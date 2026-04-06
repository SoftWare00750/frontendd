import Onboarding from "./pages/tenant/auth/Onboarding";
import { RoleSelect, CreateAccount, VerifyPhone2 } from "./pages/tenant/auth/Onboarding"
import AgentSignup from "./pages/agent/auth/Signup"; //  existing agent signup
import Login from "./pages/agent/auth/Login"; 
import Welcome from "./pages/agent/onboarding/Welcome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Settings from "./pages/settings/Settings";
import Document from "./pages/Document";
import BusinessInformation from "./pages/BusinessInformation";
import ChangePassword from "./pages/ChangePassword";
import HelpSupport from "./pages/HelpSupport";
// import ProtectedRoute from "./components/Protectedroute/ProtectedRoute";
import MultiStepForm from "./pages/PropertyListing";
import ListingSubmitted from "./pages/ListingSubmitted";
import MessagesPage from "./pages/MessagesPage";
import ChatPage from "./pages/ChatPage";
//import TenantsOnboarding from "./pages/tenants/onboarding/TenantsOnboarding";//
import Waitlist from "./pages/tenant/auth/Waitlist";
import Home from "./pages/tenant/public/Home";
import AboutUs from "./pages/tenant/public/AboutUs";
import Contact from "./pages/tenant/public/Contact";
import Login1 from "./pages/tenant/auth/Login1";
import Listings1 from "./pages/tenant/public/Listings";
import ListingsProperty from "./pages/tenant/public/ListingProperty";
import AgentProfile from "./pages/tenant/public/AgentProfile";
import AgentList from "./pages/tenant/public/AgentList";
import FAQ from "./pages/tenant/public/FAQ";
import ScrollToTop from "./components/shared/ScrollToTop";
import VerifyPhone1 from "./pages/agent/onboarding/VerifyPhone";
import StepForm from "./pages/agent/onboarding/StepForm";
import Summary from "./pages/agent/onboarding/Summary";
import Dashboard from "./pages/agent/dashboard/Dashboard";
import DashboardLayout from "./layouts/agent/DashboardLayout";
import PersonalInformation from "./pages/PersornalInformation";
import SubscriptionPlan from "./components/subscription/SubscriptionPlan";
import CompletePayment from "./components/subscription/CompletePayment";
import SubscriptionActivated from "./components/subscription/AtivatedSubscription";
import Reports from "./pages/report/Reports";
import ReportDetails from "./pages/report/ReportDetails";
import Listings from "./pages/agent/dashboard/Listings";
import Privacy from "./pages/tenant/public/Privacy";
import TermsOfUse from "./pages/tenant/public/TermsOfUse";


function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>

        {/* Root now loads the tenant signup */}
         <Route path="/" element={<Home />} />
         <Route path="/Home" element={<Home />} />
         <Route path="/Waitlist" element={<Waitlist />} />
        <Route path="/Onboarding"  element={<Onboarding />} />
        <Route path="/tenant/signup"    element={<RoleSelect />} />
      <Route path="/tenant/signup/create"  element={<CreateAccount />} />
      <Route path="/tenant/signup/verify"  element={<VerifyPhone2 />} />
      <Route path="/login1" element={<Login1 />} />
      <Route path="/AboutUs"  element={<AboutUs />} />
      <Route path="/Contact"  element={<Contact />} />
      <Route path="/Listings1"  element={<Listings1 />} />
      <Route path="/ListingProperty"  element={<ListingsProperty />} />
      <Route path="/AgentProfile"  element={<AgentProfile />} />
      <Route path="/AgentList"  element={<AgentList />} />
      <Route path="/FAQ"  element={<FAQ />} />

      <Route path="/agent/signup" element={<AgentSignup />} />
      <Route path="/agent/login" element={<Login />} />

        {/* Agent onboarding — moved to /agent */}
        <Route path="/agent" element={<Welcome />} />
        <Route path="/verify-phone" element={<VerifyPhone1 />} />
        <Route path="/step-form" element={<StepForm />} />
        <Route path="/summary" element={<Summary />} />
        

          {/* TENANTS SIGNUP */}
        


{/* Agent dashboard  */}
          <Route  element={<DashboardLayout />}>

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/subscription" element={<SubscriptionPlan />} />
            <Route path="/Payment/:id" element={<CompletePayment />} />
            <Route path="/activated" element={<SubscriptionActivated />} />
            <Route path="/agent/reports" element={<Reports />} />
            <Route path="/agent/reports/details/:id" element={<ReportDetails />} />
            <Route path="settings/personal-info" element={<PersonalInformation />}/>
            <Route path="settings/business-info" element={<BusinessInformation />}/>
            <Route path="settings/change-password" element={<ChangePassword />} />
            <Route path="settings/my-document" element={<Document />} />
            <Route path="settings/help-support" element={<HelpSupport />} />
            {/* LISTINGS */}
            <Route path="agent/listings" element={<MultiStepForm />} />
            <Route path="listings" element={<Listings />} />
            <Route path="dashboard/listing-submitted" element={<ListingSubmitted />}/>
            {/* CHAT PAGES */}
            <Route path="agent/messages" element={<MessagesPage />} />
            <Route path="agent/chat/:id" element={<ChatPage />} />

          </Route>
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<TermsOfUse />} />
          
      </Routes>
    </Router>
  );
}

export default App;