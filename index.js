import createApiClient from './apiClient';
import authFactory from './auth';
import dbFactory from './db';
import createNewWebsocket from './ws';
import storageFactory from './storage';

const createSdk = (hostname, url) => {
  const apiClient = createApiClient(hostname, url);

  const auth = authFactory(apiClient);
  const db = dbFactory(apiClient);
  const ws = () => createNewWebsocket(url);
  const storage = storageFactory(apiClient);

  return {
    auth,
    db,
    ws,
    storage,
  }
};

export default createSdk;
