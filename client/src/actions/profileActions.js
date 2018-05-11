import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types';

// profile loading
export const setProfileLoading = () => ({
  type: PROFILE_LOADING
});

// clear profile
export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
});

// get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    // call get profile and pass the profile data as the payload
    .get('/api/profile')
    .then(res =>
      dispatch({
        // call case GET_PROFILE in profileReducer.js
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        // sets user to empty not an errors
        payload: {}
      })
    );
};
