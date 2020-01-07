import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { addTodo, updateTodo, deleteTodo } from '../_actions';
import uuid from 'uuid';
import Sidebar from '../components/organisms/Sidebar';
import Navbar from '../components/organisms/Navbar';
import CardList from '../components/organisms/CardList';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    // this.state = this.props.projects
    // {
    //   projects: [
    //     {
    //       id: uuid(), name: 'Todo List', lists: [
    //         {
    //           id: uuid(), name: 'Tasks',
    //           todos: [{ id: uuid(), content: 'First Test', isCompleted: false }]
    //         },
    //         {
    //           id: uuid(), name: 'In Progress',
    //           todos: [{ id: uuid(), content: 'Testing', isCompleted: false }, { id: uuid(), content: 'Working', isCompleted: false }]
    //         },
    //         {
    //           id: 3, name: 'Done',
    //           todos: [{ id: uuid(), content: 'First Test', isCompleted: false }]
    //         },
    //       ]
    //     },
    //   ]
    // }
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
          <Sidebar projects={this.props.projects} />
          <div className="content col p-0">
            <Navbar />
            <main className="px-4 ">
              <div className="row">
                {this.props.projects.map(project => {
                  return project.lists.map(list => {
                    return (
                      <CardList
                        key={list.id}
                        project={project}
                        list={list}
                        onCreate={this.props.addTodo}
                        onKeyDown={this.handleKeyDown}
                        onChange={this.props.updateTodo}
                        onToggle={this.toggleTodoCompleteAtIndex}
                        onDelete={this.props.deleteTodo} />
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

const mapStateToProps = (state) => {
  return {
    projects: state.projects
  }
}

const mapDispatchToProps = { addTodo, updateTodo, deleteTodo };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dashboard)
);