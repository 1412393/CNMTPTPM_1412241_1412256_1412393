import axios from 'axios';
import {apiUrl} from '../apiConfig.js'

function resendStart(){
  return {type : "RESEND"}
}
function resendSuccess(data){
  return {type : "RESEND_SUCCESS", data: data}
}
function resendFail(message){
  return {type : "RESEND_FAIL", message: message}
}

export function resend(email){
  return dispatch => {
    dispatch(resendStart())
    axios.post(apiUrl +'user/resend', {email: email})
    .then(response => {
      const data = response.data;
      if(response && data.msg === "success"){
        console.log(data)
        // sessionStorage.email = data.email;
        // sessionStorage.isLogged = true;
        dispatch(resendSuccess(data))
        // window.location = '/membersite';
      }
      else{
        dispatch(resendFail(data.msg))
      }
    })
    .catch(error => {
      console.log(error);
      dispatch(resendFail("Something went wrong"))
    });
  }
}
