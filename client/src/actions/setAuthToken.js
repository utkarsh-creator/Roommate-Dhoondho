import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    // Apply the token to all requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // If no token is provided, remove the Authorization header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
