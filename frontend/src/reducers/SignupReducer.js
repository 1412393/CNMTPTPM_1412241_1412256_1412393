const initState = {
  isCreating : false,
  created : false,
  message: "",
  result: []
}

const signupReducer = (state = initState, action) => {
  switch(action.type){
    case "SIGNUP":
      return{...state, isLogging: true}
    case "SIGNUP_SUCCESS":
      return{...state, logged: true, isLogging: false, result: state.result.concat(action.data)}
    case "SIGNUP_FAIL":
      return{...state, logged: true, isLogging: false, message: action.message};

    default:
      return state;
  }
}


export default signupReducer;
