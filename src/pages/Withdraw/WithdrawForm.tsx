import { PaymentElement } from "@stripe/react-stripe-js";
import { FormEvent, useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import Button from "@/components/Button/Button";
import styles from "./WithdrawForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { profile } from "@/store/user.slice";

export default function WithdrawForm(props: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const userProfile = useSelector((s: RootState) => s.user.profile);
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  const paymentData = {
    id: userProfile?.id,
    amount: props.amount,
  };
  const customHeaders = {
    "Content-Type": "application/json",
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch("http://localhost:8002/subtractBalance", {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        // Handle server-side error
        const errorData = await response.json();
        setMessage(
          "Error adding balance: " + (errorData.message || "Unknown error")
        );
      } else {
        // Success! (optional: handle successful update)
        setMessage("Withdraw money was successful!");
      }
    } catch (error) {
      // Handle network or other errors
      setMessage("An unexpected error occured.");
    } finally {
      setIsProcessing(false);
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `http://localhost:5173/user`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage("Some Error");
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <form id={styles["payment-form"]} onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <Button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Withdraw now"}
        </span>
      </Button>
      {/* Show any error or success messages */}
      {message && <div id={styles["payment-message"]}>{message}</div>}
    </form>
  );
}
