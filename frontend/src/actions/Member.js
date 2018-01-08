import axios from 'axios';
import {apiUrl} from '../apiConfig.js'

function sendStart(){
  return {type : "SEND"}
}
function sendSuccess(data){
  return {type : "SEND_SUCCESS", data: data}
}
function sendFail(message){
  return {type : "SEND_FAIL", message: message}
}

export function send(content){
  return dispatch => {
    dispatch(sendStart())
    axios.post(apiUrl +'user/send', {content})
    .then(response => {
      const data = response.data;
      if(response && data.msg === "success"){
        console.log(data)
        // sessionStorage.email = data.email;
        // sessionStorage.isLogged = true;
        dispatch(sendSuccess(data));
        window.alert("An verification email has been resent !");
        // window.location = '/membersite';
      }
      else{
        dispatch(sendFail(data.msg));
        window.alert("Resent fail !");
      }
    })
    .catch(error => {
      console.log(error);
      dispatch(sendFail("Something went wrong"));
      window.alert("Resent fail !");
    });
  }
}
