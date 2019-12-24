import React, { Component } from 'react'
import Sidebar from '../components/organisms/Sidebar';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="app container-fluid">
        <div className="row">
          <Sidebar />
          <div className="content col p-0">
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              <h3 className="font-weight-light">navbar</h3>
              <a className="btn btn-link ml-auto" href="/logout" role="button">Logout</a>
            </nav>
            <main className="px-3">
              <h3 className="font-weight-light">Dashboard</h3>
            </main>
          </div>
        </div>
      </div>
    )
  }
}
