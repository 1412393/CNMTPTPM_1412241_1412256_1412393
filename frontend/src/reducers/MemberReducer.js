const initState = {
    isSending : false,
    sent : false,
    result: {}
  }
  
  const resendReducer = (state = initState, action) => {
    switch(action.type){
      case "SEND":
        return{...state, isSending: true}
      case "SEND_SUCCESS":
        return{...state, sent: true, isSending: false, result: action.data}
      case "SEND_FAIL":
        return{...state, sent: false, isSending: false};
  
      default:
        return state;
    }
  }
  
  
  export default resendReducer;
  