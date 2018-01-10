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

export function renew(){
  return dispatch => {
    dispatch(renewStart())
    axios.post(apiUrl +'admin/manage')
    .then(response => {
      const data = response.data;
      if(response && data.msg === "success"){
        console.log(data)
        dispatch(renewSuccess(data));
      }
      else{
        dispatch(renewFail(data.msg));
      }
    })
    .catch(error => {
      console.log(error);
      dispatch(renewFail("Something went wrong"));
    });
  }
}
