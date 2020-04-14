// eslint-disable-next-line no-unused-vars
import React from 'react';
import {
  // eslint-disable-next-line no-unused-vars
  withRouter, Route, Switch, Redirect
} from 'react-router-dom';
import ROUTES from './utils/routes';
import Home from './components/home';

function App() {
  return (
    <Switch>
      <Route exact path={ROUTES.home} component={Home} />
    </Switch>
  );
}

export default App;
