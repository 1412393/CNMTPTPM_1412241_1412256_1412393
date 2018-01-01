import axios from 'axios';
import {apiUrl} from '../apiConfig.js'

function signinStart(){
  return {type : "SIGNIN"}
}
function signinSuccess(data){
  return {type : "SIGNIN_SUCCESS", data: data}
}
function signinFail(message){
  return {type : "SIGNIN_FAIL", message: message}
}

export function signin(email,password){
  return dispatch => {
    dispatch(signinStart())
    if(email && password){
    axios.get(apiUrl +'signin', {
      params:{
        email: email,
        password: password,
      }
    })
    .then(response => {
      if(response && response.data !== "failed"){
        var data = response.data;
        sessionStorage.email = data.email;
        sessionStorage.isLogged = true;
        dispatch(signinSuccess(data))
        window.location = '/membersite';
      }
      else{
        dispatch(signinFail("Invalid username or password"))
      }
    })
    .catch(error => {
      console.log(error);
      dispatch(signinFail("Invalid username or password"))
    });
  }
  else{
    dispatch(signinFail("Invalid username or password"))
  }
  }
}
