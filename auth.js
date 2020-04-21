import sendRequest from './apiClient';
import config from './config';

const url = config.url;

const authFactory = () => ({
  register(email, password) {
    return sendRequest(`${url}/register`, 'POST', { email, password });
  },
  login(email, password) {
    return sendRequest(`${url}/login`, 'POST', { email, password });
  },
  logout() {
    return sendRequest(`${url}/logout`, 'POST');
  },
});

export default authFactory;
