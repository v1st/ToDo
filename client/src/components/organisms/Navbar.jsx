import React, { Component } from 'react'

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand navbar-light bg-white topbar py-3 mb-4 static-top shadow">
        <a className="btn btn-link ml-auto" href="/logout" role="button">Logout</a>
      </nav>
    )
  }
}
