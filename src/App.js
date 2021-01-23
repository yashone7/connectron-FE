import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Landing from './components/common/Landing';
import store from './redux/store';
import Login from './components/common/Login';
import DoctorDashboard from './components/doctors/DoctorDashboard';
import CreateTest from './components/doctors/CreateTest';
import Createpatient from './components/doctors/Createpatient';
import { loadUser } from './redux/actions/authAction';
import Alert from './components/common/Alert';
import Ngodashboard from './components/ngos/Ngodashboard';
import Profile from './components/common/Profile';
import Register from './components/common/Register';

function App() {
  useEffect(() => {
    if (localStorage.getItem('feathers-jwt')) {
      store.dispatch(loadUser());
    }
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Alert />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path='/register' component={Register}/>
          <Route exact path="/doctor" component={DoctorDashboard} />
          <Route exact path="/home" component={Ngodashboard} />
          <Route exact path="/:id" component={Profile} />
          <DoctorDashboard>
            <Route exact path="/create-patient" component={Createpatient} />
            <Route exact path="/conduct-test" component={CreateTest} />
          </DoctorDashboard>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
