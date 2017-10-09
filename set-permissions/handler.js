'use strict';

const AWS = require('aws-sdk')

const s3 = new AWS.S3()

function getParams (event) {
  const msg = JSON.parse(event.Records[0].Sns.Message)
  const sourceBucket = msg.Records[0].s3.bucket.name
  const sourceKey = decodeURIComponent(msg.Records[0].s3.object.key.replace(/\+/g, ' '))
  const params = {
    Bucket: sourceBucket,
    Key: sourceKey,
    ACL: 'public-read'   
  }
  return params
}

const setPermissions = (event, context, callback) => {
  s3.putObjectAcl(getParams(event), (err, data) => {
    if (err) {
      callback(err)
    }
  })
}

module.exports = {
  SetPermissions: setPermissions
}
