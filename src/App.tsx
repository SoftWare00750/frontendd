import Welcome from "./pages/Welcome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import ScrollToTop from "./components/ScrollToTop";
import VerifyPhone from "./pages/VerifyPhone";
import Login from "./pages/auth/Login";
import StepForm from "./pages/StepForm";
import Summary from "./pages/Steps/Summary";
import DashboardLayout from "./agentdashboardlayout/DashboardLayout";
import Dashboard from "./pages/agentdashboard/Dashboard";
import Listings from "./pages/listings/Listings";


function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-phone" element={<VerifyPhone />} />
        <Route path="/login" element={<Login />} />
        <Route path="/stepform" element={<StepForm />} />
        <Route path="/summary" element={<Summary />} />

        {/* Protected routes */}
       <Route path="/"element={<DashboardLayout />} >
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/listings" element={<Listings />} />

       </Route>
      </Routes>
    </Router>
  );
}

export default App;
