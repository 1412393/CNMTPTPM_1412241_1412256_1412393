const initState = {
    isRenewing : false,
    renewed : false,
    result: {}
  }
  
  const resendReducer = (state = initState, action) => {
    switch(action.type){
      case "RENEW":
        return{...state, isRenewing: true}
      case "RENEW_SUCCESS":
        return{...state, renewed: true, isRenewing: false, result: action.data}
      case "RENEW_FAIL":
        return{...state, renewed: false, isRenewing: false};
  
      default:
        return state;
    }
  }
  
  
  export default resendReducer;
  