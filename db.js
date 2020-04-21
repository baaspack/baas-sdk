import sendRequest from './apiClient';

const dbFactory = (url, api_key) => ({
  getCollection(collection) {
    return sendRequest(`${url}/${collection}`, api_key);
  },
  getResource(collection, id) {
    return sendRequest(`${url}/${collection}/${id}`, api_key);
  },
  createResource(collection, data) {
    return sendRequest(`${url}/${collection}`, api_key, 'POST', data);
  },
  deleteResource(collection, id) {
    return sendRequest(`${url}/${collection}/${id}`, api_key, 'DELETE');
  },
  updateResource(collection, id, data) {
    return sendRequest(`${url}/${collection}/${id}`, api_key, 'PATCH', data)
      .then((updatedResource) => console.log(updatedResource));
  },
  overwriteResource(collection, id, data) {
    return sendRequest(`${url}/${collection}/${id}`, api_key, 'PUT', data)
  },
  getCollectionsList() {
    return sendRequest(`${url}/collections`, api_key)
  },
  createNewCollection(collectionName) {
    return sendRequest(`${url}/collections`, api_key, 'POST', { collectionName })
  },
});

export default dbFactory;
