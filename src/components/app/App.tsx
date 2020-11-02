import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Schedule from 'views/schedule/Schedule';
import Positions from 'views/positions/Positions';
import Organization from 'views/organization/Organization';
import SignUp from 'views/sign-up/SignUp';
import SignIn from 'views/sign-in/SignIn';
import NotFound from 'views/not-found/NotFound';
import usersReducer, { User } from 'modules/users';
import organizationsReducer, {
  Organization as OrganizationState,
} from 'modules/organizations';
import positionsReducer from 'modules/positions';
import alertsReducer, { Alert } from 'modules/alerts';
import { setAuthToken } from 'helpers/setAuthToken';
import Alerts from './alerts/Alerts';
import PrivateRoute from './private-route/PrivateRoute';
import 'normalize.css';
import 'styles/global.scss';

interface StateSchema {
  users: User;
  organizations: OrganizationState;
  positions: any;
  alerts: Alert[];
}

export type AppThunk = ThunkAction<void, StateSchema, unknown, Action<string>>;

export const store = configureStore({
  reducer: {
    users: usersReducer,
    organizations: organizationsReducer,
    positions: positionsReducer,
    alerts: alertsReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Alerts />
        <Switch>
          <PrivateRoute exact path="/" Component={Schedule} />
          <PrivateRoute exact path="/positions" Component={Positions} />
          <PrivateRoute exact path="/organization" Component={Organization} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/sign-in" component={SignIn} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
