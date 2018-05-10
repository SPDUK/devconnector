import { GET_ERRORS } from './types';
import axios from 'axios';
// Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // save to localStorage
      const { token } = res.data;
      // set token to localStorage
      localStorage.setItem('jwtToken', token);
      // set token to auth header
      setAuthToken(token);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
