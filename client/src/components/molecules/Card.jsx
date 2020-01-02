import React, { Component } from 'react'

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      content: this.props.content,
    }
  }

  componentDidUpdate(nextProps) {
    const { content } = this.props

    if (nextProps.content !== content) {
      this.setState({ content: content })
    }
  }

  setEditing = bool => {
    this.setState({
      isEditing: bool,
    })
  }

  handleKeyDown = (event, type) => {
    const { key } = event;
    const keys = ["Escape", "Tab"];
    const enterKey = "Enter";
    const allKeys = [...keys, enterKey];
    if (
      (type === "textarea" && keys.indexOf(key) > -1) ||
      (type !== "textarea" && allKeys.indexOf(key) > -1)
    ) {
      this.setEditing(false);
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleDelete = () => {
    this.props.onDeleteTodo(this.props.todo)
  }

  render() {
    let { isEditing, content } = this.state;

    return (
      <div className="card callout callout-primary shadow h-100 py-4 mb-2">
        <div className="row no-gutters align-items-center">
          <div className="col mr-2">
            {isEditing ? (
              <div onBlur={() => this.setEditing(false)} onKeyDown={e => this.handleKeyDown(e)}>
                <textarea name="content" value={content} onChange={e => this.handleChange(e)} className="h6 form-control text-primary mb-1" />
              </div>
            ) : (
                <div onClick={() => this.setEditing(true)}>
                  <h6 className="text-primary mb-1">{content}</h6>
                </div>
              )}
          </div>
          <div className="col-auto">
            <button onClick={this.handleDelete} className="btn text-danger font-weight-bold py-1 px-2">X</button>
          </div>
        </div>
      </div>


    )
  }
}
