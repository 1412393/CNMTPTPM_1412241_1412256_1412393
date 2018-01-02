import axios from 'axios';
import {apiUrl} from '../apiConfig.js'

function signupStart(){
  return {type : "SIGNUP"}
}
function signupSuccess(data){
  return {type : "SIGNUP_SUCCESS", data:data}
}
function signupFail(message){
  return {type : "SIGNUP_FAIL", message: message}
}

export function signup(name,email,password){
  return dispatch => {
    dispatch(signupStart())
    if(name && password && email){
      axios.post(apiUrl + 'user/signup', {
          success: false,
          email: email,
          password: password,
          name: name,
      })
      .then(response=> {
        if(response && response.data !== "exist"){
          dispatch(signupSuccess(response.data))
          window.location = '/';
          sessionStorage.email = response.data.email;
        }
        else
          dispatch(signupFail("This username has been used !"))
      })
      .catch(error=> {
        dispatch(signupFail("Please fill right information !"))
        console.log(error);
      });
    }
    else{
      dispatch(signupFail("Please fill right information !"))
    }
  }
}
