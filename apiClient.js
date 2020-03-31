const isOk = (response) => {
  return response.ok ?
    response.json() :
    Promise.reject(new Error(response.statusText));
};

const sendRequest = (url, method = 'GET', body) => {
  const options = {
    method,
    headers: {
      authorization: 'API anotherSuperSecretThing',
    },
    credentials: 'include',
  };

  if (body) {
    // make sure body is an object
    const bodyType = typeof body;

    if (bodyType !== 'object') {
      body = { data: body };
    }

    options.headers['content-type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  return fetch(url, options)
    .then(isOk)
}

export default sendRequest;
