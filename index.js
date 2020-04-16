import authFactory from './auth';
import dbFactory from './db';
import createNewWebsocket from './ws';

const createSdk = (url) => {
  const auth = authFactory(url);
  const db = dbFactory(url);
  const ws = () => createNewWebsocket(url);

  return {
    auth,
    db,
    ws,
  }
};

const url = 'http://localhost:3000';

const sdk = createSdk(url);

export default sdk;
