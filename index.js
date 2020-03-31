import authFactory from './auth';
import dbFactory from './db';

const createSdk = (url) => {
  const auth = authFactory(url);
  const db = dbFactory(url);

  return {
    auth,
    db,
  }
};

const url = 'http://localhost:3000';

const sdk = createSdk(url);

export default sdk;
