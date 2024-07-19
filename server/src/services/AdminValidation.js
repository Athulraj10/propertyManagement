const Response = require("./Response");
const Joi = require("@hapi/joi");
const Helper = require("./Helper");

module.exports = {
  registerValidation: (req, res, callback) => {
    const schema = Joi.object({
      username: Joi.string().trim().required(),
      email: Joi.string().trim().required(),
      password: Joi.string().trim().required(),
      confirmPassword: Joi.string().trim().required(),
      role: Joi.string().trim().required(),
    });
    const { error } = schema.validate(req);
    if (error) {
      console.error(error);
      return Response.validationErrorResponseData(
        res,
        res.__(Helper.validationMessageKey("registerFailed", error))
      );
    }
    return callback(true);
  },
  
  loginValidation: (req, res, callback) => {
    const schema = Joi.object({
      username: Joi.string().trim().required(),
      password: Joi.string().trim().required(),
    });
    const { error } = schema.validate(req);
    if (error) {
      console.errro(error);
      return Response.validationErrorResponseData(
        res,
        res.__(Helper.validationMessageKey("loginValidation", error))
      );
    }
    return callback(true);
  },
};
