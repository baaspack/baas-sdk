import authFactory from './auth';
import dbFactory from './db';
import createNewWebsocket from './ws';
import storageFactory from './storage';

const createSdk = (url, api_key) => {
  const auth = authFactory(url, api_key);
  const db = dbFactory(url, api_key);
  const ws = () => createNewWebsocket(url, api_key);
  const storage = storageFactory(url, api_key);

  return {
    auth,
    db,
    ws,
    storage,
  }
};

const url = 'http://localhost:3002';
const api_key = 'API anotherSuperSecretThing';

const sdk = createSdk(url, api_key);

export default sdk;
