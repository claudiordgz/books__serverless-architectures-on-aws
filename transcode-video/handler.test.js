const lambda = require('./handler')
const json = require('./tests/event.json')

test('Test event params', () => {
  lambda.test.getParams(json)
})
