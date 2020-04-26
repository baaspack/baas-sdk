const storageFactory = (apiClient) => ({
  getFile(userId, filename) {
    return apiClient.sendRequest(`/uploads/${userId}/${filename}`, 'GET', null, false);
  },
  getListOfUserFiles(userId) {
    return apiClient.sendRequest(`/uploads/${userId}`);
  },
  uploadFile(fileFromFormData, filename, bucket) {
    if (!fileFromFormData.size) { return 'no form submitted'; }

    const data = new FormData();

    data.append('bucket', bucket);
    data.append('filename', filename);
    data.append('file', fileFromFormData);

    return apiClient.sendRequest('/uploads', 'POST', data);
  },
  updateFile(currentFilename, newFilename, bucket) {
    const newFormData = new FormData();

    newFormData.append('bucket', bucket);
    newFormData.append('filename', newFilename);

    return apiClient.sendRequest(`/uploads/${currentFilename}`, 'PATCH', newFormData);
  },
  deleteFile(filename) {
    return apiClient.sendRequest(`/uploads/${filename}`, 'DELETE');
  },
  overwriteFile(fileFromFormData, filename) {
    if (!fileFromFormData) { return 'no form submitted'; }

    const newFormData = new FormData();
    newFormData.append('filename', filename);
    newFormData.append('file', fileFromFormData);

    return apiClient.sendRequest(`/uploads/${filename}`, 'PUT', newFormData);
  }
});

export default storageFactory;
