import {
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from './types';

// Add Todo
export function addTodo(project, list) {
  return {
    type: ADD_TODO,
    project,
    list
  }
}

// Update Todo
export function updateTodo(project, list, todo, newContent) {
  return {
    type: UPDATE_TODO,
    project,
    list,
    todo,
    newContent
  }
}

// Delete Todo
export function deleteTodo(project, list, todo) {
  return {
    type: DELETE_TODO,
    project,
    list,
    todo
  }
}