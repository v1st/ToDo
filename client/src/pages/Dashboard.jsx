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

  /**
   * Create a todo within selected list
   */
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

  /**
   * Update existing todo with new content
   */
  updateTodoAtIndex = (project, list, todo, newContent) => {
    const newList = list.todos.map(prevTodo => {
      if (prevTodo.id !== todo.id) return prevTodo;

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

  /**
   * Delete todo from list
   */
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
