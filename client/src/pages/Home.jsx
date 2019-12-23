import React from 'react'

export default function Home() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-sm">
          <h1><strong>Manage your <br /> projects with Task.io</strong></h1>
          <p className="lead">Schedule out your daily tasks</p>
          <a className="btn btn-primary px-4 py-2" href="/signup" role="button">Get Started</a>
        </div>
      </div>
    </main>
  )
}
