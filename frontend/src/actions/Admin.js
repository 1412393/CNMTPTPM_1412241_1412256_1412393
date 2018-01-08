import axios from 'axios';
import {apiUrl} from '../apiConfig.js'

function renewStart(){
  return {type : "RENEW"}
}
function renewSuccess(data){
  return {type : "RENEW_SUCCESS", data: data}
}
function renewFail(message){
  return {type : "RENEW_FAIL", message: message}
}

export function renew(email){
  return dispatch => {
    dispatch(renewStart())
    axios.post(apiUrl +'user/resend', {email: email})
    .then(response => {
      const data = response.data;
      if(response && data.msg === "success"){
        console.log(data)
        // sessionStorage.email = data.email;
        // sessionStorage.isLogged = true;
        dispatch(renewSuccess(data));
        window.alert("An verification email has been resent !");
        // window.location = '/membersite';
      }
      else{
        dispatch(renewFail(data.msg));
        window.alert("Resent fail !");
      }
    })
    .catch(error => {
      console.log(error);
      dispatch(renewFail("Something went wrong"));
      window.alert("Resent fail !");
    });
  }
}
