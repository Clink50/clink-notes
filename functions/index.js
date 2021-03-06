exports.handler = (event, context) => ({
  statusCode: 200,
  body: JSON.stringify({
    message: 'Hi there Tacos',
    event,
  }),
});
