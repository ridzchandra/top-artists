import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { onError } from '../lib/errorLib';
import config from '../config';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import BillingForm from '../components/BillingForm';
import './Settings.css';
import { Alert } from 'react-bootstrap';

export default function Settings() {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [amountChanrged, setAmountCharged] = useState(0);

  const stripePromise = loadStripe(config.STRIPE_KEY);

  useEffect(() => {
    if (amountChanrged) {
      setTimeout(() => {
        setAmountCharged(0);
        nav('/');
      }, 3000);
    }
  }, [amountChanrged]);

  function billUser(details) {
    return API.post('favourites', '/billing', {
      body: details,
    });
  }

  async function handleFormSubmit(storage, { token, error }) {
    if (error) {
      onError(error);
      return;
    }

    setIsLoading(true);

    try {
      const result = await billUser({
        storage,
        source: token.id,
      });

      if (result && result.status && result.amount) {
        setAmountCharged(result.amount);
      }
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="Settings">
      <Elements
        stripe={stripePromise}
        fonts={[
          {
            cssSrc:
              'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800',
          },
        ]}
      >
        <BillingForm isLoading={isLoading} onSubmit={handleFormSubmit} />
      </Elements>
      {amountChanrged ? (
        <Alert
          className="mt-3"
          variant="primary"
        >{`Your card has been charged $${amountChanrged} successfully!`}</Alert>
      ) : null}
    </div>
  );
}
