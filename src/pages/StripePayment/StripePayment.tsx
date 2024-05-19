import { FormEvent, useEffect, useState } from "react";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const StripePayment = () => {
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState(0); // State to store the amount
  const [showCheckout, setShowCheckout] = useState(false); // State to control the display of CheckoutForm

  const customHeaders = {
    "Content-Type": "application/json",
  };

  useEffect(() => {
    fetch("http://localhost:8002/configStripe").then(async (r) => {
      const data = await r.json();
      const stripe = await loadStripe(data.publishableKey);
      setStripePromise(stripe);
    });
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const paymentData = {
      amount: amount,
    };
    const response = await fetch("http://localhost:8002/createPaymentIntent", {
      method: "POST",
      headers: customHeaders,
      body: JSON.stringify(paymentData),
    });
    const data = await response.json();
    setClientSecret(data.clientSecret);
    // Check if stripePromise and clientSecret are valid
    if (stripePromise && data.clientSecret) {
      setShowCheckout(true); // Show the CheckoutForm
    }
  };

  return (
    <>
      <div>Payment Page</div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          placeholder="Enter amount"
        />
        <button type="submit">Pay</button>
      </form>
      {showCheckout && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm amount={amount} />
        </Elements>
      )}
    </>
  );
};

export default StripePayment;
