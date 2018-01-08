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
    axios.post(apiUrl +'transaction/send', {content})
    .then(response => {
      const data = response.data;
      if(response && data.msg === "success"){
        console.log(data)
        dispatch(sendSuccess(data));
      }
      else{
        dispatch(sendFail(data.msg));
      }
    })
    .catch(error => {
      console.log(error);
      dispatch(sendFail("Something went wrong"));
    });
  }
}


function updateStart(){
    return {type : "UPDATE"}
  }
  function updateSuccess(data){
    return {type : "UPDATE_SUCCESS", data: data}
  }
  function updateFail(message){
    return {type : "UPDATE_FAIL", message: message}
  }
  
  export function update(email){
    const content = {
        email: email
    }
    return dispatch => {
      dispatch(updateStart())
      axios.post(apiUrl +'user/update', {content})
      .then(response => {
        const data = response.data;
        if(response && data.msg === "success"){
          console.log(data)

          dispatch(updateSuccess(data));

        }
        else{
          dispatch(updateFail(data.msg));
        }
      })
      .catch(error => {
        console.log(error);
        dispatch(updateFail("Something went wrong"));
      });
    }
  }
