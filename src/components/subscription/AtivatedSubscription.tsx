
import {Link } from "react-router-dom";
// import { subscriptionPlans } from "../Constants";
import { CheckCircle } from "lucide-react";
interface SubscriptionProps {
  plan?: string;
  amountPaid?: number;
  validUntil?: string;
  transactionId?: string;
}

export default function SubscriptionActivated({
  plan,
  amountPaid,
  validUntil,
  transactionId,
}: SubscriptionProps){

// const { id } = useParams();

// const plan = subscriptionPlans.find((p) => p.id === Number(id));

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <div className="flex justify-center mb-4">
        <div className="w-fit bg-green-50 rounded-full flex items-center justify-center text-green-600 p-6 ">
         <CheckCircle size={40} />
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-center text-black mb-4">
        Subscription Activated!
      </h2>
      <p className="text-center text-gray-600 mb-6 text-xs">
        Your payment was successful. You can now start adding listings and
        growing your business.
      </p>

      {/* Subscription Details */}
      <div className="space-y-4 mb-6 bg-white border border-gray-300 drop-shadow-sm p-5 rounded-lg ">
        <div className="flex justify-between text-gray-800 font-medium">
          <span className="text-xs font-normal">Plan</span>
          <span className="font-semibold">{plan}</span>
        </div>
        <div className="flex justify-between text-gray-800 font-medium">
          <span className="text-xs font-normal">Amount Paid</span>
          <span className="font-semibold">₦{amountPaid}</span>
        </div>
        <div className="flex justify-between text-gray-800 font-medium">
          <span className="text-xs font-normal">Valid Until</span>
          <span className="font-semibold">{validUntil}</span>
        </div>
        <div className="flex justify-between text-gray-800 font-medium">
          <span className="text-xs font-normal">Transaction ID</span>
          <span className="font-semibold">{transactionId}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-4">
        <Link to="/dashboard">
          <button className="w-full py-3 bg-green-700 text-white font-semibold rounded-md cursor-pointer text-sm">
            Go to Dashboard
          </button>
        </Link>
        <button className="w-full py-3 bg-gray-200 text-gray-800 font-semibold rounded-md cursor-pointer text-sm">
          Download Receipt
        </button>
      </div>
    </div>
  );
};

