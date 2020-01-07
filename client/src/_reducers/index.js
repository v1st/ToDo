import {
  combineReducers
} from 'redux'
import uuid from 'uuid';
import {
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from '../_actions/types';

const projectsState = [{
  id: uuid(),
  name: 'Todo List',
  lists: [{
      id: uuid(),
      name: 'Tasks',
      todos: [{
        id: uuid(),
        content: 'First Test',
        isCompleted: false
      }]
    },
    {
      id: uuid(),
      name: 'In Progress',
      todos: [{
        id: uuid(),
        content: 'Testing',
        isCompleted: false
      }, {
        id: uuid(),
        content: 'Working',
        isCompleted: false
      }]
    },
    {
      id: uuid(),
      name: 'Done',
      todos: [{
        id: uuid(),
        content: 'First Test',
        isCompleted: false
      }]
    },
  ]
}, ];

function projects(state = projectsState, action) {
  switch (action.type) {
    case ADD_TODO:
      const id = uuid();
      const newList = [{
        id: id,
        content: 'New Task',
        isCompleted: false
      }, ...action.list.todos]

      return state.map(prevProject => {
        if (prevProject.id !== action.project.id) return prevProject;

        return {
          ...prevProject,
          lists: prevProject.lists.map(prevList => {
            if (prevList.name !== action.list.name) return prevList;

            return {
              ...prevList,
              todos: newList
            }
          })
        }
      })
    case UPDATE_TODO:
      const updatedTodoList = action.list.todos.map(prevTodo => {
        if (prevTodo.id !== action.todo.id) return prevTodo;

        return {
          ...action.todo,
          content: action.newContent
        };
      });

      return state.map(prevProject => {
        if (prevProject.id !== action.project.id) return prevProject;

        return {
          ...prevProject,
          lists: prevProject.lists.map(prevList => {
            if (prevList.name !== action.list.name) return prevList;

            return {
              ...prevList,
              todos: updatedTodoList
            }
          })
        }
      })
    case DELETE_TODO:
      const filteredTodos = action.list.todos.filter(task => task.id !== action.todo.id);
      return state.map(prevProject => {
        if (prevProject.id !== action.project.id) return prevProject;

        return {
          ...prevProject,
          lists: prevProject.lists.map(prevList => {
            if (prevList.name !== action.list.name) return prevList;

            return {
              ...prevList,
              todos: filteredTodos
            }
          })
        }
      })

    default:
      return state;
  }
}

// function search(state = navState, action) {
//   switch (action.type) {
//     case SEARCH_MODS:
//       return {
//         ...state,
//         search: action.query
//       };
//     default:
//       return state;
//   }
// }

// function info(state = staticData, action) {
//   switch (action.type) {
//     case CATEGORY:
//       return {
//         ...state
//       };
//     default:
//       return state;
//   }
// }

const reducers = combineReducers({
  projects
})

export default reducers;