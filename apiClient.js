const isOk = (response, isJson) => {
  if (response.ok) {
    return isJson ? response.json() : response;
  }
  return Promise.reject(new Error(response.statusText));
};

const createApiClient = (hostname, apiKey) => {
  return ({
    sendRequest(path, method = 'GET', body, isJson = true) {
      const requestUrl = `${hostname}${path}`;

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
        .then((res) => isOk(res, isJson))
    }
  })
}

export default createApiClient;
