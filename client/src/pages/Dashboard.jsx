import React, { Component } from 'react'
import uuid from 'uuid';
import Sidebar from '../components/organisms/Sidebar';
import Navbar from '../components/organisms/Navbar';
import CardList from '../components/organisms/CardList';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
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


  // Need to update this function so it does not mutate state
  createTodoAtIndex = (project, list) => {
    const id = uuid();
    const newList = [{ id: id, content: 'New Task', isCompleted: false }, ...list.todos]
    const newProject = this.state.projects.map(prevProject => {
      if (prevProject.id !== project.id) return prevProject;

      return {
        ...prevProject,
        lists: prevProject.lists.map(prevList => {
          if (prevList.name !== list.name) return prevList;

          return { ...prevList, todos: newList }
        })
      }
    })

    this.setState({
      projects: newProject
    })
  }

  updateTodoAtIndex = (project, list, todo, newContent) => {
    const newList = list.todos.map(prevTodo => {
      if(prevTodo.id !== todo.id) return prevTodo;

      return { ...todo, content: newContent };
    });
    
    const newProject = this.state.projects.map(prevProject => {
      if (prevProject.id !== project.id) return prevProject;

      return {
        ...prevProject,
        lists: prevProject.lists.map(prevList => {
          if (prevList.name !== list.name) return prevList;

          return { ...prevList, todos: newList }
        })
      }
    })

    this.setState({ projects: newProject })
  }

  removeTodoAtIndex = (project, list, todo) => {
    const filteredTodos = list.todos.filter(task => task.id !== todo.id);
    const newProject = this.state.projects.map(prevProject => {
      if (prevProject.id !== project.id) return prevProject;

      return {
        ...prevProject,
        lists: prevProject.lists.map(prevList => {
          if (prevList.name !== list.name) return prevList;

          return { ...prevList, todos: filteredTodos }
        })
      }
    })

    this.setState({ projects: newProject })
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
