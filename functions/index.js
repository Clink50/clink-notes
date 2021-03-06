exports.handler = (event, context) => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Hi there Tacos',
        event,
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: {
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify({
        error: 'Unable to to get tacos...',
      }),
    };
  }
};
