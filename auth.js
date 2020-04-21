import sendRequest from './apiClient';

const authFactory = (url, api_key) => ({
  register(email, password) {
    return sendRequest(`${url}/register`, api_key, 'POST', { email, password });
  },
  login(email, password) {
    return sendRequest(`${url}/login`, api_key, 'POST', { email, password });
  },
  logout() {
    return sendRequest(`${url}/logout`, api_key, 'POST');
  },
});

export default authFactory;
