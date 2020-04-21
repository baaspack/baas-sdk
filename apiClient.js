const isOk = (response) => {
  return response.ok ?
    response.json() :
    Promise.reject(new Error(response.statusText));
};

const createApiClient = (hostname, apiKey) => (path, method = 'GET', body) => {
  const requestUrl = `${hostname}${path}`.replace('//', '/');

  const options = {
    method,
    headers: {
      authorization: `key ${apiKey}`,
    },
    credentials: 'include',
  };

  if (body) {
    // make sure body is an object
    const bodyType = typeof body;

    if (bodyType !== 'object') {
      body = { data: body };
    }

    if (body instanceof FormData) {
      options.body = body;
    } else {
      options.headers['content-type'] = 'application/json';
      options.body = JSON.stringify(body);
    }
  }

  return fetch(requestUrl, options)
    .then(isOk)
};

export default createApiClient;
