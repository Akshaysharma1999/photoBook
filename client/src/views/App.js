import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import history from './history';

import toaster from '../utils/toaster';
import ProtectedRoute from '../utils/protectedRoute';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import CreatePost from './CreatePost';
import UserProfile from './UserProfile';
import MyFeed from './MyFeed';
import SendResetPassLink from './SendResetPassLink';
import ResetPassword from './ResetPassword';

const AppRoutes = ({ store }) => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/signup" exact component={Signup} />
    <ProtectedRoute path="/profile" exact component={Profile} />
    <ProtectedRoute path="/createPost" exact component={CreatePost} />
    <ProtectedRoute path="/userProfile/:id" component={UserProfile} />
    <ProtectedRoute path="/myfeed" component={MyFeed} />
    <Route path="/forgotPass" exact component={SendResetPassLink} />
    <Route path="/resetPassword/:id" component={ResetPassword} />
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
