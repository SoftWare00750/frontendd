import OTPInput from "./OTPInput"
import { Link } from "react-router-dom"

export default function VerifyComponent() {
  return (
    <div className="max-w-md w-full text-center mx-auto rounded-xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Verify Your Phone
      </h2>

      <p className="text-gray-500 text-sm mb-6">
        Enter the 6-digit code sent to{" "}
        <span className="font-medium">example@mail.com</span>
      </p>

      {/* Constrain OTP box width on mobile so all 6 fit */}
      <div className="flex justify-center">
        <div className="w-full max-w-[320px] px-1">
          <OTPInput />
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Resend code in{" "}
        <span className="text-green-700 font-medium">53s</span>
      </p>

      <Link to="/step-form">
        <button className="w-full mt-6 bg-green-800 hover:bg-green-900 transition cursor-pointer text-white py-3 rounded-md font-medium">
          Verify
        </button>
      </Link>
    </div>
  )
}