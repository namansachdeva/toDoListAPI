import * as todoLogic from '../logic/index.js';
import asyncHandler from 'express-async-handler';
import { logger } from '../utils/logger.js';
/**
 * @desc    Get all todos
 * @route   GET /api/todos
 * @access  Public
 */

export const getTodos = asyncHandler(async (req, res, next) => {
  try {
    const { limit = 10, skip = 0 } = req.query;

    const todos = await todoLogic.getTodos({
      limit,
      skip,
    });
    res.status(200).json(todos);
  } catch (error) {
    logger.error(`Error in getTodos controller: ${error.message}`);

    next(error);
  }
});

/**
 * @desc    Get single todo
 * @route   GET /api/todos/:id
 * @access  Public
 * @param   {string} id
 *
 * */

export const getTodo = asyncHandler(async (req, res, next) => {
  try {
    const todo = await todoLogic.getTodo(req.params.id);
    res.status(200).json(todo);
  } catch (error) {
    logger.error(`Error in getTodo controller: ${error.message}`);

    next(error);
  }
});

/**
 * @desc    Create new todo
 * @route   POST /api/todos
 * @access  Public
 * @param   {string} name
 * @param   {string} description
 * @param   {string} status
 * */

export const createTodo = asyncHandler(async (req, res, next) => {
  try {
    const todo = await todoLogic.createTodo(req.body);
    res.status(201).json(todo);
  } catch (error) {
    logger.error(`Error in createTodo controller: ${error.message}`);

    next(error);
  }
});

/**
 * @desc    Update todo
 * @route   PUT /api/todos/:id
 * @access  Public
 */

export const updateTodo = asyncHandler(async (req, res, next) => {
  try {
    const todo = await todoLogic.updateTodo({
      id: req.params.id,
      todo: req.body,
    });
    res.status(200).json(todo);
  } catch (error) {
    logger.error(`Error in updateTodo controller: ${error.message}`);

    next(error);
  }
});

/**
 * @desc    Delete todo
 * @route   DELETE /api/todos/:id
 * @access  Public
 * @param   {string} id
 *
 * */

export const deleteTodo = asyncHandler(async (req, res, next) => {
  try {
    await todoLogic.deleteTodo(req.params.id);
    res.status(200).json({ message: 'Todo deleted' });
  } catch (error) {
    logger.error(`Error in deleteTodo controller: ${error.message}`);

    next(error);
  }
});
