require('dotenv').config();

let accountId = 518269260543;

const AWS = require('aws-sdk');

// Configure the region
AWS.config.update({
  region: 'us-east-1',
});

//
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
var docClient = new AWS.DynamoDB.DocumentClient();
async function Get() {
  const params = {
    TableName: 'Account',
  };
  try {
    let Records = await docClient.scan(params).promise();
    return Records;
  } catch (error) {
    console.log(error);
  }
}
async function GetById(UserName, Password) {
  var params = {
    TableName: 'Account',
    FilterExpression: '#name = :value AND #malop = :valu',
    ExpressionAttributeValues: { ':value': UserName, ':valu': Password },
    ExpressionAttributeNames: { '#name': 'UserName', '#malop': 'PassWord' },
  };
  try {
    const data = await docClient.scan(params).promise();
    return data;
  } catch (error) {
    console.log(error);
  }
}
async function Create(Data) {
  let DiemData = {
    UserName: Data.UserName,
    PassWord: Data.PassWord,
    User_Id: Data.User_Id,
    Role: Data.Role,
  };
  let sqsDiemData = {
    MessageAttributes: {
      UserName: {
        DataType: 'String',
        StringValue: DiemData.UserName,
      },
      PassWord: {
        DataType: 'String',
        StringValue: DiemData.PassWord,
      },
      User_Id: {
        DataType: 'String',
        StringValue: DiemData.User_Id,
      },
      Role: {
        DataType: 'String',
        StringValue: DiemData.Role,
      },
    },
    MessageBody: JSON.stringify(DiemData),
    QueueUrl:
      'https://sqs.us-east-1.amazonaws.com/' + accountId + '/Insert_Account',
  };

  var params = {
    TableName: 'Account',
    Item: DiemData,
  };

  docClient.put(params, function (err, data) {
    if (err) console.log(err);
    else {
      console.log('Insert successfully: ' + data);
      return data;
    }
  });

  // let sendSqsMessage = sqs.sendMessage(sqsDiemData).promise();
  // sendSqsMessage
  //   .then((data) => {
  //     console.log(`OrdersSvc | SUCCESS: ${data.MessageId}`);

  //     return data;
  //   })
  //   .catch((err) => {
  //     console.log(`OrdersSvc | ERROR: ${err}`);
  //   });
}

async function Update(ID, Data) {
  let DiemData = {
    User_Id: ID,
    Role: Data,
  };
  let sqsDiemData = {
    MessageAttributes: {
      User_Id: {
        DataType: 'String',
        StringValue: DiemData.User_Id,
      },
      Role: {
        DataType: 'String',
        StringValue: DiemData.Role,
      },
    },
    MessageBody: JSON.stringify(DiemData),
    QueueUrl:
      'https://sqs.us-east-1.amazonaws.com/' + accountId + '/Update_Account',
  };

  var params = {
    TableName: 'Account',
    Key: {
      User_Id: ID,
    },
    UpdateExpression: 'set Role=:r, PassWord =:p, UserName =:u',
    ExpressionAttributeValues: {
      ':r': Data.Role,
      ':p': Data.PassWord,
      ':u': Data.UserName,
    },
  };
  docClient.update(params, function (err, data) {
    if (err) console.log(err);
    else console.log('Update username, password: ' + data);
  });
  let sendSqsMessage = sqs.sendMessage(sqsDiemData).promise();
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
  let DiemData = {
    User_Id: ID,
  };
  let sqsDiemData = {
    MessageAttributes: {
      User_Id: {
        DataType: 'String',
        StringValue: DiemData.User_Id,
      },
    },
    MessageBody: JSON.stringify(DiemData),
    QueueUrl:
      'https://sqs.us-east-1.amazonaws.com/' + accountId + '/Delete_Account',
  };

  var params = {
    TableName: 'Account',
    Key: DiemData,
  };

  docClient.delete(params, function (err, data) {
    if (err) console.log(err);
    else console.log('Delete successfully: ' + data);
  });
  let sendSqsMessage = sqs.sendMessage(sqsDiemData).promise();
  sendSqsMessage
    .then((data) => {
      console.log(`OrdersSvc | SUCCESS: ${data.MessageId}`);
      return;
    })
    .catch((err) => {
      console.log(`OrdersSvc | ERROR: ${err}`);
    });
}
async function Update1(ID, Data) {
  let DiemData = {
    User_Id: ID,
    Role: Data,
  };

  let sqsDiemData = {
    MessageAttributes: {
      User_Id: {
        DataType: 'String',
        StringValue: DiemData.User_Id,
      },
      PassWord: {
        DataType: 'String',
        StringValue: DiemData.Role,
      },
    },
    MessageBody: JSON.stringify(DiemData),
    QueueUrl:
      'https://sqs.us-east-1.amazonaws.com/' + accountId + '/ChangePass', // AWS SQS
  };

  var params = {
    TableName: 'Account',
    Key: {
      User_Id: ID,
    },
    UpdateExpression: 'set Role=:r, PassWord =:p, UserName =:u',
    ExpressionAttributeValues: {
      ':r': Data.Role,
      ':p': Data.PassWord,
      ':u': Data.UserName,
    },
  };

  docClient.update(params, function (err, data) {
    if (err) console.log(err);
    else console.log('Update user success : ' + data);
  });
  let sendSqsMessage = sqs.sendMessage(sqsDiemData).promise();
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
  GetById: GetById,
  Create: Create,
  Update: Update,
  Delete: Delete,
  Update1: Update1,
};
