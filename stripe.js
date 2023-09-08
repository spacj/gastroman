// stripe.js
import { loadStripe } from "@stripe/stripe-js";

export async function checkout({ lineItems, mode = "payment" }) {
  let stripepromise = null;
  let getstripe = () => {
    if (!stripepromise) {
      stripepromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY);
    }
    return stripepromise;
  };
  const stripe = await getstripe();
  await stripe.redirectToCheckout({
    mode: mode,
    lineItems,
    successUrl: `${window.location.origin}/checkout?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: window.location.origin,
  });
}

const stripePromise = loadStripe("YOUR_STRIPE_PUBLISHABLE_KEY");
export default stripePromise;
