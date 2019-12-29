import React, { Component } from 'react'

export default class Card extends Component {
  render() {
    return (
      <div className="card callout callout-primary shadow h-100 py-4 mb-2">
        <div className="row no-gutters align-items-center">
          <div className="col mr-2">
            <h6 className="text-primary mb-1">Complete This</h6>
          </div>
          <div className="col-auto">
            <button className="btn text-danger font-weight-bold py-1 px-2">X</button>
          </div>
        </div>
      </div>
    )
  }
}
