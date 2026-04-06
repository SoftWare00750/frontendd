import { useState, type JSX } from "react";
import { Check } from "lucide-react";
import { subscriptionPlans } from "../agent/Constants";
import { Link } from "react-router-dom";

export default function SubscriptionPlan(): JSX.Element {
  const [selectedPlan, setSelectedPlan] = useState<number | string>(
    subscriptionPlans[1].id,
  );

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl">
      <h2 className="text-2xl font-bold mb-1 text-green-800">
        Choose Your Plan
      </h2>

      <p className="text-gray-400 text-xs mb-5">
        Select a subscription plan to start listing Properties.
      </p>

      <div className="space-y-4">
        {subscriptionPlans.map((plan:any) => (
          <label
            key={plan.id}
            className={`block p-6 border rounded-lg shadow-sm cursor-pointer relative transition hover:border-green-400 hover:shadow-md hover:scale-105
            ${selectedPlan === plan.id ? "border-green-500 bg-green-50" : "border-gray-300"}`}
          >
            {/* Radio Button */}
            <input
              type="radio"
              name="subscription"
              value={plan.id}
              checked={selectedPlan === plan.id}
              onChange={() => setSelectedPlan(plan.id)}
              className="absolute top-5 right-5 accent-green-700 w-4 h-4"
            />

            <h3 className="text-xl font-bold">{plan.title}</h3>

            <p className="text-black font-bold text-[26px]">
              {plan.price}
              <span className="text-xs text-gray-500"> /Month</span>
            </p>

            {plan.tag && (
              <span className="text-xs bg-amber-600 px-6 py-1.5 rounded-full text-white absolute -top-3 left-5">
                {plan.tag}
              </span>
            )}

            <ul className="mt-4 space-y-2 text-sm">
              {plan.features?.map((feature:string, index:any) => (
                <li key={index} className="flex items-center gap-2">
                  <Check size={16} className="text-green-600" />
                  {feature}
                </li>
              ))}
            </ul>
          </label>
        ))}
      </div>

      <div className="mt-6">
        <Link to={`/payment/${selectedPlan}`}>
          <button className="w-full py-3 bg-green-800 text-white text-sm font-semibold rounded-md hover:bg-green-900 transition cursor-pointer">
            Continue to Payment
          </button>
        </Link>
      </div>
    </div>
  );
}
