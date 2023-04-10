'use strict';

const dynamoDb = require('./libs/dynamodb');
const { success, failure } = require('./libs/response');

module.exports.main = async (event, context, callback) => {
  const params = {
    TableName: 'Notes',
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id,
    },
  };

  try {
    const result = await dynamoDb.call('get', params);
    console.log(`===>result ${JSON.stringify(result)}`);
    if (result.Item) {
      callback(null, success(result.Item));
    } else {
      callback(null, failure({ status: false, error: 'Item not found.' }));
    }
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
};
