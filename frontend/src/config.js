const config = {
  SENTRY_DSN:
    'https://f5fbe0bf4e5645fbbc73ea44206c9d79@o1297598.ingest.sentry.io/4504548353638400',
  MAX_ATTACHMENT_SIZE: 5000000,
  STRIPE_KEY:
    'pk_test_51MOeMIK85UdzHCSRdG0sk0sSoyYQDm6lUsyGmTxLf9Y3wDpdsW4czhe1EGuC9tAJqlKYOdm0pK0gJcdQpIdEi8NP00PpH7f8Vb',
  // Backend config
  s3: {
    REGION: process.env.REACT_APP_REGION,
    BUCKET: process.env.REACT_APP_BUCKET,
  },
  apiGateway: {
    REGION: process.env.REACT_APP_REGION,
    URL: process.env.REACT_APP_API_URL,
  },
  cognito: {
    REGION: process.env.REACT_APP_REGION,
    USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
    APP_CLIENT_ID: process.env.REACT_APP_USER_POOL_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID,
  },
};

export default config;
