require('dotenv').config();
let accountId = process.env.USER_ID;
// Configure the region
const AWS = require('aws-sdk');

// Configure the region
AWS.config.update({
  region: 'us-east-1',
});

//
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
var docClient = new AWS.DynamoDB.DocumentClient();
// var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
async function Get() {
  const params = {
    TableName: 'MonHocs',
  };
  try {
    let Records = await docClient.scan(params).promise();
    return Records;
  } catch (error) {
    console.log(error);
  }
}
async function Create(Data) {
  let MonHocData = {
    MaMon: Data.MaMon,
    TenMon: Data.TenMon,
    SoTiet: Data.SoTiet,
    TinChi: Data.TinChi,
  };
  let sqsMonHocData = {
    MessageAttributes: {
      MaMon: {
        DataType: 'String',
        StringValue: MonHocData.MaMon,
      },
      TenMon: {
        DataType: 'String',
        StringValue: MonHocData.TenMon,
      },
      SoTiet: {
        DataType: 'String',
        StringValue: MonHocData.SoTiet,
      },
      TinChi: {
        DataType: 'String',
        StringValue: MonHocData.TinChi,
      },
    },
    MessageBody: JSON.stringify(MonHocData),
    QueueUrl:
      'https://sqs.us-east-1.amazonaws.com/' + accountId + '/InsertMonHoc',
  };

  var params = {
    TableName: 'MonHocs',
    Item: MonHocData,
  };

  docClient.put(params, function (err, data) {
    if (err) console.log(err);
    else console.log(data);
  });

  let sendSqsMessage = sqs.sendMessage(sqsMonHocData).promise();
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
    TableName: 'MonHocs',
    FilterExpression: '#name = :value',
    ExpressionAttributeValues: { ':value': ID },
    ExpressionAttributeNames: { '#name': 'MaMon' },
  };
  try {
    const data = await docClient.scan(params).promise();
    return data;
  } catch (error) {
    console.log(error);
  }
}
async function Update(ID, Data) {
  let MonHocData = {
    MaMon: ID,
    TenMon: Data.TenMon,
    SoTiet: Data.SoTiet,
    TinChi: Data.TinChi,
  };
  let sqsMonHocData = {
    MessageAttributes: {
      MaMon: {
        DataType: 'String',
        StringValue: MonHocData.MaMon,
      },
      TenMon: {
        DataType: 'String',
        StringValue: MonHocData.TenMon,
      },
      SoTiet: {
        DataType: 'String',
        StringValue: MonHocData.SoTiet,
      },
      TinChi: {
        DataType: 'String',
        StringValue: MonHocData.TinChi,
      },
    },
    MessageBody: JSON.stringify(MonHocData),
    QueueUrl:
      'https://sqs.us-east-1.amazonaws.com/' + accountId + '/UpdateMonHoc',
  };
  var params = {
    TableName: 'MonHocs',
    Key: {
      MaMon: ID,
    },
    UpdateExpression: 'set TenMon = :tm, SoTiet=:st , TinChi=:tc',
    ExpressionAttributeValues: {
      ':tm': Data.TenMon,
      ':st': Data.SoTiet,
      ':tc': Data.TinChi,
    },
  };
  docClient.update(params, function (err, data) {
    if (err) console.log(err);
    else console.log(data);
  });

  let sendSqsMessage = sqs.sendMessage(sqsMonHocData).promise();
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
  let MonHocData = {
    MaMon: ID,
  };
  let sqsMonHocData = {
    MessageAttributes: {
      MaMon: {
        DataType: 'String',
        StringValue: MonHocData.MaMon,
      },
    },
    MessageBody: JSON.stringify(MonHocData),
    QueueUrl:
      'https://sqs.us-east-1.amazonaws.com/' + accountId + '/DeleteMonHoc',
  };

  var params = {
    TableName: 'MonHocs',
    Key: MonHocData,
  };

  docClient.delete(params, function (err, data) {
    if (err) console.log(err);
    else console.log(data);
  });

  let sendSqsMessage = sqs.sendMessage(sqsMonHocData).promise();
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
