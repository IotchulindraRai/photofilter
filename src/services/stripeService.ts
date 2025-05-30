import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('YOUR_PUBLISHABLE_KEY');

export const createPaymentSession = async () => {
  try {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to load');

    const response = await fetch('/api/create-payment-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 5, // 5 NPR
        currency: 'npr'
      }),
    });

    const session = await response.json();
    
    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    });

    if (result.error) {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Payment error:', error);
    throw error;
  }
};