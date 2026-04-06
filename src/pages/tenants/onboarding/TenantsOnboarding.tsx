import { ArrowRight, Building2, CheckCircle, Users2 } from "lucide-react";
import { Link } from "react-router-dom";


export default function JoinRolePage() {
  return (
    <div className="min-h-screen bg-[#EEF5F1] flex flex-col justify-between">
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-6 border-b border-gray-300">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="" />
        </div>

        <div className="text-sm text-gray-600">
          Already have an account?{" "}
          <span className="text-green-700 cursor-pointer">Login</span>
        </div>
      </header>

      {/* Center Content */}
      <main className="flex flex-col items-center text-center -mt-10 mb-20">
        <h1 className="text-3xl font-medium text-green-900 mb-2 mt-20">
          How would you like to join?
        </h1>
        <p className="text-gray-500 mb-10">
          Select your role to get started with OgaLandlord
        </p>

        <div className="flex gap-6">
          {/* Agent Card */}
          <div className="w-[320px] bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-left hover:shadow-md transition">
            <div className="w-10 h-10 bg-green-800 rounded-md mb-4 text-white pt-2 "><Users2 className=" m-auto"/></div>

            <h2 className="font-semibold text-lg text-green-800 mb-2 font-medium">
              Agent
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              List properties, get verified, and connect with tenants and
              landlords looking to rent
            </p>

            <ul className="text-sm text-gray-600 space-y-3 mb-6">
              <li className="flex items-center gap-2"><CheckCircle size={18}/> Verified agent badge</li>
              <li className="flex items-center gap-2"><CheckCircle size={18}/> Build trust with tenants</li>
              <li className="flex items-center gap-2"><CheckCircle size={18}/> Grow your rental business</li>
            </ul>

            <Link to="/agent/onboarding">
              <button className="text-green-700 font-medium flex items-center gap-1 cursor-pointer">
                Get Started <ArrowRight size={18}/>
              </button>
            </Link>
          </div>

          {/* Tenant Card */}
          <div className="w-[320px] bg-[#FFF] rounded-xl border border-gray-200 p-6 text-left hover:shadow-md transition">
            <div className="w-10 h-10 bg-green-800 rounded-md text-white pt-2 mb-4"><Building2 className="m-auto"/></div>

            <h2 className="font-semibold text-lg text-green-800 mb-2 font-medium">
              Tenant/LandLord
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              Browse verified listings and connect with trusted agents
            </p>

            <ul className="text-sm text-gray-600 space-y-3 mb-6">
              <li className="flex items-center gap-2"><CheckCircle size={18}/> Browse verified listings</li>
              <li className="flex items-center gap-2"><CheckCircle size={18}/> Secure rental process</li>
              <li className="flex items-center gap-2"><CheckCircle size={18}/> Manage your properties</li>
            </ul>

            <Link to="">
              <button className="text-green-700 font-medium flex items-center gap-1 cursor-pointer">
                Get Started <ArrowRight size={18}/>
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex justify-between px-10 py-6 text-sm text-gray-500 border-t border-gray-300">
        <span>© {new Date().getFullYear()} OgaLandlord. All rights reserved.</span>

        <div className="flex gap-6">
          <span className="cursor-pointer hover:text-gray-700">Privacy</span>
          <span className="cursor-pointer hover:text-gray-700">Terms</span>
          <span className="cursor-pointer hover:text-gray-700">Get help</span>
        </div>
      </footer>
    </div>
  );
}
