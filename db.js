import sendRequest from './apiClient';

const dbFactory = (url) => ({
  getCollection(collection) {
    return sendRequest(`${url}/${collection}`);
  },
  getResource(collection, id) {
    return sendRequest(`${url}/${collection}/${id}`);
  },
  createResource(collection, data) {
    return sendRequest(`${url}/${collection}`, 'POST', data);
  },
  deleteResource(collection, id) {
    return sendRequest(`${url}/${collection}/${id}`, 'DELETE');
  },
  updateResource(collection, id, data) {
    return sendRequest(`${url}/${collection}/${id}`, 'PATCH', data)
      .then((updatedResource) => console.log(updatedResource));
  },
  overwriteResource(collection, id, data) {
    return sendRequest(`${url}/${collection}/${id}`, 'PUT', data)
      .then((newResource) => console.log(newResource))

  },
  getCollectionsList() {
    return sendRequest(`${url}/collections`)
      .then((list) => console.log(list))
  },
  createNewCollection(collectionName) {
    return sendRequest(`${url}/collections`, 'POST', { collectionName })
      .then((coll) => console.log(coll));
  },
});

export default dbFactory;
