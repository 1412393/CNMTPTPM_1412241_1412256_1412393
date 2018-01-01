const initState = {
  isLogging : false;
  logged : false;
  result: [];
}

const mainReducer = (state = initState, action) => {
  switch(action.type){
    case "LOGIN":
      return{...state, isLogging: true}
    case "LOGIN_SUCCESS":
      return{...state, logged: true, isLogging: false, result: state.result.concat(action.data)}
    case "LOGIN_FAIL":
      return{...state, logged: true, isLogging: false};

    default:
      return state;
  }
}


export default mainReducer;
