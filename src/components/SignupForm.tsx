import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "./shared/Input";
import { Eye, EyeOff } from "lucide-react";

export default function Onboarding() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState<boolean | null>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const HandleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    navigate('/signup/upload-document')
  };

  function Logo() {
  return (
    <img
      src="/assets/logo.svg"
      alt="OgaLandlord"
      style={{ height: 20, objectFit: "contain", display: "block" }}
    />
  );
}

  return (
    <div className="bg-[rgb(242,253,245)] py-5 flex flex-col justify-between">
      {/* Logo */}
      
        <Logo />
      
      <div className="md:px-20 px-8">
        {/* Heading */}
        <h2 className="md:text-[28px] text-[16px] font-semibold text-green-900 leading-snug text-left">
          Create Account
        </h2>

        <p className="text-gray-600 text-[12px] mt-2 text-left">
          Join as a verified agent and start listing properties.
        </p>

        {/* form */}

        <form className="flex flex-col gap-4 mt-10" onSubmit={HandleSignup}>
          <div className=" flex flex-col ">
            <label htmlFor="FullName" className="text-[13px] pb-2">
              FullName<span className="text-red-500">*</span>
            </label>
            <Input
            required
              type={`text`}
              placeholder={`Enter your full name`}
              className={`bg-white py-2.5 border border-gray-300 rounded-sm p-2 outline-green-900 transition-colors duration-500`}
            ></Input>
          </div>
          <div className=" flex flex-col ">
            <label htmlFor="phonenumber" className="text-[13px] pb-2">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <Input
            required
              type="text"
              placeholder="081234567890"
              className={`bg-white py-2.5 border border-gray-300 rounded-sm p-2 outline-green-900 transition-colors duration-500`}
            ></Input>
          </div>
          <div className=" flex flex-col ">
            <label htmlFor="email" className="text-[13px] pb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
            required
              type="email"
              placeholder="Enter your email here"
              className={`bg-white py-2.5 border border-gray-300 rounded-sm p-2 outline-green-900 transition-colors duration-500`}
            ></Input>
          </div>
          {/* id type */}
          <div className=" flex flex-col ">
            <label htmlFor="email" className="text-[13px] pb-2">
              IdType <span className="text-red-500">*</span>
            </label>
            
          </div>
          {/* idNo */}
          <div className=" flex flex-col ">
            <label htmlFor="email" className="text-[13px] pb-2">
              IdNo <span className="text-red-500">*</span>
            </label>
            <Input
            required
              type="text"
              placeholder="Enter IdNo here"
              className={`bg-white py-2.5 border border-gray-300 rounded-sm p-2 outline-green-900 transition-colors duration-500`}
            ></Input>
          </div>
          {/* password */}
          <div className=" flex flex-col relative ">
            <label htmlFor="password" className="text-[13px] pb-2">
              Password<span className="text-red-500">*</span>
            </label>
            <Input
            required
              type={showPassword ? "text" : "Password"}
              placeholder="Enter your password here"
              className={`bg-white py-2.5 border border-gray-300 rounded-sm p-2 outline-green-900 transition-colors duration-500`}
            ></Input>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 cursor-pointer mt-2"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          {/*CONFIRM PASSWORD  */}
          <div className=" flex flex-col relative ">
            <label htmlFor="password" className="text-[13px] pb-2">
             Confirm Password<span className="text-red-500">*</span>
            </label>
            <Input
            required
              type={showPassword ? "text" : "Password"}
              placeholder="confirm password"
              className={`bg-white py-2.5 border border-gray-300 rounded-sm p-2 outline-green-900 transition-colors duration-500`}
            ></Input>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 cursor-pointer mt-2"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-900 text-white py-3 rounded-lg hover:bg-green-800 transition font-medium text-[16px] flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading && (
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {isLoading ? "Creating account..." : "Create account"}
          </button>

          <p className="text-center text-[12px]">
            Already have an account?{" "}
            <Link to="/login" className="text-green-900 font-medium">
              Log in
            </Link>
          </p>
        </form>
      </div>

      {/* Footer */}
      <div className="flex justify-between text-xs md:px-10 px-5 text-gray-500 mt-12 border-t border-gray-300 pt-5">
        <span>© {new Date().getFullYear()} OgaLandlord</span>

        <div className="flex gap-5">
          <span className="hover:underline cursor-pointer">Privacy</span>
          <span className="hover:underline cursor-pointer">Terms</span>
          <span className="hover:underline cursor-pointer">Get help</span>
        </div>
      </div>
    </div>
  );
}
