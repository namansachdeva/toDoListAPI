import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const STATUS = ['pending', 'in-progress', 'done'];

const todoListSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [40, 'Name cannot be more than 40 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      trim: true,
      maxlength: [200, 'Description cannot be more than 200 characters'],
    },
    status: {
      type: String,
      enum: STATUS,
      default: 'pending',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TodoList = model('TodoList', todoListSchema);

export default TodoList;
