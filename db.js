import sendRequest from './apiClient';
import config from './config';

const url = config.url;

const dbFactory = () => ({
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
  },
  getCollectionsList() {
    return sendRequest(`${url}/collections`)
  },
  createNewCollection(collectionName) {
    return sendRequest(`${url}/collections`, 'POST', { collectionName })
  },
});

export default dbFactory;
