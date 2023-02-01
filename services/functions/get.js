// It’s important to note that the handler.js needs to be imported before we import anything else.
// This is because we added some error handling to it that needs to be initialized when our Lambda function is first invoked.
import handler from '../util/handler';
import dynamoDb from '../util/dynamodb';

// Wrong handler function name
export const main = handler(async (event) => {
  const data = JSON.parse(event.queryStringParameters);
  const params = {
    TableName: process.env.TABLE_NAME,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    Key: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId, // The id of
    },
    KeyConditionExpression: 'artist = :artist AND trackTitle = :trackTitle',
    ExpressionAttributeValues: {
      ':artist': data.artist || null,
      ':tracktitle': data.trackTitle || null,
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error('Item not found.');
  }

  // Return the retrieved item
  return result.Item;
});
