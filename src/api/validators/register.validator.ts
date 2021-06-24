import Joi from "joi";

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).max(60).required(),
  confirmPassword: Joi.ref("password"),
});

export default schema;
