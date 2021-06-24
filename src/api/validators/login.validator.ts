import Joi from "joi";

const schema = Joi.object({
  email: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).max(60).required(),
});

export default schema;
