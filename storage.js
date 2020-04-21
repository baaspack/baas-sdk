const isOk = (response) => {
  return response.ok ?
    response.json() :
    Promise.reject(new Error('Failed to load data from server'));
}

const headers = {
  authorization: 'API anotherSuperSecretThing',
}

const setOptions = (method, body) => {
  const options = {
    method: method,
    headers,
    credentials: 'include',
  }

  if (body) {
    // make sure body is an object
    const bodyType = typeof body;

    if (bodyType !== 'object') {
      body = { data: body };
    }

    options.body = body;
  }

  return options;
}

const storageFactory = (url) => ({
  getFile(userId, filename) {
    const options = setOptions('GET');

    return fetch(`${url}/uploads/${userId}/${filename}`, options)
      .then((response) => {
        return response.ok ?
          response :
          Promise.reject(new Error('Failed to load data from server'));
      })
  },
  getListOfUserFiles(userId) {
    const options = setOptions('GET');

    return fetch(`${url}/uploads/${userId}`, options)
      .then(isOk)
  },
  uploadFile(fileFromFormData, filename, bucket) {
    if (!fileFromFormData.size) { return 'no form submitted' }

    const data = new FormData();

    data.append('bucket', bucket);
    data.append('filename', filename);
    data.append('file', fileFromFormData);

    const options = setOptions('POST', data)

    return fetch(`${url}/uploads`, options)
      .then(isOk)
  },
  updateFile(currentFilename, newFilename, bucket) {
    const newFormData = new FormData();

    newFormData.append('bucket', bucket);
    newFormData.append('filename', newFilename);

    const options = setOptions('PATCH', newFormData)

    return fetch(`${url}/uploads/${currentFilename}`, options)
      .then(isOk)
  },
  deleteFile(filename) {
    const options = setOptions('DELETE')

    return fetch(`${url}/uploads/${filename}`, options)
      .then(isOk)
  },
  overwriteFile(fileFromFormData, filename) {
    if (!fileFromFormData) { return 'no form submitted' }
    const newFormData = new FormData();
    newFormData.append('filename', filename);
    newFormData.append('file', fileFromFormData);

    const options = setOptions('PUT', newFormData);

    fetch(`${url}/uploads/${filename}`, options)
      .then(isOk)
  }
});

export default storageFactory;
