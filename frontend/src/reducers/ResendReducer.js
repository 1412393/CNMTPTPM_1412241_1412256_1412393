const initState = {
  isResending : false,
  resent : false,
  result: {}
}

const resendReducer = (state = initState, action) => {
  switch(action.type){
    case "RESEND":
      return{...state, isResending: true}
    case "RESEND_SUCCESS":
      return{...state, resent: true, isResending: false, result: action.data}
    case "RESEND_FAIL":
      return{...state, resent: false, isResending: false};

    default:
      return state;
  }
}


export default resendReducer;
