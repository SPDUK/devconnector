const isEmpty = require('./is-empty');
const Validator = require('validator');

module.exports = function validatePostInput(data) {
  const errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';
  if (!Validator.isLength(data.text, { min: 1, max: 300 })) {
    errors.text = 'Post must be under 300 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
