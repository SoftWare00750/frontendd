// src/components/PaymentForm.tsx
import  { useState } from "react";
import {useParams, Link} from "react-router-dom";
import { CreditCard, Building2, Lock } from "lucide-react";
import { subscriptionPlans } from "../agent/Constants";


export default function CompletePayment () {
const { id } = useParams();

const plan = subscriptionPlans.find((p:any) => p.id === Number(id));

if (!plan) {
  return <div className="text-center p-10 font-medium text-green-700">No plan selected...</div>;
}
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [promoCode, setPromoCode] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });


  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };
 

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg ">
      <h2 className="text-2xl font-bold mb-1 text-green-700 text-left">Complete Payment</h2>
      <p className="text-left text-xs text-gray-500 mb-6">
        Secure payment for your subscription
      </p>

      {/* Selected Plan */}
      <div className="mb-6 bg-white rounded-lg drop-shadow-sm p-4 border border-gray-200">
        <div className="flex justify-between items-center mb-1">
          <p className="font-medium text-xs">Selected Plan</p>
           <span className="font-medium">{plan?.title}</span>
        </div>
        <div className="flex items-center justify-between text-[26px] font-medium text-green-700">
          <span className="text-black text-xs">Amount</span>
          <div className="flex flex-col">
            <span>{plan?.price}</span>
            <span className="text-gray-400 text-xs text-right">per month</span>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <p className="font-medium text-sm ">Payment Method</p>
        <div className="flex space-x-6 mt-2">
          <button
            className={`w-1/2 py-6 px-4 text-sm font-semibold rounded-md border border-gray-300 cursor-pointer ${
              selectedPaymentMethod === "card" ? "border-2 border-green-600" : "bg-white"
            }`}
            onClick={() => handlePaymentMethodChange("card")}
          >
            <CreditCard size={18} className="m-auto mb-2 " />
            Card
          </button>
          <button
            className={`w-1/2 py-6 px-4 text-sm font-semibold rounded-md border border-gray-300 cursor-pointer ${
              selectedPaymentMethod === "transfer" ? "border-2 border-green-600" : "bg-white"
            }`}
            onClick={() => handlePaymentMethodChange("transfer")}
          >
            <Building2 size={18} className="m-auto mb-2 " />
            Transfer
          </button>
        </div>
      </div>

      {/* Transfer Information */}
      {selectedPaymentMethod === "transfer" ? (
        <div className="bg-white p-4 rounded-lg mb-6 border border-gray-200 drop-shadow-sm">
          <p className="font-medium mb-3 text-xs">Transfer to:</p>
          <div className="flex items-center gap-2 mb-2 justify-between">
            <p className="text-xs">
              <strong>Bank:</strong> 
            </p>
            <p className="text-xs">GTBank</p>
          </div>
          <div className="flex items-center gap-2 mb-2 justify-between">
            <p className="text-xs">
              <strong>Account Number:</strong> 
            </p>
            <p className="text-xs">0123456789</p>
          </div>
          <div className="flex items-center gap-2 mb-2 justify-between">
            <p className="text-xs">
              <strong>Account Name:</strong> 
            </p>
            <p className="text-xs">OgalLandlord Ltd</p>
          </div>
        </div>
      ) : (
        // Card Payment Information
        <div className="mb-6 bg-white rounded-lg drop-shadow-sm p-5 border border-gray-200">
          <div className="mb-4">
            <label className="block text-xs font-medium mb-2 " htmlFor="cardNumber">
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              id="cardNumber"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.cardNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium mb-2 " htmlFor="expiryDate">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiryDate"
                id="expiryDate"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="MM/YY"
                value={cardDetails.expiryDate}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-2 " htmlFor="cvv">
                CVV
              </label>
              <input
                type="text"
                name="cvv"
                id="cvv"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="123"
                value={cardDetails.cvv}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      )}

      {/* Promo Code */}
      <div className="mb-6">
        <label className="block text-xs font-medium mb-2">Promo Code (Optional)</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2"
          placeholder="Enter promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
      </div>

      {/* Security message */}
      <div className="text-xs text-gray-500 mb-6 bg-white rounded-lg p-4 border border-gray-200 text-center flex items-center gap-2 justify-center">
       <Lock size={18}/> Your payment information is secure and encrypted.
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <Link to={`/activated`}>
          <button className="w-full py-3 bg-green-800 text-white text-sm font-semibold rounded-md cursor-pointer hover:bg-green-900 transition">
           {plan.price ? `Pay ${plan.price}` : "Pay Now"}
          </button>
        </Link>
      </div>
    </div>
  );
};


