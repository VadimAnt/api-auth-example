const Joi = require('Joi');

module.exports = schema => (req, res, next) => {
  try {

    ['body', 'params', 'query'].forEach((name) => {
      if (schema[name]) {
        const result = Joi.validate(req[name], schema[name], {
          abortEarly: false,
        });

        if(result.error) {
          throw result.error;
        }
      }
    });
    return next();
    
  } catch (error) {
    res.status(400).send(error);
  }
}