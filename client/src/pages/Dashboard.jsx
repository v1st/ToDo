import React, { Component } from 'react'
import Sidebar from '../components/organisms/Sidebar';
import Card from '../components/molecules/Card';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="app container-fluid">
        <div className="row">
          <Sidebar />
          <div className="content col p-0">
            <nav className="navbar navbar-expand navbar-light bg-white topbar py-3 mb-4 static-top shadow">
              <a className="btn btn-link ml-auto" href="/logout" role="button">Logout</a>
            </nav>
            <main className="px-4 ">
              <div className="row">
                <div className="col-12 col-sm-6 col-md-4 col-xl-3 mb-4">
                  <div className="row no-gutters align-items-center mb-3">
                    <div className="col">
                      <h5 className="font-weight-bold mb-0">Tasks</h5>
                    </div>
                    <div className="col-auto">
                      <button className="btn text-primary font-weight-bold py-1 px-2">+</button>
                    </div>
                  </div>
                  <div className="col px-0">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-xl-3 mb-4">
                  <div className="row no-gutters align-items-center mb-3">
                    <div className="col">
                      <h5 className="font-weight-bold mb-0">In Progress</h5>
                    </div>
                    <div className="col-auto">
                      <button className="btn text-primary font-weight-bold py-1 px-2">+</button>
                    </div>
                  </div>
                  <div className="col px-0">
                    <Card />
                    <Card />
                    <Card />
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-xl-3 mb-4">
                  <div className="row no-gutters align-items-center mb-3">
                    <div className="col">
                      <h5 className="font-weight-bold mb-0">Done</h5>
                    </div>
                    <div className="col-auto">
                      <button className="btn text-primary font-weight-bold py-1 px-2">+</button>
                    </div>
                  </div>
                  <div className="col px-0">
                    <Card />
                    <Card />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }
}
