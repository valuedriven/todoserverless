'use strict';

const dynamoDb = require('./libs/dynamodb');
const { success, failure } = require('./libs/response');

module.exports.main = async (event, context, callback) => {
  const params = {
    TableName: 'Notes',
    // 'Key' defines the partition key and sort key of the item to be removed
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id,
    },
  };

  try {
    const result = await dynamoDb.call('delete', params);
    callback(null, success({ status: true }));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
};
