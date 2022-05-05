const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });

let accountId = process.env.USER_ID;
const AWS = require('aws-sdk');

// Configure the region
AWS.config.update({
  region: 'us-east-1',
});

//
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
const queueUrl = 'https://sqs.us-east-1.amazonaws.com/' + accountId + '/test';
var docClient = new AWS.DynamoDB.DocumentClient();
async function Get() {
  const params = {
    TableName: 'Khoas',
  };
  try {
    let Records = await docClient.scan(params).promise();
    return Records;
  } catch (error) {
    console.log(error);
  }
}
async function Create(Data) {
  let KhoaData = {
    MaKhoa: Data.MaKhoa,
    TenKhoa: Data.TenKhoa,
  };
  let sqsKhoaData = {
    MessageAttributes: {
      MaKhoa: {
        DataType: 'String',
        StringValue: KhoaData.MaKhoa,
      },
      TenKhoa: {
        DataType: 'String',
        StringValue: KhoaData.TenKhoa,
      },
    },
    MessageBody: JSON.stringify(KhoaData),
    QueueUrl: queueUrl,
  };
  let sendSqsMessage = sqs.sendMessage(sqsKhoaData).promise();
  sendSqsMessage
    .then((data) => {
      console.log(`OrdersSvc | SUCCESS: ${data.MessageId}`);
      return;
    })
    .catch((err) => {
      console.log(`OrdersSvc | ERROR: ${err}`);
    });
}
async function GetById(ID) {
  var params = {
    TableName: 'Khoas',
    FilterExpression: '#name = :value',
    ExpressionAttributeValues: { ':value': ID },
    ExpressionAttributeNames: { '#name': 'MaKhoa' },
  };
  try {
    const data = await docClient.scan(params).promise();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function Update(ID, Khoa) {
  let KhoaData = {
    MaKhoa: ID,
    TenKhoa: Khoa,
  };
  let sqsKhoaData = {
    MessageAttributes: {
      MaKhoa: {
        DataType: 'String',
        StringValue: KhoaData.MaKhoa,
      },
      TenKhoa: {
        DataType: 'String',
        StringValue: KhoaData.TenKhoa,
      },
    },
    MessageBody: JSON.stringify(KhoaData),
    QueueUrl:
      'https://sqs.us-east-1.amazonaws.com/' + accountId + '/UpdateKhoa',
  };
  let sendSqsMessage = sqs.sendMessage(sqsKhoaData).promise();
  sendSqsMessage
    .then((data) => {
      console.log(`OrdersSvc | SUCCESS: ${data.MessageId}`);
      return;
    })
    .catch((err) => {
      console.log(`OrdersSvc | ERROR: ${err}`);
    });
}
async function Delete(ID) {
  let KhoaData = {
    MaKhoa: ID,
  };
  let sqsKhoaData = {
    MessageAttributes: {
      MaKhoa: {
        DataType: 'String',
        StringValue: KhoaData.MaKhoa,
      },
    },
    MessageBody: JSON.stringify(KhoaData),
    QueueUrl:
      'https://sqs.us-east-1.amazonaws.com/' + accountId + '/DeleteKhoa',
  };
  let sendSqsMessage = sqs.sendMessage(sqsKhoaData).promise();
  sendSqsMessage
    .then((data) => {
      console.log(`OrdersSvc | SUCCESS: ${data.MessageId}`);
      return;
    })
    .catch((err) => {
      console.log(`OrdersSvc | ERROR: ${err}`);
    });
}
module.exports = {
  Get: Get,
  Create: Create,
  GetById: GetById,
  Update: Update,
  Delete: Delete,
};
