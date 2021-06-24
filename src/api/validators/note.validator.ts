import Joi from "joi";

const schema = Joi.object({
  title: Joi.string().min(1).max(191).required(),
  content: Joi.string().min(1).required(),
});

export default schema;
