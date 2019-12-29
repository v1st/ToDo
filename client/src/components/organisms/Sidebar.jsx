import React, { Component } from 'react'

export default class Sidebar extends Component {
  render() {
    return (
      <aside className="sidebar col-2 col-lg-4 px-0">
        <ul>
          <a className="h2 nav-link font-weight-bold py-3 mb-0" href="#">task.io</a>
          <hr className="sidebar-divider mx-3 my-0"></hr>
          <div className="nav-item">
            <a className="nav-link py-3" href="#">
              <span>Tasks</span>
            </a>
          </div>
          <div className="nav-item">
            <a className="nav-link py-3" href="#">
              <span>In Progress</span>
            </a>
          </div>
          <div className="nav-item">
            <a className="nav-link py-3" href="#">
              <span>Done</span>
            </a>
          </div>
          <hr className="sidebar-divider mx-3 my-0"></hr>
        </ul>
      </aside>
    )
  }
}
