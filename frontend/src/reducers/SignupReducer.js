const initState = {
  isCreating : false,
  created : false,
  message: "",
  result: {}
}

const signupReducer = (state = initState, action) => {
  switch(action.type){
    case "SIGNUP":
      return{...state, isCreating: true}
    case "SIGNUP_SUCCESS":
      return{...state, created: true, isCreating: false, result: action.data}
    case "SIGNUP_FAIL":
      return{...state, created: false, isCreating: false, message: action.message};

    default:
      return state;
  }
}


export default signupReducer;
