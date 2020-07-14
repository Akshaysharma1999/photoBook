import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import history from './history';

import toaster from '../utils/toaster';
import ProtectedRoute from '../utils/protectedRoute';
import Home from './Home';

const AppRoutes = ({ store }) => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="*" component={() => '404 not found'} />
  </Switch>
);

function App(props) {
  return (
    <Provider store={props.store}>
      <Router history={history}>
        <AppRoutes />
        {toaster(props)}
      </Router>
    </Provider>
  );
}

const mapStateToProps = state => {
  return {
    requestErrors: state.user.errors,
    requestSuccess: state.user.success,
  };
};

export default connect(mapStateToProps)(App);
