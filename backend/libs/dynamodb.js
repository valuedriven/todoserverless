const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

module.exports.call = async (action, params) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
};
