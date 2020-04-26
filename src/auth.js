const authFactory = (apiClient) => ({
  register(email, password) {
    return apiClient.sendRequest('/register', 'POST', { email, password });
  },
  login(email, password) {
    return apiClient.sendRequest('/login', 'POST', { email, password });
  },
  logout() {
    return apiClient.sendRequest('/logout', 'POST');
  },
});

export default authFactory;
