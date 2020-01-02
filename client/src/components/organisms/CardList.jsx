import React, { Component } from 'react'
import Card from '../molecules/Card';

export default class CardList extends Component {
  render() {
    const { project, onCreate, onKeyDown, onChange, onToggle, onDelete } = this.props;

    function addTodo() {
      onCreate(project)
    }

    function onDeleteTodo(todo) {
      onDelete(project, todo)
    }

    return (
      <div className="col-12 col-sm-6 col-md-4 col-xl-3 mb-4">
        <div className="row no-gutters align-items-center mb-3">
          <div className="col">
            <h5 className="font-weight-bold mb-0">{project.name}</h5>
          </div>
          <div className="col-auto">
            <button onClick={addTodo} className="btn text-primary font-weight-bold py-1 px-2">+</button>
          </div>
        </div>
        <div className="col px-0">
          {project.todos.map((todo) => (
            <Card key={todo.id} todo={todo} content={todo.content} onKeyDown={onKeyDown} onChange={onChange} onToggle={onToggle} onDeleteTodo={onDeleteTodo} />
          ))}
        </div>
      </div>
    )
  }
}
