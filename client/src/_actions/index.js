import {
  GET_ITEMS,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  ITEMS_LOADING,
} from './types';
import axios from 'axios';

// Get Todos
export const getTodos = () => dispatch => {
  dispatch(setItemLoading());
  axios.get('/dashboard/state')
    .then(res => dispatch({
      type: GET_ITEMS,
      projects: res.data
    }));
}

// Add Todo
export const addTodo = (project, list) => dispatch => {
  axios({
      method: 'POST',
      url: '/dashboard/state',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json'
      },
      data: {
        project,
        list
      }
    }).then(res =>
      dispatch({
        type: ADD_TODO,
        project,
        list
      })
    )
    .catch(err => console.log(err.response.data));
}

// Update Todo
export const updateTodo = (project, list, todo, newContent) => dispatch => {
  axios({
      method: 'PUT',
      url: `/dashboard/state/${todo._id}`,
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json'
      },
      data: {
        project,
        list,
        todo,
        newContent
      }
    }).then(res =>
      dispatch({
        type: UPDATE_TODO,
        project,
        list,
        todo,
        newContent
      })
    )
    .catch(err => console.log(err.response.data));
}

// Delete Todo
export const deleteTodo = (project, list, todo) => dispatch => {
  // return {
  //   type: DELETE_TODO,
  //   project,
  //   list,
  //   todo
  // }
  axios({
      method: 'DELETE',
      url: `/dashboard/state/${todo._id}`,
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json'
      },
      data: {
        project,
        list,
        todo
      }
    }).then(res =>
      dispatch({
        type: DELETE_TODO,
        project,
        list,
        todo
      })
    )
    .catch(err => console.log(err.response.data));
}

// Loading item
export function setItemLoading() {
  return {
    type: ITEMS_LOADING
  }
}