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
  const content = {
    success: false,
    email: email,
    password: password,
    name: name,
  }
  return dispatch => {
    dispatch(signupStart())
      axios.post(apiUrl + 'user/signup', {content})
      .then(response=> {
        const data = response.data;
        if(response && data.msg === "success"){
          dispatch(signupSuccess(response.data))
          console.log(data);
          sessionStorage.email = email;
          window.alert(data.msg);
        }
        else
          dispatch(signupFail("This username has been used !"))
      })
      .catch(error=> {
        dispatch(signupFail("Please fill right information !"))
        console.log(error);
      });
  }
}
