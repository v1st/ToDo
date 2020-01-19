const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  content: String,
  isCompleted: Boolean
},{ _id : true });

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;