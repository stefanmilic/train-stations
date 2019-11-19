const joi = require('joi');

class ValidationError extends Error {
  constructor(errors) {
    super(JSON.stringify(errors));
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

/**
 * Validate data with Joi.
 * On success returns value object.
 * On failure throws exception!
 */
function validate(data, joiSchema, joiOptions = {}) {
  const { error, value } = joi.validate(data, joiSchema, joiOptions);

  if (error) {
    const errors = {};
    error.details.forEach(err => {
      errors[err.path.join('.')] = err.message;
    });

    throw new ValidationError(errors);
  }

  return value;
}

module.exports = {
  ValidationError,
  validate,
};
