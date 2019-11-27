import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import './bootstrap-theme.css'

import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authActions'

import Dashboard from './components/dashboard/Dashboard';
import Register from './components/register/Register';
import Login from './components/register/Login';
import Navbar from './components/layout/Navbar'
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './utils/PrivateRoute';
import Companies from './components/dashboard/Companies';

import UpdateReport from './components/dashboard/UpdateReport';
import Statistics from './components/dashboard/Statistics';
import ReportCreate from './components/dashboard/ReportCreate';
import Archive from './components/dashboard/Archive';
import SingleReport from './components/dashboard/SingleReport';
import Settings from './components/dashboard/Settings';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/login" component={Login} />
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/register" component={Register} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/companies" component={Companies} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/report/:id" component={SingleReport} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/create/report" component={ReportCreate} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/update/report/:id" component={UpdateReport} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/statistics" component={Statistics} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/archive" component={Archive} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/settings" component={Settings} />
          </Switch>
        </div>
      </Router>
    </Provider>

  );
}

export default App;
