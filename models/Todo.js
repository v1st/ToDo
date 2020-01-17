const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  content: String,
  isCompleted: Boolean
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;