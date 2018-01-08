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
  const content = {
    email: email,
    password: password,
  }
  return dispatch => {
    dispatch(signinStart())
    axios.post(apiUrl +'user/signin', {content})
    .then(response => {
      const data = response.data;
      if(response && data.user){
        console.log(data)
        sessionStorage.email = data.email;
        sessionStorage.isLogged = true;
        dispatch(signinSuccess(data))
      }
      else{
        dispatch(signinFail(data.msg))
      }
    })
    .catch(error => {
      console.log(error);
      dispatch(signinFail("Something went wrong"))
    });
  }
}
