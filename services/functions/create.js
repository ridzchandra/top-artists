// It’s important to note that the handler.js needs to be imported before we import anything else.
// This is because we added some error handling to it that needs to be initialized when our Lambda function is first invoked.
import handler from '../util/handler';
import * as uuid from 'uuid';
import dynamoDb from '../util/dynamodb';

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const putParams = {
    TableName: process.env.TABLE_NAME,
    Item: {
      // The attributes of the item to be created
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId, // The id of the author
      favId: uuid.v1(), // A unique uuid
      artist: data.artist, // Parsed from request body
      trackTitle: data.trackTitle, // Parsed from request body
      attachment: data.attachment, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  // Checking if item already exists
  let itemAlreadyExists;
  const getParams = {
    TableName: process.env.TABLE_NAME,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    KeyConditionExpression: 'userId = :userId',
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be the id of the author
    ExpressionAttributeValues: {
      ':userId': event.requestContext.authorizer.iam.cognitoIdentity.identityId,
    },
  };
  const result = await dynamoDb.query(getParams);
  const currentFavourites = result.Items;
  if (currentFavourites) {
    itemAlreadyExists = currentFavourites.find(
      (fav) => fav.artist === data.artist && fav.trackTitle === data.trackTitle
    );
  }
  if (!itemAlreadyExists) {
    // only add if it doesn't exist - avoid duplicates
    await dynamoDb.put(putParams);
  }

  return putParams.Item;
});
