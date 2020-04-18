const isOk = (response) => {
  return response.ok ?
    response.json() :
    Promise.reject(new Error('Failed to load data from server'));
}

const storageFactory = (url) => ({
  getFile(userId, filename) {
    const options = {
      method: 'GET',
      headers: {
        authorization: 'API anotherSuperSecretThing',
      },
      credentials: 'include',
    }
    return fetch(`${url}/uploads/${userId}/${filename}`, options)
      .then(isOk)
  },
  getListOfUserFiles(userId) {
    const options = {
      method: 'GET',
      headers: {
        authorization: 'API anotherSuperSecretThing',
      },
      credentials: 'include',
    }
    return fetch(`${url}/uploads/${userId}`, options)
      .then(isOk)
  },
  uploadFile(fileFromFormData, filename, bucket) {
    if (fileFromFormData.size === 0) { return 'no form submitted' }

    const data = new FormData();

    data.append('bucket', bucket);
    data.append('filename', filename);
    data.append('file', fileFromFormData);

    const options = {
      method: 'POST',
      body: data,
      headers: {
        authorization: 'API anotherSuperSecretThing',
      },
      credentials: 'include',
    }

    return fetch(`${url}/uploads`, options)
      .then(isOk)
  },
  updateFile(currentFilename, newFilename, bucket) {
    const newFormData = new FormData();

    newFormData.append('bucket', bucket);
    newFormData.append('filename', newFilename);

    const options = {
      method: 'PATCH',
      body: newFormData,
      headers: {
        authorization: 'API anotherSuperSecretThing',
      },
      credentials: 'include',
    }

    return fetch(`${url}/uploads/${currentFilename}`, options)
      .then(isOk)
  },
  deleteFile(filename) {
    const options = {
      method: 'DELETE',
      headers: {
        authorization: 'API anotherSuperSecretThing',
      },
      credentials: 'include',
    }

    return fetch(`${url}/uploads/${filename}`, options)
      .then(isOk)
  },
  overwriteFile(fileFromFormData, filename) {
    if (!fileFromFormData) { return 'no form submitted' }
    const newFormData = new FormData();
    newFormData.append('filename', filename);
    newFormData.append('file', fileFromFormData);

    const options = {
      method: 'PUT',
      body: newFormData,
      headers: {
        authorization: 'API anotherSuperSecretThing',
      },
      credentials: 'include',
    }
    fetch(`${url}/uploads/${filename}`, options)
      .then(isOk)
  }
});

export default storageFactory;
