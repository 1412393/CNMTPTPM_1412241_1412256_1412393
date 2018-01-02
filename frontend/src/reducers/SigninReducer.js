const initState = {
  isLogging : false,
  logged : false,
  result: {}
}

const signinReducer = (state = initState, action) => {
  switch(action.type){
    case "SIGNIN":
      return{...state, isLogging: true}
    case "SIGNIN_SUCCESS":
      return{...state, logged: true, isLogging: false, result: action.data}
    case "SIGNIN_FAIL":
      return{...state, logged: true, isLogging: false};

    default:
      return state;
  }
}


export default signinReducer;
