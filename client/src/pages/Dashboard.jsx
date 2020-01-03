import React, { Component } from 'react'
import uuid from 'uuid';
import Sidebar from '../components/organisms/Sidebar';
import Navbar from '../components/organisms/Navbar';
import CardList from '../components/organisms/CardList';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      projects: [
        {
          id: 1, name: 'Todo List', lists: [
            {
              id: 1, name: 'Tasks',
              todos: [{ id: 1, content: 'First Test', isCompleted: false }]
            },
            {
              id: 2, name: 'In Progress',
              todos: [{ id: 1, content: 'Testing', isCompleted: false }, { id: 2, content: 'Working', isCompleted: false }]
            },
            {
              id: 3, name: 'Done',
              todos: [{ id: 1, content: 'First Test', isCompleted: false }]
            },
          ]
        },
      ]
    }
  }

  // // Add todo handler
  // addTodo = (list, val) => {
  //   // Assemble data
  //   const todo = {
  //     content: 'test',
  //     isCompleted: false,
  //   };

  //   this.setState({ [list]: [todo, ...this.state[list]] });
  //   // Update data
  //   // axios.post(this.apiUrl, todo).then(res => {
  //   //   this.state.data.push(res.data);
  //   //   this.setState({ data: this.state.data });
  //   // });
  // }

  // // Handle remove
  // removeTodo = (list, id) => {
  //   // Filter all todos except the one to be removed
  //   const remainder = this.state[list].filter(todo => {
  //     if (todo.id !== id) return todo;
  //   });

  //   this.setState({ [list]: remainder });
  //   // Update state with filter
  //   // axios.delete(this.apiUrl + "/" + id).then(res => {
  //   //   this.setState({ data: remainder });
  //   // });
  // }

  // handleKeyDown = (e, i) => {
  //   if (e.key === 'Enter') {
  //     this.createTodoAtIndex(e, i);
  //   }
  //   if (e.key === 'Backspace' && todos[i].content === '') {
  //     e.preventDefault();
  //     return this.removeTodoAtIndex(i);
  //   }
  // }


  //   /**
  //  * Sets the given project id as active and switches to displaying its TODOs if
  //  * currently on another screen.
  //  */
  // setActiveProject(projectId) {
  //   this.setState({
  //     activeProjectId: projectId
  //   , page: Page.TODO_LISTS
  //   })
  // },

  // addProject(projectName) {
  //   var id = uuid()
  //   this.state.projects.push({id: id, name: projectName, doing: null, todos: []})
  //   this.setState({projects: this.state.projects})
  // },

  // editProjectName(project, projectName) {
  //   project.name = projectName
  //   this.setState({projects: this.state.projects})
  // },

  // moveProjectUp(project, index) {
  //   this.state.projects.splice(index - 1, 0, this.state.projects.splice(index, 1)[0])
  //   this.setState({projects: this.state.projects})
  // },

  // moveProjectDown(project, index) {
  //   this.state.projects.splice(index + 1, 0, this.state.projects.splice(index, 1)[0])
  //   this.setState({projects: this.state.projects})
  // },

  // toggleProjectVisible(project) {
  //   project.hidden = !project.hidden
  //   this.setState({projects: this.state.projects})
  // },

  // /**
  //  * Deletes a project and sets the next adjacent project as active if there are
  //  * any.
  //  */
  // deleteProject(project, index) {
  //   this.state.projects.splice(index, 1)
  //   var activeProjectId = this.state.activeProjectId
  //   if (this.state.projects.length === 0) {
  //     activeProjectId = null
  //   }
  //   else if (activeProjectId === project.id) {
  //     if (index <= this.state.projects.length - 1) {
  //       activeProjectId = this.state.projects[index].id
  //     }
  //     else {
  //       activeProjectId = this.state.projects[index - 1].id
  //     }
  //   }
  //   this.setState({
  //     activeProjectId: activeProjectId
  //   , projects: this.state.projects
  //   })
  // },




  createTodoAtIndex = (list, i) => {
    const id = uuid();
    list.todos.unshift({ id: id, content: 'Testing', isCompleted: false })

    this.setState({
      projects: this.state.projects
    })
  }

  updateTodoAtIndex = (e, i, list) => {
    const newTodos = [...this.state[list]];
    newTodos[i].content = e.target.value;
    this.setState({ [list]: newTodos });
  }

  removeTodoAtIndex = (project, list, todo) => {
    const filteredTodos = list.todos.filter(task => task.id !== todo.id);
    const newTodos = this.state.projects.map(prevProject => {
      if (prevProject.id !== project.id) return prevProject;

      return {
        ...prevProject,
        lists: prevProject.lists.map(prevList => {
          if (prevList.name !== list.name) return prevList;

          return { ...prevList, todos: filteredTodos }
        })
      }
    })

    this.setState({ projects: newTodos })
  }

  toggleTodoCompleteAtIndex = (i, list) => {
    const temporaryTodos = [...this.state[list]];
    temporaryTodos[i].isCompleted = !temporaryTodos[i].isCompleted;
    this.setState({ e: temporaryTodos });
  }

  render() {
    return (
      <div className="app container-fluid" >
        <div className="row">
          <Sidebar projects={this.state.projects} />
          <div className="content col p-0">
            <Navbar />
            <main className="px-4 ">
              <div className="row">
                {this.state.projects.map(project => {
                  return project.lists.map(list => {
                    return (
                      <CardList
                        key={list.id}
                        project={project}
                        list={list}
                        onCreate={this.createTodoAtIndex}
                        onKeyDown={this.handleKeyDown}
                        onChange={this.updateTodoAtIndex}
                        onToggle={this.toggleTodoCompleteAtIndex}
                        onDelete={this.removeTodoAtIndex} />
                    )
                  })
                })}
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }
}
