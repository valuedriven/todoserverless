'use strict';

const uuid = require('uuid');

const dynamoDb = require('./libs/dynamodb');
const { success, failure } = require('./libs/response');

module.exports.main = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'Notes',
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: new Date().getTime(),
    },
  };

  try {
    await dynamoDb.call('put', params);
    callback(null, success(params.Item));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
};
