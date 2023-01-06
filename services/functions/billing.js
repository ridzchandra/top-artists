// It’s important to note that the handler.js needs to be imported before we import anything else.
// This is because we added some error handling to it that needs to be initialized when our Lambda function is first invoked.
import handler from '../util/handler';
import Stripe from 'stripe';
import { calculateCost } from '../util/cost';

export const main = handler(async (event) => {
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = 'Scratch charge';

  // Load our secret key from the  environment variables
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: 'aud',
  });

  return { status: true };
});
