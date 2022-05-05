const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });

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
      QueueUrl: 'https://sqs.us-east-1.amazonaws.com/518269260543/UpdateGV',
    };
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
    QueueUrl: 'https://sqs.us-east-1.amazonaws.com/518269260543/DeleteGV',
  };
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
