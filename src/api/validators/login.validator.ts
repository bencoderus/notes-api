import Joi from 'joi';

export default Joi.object({
  email: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).max(60).required(),
});
