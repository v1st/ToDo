import {
  combineReducers
} from 'redux'
import {
  GET_ITEMS,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  ITEMS_LOADING,
} from '../_actions/types';

function projects(state = [], action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        projects: action.projects,
          loading: false
      }

      case ADD_TODO:
        const newList = [{
          content: 'New Task',
          isCompleted: false
        }, ...action.list.todos]

        return state.map(prevProject => {
          if (prevProject._id !== action.project._id) return prevProject;

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
          if (prevTodo._id !== action.todo._id) return prevTodo;

          return {
            ...action.todo,
            content: action.newContent
          };
        });

        return state.map(prevProject => {
          if (prevProject._id !== action.project._id) return prevProject;

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
        const filteredTodos = action.list.todos.filter(task => task._id !== action.todo._id);
        return state.map(prevProject => {
          if (prevProject._id !== action.project._id) return prevProject;

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

      case ITEMS_LOADING:
        return {
          ...state,
          loading: true
        }
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