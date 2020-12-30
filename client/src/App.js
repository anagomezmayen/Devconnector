import React, {Component} from 'react';
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import store from './store';
import { logoutUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import {SET_USER} from './actions/types';

import PrivateRoute from "./components/common/PrivateRoute";

import { clearCurrentProfile } from "./actions/profileActions";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import Profile from './components/profile/Profile';
import Profiles from "./components/profiles/Profiles";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
//import NotFound from "./components/not-found/NotFound";

if(localStorage.jwtToken){
  //decode the token
  const decoded = jwt_decode(localStorage.jwtToken);
  //check the xpiry of the token
  const currentTime = Date.now()/1000;
  if(decoded.exp < currentTime){
    //expired by now
    //logout user
    store.dispatch(logoutUser());  
    //redirect user to login
    window.location.href ="/login";
  }
  //set auth header
  setAuthToken(localStorage.jwtToken);
  //dispatch
  store.dispatch({
    type: SET_USER,
    payload: decoded
  });
 

}


class App extends Component {
  render(){
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar/>
          <Route path="/" exact component={Landing}/>
          <div className="container">
            <Route path="/register" exact component={Register}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/profiles" exact component={Profiles}/>
            <Route path="/profile/:handle" exact component={Profile}/> 
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            </Switch>
            <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>

            </div>
            
          <Footer/>
        </div>
      </Router>
    </Provider>
  );
  }
}
export default App;
