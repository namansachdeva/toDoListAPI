import TodoList from '../models/todoList.model.js';

export const getTodos = async ({ limit = 10, skip = 0 }) => {
  try {
    const todos = await TodoList.find()
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(Number(skip));

    return todos;
  } catch (error) {
    throw error;
  }
};

export const getTodo = async (id) => {
  try {
    const todo = await TodoList.findById(id);

    if (!todo) throw new Error('Todo not found');

    return todo;
  } catch (error) {
    throw error;
  }
};

export const createTodo = async (todo) => {
  try {
    const newTodo = await TodoList.create(todo);

    return newTodo;
  } catch (error) {
    throw error;
  }
};

export const updateTodo = async ({ id, todo }) => {
  try {
    const updatedTodo = await TodoList.findByIdAndUpdate(id, todo, {
      new: true,
      runValidators: true,
    });

    if (!updatedTodo) throw new Error('Todo not found');

    return updatedTodo;
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const deletedTodo = await TodoList.findByIdAndDelete(id);

    if (!deletedTodo) throw new Error('Todo not found');

    return deletedTodo;
  } catch (error) {
    throw error;
  }
};
