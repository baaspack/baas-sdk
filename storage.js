const isOk = (response) => {
  return response.ok ?
    response.json() :
    Promise.reject(new Error('Failed to load data from server'));
}
const sdk = {
  storageUrl: 'http://localhost:3000/uploads',
  getListOfUserFiles(userId) {
    return fetch(`${this.storageUrl}/${userId}`)
      .then(isOk)
  },
  uploadFile(fileFromFormData, userId, filename, bucket) {
    if (fileFromFormData.size === 0) { return 'no form submitted' }

    const data = new FormData();

    data.append('userId', userId);
    data.append('bucket', bucket);
    data.append('filename', filename);
    data.append('file', fileFromFormData);

    const options = {
      method: 'POST',
      body: data,
    }

    return fetch(`${this.storageUrl}`, options)
      .then(isOk)
  },
  updateFile(currentFilename, newFilename, userId, bucket) {
    const newFormData = new FormData();

    newFormData.append('userId', userId);
    newFormData.append('bucket', bucket);
    newFormData.append('filename', newFilename);

    const options = {
      method: 'PATCH',
      body: newFormData,
    }

    return fetch(`${this.storageUrl}/${userId}/${currentFilename}`, options)
      .then(isOk)
  },
  deleteFile(userId, filename) {
    const options = {
      method: 'DELETE',
    }

    return fetch(`${this.storageUrl}/${userId}/${filename}`, options)
      .then(isOk)
  },
  overwriteFile(fileFromFormData, filename, userId) {
    if (fileFromFormData.size === 0) { return 'no form submitted' }
    const newFormData = new FormData();
    newFormData.append('filename', filename);
    newFormData.append('userId', userId);
    newFormData.append('file', fileFromFormData);

    const options = {
      method: 'PUT',
      body: newFormData
    }
    fetch(`${this.storageUrl}/:userId/:filename`, options)
      .then(isOk)
  }
};

export default sdk;
