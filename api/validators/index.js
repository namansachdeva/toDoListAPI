import joi from 'joi';

export const validateCreateTodo = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) next(error);

  next();
};

export const validateUpdateTodo = (req, res, next) => {
  const schema = joi.object({
    name: joi.string(),
    description: joi.string(),
    status: joi.string().valid('pending', 'in-progress', 'done'),
  });

  const { error } = schema.validate(req.body);

  if (error) next(error);

  next();
};
