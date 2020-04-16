import authFactory from './auth';
import dbFactory from './db';
import createNewWebsocket from './ws';
import storageFactory from './storage';

const createSdk = (url) => {
  const auth = authFactory(url);
  const db = dbFactory(url);
  const ws = () => createNewWebsocket(url);
  const storage = storageFactory(url);

  return {
    auth,
    db,
    ws,
    storage,
  }
};

const url = 'http://localhost:3000';

const sdk = createSdk(url);

export default sdk;
