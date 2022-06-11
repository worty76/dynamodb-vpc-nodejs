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
async function Get() {
  const params = {
    TableName: 'SinhViens',
  };
  try {
    let Records = await docClient.scan(params).promise();
    return Records;
  } catch (error) {
    console.log(error);
  }
}
async function Create(Data) {
  let SVData = {
    MaSV: Data.MaSV,
    TenSV: Data.TenSV,
    NgaySinh: Data.NgaySinh,
    GioiTinh: Data.GioiTinh,
    QueQuan: Data.QueQuan,
    MaLop: Data.MaLop,
  };
  let sqsLopData = {
    MessageAttributes: {
      MaSV: {
        DataType: 'String',
        StringValue: SVData.MaSV,
      },
      TenSV: {
        DataType: 'String',
        StringValue: SVData.TenSV,
      },
      NgaySinh: {
        DataType: 'String',
        StringValue: SVData.NgaySinh,
      },
      GioiTinh: {
        DataType: 'String',
        StringValue: SVData.GioiTinh,
      },
      QueQuan: {
        DataType: 'String',
        StringValue: SVData.QueQuan,
      },
      MaLop: {
        DataType: 'String',
        StringValue: SVData.MaLop,
      },
    },
    MessageBody: JSON.stringify(SVData),
    QueueUrl: `https://sqs.us-east-1.amazonaws.com/741347076500/InsertSV`,
  };

  var params = {
    TableName: 'SinhViens',
    Item: SVData,
  };

  docClient.put(params, function (err, data) {
    if (err) console.log(err);
    else console.log('Insert successfully: ' + data);
  });

  let sendSqsMessage = sqs.sendMessage(sqsLopData).promise();
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
    TableName: 'SinhViens',
    FilterExpression: '#name = :value',
    ExpressionAttributeValues: { ':value': ID },
    ExpressionAttributeNames: { '#name': 'MaSV' },
  };
  try {
    const data = await docClient.scan(params).promise();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function GetById1(ID) {
  var params = {
    TableName: 'SinhViens',
    FilterExpression: '#name = :value',
    ExpressionAttributeValues: { ':value': ID },
    ExpressionAttributeNames: { '#name': 'MaLop' },
  };
  try {
    const data = await docClient.scan(params).promise();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function Update(ID, Data) {
  let SVData = {
    MaSV: ID,
    TenSV: Data.TenSV,
    NgaySinh: Data.NgaySinh,
    GioiTinh: Data.GioiTinh,
    QueQuan: Data.QueQuan,
    MaLop: Data.MaLop,
  };
  let sqsLopData = {
    MessageAttributes: {
      MaSV: {
        DataType: 'String',
        StringValue: SVData.MaSV,
      },
      TenSV: {
        DataType: 'String',
        StringValue: SVData.TenSV,
      },
      NgaySinh: {
        DataType: 'String',
        StringValue: SVData.NgaySinh,
      },
      GioiTinh: {
        DataType: 'String',
        StringValue: SVData.GioiTinh,
      },
      QueQuan: {
        DataType: 'String',
        StringValue: SVData.QueQuan,
      },
      MaLop: {
        DataType: 'String',
        StringValue: SVData.MaLop,
      },
    },
    MessageBody: JSON.stringify(SVData),
    QueueUrl: `https://sqs.us-east-1.amazonaws.com/741347076500/UpdateSV`,
  };

  var params = {
    TableName: 'SinhViens',
    Key: {
      MaSV: ID,
    },
    UpdateExpression:
      'set MaLop=:msv,' +
      'TenSV = :tsv,' +
      'NgaySinh= :ns,' +
      'GioiTinh=:gt,' +
      'QueQuan=:qq',
    ExpressionAttributeValues: {
      ':msv': Data.MaLop,
      ':tsv': Data.TenSV,
      ':ns': Data.NgaySinh,
      ':gt': Data.GioiTinh,
      ':qq': Data.QueQuan,
    },
  };

  docClient.update(params, function (err, data) {
    if (err) console.log(err);
    else console.log('Update TenSV, NgaySinh,GioiTinh,QueQuan,MaLop: ' + data);
  });

  let sendSqsMessage = sqs.sendMessage(sqsLopData).promise();
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
  let LopData = {
    MaSV: ID,
  };
  let sqsLopData = {
    MessageAttributes: {
      MaSV: {
        DataType: 'String',
        StringValue: LopData.MaSV,
      },
    },
    MessageBody: JSON.stringify(LopData),
    QueueUrl: 'https://sqs.us-east-1.amazonaws.com/741347076500/DeleteSV',
  };

  var params = {
    TableName: 'SinhViens',
    Key: LopData,
  };

  docClient.delete(params, function (err, data) {
    if (err) console.log(err);
    else console.log('Delete successfully: ' + data);
  });

  let sendSqsMessage = sqs.sendMessage(sqsLopData).promise();
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
  GetById1: GetById1,
};
