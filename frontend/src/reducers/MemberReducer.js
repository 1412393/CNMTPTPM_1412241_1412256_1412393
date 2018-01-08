const initState = {
    isSending : false,
    sent : false,
    result: {},

    isUpdating: false,
    updated: false,
    data: {}
  }
  
  const memberReducer = (state = initState, action) => {
    switch(action.type){
      case "SEND":
        return{...state, isSending: true}
      case "SEND_SUCCESS":
        return{...state, sent: true, isSending: false, result: action.data}
      case "SEND_FAIL":
        return{...state, sent: false, isSending: false};
      case "UPDATE":
        return{...state, isUpdating: true}
      case "UPDATE_SUCCESS":
        return{...state, updated: true, isUpdating: false, data: action.data}
      case "UPDATE_FAIL":
        return{...state, updated: false, isUpdating: false};
      default:
        return state;
    }
  }
  
  
  export default memberReducer;
  