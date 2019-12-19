import React from 'react'

export default function NavBar() {
  return (
    <header>
      <nav class="navbar navbar-light">
        <div class="container">
          <a href="/" class="navbar-brand">Task.io</a>
          <div>
            <a class="btn btn-link" href="/logout" role="button">Logout</a>
            <a class="btn btn-primary" href="/signup" role="button">Signup</a>
            <a class="btn btn-link" href="/login" role="button">Login</a>
          </div>
        </div>
      </nav>
    </header>
  )
}
