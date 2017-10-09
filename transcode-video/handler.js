'use strict'

const AWS = require('aws-sdk')

const elasticTranscoder = new AWS.ElasticTranscoder({
  region: 'us-east-1'
})

const AWS_ELASTIC_TRANSCODER_ID = '1507391116132-w0frkd' 

function getParams (event) {
  const key = event.Records[0].s3.object.key
  const sourceKey = decodeURIComponent(key.replace(/\+/g, ' '))
  let outputKey = sourceKey.split('.')
  if (outputKey.constructor === Array) {
    outputKey = outputKey[0]
  }
  console.log('key:', key, sourceKey, outputKey)
  const params = {
    PipelineId: AWS_ELASTIC_TRANSCODER_ID,
    OutputKeyPrefix: `${outputKey}/`,
    Input: {
      Key: sourceKey
    },
    Outputs: [
      {
        Key: `${outputKey}-1080p.mp4`,
        PresetId: '1351620000001-000001'
      },
      {
        Key: `${outputKey}-720p.mp4`,
        PresetId: '1351620000001-000010'
      },
      {
        Key: `${outputKey}-web-720p.mp4`,
        PresetId: '1351620000001-100070'
      }
    ]
  }
  return params
}

const transcodeVideo = (event, context, callback) => {
  elasticTranscoder.createJob(getParams(event), (error, data) => {
    if (error) {
      callback(error)
    }
  })
}

module.exports = {
  TranscodeVideo: transcodeVideo,
  test: {
    getParams: getParams
  }
}
