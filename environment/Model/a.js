const AWS = require('aws-sdk');

// Configure the region
AWS.config.update({
  region: 'us-east-1',
});

//
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

function Create(data) {
  let sqsData = {
    firstName: data.ID,
    lastName: data.time,
  };
  let sqsMessage = {
    MessageAttributes: {
      firstName: {
        DataType: 'String',
        StringValue: sqsData.firstName,
      },
      lastName: {
        DataType: 'String',
        StringValue: sqsData.lastName,
      },
    },
    MessageBody: JSON.stringify(sqsData),
    QueueUrl: 'https://sqs.us-east-1.amazonaws.com/741347076500/insertData',
  };

  let sendSqsMessage = sqs.sendMessage(sqsMessage).promise();
  sendSqsMessage
    .then((data) => {
      console.log(`OrdersSvc | SUCCESS: ${data.MessageId}`);

      return data;
    })
    .catch((err) => {
      console.log(`OrdersSvc | ERROR: ${err}`);
    });
}

const dataID = {
  ID: 'tuan quoc',
  time: '12/2/2022',
};

Create(dataID);
