const createNewWebsocket = (url) => {
  const ws = new WebSocket(url.replace('http', 'ws'));
  ws.actions = wsFactory(ws);
  return ws;
}

const wsFactory = (ws) => ({
  getCollection(collection) {
    this.sendMessage({
      action: 'getAll',
      collection: collection,
    });
  },
  getResource(collection, id) {
    this.sendMessage({
      action: 'getOne',
      collection: collection,
      id: id,
    });
  },
  createResource(collection, data) {
    this.sendMessage({
      action: 'create',
      collection: collection,
      data: data,
    });
  },
  overwriteResource(collection, id, data) {
    this.sendMessage({
      action: 'update',
      collection: collection,
      id: id,
      data: data,
    });
  },
  updateResource(collection, id, data) {
    this.sendMessage({
      action: 'patch',
      collection: collection,
      id: id,
      data: data,
    });
  },
  deleteResource(collection, id) {
    this.sendMessage({
      action: 'delete',
      collection: collection,
      id: id,
    });
  },
  open(message) {
    message.action = 'open';
    this.sendMessage(message);
  },
  close(message) {
    message.action = 'close';
    this.sendMessage(message);
  },
  sendMessage(message) {
    ws.send(JSON.stringify(message));
  },
  // getCollectionsList() {
  //   return sendRequest(`${url}/collections`)
  //     .then((list) => console.log(list))
  // },
  // createNewCollection(collectionName) {
  //   return sendRequest(`${url}/collections`, 'POST', { collectionName })
  //     .then((coll) => console.log(coll));
  // },

});

export default createNewWebsocket;
