const dbFactory = (apiClient) => ({
  getCollection(collection) {
    return apiClient.sendRequest(`/${collection}`);
  },
  getResource(collection, id) {
    return apiClient.sendRequest(`/${collection}/${id}`);
  },
  createResource(collection, data) {
    return apiClient.sendRequest(`/${collection}`, 'POST', data);
  },
  deleteResource(collection, id) {
    return apiClient.sendRequest(`/${collection}/${id}`, 'DELETE');
  },
  updateResource(collection, id, data) {
    return apiClient.sendRequest(`/${collection}/${id}`, 'PATCH', data);
  },
  overwriteResource(collection, id, data) {
    return apiClient.sendRequest(`/${collection}/${id}`, 'PUT', data);
  },
  getCollectionsList() {
    return apiClient.sendRequest('/collections')
  },
  createNewCollection(collectionName) {
    return apiClient.sendRequest('/collections', 'POST', { collectionName });
  },
});

export default dbFactory;
