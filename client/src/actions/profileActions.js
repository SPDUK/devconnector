import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
} from './types';

// profile loading
export const setProfileLoading = () => ({
  type: PROFILE_LOADING
});

// clear profile
export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
});
// create profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

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

// add experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post('/api/profile/experience', expData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// add education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post('/api/profile/education', eduData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// delete experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteEducation = id => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// delete account & profile if alert is clicked ok
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure you want to delete your account? This can NOT be undone!')) {
    axios.delete('/api/profile').then(res =>
      dispatch({ type: SET_CURRENT_USER, payload: {} }).catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
    );
  }
};
