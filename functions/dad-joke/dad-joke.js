const fetch = require('node-fetch');
exports.handler = async () => {
  console.log('here');
  try {
    const res = await fetch('https://icanhazdadjoke.com/', {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      return {
        statusCode: res.status,
        body: res.statusText,
      };
    }

    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: data.joke,
      }),
      error: '',
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        msg: err.message,
      }),
    };
  }
};
