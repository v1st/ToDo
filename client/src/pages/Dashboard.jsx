import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { addTodo, updateTodo, deleteTodo } from '../_actions';
import Sidebar from '../components/organisms/Sidebar';
import Navbar from '../components/organisms/Navbar';
import CardList from '../components/organisms/CardList';

class Dashboard extends Component {
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
                        key={list._id}
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