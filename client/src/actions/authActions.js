import { SET_ERROR, SET_USER } from "./types";
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser= (userData, history) => dispatch => {
  
    axios.post('/api/users/register', userData)
    .then(res => history.push('/login')) /**push to the next page */
    .catch(err => 
      dispatch({
        type: SET_ERROR,
        payload: err.response.data
      }));
}

export const loginUser= userData => dispatch=>{
   axios.post('/api/users/login', userData)
    .then((res) => {
      // save the token to localstorage
      const {token}= res.data;
      localStorage.setItem('jwtToken', token);
      //set the token to auth header
      setAuthToken(token);
      //decode token
      const decoded = jwt_decode(token);
      //write user info to redux
      dispatch({
        type: SET_USER,
        payload: decoded
      });
    })
    .catch(err => 
      dispatch({
        type: SET_ERROR,
        payload: err.response.data
      })
    );
}

export const logoutUser = () => dispatch =>{
  //remove token from localstorage
  localStorage.removeItem('jwtToken');
  //remove token from axios header
  setAuthToken(false);
  //reset user in the redux store
  dispatch({
        type: SET_USER,
        payload: {}
      });
}