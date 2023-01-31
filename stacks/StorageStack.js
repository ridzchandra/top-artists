import { Table, Bucket } from '@serverless-stack/resources';

export function StorageStack({ stack, app }) {
  // Create the DynamoDB table
  const table = new Table(stack, 'Favourites', {
    fields: {
      userId: 'string',
      favId: 'string',
    },
    primaryIndex: { partitionKey: 'userId', sortKey: 'favId' },
  });

  // Create an S3 bucket
  const bucket = new Bucket(stack, 'Uploads', {
    cors: [
      {
        maxAge: '1 day',
        allowedOrigins: ['*'],
        allowedHeaders: ['*'],
        allowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
      },
    ],
  });

  return {
    table,
    bucket,
  };
}
