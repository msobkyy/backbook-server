const validator = require('validator');

exports.validateCharLength = (val) => {
  return validator.isLength(val, { min: 3, max: 25 });
};
