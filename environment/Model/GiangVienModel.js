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
    TableName: 'GiangViens',
  };
  // console.log('This is table GiangViens');
  try {
    let Records = await docClient.scan(params).promise();
    return Records;
  } catch (error) {
    console.log(error);
  }
}
async function Create(Data) {
  let GVData = {
    MaGV: Data.MaGV,
    TenGV: Data.TenGV,
    NgaySinh: Data.NgaySinh,
    GioiTinh: Data.GioiTinh,
    QueQuan: Data.QueQuan,
    MaKhoa: Data.MaKhoa,
  };
  let sqsLopData = {
    MessageAttributes: {
      MaGV: {
        DataType: 'String',
        StringValue: GVData.MaGV,
      },
      TenGV: {
        DataType: 'String',
        StringValue: GVData.TenGV,
      },
      NgaySinh: {
        DataType: 'String',
        StringValue: GVData.NgaySinh,
      },
      GioiTinh: {
        DataType: 'String',
        StringValue: GVData.GioiTinh,
      },
      QueQuan: {
        DataType: 'String',
        StringValue: GVData.QueQuan,
      },
      MaKhoa: {
        DataType: 'String',
        StringValue: GVData.MaKhoa,
      },
    },
    MessageBody: JSON.stringify(GVData),
    QueueUrl: 'https://sqs.us-east-1.amazonaws.com/' + accountId + '/InsertGV',
  };

  var params = {
    TableName: 'GiangViens',
    Item: GVData,
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
    TableName: 'GiangViens',
    FilterExpression: '#name = :value',
    ExpressionAttributeValues: { ':value': ID },
    ExpressionAttributeNames: { '#name': 'MaGV' },
  };
  try {
    const data = await docClient.scan(params).promise();
    return data;
  } catch (error) {
    console.log(error);
  }
}
async function Update(ID, Data) {
  {
    let GVData = {
      MaGV: ID,
      TenGV: Data.TenGV,
      NgaySinh: Data.NgaySinh,
      GioiTinh: Data.GioiTinh,
      QueQuan: Data.QueQuan,
      MaKhoa: Data.MaKhoa,
    };
    let sqsLopData = {
      MessageAttributes: {
        MaGV: {
          DataType: 'String',
          StringValue: GVData.MaGV,
        },
        TenGV: {
          DataType: 'String',
          StringValue: GVData.TenGV,
        },
        NgaySinh: {
          DataType: 'String',
          StringValue: GVData.NgaySinh,
        },
        GioiTinh: {
          DataType: 'String',
          StringValue: GVData.GioiTinh,
        },
        QueQuan: {
          DataType: 'String',
          StringValue: GVData.QueQuan,
        },
        MaKhoa: {
          DataType: 'String',
          StringValue: GVData.MaKhoa,
        },
      },
      MessageBody: JSON.stringify(GVData),
      QueueUrl:
        'https://sqs.us-east-1.amazonaws.com/' + accountId + '/UpdateGV',
    };

    var params = {
      TableName: 'GiangViens',
      Key: {
        MaGV: ID,
      },
      UpdateExpression:
        'set TenGV = :ten, NgaySinh=:ns, GioiTinh=:gt, QueQuan=:qq, MaKhoa=:mk',
      ExpressionAttributeValues: {
        ':ten': Data.TenGV,
        ':ns': Data.NgaySinh,
        ':gt': Data.GioiTinh,
        ':qq': Data.QueQuan,
        ':mk': Data.MaKhoa,
      },
    };
    docClient.update(params, function (err, data) {
      if (err) console.log(err);
      else console.log('Update teacher : ' + data);
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
}
async function Delete(ID) {
  let LopData = {
    MaGV: ID,
  };
  let sqsLopData = {
    MessageAttributes: {
      MaGV: {
        DataType: 'String',
        StringValue: LopData.MaGV,
      },
    },
    MessageBody: JSON.stringify(LopData),
    QueueUrl: 'https://sqs.us-east-1.amazonaws.com/' + accountId + '/DeleteGV',
  };

  var params = {
    TableName: 'GiangViens',
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
};
