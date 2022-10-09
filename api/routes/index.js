import * as todoListControllers from '../controllers/index.js';
import * as todoValidators from '../validators/index.js';
import { Router } from 'express';

const router = Router();

router
  .route('/')
  .get(todoListControllers.getTodos)
  .post(todoValidators.validateCreateTodo, todoListControllers.createTodo);

router
  .route('/:id')
  .get(todoListControllers.getTodo)
  .put(todoValidators.validateUpdateTodo, todoListControllers.updateTodo)
  .delete(todoListControllers.deleteTodo);

export default router;
