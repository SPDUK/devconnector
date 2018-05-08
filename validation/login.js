const isEmpty = require('./is-empty');

const Validator = require('validator');

module.exports = function validateLoginInput(data) {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  // returns an object with two properties errors and isValid, isEmpty has it's own properties such as errors.email
  // errors.email = "email is invalid"
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
