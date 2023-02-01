import { Api, use } from '@serverless-stack/resources';
import { StorageStack } from './StorageStack';

export function ApiStack({ stack, app }) {
  const { table } = use(StorageStack);

  // Create the API
  const api = new Api(stack, 'Api', {
    defaults: {
      authorizer: 'iam',
      function: {
        permissions: [table],
        environment: {
          TABLE_NAME: table.tableName,
          STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        },
      },
    },
    routes: {
      'GET /favourites': 'functions/list.main',
      'POST /favourites': 'functions/create.main',
      'DELETE /favourites/{id}': 'functions/delete.main',
      'POST /billing': 'functions/billing.main',
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  // Return the API resource
  return {
    api,
  };
}
