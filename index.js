import authFactory from './auth';
import dbFactory from './db';
import createNewWebsocket from './ws';
import storageFactory from './storage';

const createSdk = () => {
  const auth = authFactory();
  const db = dbFactory();
  const ws = () => createNewWebsocket();
  const storage = storageFactory();

  return {
    auth,
    db,
    ws,
    storage,
  }
};

const sdk = createSdk();

export default sdk;
