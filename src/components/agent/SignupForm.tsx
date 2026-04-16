import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../shared/Input";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { isAlreadyRegistered } from "../../data/user";

interface FormState {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  idNo: string;
  id?: string;
  type?: string;
}
type FormErrors = Partial<FormState> & { general?: string };

const options = [
  {
    id: "1",
    name: "NIN",
  },
  {
    id: "2",
    name: "PASSPORT",
  },
  {
    id: "3",
    name: "DRIVERS_LICENSE",
  },
  {
    id: "4",
    name: "VOTERS_CARD",
  },
];

export default function SignupForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmpassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmpassword, setConfirmPassword] = useState<string>("");
  const [idNo, setIdNo] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [selected, setSelected] = useState("");


  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!fullName.trim()) e.fullName = "Full name is required";
    const phone = phoneNumber.replace(/\s/g, "");
    if (!phone) e.phoneNumber = "Phone number is required";
    else if (!/^0\d{10}$/.test(phone))
      e.phoneNumber =
        "Enter a valid 11-digit Nigerian number (e.g. 08012345678)";
    if (!password) e.password = "Password is required";
    else if (password.length < 6)
      e.password = "Password must be at least 6 characters";

    // Global uniqueness check (live, before submission)
    if (!e.phoneNumber || !e.email) {
      const check = isAlreadyRegistered(phone, email.trim() || undefined);
      if (check.taken) {
        if (check.field === "phone")
          e.phoneNumber = "This phone number is already registered.";
        if (check.field === "email")
          e.email = "This email address is already registered.";
      }
    }

    return e;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setIsLoading(true);
    if (password !== confirmpassword) {
      setErrors({ general: "password does not match" });
    }
    navigate("/verify-phone");
  };

  function Logo() {
    return (
      <img
        src="/assets/logo.svg"
        alt="OgaLandlord"
        style={{ height: 36, objectFit: "contain", display: "block" }}
      />
    );
  }

  return (
    <div className="h-full overflow-hidden bg-[rgb(242,253,245)] flex flex-col">
      {/* Logo */}
      <div
        style={{
          height: 70,
          flexShrink: 0,
          padding: "0 36px",
          borderBottom: "1px solid #f3f4f6",
          display: "flex",
          alignItems: "center",
        }}
        className="fixed top-0 z-50 bg-[rgb(242,253,245)] border-b border-gray-400 w-full"
      >
        <Logo />
      </div>
      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-8 py-8 mt-15">
        <Link to="/tenant/signup" className="cursor-pointer text-green-600">
          <ArrowLeft size={18} />
        </Link>
        <h2 className="md:text-[28px] text-[16px] font-semibold text-green-900 leading-snug text-left mt-5">
          Create Account
        </h2>
        <p className="text-gray-600 text-[12px] mt-2 text-left">
          Join as a verified agent and start listing properties.
        </p>

        {errors.general && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-[13px]">
            {errors.general}
          </div>
        )}

        <form className="flex flex-col gap-4 mt-10" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="flex flex-col">
            <label className="text-[13px] pb-2">
              Full Name<span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`bg-white py-2.5 border rounded-sm p-2 outline-green-900 transition-colors duration-500 ${errors.fullName ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-[11px] mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label className="text-[13px] pb-2">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="08012345678"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`bg-white py-2.5 border rounded-sm p-2 outline-green-900 transition-colors duration-500 ${errors.phoneNumber ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-[11px] mt-1">
                {errors.phoneNumber}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-[13px] pb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              placeholder="Enter your email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`bg-white py-2.5 border rounded-sm p-2 outline-green-900 transition-colors duration-500 ${errors.email ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.email && (
              <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>
            )}
          </div>
          {/* Idtype */}
          <div className="flex flex-col">
            <label className="text-[13px] pb-2">
              IdType <span className="text-red-500">*</span>
            </label>
            {/* select box */}
            <select
              className="bg-white py-2.5 border border-gray-300 rounded-sm p-2 outline-green-900 transition-colors duration-500"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              <option value="" disabled>
                Select an option
              </option>
              {options.length > 0 &&
                options.map((option) => (
                  <option key={option.id} value={option.name}>
                    {" "}
                    {option.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Id no */}
          <div className="flex flex-col">
            <label className="text-[13px] pb-2">
              IdNo <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter id number here"
              value={idNo}
              onChange={(e) => setIdNo(e.target.value)}
              className={`bg-white py-2.5 border rounded-sm p-2 outline-green-900 transition-colors duration-500 ${errors.email ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.email && (
              <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label className="text-[13px] pb-2">
              Password<span className="text-red-500">*</span>
            </label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`bg-white py-2.5 border rounded-sm p-2 outline-green-900 transition-colors duration-500 ${errors.password ? "border-red-400" : "border-gray-300"}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-[58%] cursor-pointer"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-[11px] mt-1">{errors.password}</p>
            )}
          </div>
          {/* confirm password */}
          <div className="flex flex-col relative">
            <label className="text-[13px] pb-2">
              Confirm Password<span className="text-red-500">*</span>
            </label>
            <Input
              type={showConfirmpassword ? "text" : "password"}
              placeholder="Please re-type your password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`bg-white py-2.5 border rounded-sm p-2 outline-green-900 transition-colors duration-500 ${errors.password ? "border-red-400" : "border-gray-300"}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((s) => !s)}
              className="absolute right-3 top-[58%] cursor-pointer"
            >
              {showConfirmpassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-[11px] mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-48 mx-auto bg-green-900 text-white py-3 rounded-lg hover:bg-green-800 transition font-medium text-[16px] flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading && (
              <span className="h-2 w-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {isLoading ? "Creating account..." : "Create account"}
          </button>

          <p className="text-center text-[12px]">
            Already have an account?{" "}
            <Link to="/agent/login" className="text-green-900 font-medium">
              Log in
            </Link>
          </p>
        </form>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 flex justify-between text-xs md:px-10 px-5 text-gray-500 border-t border-gray-300 py-4">
        <span>© {new Date().getFullYear()} OgaLandlord</span>
        <div className="flex gap-5">
          <Link to="/privacy" className="hover:underline cursor-pointer">
            Privacy
          </Link>
          <Link to="/terms" className="hover:underline cursor-pointer">
            Terms
          </Link>
          <Link to="/help" className="hover:underline cursor-pointer">
            Get help
          </Link>
        </div>
      </div>
    </div>
  );
}
