import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../../pages/Dashboard';
import NotFound from '../../pages/NotFound';

export default class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}
